"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import RollingText from "@/components/ui/RollingText";
import Icon from "@/components/ui/Icon";
import { contactValidation, sanitizeInput } from "@/lib/validation";
import { checkRateLimit, recordSubmission } from "@/lib/rateLimit";

const EMAIL = "wasselforbusiness@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/WasselD" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamwasseldridi/" },
];

function SendButton({ sending }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="group relative inline-block self-start pb-3 text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium tracking-tight disabled:pointer-events-none disabled:opacity-50"
    >
      {sending ? "Sending..." : <RollingText>Send message</RollingText>}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-fg/35" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-fg transition-transform duration-500 ease-swift group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </button>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ _honey, ...data }) => {
    if (_honey) {
      reset();
      return;
    }

    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      toast.error(rateLimit.message);
      return;
    }

    const cleanData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message),
    };

    try {
      const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: cleanData.name,
          email: cleanData.email,
          subject: cleanData.subject,
          message: cleanData.message,
          _subject: `Portfolio contact — ${cleanData.subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error("FormSubmit request failed");

      recordSubmission();
      toast.success("Message sent. I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Couldn't send that. Please email me directly instead.");
    }
  };

  return (
    <section id="contact" data-tone="ink" className="sheet sheet-pad relative z-10 pb-[clamp(56px,8vw,120px)]">
      <div className="wrap">
        <h2 className="display text-[clamp(3.6rem,12.5vw,14rem)]">
          Let&apos;s build
          <br />
          something
        </h2>
        <p className="mt-8 max-w-[40ch] text-fg/60">
          Have a project in mind or just want to say hi? Send a message and I&apos;ll reply within a day or two.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="display mt-[clamp(40px,6vw,88px)] block w-fit whitespace-nowrap text-[clamp(1.05rem,5.4vw,5.6rem)]"
          style={{ fontStretch: "90%", lineHeight: 1.25 }}
        >
          <RollingText>{EMAIL}</RollingText>
        </a>

        <div className="mt-[clamp(48px,7vw,104px)] grid gap-16 border-t border-fg/15 pt-[clamp(40px,6vw,88px)] lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="flex flex-col gap-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm text-fg/50">Phone</dt>
                <dd>
                  <a href="tel:+21654251213" className="text-lg">
                    <RollingText>+216 54 251 213</RollingText>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-fg/50">Based in</dt>
                <dd>
                  <a
                    href="https://maps.google.com/?q=Gobaa,+Manouba,+Tunisia"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-lg"
                  >
                    <RollingText>Gobaa, Manouba, Tunisia</RollingText>
                    <Icon name="upright" size={15} />
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-fg/50">Elsewhere</dt>
                <dd className="flex gap-6 text-lg">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
                      <RollingText>{s.label}</RollingText>
                      <Icon name="upright" size={15} />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className="flex flex-col gap-9"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register("_honey")}
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />

            <div className="grid gap-9 sm:grid-cols-2">
              <Field id="contact-name" label="Name" error={errors.name}>
                <input
                  id="contact-name"
                  className="field"
                  placeholder="Your name"
                  autoComplete="off"
                  {...register("name", contactValidation.name)}
                />
              </Field>
              <Field id="contact-email" label="Email" error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  className="field"
                  placeholder="you@example.com"
                  autoComplete="off"
                  {...register("email", contactValidation.email)}
                />
              </Field>
            </div>

            <Field id="contact-subject" label="Subject" error={errors.subject}>
              <input
                id="contact-subject"
                className="field"
                placeholder="What's this about?"
                autoComplete="off"
                {...register("subject", contactValidation.subject)}
              />
            </Field>

            <Field id="contact-message" label="Message" error={errors.message}>
              <textarea
                id="contact-message"
                rows={4}
                className="field"
                placeholder="Tell me a bit about the project..."
                autoComplete="off"
                {...register("message", contactValidation.message)}
              />
            </Field>

            <SendButton sending={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
}
