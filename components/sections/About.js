import WordReveal from "@/components/ui/WordReveal";
import { VALUES } from "@/lib/data/experience";

export default function About() {
  return (
    <section id="about" data-tone="paper" className="sheet sheet-pad relative z-10">
      <div className="wrap">
        <WordReveal
          className="statement max-w-[24em] text-[clamp(2.1rem,5.4vw,5.8rem)]"
          text="I build thoughtful web experiences, shape clear interfaces, and bring practical AI tools into the work."
        />

        <div className="mt-[clamp(64px,10vw,150px)] grid gap-14 md:grid-cols-12">
          <div className="max-w-[46ch] space-y-5 text-[1.05rem] text-fg/70 md:col-span-5">
            <p>
              I&apos;m a full-stack developer and UX/UI designer from Gobaa, Manouba. My experience
              includes freelance web projects, a developer role at Styly, social media management,
              and managing day-to-day operations at GOLD GYM.
            </p>
            <p>
              I&apos;ve trained in software development and cybersecurity, and I enjoy combining
              user-friendly design with practical AI tools and clear communication.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="mb-5 text-sm text-fg/50">What I value</h3>
            <ul>
              {VALUES.map((v) => (
                <li key={v.title} className="border-t border-fg/15 py-6">
                  <p className="display text-[clamp(1.9rem,3.2vw,3rem)]">{v.title}</p>
                  <p className="mt-2 max-w-[44ch] text-fg/60">{v.detail}</p>
                </li>
              ))}
              <li className="border-t border-fg/15" aria-hidden="true" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
