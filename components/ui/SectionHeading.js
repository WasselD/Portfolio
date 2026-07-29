import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const isCenter = align === "center";
  return (
    <Reveal className={isCenter ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">{title}</h2>
      {description && (
        <p className="text-muted leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
