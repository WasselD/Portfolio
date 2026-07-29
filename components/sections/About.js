import { GraduationCap, Heart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { EDUCATION, VALUES } from "@/lib/data/experience";

export default function About() {
  return (
    <section id="about" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="About"
          title="A little about how I work"
          description="I'm a full stack developer who cares as much about maintainability as I do about the first impression. I like turning ambiguous problems into small, well-tested pieces."
        />

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          <Reveal delay={0.1} className="glass rounded-lg2 p-8">
            <p className="text-muted leading-relaxed mb-4">
              I got into programming by taking apart old computers, which
              turned into a CompTIA A+ certification and, eventually, a
              career building web applications. Over the last six years I've
              worked across design, development, and content structure —
              shaping interfaces that stay clear, fast, and easy to maintain.
            </p>
            <p className="text-muted leading-relaxed">
              These days I'm most interested in developer experience,
              performance, and building simple systems that help the rest of
              the site stay maintainable.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.15} className="glass rounded-lg2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-primary" />
                <h3 className="font-display font-medium">Education</h3>
              </div>
              <ul className="space-y-4">
                {EDUCATION.map((edu) => (
                  <li key={edu.id} className="border-l border-hairline pl-4">
                    <p className="text-sm font-medium">{edu.degree}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {edu.institution} · {edu.duration}
                    </p>
                    <p className="text-xs text-muted mt-1">{edu.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="glass rounded-lg2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={18} className="text-accent" />
                <h3 className="font-display font-medium">What I value</h3>
              </div>
              <ul className="space-y-3">
                {VALUES.map((v) => (
                  <li key={v.title}>
                    <p className="text-sm font-medium">{v.title}</p>
                    <p className="text-xs text-muted mt-0.5">{v.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
