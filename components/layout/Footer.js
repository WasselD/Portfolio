"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RollingText from "@/components/ui/RollingText";
import Icon from "@/components/ui/Icon";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Training", href: "#training" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/WasselD" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamwasseldridi/" },
  { label: "Email", href: "mailto:wasselforbusiness@gmail.com" },
];

function FitText({ children }) {
  const box = useRef(null);
  const probe = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const fit = () => {
      if (!box.current || !probe.current) return;
      const natural = probe.current.getBoundingClientRect().width;
      if (natural > 0) setSize((box.current.clientWidth / natural) * 100 * 0.995);
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="relative w-full">
      <span
        ref={probe}
        aria-hidden="true"
        className="display invisible absolute left-0 top-0 whitespace-nowrap"
        style={{ fontSize: 100 }}
      >
        {children}
      </span>
      <span
        className="display block whitespace-nowrap leading-[0.78]"
        style={{ fontSize: size ? `${size}px` : "15vw" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["38%", "0%"]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} data-tone="ink" className="relative overflow-hidden">
      <div className="wrap pt-10">
        <div className="grid gap-12 border-t border-fg/15 pt-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <p className="max-w-[30ch] text-fg/60">
            Full-stack developer and UX/UI designer from Gobaa, Manouba, Tunisia.
          </p>
          <nav className="flex flex-col gap-1 text-sm" aria-label="Footer">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="w-fit">
                <RollingText>{l.label}</RollingText>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1 text-sm">
            <a href="/CV.pdf" download="Wassel-Dridi-CV.pdf" className="mb-2 w-fit underline underline-offset-4">Download my CV</a>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex w-fit items-center gap-1.5">
                <RollingText>{s.label}</RollingText>
                {s.href.startsWith("http") && <Icon name="upright" size={13} />}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap relative select-none pt-16" aria-hidden="true">
        <motion.div style={{ y }}>
          <FitText>Wassel Dridi</FitText>
        </motion.div>
      </div>

      <div className="wrap relative flex items-center justify-between py-6 text-sm text-fg/60">
        <span>&copy; {year} Wassel Dridi. All rights reserved.</span>
        <a href="#top" className="flex items-center gap-2 text-fg">
          <RollingText>Back to top</RollingText>
          <span className="grid h-8 w-8 place-items-center border border-fg/40">
            <Icon name="up" size={14} />
          </span>
        </a>
      </div>
    </footer>
  );
}
