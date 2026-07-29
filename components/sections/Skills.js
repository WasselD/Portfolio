"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/data/skills";

export default function Skills() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return SKILLS.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="skills" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          description="A working set of technologies across the stack, kept current through ongoing projects."
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-10 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full glass rounded-full pl-11 pr-4 py-2.5 text-sm bg-transparent
                placeholder:text-muted focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...SKILL_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  category === cat
                    ? "bg-primary text-white border-primary"
                    : "border-hairline text-muted hover:text-ink-light dark:hover:text-ink hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">
            No skills match "{query}". Try a different search or category.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill, i) => (
              <Reveal
                key={skill.name}
                delay={Math.min(i * 0.03, 0.3)}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <span className="text-[10px] text-muted uppercase tracking-wide">
                    {skill.years}y
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted">{skill.category}</span>
                  <span className="text-[10px] text-muted">{skill.level}%</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
