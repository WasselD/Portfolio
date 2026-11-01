"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data/services";

const EASE = [0.7, 0, 0.2, 1];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" data-tone="ink" className="relative z-10 pb-[clamp(72px,10vw,150px)] pt-[clamp(40px,6vw,90px)]">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(3.2rem,7.6vw,8.5rem)]">How I can help</h2>
            <p className="mt-6 max-w-[36ch] text-fg/60">
              Available for portfolio refreshes, landing pages, and small content-focused web projects.
            </p>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className="border-t border-fg/15">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`display text-[clamp(1.9rem,3.7vw,3.5rem)] transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center border border-fg/40 transition-colors duration-300 group-hover:border-fg">
                    <span className="absolute h-px w-4 bg-fg" />
                    <motion.span
                      className="absolute h-4 w-px bg-fg"
                      animate={{ scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[50ch] pb-8 text-fg/60">{s.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
          <li className="border-t border-fg/15" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
