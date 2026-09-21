import WordReveal from "@/components/ui/WordReveal";
import { VALUES } from "@/lib/data/experience";

export default function About() {
  return (
    <section id="about" data-tone="paper" className="sheet sheet-pad relative z-10">
      <div className="wrap">
        <WordReveal
          className="statement max-w-[24em] text-[clamp(2.1rem,5.4vw,5.8rem)]"
          text="I'm a full stack developer who cares as much about maintainability as I do about the first impression. I like turning ambiguous problems into small, well-tested pieces."
        />

        <div className="mt-[clamp(64px,10vw,150px)] grid gap-14 md:grid-cols-12">
          <div className="max-w-[46ch] space-y-5 text-[1.05rem] text-fg/70 md:col-span-5">
            <p>
              I got into programming by taking apart old computers, which turned into a CompTIA A+
              certification and, eventually, a career building web applications. Over the last six
              years I&apos;ve worked across design, development, and content structure — shaping
              interfaces that stay clear, fast, and easy to maintain.
            </p>
            <p>
              These days I&apos;m most interested in developer experience, performance, and building
              simple systems that help the rest of the site stay maintainable.
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
