"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntro } from "@/components/providers/IntroProvider";
import RollingText from "@/components/ui/RollingText";
import Icon from "@/components/ui/Icon";

const EASE = [0.7, 0, 0.2, 1];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/WasselD" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wasseldridi/" },
  { label: "Email", href: "mailto:wasselforbusiness@gmail.com" },
];

const ROLES = [
  "Full Stack Developer",
  "CompTIA Security+ Certified",
  "AI-Integrated Software Specialist",
];

// Straight gradients for smooth edge dissipation into black
const FADE_X = "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)";
const FADE_Y = "linear-gradient(to bottom, transparent 0%, #000 16%, #000 100%)";

function Rise({ children, delay = 0, ready }) {
  return (
    <span className="block" style={{ clipPath: "inset(-30% -8% 0% -8%)" }}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={ready ? { y: "0%" } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function useTunisTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Tunis",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const { done } = useIntro();
  const time = useTunisTime();

  const { scrollY } = useScroll();
  const p = useTransform(scrollY, [0, 850], [0, 1]);
  const xLeft = useTransform(p, [0, 1], ["0vw", "-16vw"]);
  const xRight = useTransform(p, [0, 1], ["0vw", "16vw"]);
  const fade = useTransform(p, [0, 0.85], [1, 0]);
  const portraitY = useTransform(p, [0, 1], ["0%", "7%"]);

  // Detect screen size to apply styles strictly for small screens (< 640px)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Small screens: moderate scale [1.35 -> 1.5]
  // Big screens (sm+): exact original scale [1.25 -> 1.4]
  const portraitScale = useTransform(
    p,
    [0, 1],
    isSmallScreen ? [1.35, 1.5] : [1.25, 1.4]
  );

  return (
    <section
      id="top"
      data-tone="ink"
      className="sticky top-0 z-0 h-[100svh] min-h-[560px] overflow-hidden bg-black"
    >
      {/* Portrait container: h-[76%] on small screens, original h-[68%] / sm:h-[68%] / lg:h-[90%] on big screens */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[76%] justify-center sm:h-[68%] lg:h-[90%]">
        <motion.div
          style={{ x: "3%", y: portraitY, scale: portraitScale, opacity: fade }}
          className="aspect-[1024/915] h-full"
        >
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={done ? { opacity: 1 } : undefined}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            {/* Combined Mask Layer onto a single element to prevent nested stacking contexts */}
            <div
              className="h-full w-full"
              style={{
                WebkitMaskImage: `${FADE_X}, ${FADE_Y}`,
                maskImage: `${FADE_X}, ${FADE_Y}`,
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Portrait of Wassel Dridi"
                className="h-full w-full object-cover"
                style={{
                  filter: "grayscale(1) contrast(1.25) brightness(1.1)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top Left Content */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute left-0 top-[5.25rem] z-10 w-[58%] px-[var(--gutter)] sm:top-[6rem] sm:w-auto sm:max-w-[36rem]"
      >
        <motion.ul
          className="text-[0.875rem] leading-snug sm:text-[0.95rem]"
          initial={{ opacity: 0, y: 14 }}
          animate={done ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          {ROLES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </motion.ul>
        <motion.p
          className="statement mt-5 max-w-[19ch] text-[clamp(1.35rem,min(2.5vw,4.6vh),2.6rem)] sm:max-w-[max(14rem,min(36ch,calc(50vw_-_19.1svh_-_var(--gutter)_-_24px)))]"
          initial={{ opacity: 0, y: 14 }}
          animate={done ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        >
          Building secure, scalable web applications with{" "}
          <span className="whitespace-nowrap">AI-driven</span> efficiency.
        </motion.p>
      </motion.div>

      {/* Top Right Content */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute right-0 top-[5.25rem] z-20 px-[var(--gutter)] text-right text-[0.9rem] sm:top-[6rem] md:text-sm"
      >
        <motion.div initial={{ opacity: 0 }} animate={done ? { opacity: 1 } : undefined}>
          <div className="hidden md:block">
            <p className="flex items-center justify-end gap-2">
              <span className="h-1.5 w-1.5 bg-white" />
              Open to new opportunities
            </p>
            <p className="mt-1 text-white/55" suppressHydrationWarning>
              Tunis {time && <span className="tabular-nums">{time}</span>}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 md:mt-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-1.5"
              >
                <RollingText>{s.label}</RollingText>
                {s.href.startsWith("http") && <Icon name="upright" size={13} />}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Title display typography with difference blend mode */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-[3.2vh]">
        <h1
          aria-label="Wassel Dridi"
          className="display text-[27vw] font-bold text-white leading-[0.8] mix-blend-difference sm:text-[min(19.5vw,40vh)]"
        >
          <motion.span className="block" style={{ x: xLeft }} aria-hidden="true">
            <Rise ready={done} delay={0.05}>Wassel</Rise>
          </motion.span>
          <motion.span className="block text-right sm:-mt-[0.38em]" style={{ x: xRight }} aria-hidden="true">
            <Rise ready={done} delay={0.2}>Dridi</Rise>
          </motion.span>
        </h1>
      </div>
    </section>
  );
}