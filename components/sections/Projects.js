"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import Icon from "@/components/ui/Icon";

function Panel({ project, index, count, progress, still }) {
  const ref = useRef(null);

  const last = index === count - 1;
  const from = count > 1 ? index / (count - 1) : 0;
  const to = count > 1 ? (index + 1) / (count - 1) : 1;
  const scale = useTransform(progress, [from, to], [1, last ? 1 : 0.93]);
  const veil = useTransform(progress, [from, to], [0, last ? 0 : 0.72]);

  return (
    <motion.article
      ref={ref}
      data-tone="ink"
      style={{
        scale: still ? 1 : scale,
        transformOrigin: "50% 0%",
      }}
      className="sticky top-0 overflow-hidden border-t border-fg/20 bg-bg"
    >
      <div className="wrap flex h-full min-h-[50svh] flex-col justify-between py-[clamp(32px,6vh,80px)]">
        <div>
          <div className="flex items-baseline justify-between text-sm text-fg/60">
            <span>{project.category}</span>
            <span>{project.date}</span>
          </div>

          <h3 className="display mt-[1.2vh] line-clamp-2 text-[clamp(2.6rem,7.6vw,8.5rem)]">
            {project.title}
          </h3>
        </div>

        <div className="my-[4vh] grid gap-x-10 gap-y-6 text-[0.95rem] md:grid-cols-12">
          <p className="text-base leading-relaxed text-fg/70 md:col-span-5 md:line-clamp-4">
            {project.description}
          </p>

          <ul className="hidden space-y-1.5 text-fg/55 md:col-span-4 md:block">
            {project.features?.slice(0, 3).map((f) => (
              <li key={f} className="line-clamp-2">
                • {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-between md:col-span-3">
            {project.technologies?.length > 0 && (
              <p className="mb-4 text-fg/55">{project.technologies.join(", ")}</p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pill !px-5 !py-2.5 text-sm"
                >
                  Code <Icon name="upright" size={14} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="pill pill-solid !px-5 !py-2.5 text-sm"
                >
                  Live demo <Icon name="upright" size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: still ? 0 : veil }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
    </motion.article>
  );
}

function Stack({ items, still }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((p, i) => (
        <Panel key={p.id || i} project={p} index={i} count={items.length} progress={scrollYProgress} still={still} />
      ))}
    </div>
  );
}

export default function Projects() {
  const { projects } = useContent();
  const still = useReducedMotion();
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects]
  );

  const active = categories.includes(category) ? category : "All";
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <section id="projects" data-tone="ink" className="relative z-10">
      <div className="wrap pt-[clamp(72px,10vw,150px)]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">Selected work</h2>
          <p className="max-w-[36ch] text-fg/60 md:col-span-4">
            A selection of web applications, interface work, and software tools.
          </p>
        </div>

        {categories.length > 2 && (
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 pb-10" role="tablist" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setCategory(c)}
                className={`relative py-2 text-[0.95rem] transition-colors ${
                  active === c ? "text-fg" : "text-fg/45 hover:text-fg"
                }`}
              >
                {c}
                {active === c && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-x-0 -bottom-px h-px bg-fg"
                    transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
        {categories.length <= 2 && <div className="pb-10" />}
      </div>

      {list.length > 0 && <Stack items={list} still={still} />}
    </section>
  );
}
