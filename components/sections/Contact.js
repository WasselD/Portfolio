"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const CONTACT_DETAILS = [
  { icon: Mail, label: "wasselforbusiness@gmail.com", href: "mailto:wasselforbusiness@gmail.com" },
  { icon: Phone, label: "+216 54251213", href: "tel:+21654251213" },
  { icon: MapPin, label: "Remote ·  Tunisia Tunis", href: "https://maps.google.com/?q=Tunis,+Tunisia"},
];

export default function Contact() {
  const mapItem = CONTACT_DETAILS.find((it) => it.icon === MapPin) || CONTACT_DETAILS.find((it) => /map/i.test(it.label));
  const mapHref = mapItem?.href || "";
  const getEmbedUrl = (href) => {
    try {
      if (!href) return "";
      const url = new URL(href);
      if (url.pathname.includes("embed") || url.searchParams.get("output") === "embed") return href;
      const q = url.searchParams.get("q") || url.pathname.replace(/^\//, "");
      if (!q) return href;
      return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    } catch (e) {
      return href;
    }
  };
  const embedUrl = getEmbedUrl(mapHref);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();


  const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/wasselforbusiness@gmail.com";

  const onSubmit = async ({ _honey, ...data }) => {

    if (_honey) {
      reset();
      return;
    }

    try {
      const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _subject: `Portfolio contact — ${data.subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error("FormSubmit request failed");

      toast.success("Message sent — I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Couldn't send that — please email me directly instead.");
    }
  };

  return (
    <section id="contact" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind or just want to say hi? Send a message and I'll reply within a day or two."
        />

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 mt-14">
          {/* Details + map */}
          <Reveal className="flex flex-col gap-6">
            <div className="glass rounded-lg2 p-6 flex flex-col gap-4">
              {CONTACT_DETAILS.map(({ icon: Icon, label, href }) => {
                const content = (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted">{label}</span>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}

              <div className="flex items-center gap-3 pt-2 border-t border-hairline">
                <a
                  href="https://github.com/WasselD"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center hover:border-primary/60 transition-colors"
                >
                  <Github size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/wasseldridi/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center hover:border-primary/60 transition-colors"
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </div>

            <div className="glass rounded-lg2 aspect-[4/3] overflow-hidden">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Location map"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-xs text-muted">Map placeholder</span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="glass rounded-lg2 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...register("_honey")}
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full rounded-xl bg-transparent border border-hairline px-4 py-2.5 text-sm
                      focus:outline-none focus:border-primary/60 transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full rounded-xl bg-transparent border border-hairline px-4 py-2.5 text-sm
                      focus:outline-none focus:border-primary/60 transition-colors"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted mb-1.5 block">Subject</label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full rounded-xl bg-transparent border border-hairline px-4 py-2.5 text-sm
                    focus:outline-none focus:border-primary/60 transition-colors"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-muted mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Message is too short" },
                  })}
                  className="w-full rounded-xl bg-transparent border border-hairline px-4 py-3 text-sm resize-none
                    focus:outline-none focus:border-primary/60 transition-colors"
                  placeholder="Tell me a bit about the project..."
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary self-start disabled:opacity-60">
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
