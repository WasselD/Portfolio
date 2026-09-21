"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data/services-testimonials";

const EASE = [0.7, 0, 0.2, 1];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Testimonials() {
  const ref = useRef(null);
  const n = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);

  // The section pins to the screen; scrolling advances through the quotes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999))));
  });

  if (!n) return null;
  const t = TESTIMONIALS[index];
  const words = t.review.split(" ");

  return (
    <section
      id="testimonials"
      ref={ref}
      data-tone="paper"
      className="sheet relative z-10"
      style={{ height: `${n * 78 + 30}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] flex-col justify-between pb-[clamp(24px,5vh,56px)] pt-[clamp(80px,13vh,150px)]">
        <div className="wrap w-full">
          <h2 className="display text-[clamp(2.6rem,6vw,6rem)]">Kind words</h2>
        </div>

        <div className="wrap w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              className="statement max-w-[22em] text-[clamp(1.9rem,4.4vw,4.6rem)]"
            >
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.018 }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="wrap flex w-full items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center border border-fg/50 text-sm">
                {initials(t.name)}
              </span>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-fg/55">{t.client}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress: one line per quote, the current one is long */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {TESTIMONIALS.map((_, i) => (
              <motion.span
                key={i}
                className="h-px bg-fg"
                animate={{ width: i === index ? 48 : 16, opacity: i === index ? 1 : 0.3 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
