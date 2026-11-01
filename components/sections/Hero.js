"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntro } from "@/components/providers/IntroProvider";
import Icon from "@/components/ui/Icon";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/WasselD" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamwasseldridi/" },
];

const FADE_X = "linear-gradient(to right, transparent 0%, #fff 22%, #fff 78%, transparent 100%)";
const FADE_Y = "linear-gradient(to bottom, transparent 0%, #fff 16%, #fff 100%)";

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
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const p = useTransform(scrollY, [0, 850], [0, 1]);
  const fade = useTransform(p, [0, 0.85], [1, 0]);
  const portraitY = useTransform(p, [0, 1], ["0%", "7%"]);
  const scrollFade = mounted ? fade : 1;

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
    checkSize();
    setMounted(true);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const portraitScale = useTransform(
    p,
    [0, 1],
    isSmallScreen ? [0.88, 0.88] : [1.25, 1.4]
  );

  return (
    <section
      id="top"
      data-tone="paper"
      className="hero-surface sticky top-0 z-0 h-[100svh] min-h-[620px] w-full overflow-hidden border-0 outline-none shadow-none"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full justify-center border-0 sm:h-[68%] lg:h-[90%]">
        <motion.div
          style={{
            x: isSmallScreen ? "0%" : "3%",
            y: portraitY,
            scale: portraitScale,
            opacity: scrollFade,
            transformOrigin: isSmallScreen ? "center bottom" : "center center",
          }}
          className="aspect-[1024/915] h-full"
        >
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={done ? { opacity: 1 } : undefined}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <div
              className="h-full w-full"
            >
              <img
                src="/hero-portrait.png"
                alt="Wassel Dridi, full-stack developer and UX/UI designer"
                className="block h-full w-full border-0 object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: scrollFade }}
        initial={{ opacity: 0, y: 14 }}
        animate={done ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
        className="absolute bottom-8 left-0 z-10 max-w-[19rem] px-[var(--gutter)] sm:bottom-12"
      >
        <a
          href="/CV.pdf"
          download="Wassel-Dridi-CV.pdf"
          className="mb-2 flex items-center gap-1.5 text-sm text-white sm:hidden"
        >
          <span>Download my CV</span>
          <Icon name="upright" size={13} />
        </a>
        <a href="#projects" className="inline-flex items-center gap-2 text-sm text-white sm:text-black">
          Explore my work <Icon name="upright" size={13} />
        </a>
      </motion.div>

      <motion.div
        style={{ opacity: scrollFade }}
        className="absolute right-0 top-[5.25rem] z-20 px-[var(--gutter)] text-right text-[0.9rem] sm:top-[6rem] md:text-sm"
      >
        <div>
          <div className="hidden md:block">
            <p className="flex items-center justify-end gap-2">Gobaa, Manouba · Tunisia</p>
            <p className="mt-1 text-black/55" suppressHydrationWarning>
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
                <span>{s.label}</span>
                {s.href.startsWith("http") && <Icon name="upright" size={13} />}
              </a>
            ))}
            <a
              href="/CV.pdf"
              download="Wassel-Dridi-CV.pdf"
              className="hidden items-center gap-1.5 sm:flex"
            >
              <span>Download my CV</span>
              <Icon name="upright" size={13} />
            </a>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
