"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data/experience";

export default function Experience() {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" data-tone="ink" className="sheet sheet-pad relative z-10 pb-[clamp(72px,10vw,150px)]">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">
            Where I&apos;ve worked
          </h2>
          <p className="max-w-[34ch] text-fg/60 md:col-span-4">
            Experience across web development, interface design, social media, and business operations.
          </p>
        </div>

        <div ref={ref} className="relative mt-[clamp(48px,7vw,110px)]">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-fg/15" aria-hidden="true">
            <motion.div
              className="h-full w-px origin-top bg-fg"
              style={{ scaleY: still ? 1 : draw }}
            />
          </div>

          <ol className="pl-7 md:pl-14">
            {EXPERIENCE.map((exp) => (
              <li key={exp.id} className="relative pb-6 md:pb-10">
                <span
                  className="absolute -left-[calc(1.75rem+4px)] top-2 h-[9px] w-[9px] bg-fg md:-left-[calc(3.5rem+4px)]"
                  aria-hidden="true"
                />
                <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                  <div className="self-start md:sticky md:top-28 md:col-span-3">
                    <p className="text-fg/55">{exp.duration}</p>
                    <p className="mt-1 text-lg">{exp.company}</p>
                  </div>

                  <div className="md:col-span-9">
                    <h3 className="display text-[clamp(2.6rem,6.4vw,6.8rem)]">{exp.role}</h3>

                    <ul className="mt-10 max-w-[62ch]">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="border-t border-fg/15 py-4 text-fg/75">
                          {r.replace(/\s{2,}/g, " ")}
                        </li>
                      ))}
                      <li className="border-t border-fg/15" aria-hidden="true" />
                    </ul>

                    <p className="mt-8 max-w-[62ch] text-[1.05rem] leading-relaxed text-fg/55">
                      {exp.technologies.join(", ")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
