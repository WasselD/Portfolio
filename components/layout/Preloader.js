"use client";

import { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/components/providers/IntroProvider";

const EASE = [0.7, 0, 0.2, 1];

export default function Preloader() {
  const { setDone } = useIntro();
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("wd-intro") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      setDone(true);
      return;
    }
    window.__lenis?.stop();
    const controls = animate(0, 100, {
      duration: 1.1,
      ease: [0.5, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        window.sessionStorage.setItem("wd-intro", "1");
        setShow(false);
      },
    });
    return () => controls.stop();
  }, [setDone]);

  return (
    <AnimatePresence onExitComplete={() => { window.__lenis?.start(); setDone(true); }}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-[var(--gutter)] text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <span className="text-sm text-white/60">Wassel Dridi</span>
          <div className="flex items-end justify-between">
            <span className="display text-[clamp(6rem,24vw,22rem)] tabular-nums">{count}</span>
            <span className="mb-[3vw] hidden text-sm text-white/60 sm:block">Portfolio</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/15">
            <div className="h-full bg-white" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
