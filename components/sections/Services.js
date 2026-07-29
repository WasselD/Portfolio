import {
  Code2,
  LayoutTemplate,
  Server,
  Plug,
  Database,
  Gauge,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data/services-testimonials";

const ICONS = [Code2, LayoutTemplate, Server, Plug, Database, Gauge];

export default function Services() {
  return (
    <section id="services" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Available for portfolio refreshes, landing pages, and small content-focused web projects."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                key={service.title}
                delay={i * 0.06}
                className="glass rounded-card p-6 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4">
                  <Icon size={19} className="text-primary" />
                </div>
                <h3 className="font-display font-medium mb-2">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
