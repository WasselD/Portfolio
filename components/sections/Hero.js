"use client";

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


const SOCIALS = [
  { icon: Github, href: "https://github.com/WasselD", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/wasseldridi/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:wasselforbusiness@gmail.com", label: "Email" },
];

 

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

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
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
          Hi, I'm{" "}
          <span className="relative inline-block gradient-text">
            Wassel Dridi
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent rounded-full" />
          </span>
        </motion.h1>


          <motion.p
            variants={item}
            className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
          Full Stack Developer | CompTIA Security+ Certified | AI-Integrated Software Specialist
           Building secure, scalable web applications with AI-driven efficiency.
          </motion.p>



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
        className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-1 text-muted"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={16} />
      </motion.a>
    </section>
  );
}