"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data/services-testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [go]);

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-28 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What people say"
        />

        <div className="relative mt-14 glass rounded-lg2 p-10 sm:p-14 text-center overflow-hidden min-h-[280px] flex items-center">
          <Quote className="absolute top-6 left-6 text-primary/20" size={40} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <p className="text-lg sm:text-xl leading-relaxed mb-8">
                "{current.review}"
              </p>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-medium">
                {current.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="text-sm font-medium">{current.name}</p>
              <p className="text-xs text-muted">{current.company}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center hover:border-primary/60 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center hover:border-primary/60 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
