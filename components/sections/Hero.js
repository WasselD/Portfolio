"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const ROLES = ["Full Stack Developer", "Frontend Builder", "Problem Solver"];

const SOCIALS = [
  { icon: Github, href: "https://github.com/WasselD", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/wasseldridi/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:wasselforbusiness@gmail.com", label: "Email" },
];

function useTypewriter(words, typingMs = 65, pauseMs = 1500, deletingMs = 35) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }, deleting ? deletingMs : typingMs);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingMs, pauseMs, deletingMs]);

  return text;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-base-light dark:bg-base transition-colors duration-300" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          }}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-[18%] h-72 w-72 rounded-full bg-primary/30 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[18%] h-80 w-80 rounded-full bg-accent/25 blur-[120px]"
        />

        {/* Floating shapes */}
        <div className="absolute top-[22%] right-[24%] h-3 w-3 rounded-sm border border-primary/40 animate-float" />
        <div className="absolute top-[60%] left-[20%] h-4 w-4 rounded-full border border-accent/40 animate-float-slow" />
        <div className="absolute top-[38%] left-[10%] h-2 w-2 rounded-full bg-primary/50 animate-float-slow" />
        <div className="absolute bottom-[18%] right-[16%] h-6 w-6 rotate-45 border border-white/10 animate-float" />
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass glass-light dark:glass px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted">Open to new opportunities</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full glass glass-light dark:glass px-4 py-1.5">
              <ShieldCheck size={13} className="text-success" />
              <span className="text-xs text-muted">CompTIA A+ Certified</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-5"
          >
            Hi, I'm <span className="gradient-text">Wassel Dridi</span>
          </motion.h1>

          <motion.div variants={item} className="h-9 mb-5">
            <span className="text-xl sm:text-2xl text-muted font-display">
              {typed}
              <span className="inline-block w-[2px] h-6 bg-primary ml-1 align-middle animate-blink" />
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9"
          >
            I build fast, reliable web products end to end — from data
            models to pixel-perfect interfaces — with a security-first
            mindset and an eye for detail.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-9"
          >
            <a href="/resume.pdf" download className="btn-primary">
              <Download size={16} />
              Download resume
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center justify-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center
                  text-muted hover:text-ink-light dark:hover:text-ink hover:border-primary/60 hover:-translate-y-0.5
                  transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-muted"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={16} />
      </motion.a>
    </section>
  );
}