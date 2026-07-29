import { Award, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CERTIFICATIONS } from "@/lib/data/certifications";

function StatusPill({ status }) {
  const styles =
    status === "Active"
      ? "bg-success/15 text-success"
      : status === "In Progress"
      ? "bg-accent/15 text-accent"
      : "bg-white/10 text-muted";
  return (
    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${styles}`}>
      {status}
    </span>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          description="CompTIA A+ certified, with security and cloud credentials in progress."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08} className="glass rounded-lg2 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award size={19} className="text-primary" />
                </div>
                <StatusPill status={cert.status} />
              </div>
              <h3 className="font-display font-medium mb-1">{cert.name}</h3>
              <p className="text-xs text-muted mb-4">
                {cert.organization} · {cert.issueDate}
              </p>
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  View credential <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs text-muted">Credential link pending</span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
