"use client";

import Marquee from "@/components/ui/Marquee";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/data/skills";

export default function Skills() {
  const names = SKILLS.map((s) => s.name);
  const half = Math.ceil(names.length / 2);
  const groups = SKILL_CATEGORIES.map((cat) => ({
    cat,
    items: SKILLS.filter((s) => s.category === cat),
  })).filter((g) => g.items.length);

  return (
    <section id="skills" data-tone="ink" className="sheet sheet-pad relative z-10 pb-0">
      <div className="wrap grid items-end gap-8 md:grid-cols-12">
        <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">
          Tools I reach for
        </h2>
        <p className="max-w-[34ch] text-fg/60 md:col-span-4">
          A working set of technologies across the stack, kept current through ongoing projects.
        </p>
      </div>

      <div className="mt-[clamp(48px,7vw,110px)] space-y-1 sm:space-y-2">
        <Marquee items={names.slice(0, half)} speed={3.2} direction={1} itemClassName="display text-[clamp(3.2rem,8.5vw,9rem)]" />
        <Marquee items={names.slice(half)} speed={3.2} direction={-1} className="text-fg/25" itemClassName="display text-[clamp(3.2rem,8.5vw,9rem)]" />
      </div>

      <div className="wrap mt-[clamp(64px,9vw,140px)]">
        <div className="skill-list">
          {groups.map(({ cat, items }) => (
            <div key={cat} className="grid gap-3 border-t border-fg/15 py-7 md:grid-cols-12 md:gap-8">
              <h3 className="pt-1.5 text-sm text-fg/50 md:col-span-3">{cat}</h3>
              <ul className="flex flex-wrap gap-x-9 gap-y-1 text-[clamp(1.5rem,2.7vw,2.5rem)] font-medium tracking-tight md:col-span-9">
                {items.map((s) => (
                  <li key={s.name} className="skill-item">
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
