"use client";

import { useContent } from "@/components/providers/ContentProvider";
import Icon from "@/components/ui/Icon";
import { formatMonthYear } from "@/lib/format";

function StatusDot({ status }) {
  const active = status === "Active";
  const expired = status === "Expired";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 border border-fg ${active ? "bg-fg" : ""} ${
          expired ? "opacity-40" : ""
        }`}
      />
      {status}
    </span>
  );
}

function Card({ cert, index }) {
  const topOffset = `${8 + index * 2}vh`;

  return (
    <div
      style={{ top: topOffset }}
      className="sticky w-full bg-bg py-12 transition-opacity duration-500 lg:min-h-[50vh] lg:py-16"
    >
      <h3 className="display text-[clamp(2.2rem,4.8vw,4.6rem)]">{cert.name}</h3>
      <p className="mt-4 text-lg text-fg/75">{cert.organization}</p>
      <p className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-1 text-fg/55">
        <span>{formatMonthYear(cert.issueDate)}</span>
        <StatusDot status={cert.status} />
      </p>

      {cert.description && (
        <p className="mt-7 max-w-[54ch] text-fg/70">{cert.description}</p>
      )}
      {cert.credentialId && (
        <p className="mt-4 text-sm text-fg/45">Credential ID {cert.credentialId}</p>
      )}

      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="pill mt-8 inline-flex items-center gap-2 text-sm"
        >
          Verify credential <Icon name="upright" size={14} />
        </a>
      )}
    </div>
  );
}

export default function Certifications() {
  const { certifications = [] } = useContent() || {};

  return (
    <section id="certifications" data-tone="paper" className="sheet sheet-pad relative z-10 pb-32">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">
            Credentials
          </h2>
          <p className="max-w-[34ch] text-fg/60 md:col-span-4">
            Verified training in security and software development.
          </p>
        </div>

        {certifications.length > 0 && (
          <div className="mt-[clamp(48px,7vw,110px)] relative">
            {certifications.map((c, i) => (
              <Card key={c.id || i} cert={c} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}