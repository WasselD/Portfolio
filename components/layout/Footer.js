"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/WasselD", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/wasseldridi/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:wasselforbusiness@gmail.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <a href="#top" className="font-display text-lg font-semibold tracking-tight">
              WD<span className="text-primary">.</span>
            </a>
            <p className="text-xs text-muted mt-2 max-w-xs">
              Full stack developer building fast, reliable products end to end.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-ink-light dark:hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center
                  text-muted hover:text-ink-light dark:hover:text-ink hover:border-primary/60 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-hairline">
          <p className="text-xs text-muted">
            © {year} Wassel Dridi. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-ink-light dark:hover:text-ink transition-colors"
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
