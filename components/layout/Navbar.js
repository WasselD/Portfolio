"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RollingText from "@/components/ui/RollingText";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Training", href: "#training" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
          scrolled ? "bg-black" : "mix-blend-difference"
        }`}
      >
        <div className="flex items-center justify-between px-[var(--gutter)] py-4 sm:py-5">
          <a
            href="#top"
            className="text-[0.95rem] font-semibold tracking-tight"
            aria-label="Wassel Dridi, back to top"
          >
            Wassel Dridi
          </a>

          <nav
            className="hidden items-center gap-8 text-sm lg:flex"
            aria-label="Primary"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                <RollingText>{l.label}</RollingText>
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-sm lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <RollingText>{open ? "Close" : "Menu"}</RollingText>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-black px-[var(--gutter)] pb-10 pt-28 text-white lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display border-t border-white/15 py-3 text-[clamp(2.4rem,11vw,4rem)]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { delay: 0.25 + i * 0.05, duration: 0.5 },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
