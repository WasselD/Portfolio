import { Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/lib/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Six years across agency and product teams, moving toward more ownership each step."
        />

        <div className="relative mt-16 pl-8">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-hairline" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.08} className="relative">
                <span className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-base-light dark:bg-base border-2 border-primary" />

                <div className="glass rounded-lg2 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={15} className="text-primary" />
                      <h3 className="font-display font-medium">{exp.role}</h3>
                    </div>
                    <span className="text-xs text-muted">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-accent mb-3">{exp.company}</p>
                  <ul className="text-sm text-muted space-y-1.5 mb-4 list-disc list-inside marker:text-primary/60">
                    {exp.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-1 rounded-full border border-hairline text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
