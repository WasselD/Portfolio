const LANGUAGES = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Proficient" },
  { name: "French", level: "Intermediate" },
];

export default function Languages() {
  return (
    <section id="languages" data-tone="paper" className="sheet sheet-pad relative z-10">
      <div className="wrap grid gap-12 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(3.5rem,10.5vw,11.5rem)] md:col-span-7">Languages</h2>
        <ul className="md:col-span-5">
          {LANGUAGES.map((language) => (
            <li key={language.name} className="flex items-baseline justify-between gap-4 border-t border-fg/15 py-4">
              <span className="display text-[clamp(1.8rem,3.5vw,3.3rem)]">{language.name}</span>
              <span className="text-sm text-fg/55">{language.level}</span>
            </li>
          ))}
          <li className="border-t border-fg/15" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
