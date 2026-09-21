"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import Icon from "@/components/ui/Icon";
import RollingText from "@/components/ui/RollingText";

// The work opens from a small window to the full frame as its panel arrives.
const CLIP_FROM = "inset(30% 36% 30% 36%)";
const CLIP_TO = "inset(0% 0% 0% 0%)";

function useSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/**
 * The real site, live, in a frame. It renders at desktop width and is scaled down to fit,
 * so you see the top of the page exactly as a visitor would. The frame is a preview:
 * clicks go to an overlay link that opens the site, so it never traps page scrolling.
 */
function LiveFrame({ url, title }) {
  const box = useRef(null);
  const { w, h } = useSize(box);
  const [loaded, setLoaded] = useState(false);
  const designW = w && w < 520 ? 1000 : 1440;
  const scale = w ? w / designW : 0;

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      {scale > 0 && (
        <iframe
          src={url}
          title={`${title} live preview`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none block max-w-none border-0 transition-opacity duration-700"
          style={{
            width: designW,
            height: h / scale,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title} live site`}
        className="group absolute inset-0 z-10 flex items-end justify-center pb-5"
      >
        <span className="bg-white px-4 py-2 text-sm text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Open live site
        </span>
      </a>
    </div>
  );
}

function Panel({ project, index, count, progress, still }) {
  const ref = useRef(null);

  // 1) arriving: the frame opens from a small pill and colour comes in
  const { scrollYProgress: arrive } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const clip = useTransform(arrive, [0, 1], [CLIP_FROM, CLIP_TO]);
  const filter = useTransform(arrive, [0.45, 1], ["grayscale(1) contrast(1.08)", "grayscale(0) contrast(1)"]);

  // 2) being covered: this panel recedes while the next one slides over it
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
      className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden border-t border-fg/20"
    >
      <div className="wrap flex h-full flex-col pb-[clamp(16px,3.5vh,44px)] pt-[clamp(64px,10vh,120px)]">
        <div className="flex items-baseline justify-between text-sm text-fg/60">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>

        <h3 className="display mt-[1.2vh] line-clamp-2 text-[clamp(2.6rem,7.6vw,8.5rem)]">
          {project.title}
        </h3>

        <div className="flex min-h-0 flex-1 items-center justify-center py-[2.2vh]">
          <div className="relative aspect-[2.2/1] w-full max-w-full overflow-hidden border border-fg/25 sm:h-full sm:w-auto">
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: still ? CLIP_TO : clip, filter: still ? "none" : filter }}
            >
              <LiveFrame url={project.demo} title={project.title} />
            </motion.div>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-4 text-[0.95rem] md:grid-cols-12">
          <p className="line-clamp-3 text-fg/70 md:col-span-4 md:line-clamp-4">{project.description}</p>
          <ul className="hidden space-y-1.5 text-fg/55 md:col-span-3 md:block">
            {project.features.slice(0, 2).map((f) => (
              <li key={f} className="line-clamp-2">{f}</li>
            ))}
          </ul>
          <p className="text-fg/55 md:col-span-3">{project.technologies.join(", ")}</p>
          <div className="flex flex-wrap items-start gap-3 md:col-span-2 md:flex-col">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="pill !px-4 !py-2.5 text-sm">
                Code <Icon name="upright" size={14} />
              </a>
            )}
            <a href={project.demo} target="_blank" rel="noreferrer" className="pill pill-solid !px-4 !py-2.5 text-sm">
              Live demo <Icon name="upright" size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* the veil darkens this panel as the next one covers it */}
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
        <Panel key={p.id} project={p} index={i} count={items.length} progress={scrollYProgress} still={still} />
      ))}
    </div>
  );
}

function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
      <RollingText>{children}</RollingText>
      <Icon name="upright" size={16} />
    </a>
  );
}

/** Projects without a live frame: the title and its links, nothing else. */
function MoreProjects({ items, afterStack }) {
  return (
    <div className={`wrap pb-[clamp(72px,10vw,150px)] ${afterStack ? "pt-[clamp(56px,8vw,120px)]" : "pt-0"}`}>
      <h3 className="mb-5 text-sm text-fg/50">More projects</h3>
      <ul>
        {items.map((p) => {
          const links = [
            p.demo && { label: "Live demo", href: p.demo },
            p.github && { label: "GitHub", href: p.github },
          ].filter(Boolean);
          const title = (
            <span className="display text-[clamp(2.6rem,7vw,7.5rem)] leading-[0.95] transition-transform duration-500 ease-swift group-hover:translate-x-3">
              {p.title}
            </span>
          );
          const row = "group flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7";
          return (
            <li key={p.id} className="border-t border-fg/15">
              {links.length === 1 ? (
                // one destination: the whole row is the link
                <a href={links[0].href} target="_blank" rel="noreferrer" className={row}>
                  {title}
                  <span className="inline-flex shrink-0 items-center gap-2 text-lg">
                    <RollingText>{links[0].label}</RollingText>
                    <Icon name="upright" size={16} />
                  </span>
                </a>
              ) : (
                <div className={row}>
                  {title}
                  <span className="flex shrink-0 items-center gap-7 text-lg">
                    {links.map((l) => (
                      <ExtLink key={l.label} href={l.href}>{l.label}</ExtLink>
                    ))}
                  </span>
                </div>
              )}
            </li>
          );
        })}
        <li className="border-t border-fg/15" aria-hidden="true" />
      </ul>
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
  // A live link (with the frame switched on) gets a live frame.
  // Everything else is just its title and links.
  const live = list.filter((p) => p.demo && p.frame !== false);
  const others = list.filter((p) => !(p.demo && p.frame !== false));

  return (
    <section id="projects" data-tone="ink" className="relative z-10">
      <div className="wrap pt-[clamp(72px,10vw,150px)]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">Selected work</h2>
          <p className="max-w-[36ch] text-fg/60 md:col-span-4">
            A mix of client work and side projects — full stack apps, tools, and interfaces.
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
                className={`relative py-2 text-[0.95rem] transition-colors ${active === c ? "text-fg" : "text-fg/45 hover:text-fg"}`}
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

      {live.length > 0 && <Stack items={live} still={still} />}
      {others.length > 0 && <MoreProjects items={others} afterStack={live.length > 0} />}
    </section>
  );
}
