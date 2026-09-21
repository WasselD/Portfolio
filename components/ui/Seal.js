"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
import { formatMonthYear, yearOf } from "@/lib/format";

const TICK = "text-[0.78rem] font-medium uppercase tracking-[0.14em]";

/**
 * The certificate as a stamp made only of lines: a frame with the credential's text
 * running along its top and bottom edges (scrolling speeds it up) and the year in the middle.
 */
export default function Seal({ cert, className = "" }) {
  const items = useMemo(
    () => [cert.name, cert.organization, formatMonthYear(cert.issueDate)].filter(Boolean),
    [cert]
  );

  return (
    <div className={`relative flex aspect-[4/5] flex-col border border-fg ${className}`}>
      <Marquee items={items} speed={2.6} direction={1} className="border-b border-fg/40 py-3" itemClassName={TICK} />

      <div className="relative flex flex-1 items-center justify-center">
        {/* crosshair */}
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-fg/15" />
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-fg/15" />
        <AnimatePresence mode="wait">
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative bg-bg px-5 py-3 text-center"
          >
            <div className="display text-[clamp(3.4rem,7.2vw,7rem)]">{yearOf(cert.issueDate)}</div>
            <div className="mt-1 text-sm text-fg/60">{cert.status}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Marquee items={[...items].reverse()} speed={2.6} direction={-1} className="border-t border-fg/40 py-3" itemClassName={TICK} />
    </div>
  );
}
