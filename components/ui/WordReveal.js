"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }} className="inline-block">
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Words light up one by one as the paragraph travels through the viewport. */
export default function WordReveal({ text, className = "" }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still}>
          {w}
        </Word>
      ))}
    </p>
  );
}
