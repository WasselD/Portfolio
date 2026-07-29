"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Search, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data/projects";

const PAGE_SIZE = 4;

function StatusBadge({ status }) {
  const styles =
    status === "Live"
      ? "bg-success/15 text-success"
      : status === "In Progress"
      ? "bg-accent/15 text-accent"
      : "bg-white/10 text-muted";
  return (
    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${styles}`}>
      {status}
    </span>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className={`group glass rounded-lg2 overflow-hidden flex flex-col ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video bg-gradient-to-br from-primary/15 via-card to-accent/10 flex items-center justify-center overflow-hidden">
        <span className="text-xs text-muted">Screenshot placeholder</span>
        {project.featured && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
            <Star size={10} fill="currentColor" /> Featured
          </span>
        )}
        <span className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </span>
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
          {project.features.slice(0, featured ? 3 : 2).map((f) => (
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
  const [page, setPage] = useState(1);

  const featured = PROJECTS.filter((p) => p.featured);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (fn) => {
    fn();
    setPage(1);
  };

  return (
    <section id="projects" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A mix of client work and side projects — full stack apps, tools, and interfaces."
        />

        {/* Featured row */}
        <div className="grid sm:grid-cols-2 gap-6 mt-14 mb-16">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} featured />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => handleFilterChange(() => setQuery(e.target.value))}
              placeholder="Search projects or tech..."
              className="w-full glass rounded-full pl-11 pr-4 py-2.5 text-sm bg-transparent
                placeholder:text-muted focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(() => setCategory(cat))}
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

        {/* Grid */}
        {paged.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">
            No projects match your filters yet.
          </p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {paged.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full text-xs font-medium border transition-colors ${
                  page === i + 1
                    ? "bg-primary text-white border-primary"
                    : "border-hairline text-muted hover:border-primary/50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
