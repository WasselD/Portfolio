const TRAINING = [
  {
    name: "Software Development Bootcamp",
    focus: "Full-stack development, modern frameworks, and practical AI skills",
    provider: "GoMyCode · Tunisia",
    dates: "Apr 2026 — Sep 2026",
  },
  {
    name: "Cybersecurity Bootcamp",
    focus: "Security fundamentals, networking, risk management, threat detection, and security operations",
    provider: "GoMyCode · Tunisia",
    dates: "Oct 2025 — Feb 2026",
  },
];

export default function Training() {
  return (
    <section id="training" data-tone="ink" className="sheet sheet-pad relative z-10">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-8">Training</h2>
          <p className="max-w-[34ch] text-fg/60 md:col-span-4">
            Professional training in software development and cybersecurity.
          </p>
        </div>
        <div className="mt-[clamp(48px,7vw,110px)]">
          {TRAINING.map((item) => (
            <article key={item.name} className="grid gap-4 border-t border-fg/15 py-7 md:grid-cols-12 md:gap-8">
              <p className="text-sm text-fg/55 md:col-span-3">{item.dates}</p>
              <div className="md:col-span-9">
                <h3 className="display text-[clamp(1.8rem,3.5vw,3.3rem)]">{item.name}</h3>
                <p className="mt-2 text-fg/65">{item.provider}</p>
                <p className="mt-3 max-w-[62ch] text-fg/55">{item.focus}</p>
              </div>
            </article>
          ))}
          <div className="border-t border-fg/15" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
