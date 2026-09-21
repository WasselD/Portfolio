"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import Seal from "@/components/ui/Seal";
import Icon from "@/components/ui/Icon";
import { formatMonthYear } from "@/lib/format";

function StatusDot({ status }) {
  // Monochrome state: filled = active, hollow = in progress, struck = expired
  const active = status === "Active";
  const expired = status === "Expired";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 border border-fg ${active ? "bg-fg" : ""} ${expired ? "opacity-40" : ""}`}
      />
      {status}
    </span>
  );
}

function Row({ cert, index, active, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-46% 0px -46% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className={`border-t border-fg/15 py-12 transition-opacity duration-500 lg:flex lg:min-h-[64vh] lg:flex-col lg:justify-center lg:py-16 ${
        active ? "opacity-100" : "lg:opacity-25"
      }`}
    >
      {/* below lg there is no sticky seal, so each credential carries a small one */}
      <Seal cert={cert} className="mb-8 w-44 lg:hidden" />

      <h3 className="display text-[clamp(2.2rem,4.8vw,4.6rem)]">{cert.name}</h3>
      <p className="mt-4 text-lg text-fg/75">{cert.organization}</p>
      <p className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-1 text-fg/55">
        <span>{formatMonthYear(cert.issueDate)}</span>
        <StatusDot status={cert.status} />
      </p>

      {cert.description && <p className="mt-7 max-w-[54ch] text-fg/70">{cert.description}</p>}
      {cert.credentialId && (
        <p className="mt-4 text-sm text-fg/45">Credential ID {cert.credentialId}</p>
      )}

      {cert.credentialUrl && (
        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="pill mt-8 self-start text-sm">
          Verify credential <Icon name="upright" size={14} />
        </a>
      )}
    </li>
  );
}

export default function Certifications() {
  const { certifications } = useContent();
  const [current, setCurrent] = useState(0);
  const onActive = useCallback((i) => setCurrent(i), []);
  const cert = certifications[Math.min(current, certifications.length - 1)] || certifications[0];

  return (
    <section id="certifications" data-tone="paper" className="sheet sheet-pad relative z-10">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">Credentials</h2>
          <p className="max-w-[34ch] text-fg/60 md:col-span-4">
            Verified training in security and software development.
          </p>
        </div>

        <div className="mt-[clamp(48px,7vw,110px)] grid gap-x-[clamp(32px,6vw,110px)] lg:grid-cols-[5fr_7fr]">
          {/* sticky seal: turns with the page, changes with the credential in view */}
          <div className="hidden lg:block">
            <div className="sticky top-[13vh] grid h-[74vh] place-items-center">
              {cert && <Seal cert={cert} className="w-[min(30vw,56vh)]" />}
            </div>
          </div>

          <ol className="lg:border-b lg:border-fg/15">
            {certifications.map((c, i) => (
              <Row key={c.id} cert={c} index={i} active={cert?.id === c.id} onActive={onActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
