"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data/projects";

function ProjectCard({ project }) {
  const imageSrc =
    project.image ||
    project.screenshot ||
    project.cover ||
    (project.id ? `/images/projects/${project.id}.png` : null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-lg2 overflow-hidden flex flex-col"
    >
      {/* Clean Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/15 via-card to-accent/10 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-xs text-muted">No Preview Available</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-medium">{project.title}</h3>
          <span className="text-[10px] text-muted">{project.date}</span>
        </div>
        <p className="text-sm text-muted leading-relaxed mb-4">
          {project.description}
        </p>

        <ul className="text-xs text-muted space-y-1 mb-4 list-disc list-inside marker:text-primary/60">
          {project.features.slice(0, 2).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-1 rounded-full border border-hairline text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-hairline">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-ink-light dark:hover:text-ink transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-ink-light dark:hover:text-ink transition-colors"
            >
              <ExternalLink size={14} /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="projects" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A mix of client work and side projects — full stack apps, tools, and interfaces."
        />

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-14 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full glass rounded-full pl-11 pr-4 py-2.5 text-sm bg-transparent
                placeholder:text-muted focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
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

        {/* Project Cards Grid */}
        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">
            No projects match your search or filter.
          </p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}