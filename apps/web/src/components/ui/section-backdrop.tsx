type BackdropTone = "hero" | "slate" | "blue";

/**
 * Each tone fades from nothing, to a soft tint, back to nothing. The layer extends past the top
 * and bottom of its section, so neighbouring sections blend into one another instead of meeting
 * at a hard line.
 */
const toneClass = {
  hero: "bg-linear-to-b from-brand-tint via-brand-tint/40 to-transparent",
  slate: "bg-linear-to-b from-transparent via-slate-100 to-transparent",
  blue: "bg-linear-to-b from-transparent via-brand-tint to-transparent",
} as const satisfies Record<BackdropTone, string>;

type SectionBackdropProps = {
  tone: BackdropTone;
  /** Adds a faint dot grid that fades out toward the bottom. */
  dots?: boolean;
  /** Soft blurred shapes of light that sit behind the section. */
  glows?: boolean;
};

/**
 * The background of a homepage section. Place it as the first child of a `relative` section inside
 * the page's stacking context (the `<main>` element), so it always paints behind every section's
 * content and never creates a visible box.
 */
export const SectionBackdrop = ({ tone, dots = false, glows = false }: SectionBackdropProps) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-x-0 -z-10 ${tone === "hero" ? "top-0 -bottom-32" : "-top-32 -bottom-32"} ${toneClass[tone]}`}
  >
    {glows ? (
      <>
        <div className="absolute top-1/4 -left-24 size-96 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 size-96 rounded-full bg-brand-light/40 blur-3xl" />
      </>
    ) : null}
    {dots ? (
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--color-ink) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 65%, transparent)",
        }}
      />
    ) : null}
  </div>
);
