"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Endless ticker. Base speed is constant; scrolling pushes it faster and
 * scrolling backwards reverses it. `direction` sets the resting direction.
 */
export default function Marquee({ items, speed = 4, direction = 1, className = "", itemClassName = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const dir = useRef(direction);

  // 4 copies, we loop across exactly one copy's width (25%)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -direction;
    else if (f > 0) dir.current = direction;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move * -1);
  });

  const copy = (k) => (
    <span key={k} className="flex shrink-0 items-center" aria-hidden={k > 0}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={itemClassName}>{t}</span>
          <span className="mx-[0.35em] inline-block h-[0.18em] w-[0.18em] shrink-0 bg-current opacity-60" />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden ${className}`} style={{ overflowX: "clip" }}>
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map(copy)}
      </motion.div>
    </div>
  );
}
