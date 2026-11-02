import { SectionBackdrop } from "@/components/ui/section-backdrop";
import type { LegalDocument } from "@/config/legal/types";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** A legal text page: the title, a contents list and the numbered sections. */
export const LegalPage = ({ document }: { document: LegalDocument }) => (
  <article aria-labelledby="legal-heading" className="relative py-14 sm:py-20">
    <SectionBackdrop tone="hero" />
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <h1
        id="legal-heading"
        className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl"
      >
        {document.title}
      </h1>
      <p className="mt-3 text-sm font-medium text-ink/70">
        Last updated:{" "}
        <time dateTime={document.updated}>{dateFormat.format(new Date(document.updated))}</time>
      </p>
      <p className="mt-5 text-base text-pretty text-ink/80 sm:text-lg">{document.intro}</p>

      <nav
        aria-label="Contents"
        className="mt-8 rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6"
      >
        <p className="text-sm font-bold tracking-widest text-brand-blue uppercase">Contents</p>
        <ol className="mt-3 columns-1 gap-8 text-sm sm:columns-2">
          {document.sections.map((section, index) => (
            <li key={section.id} className="break-inside-avoid">
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-8 items-center gap-2 text-ink/80 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span aria-hidden="true" className="text-ink/60 tabular-nums">
                  {index + 1}.
                </span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {document.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="scroll-mt-24"
          >
            <h2 id={`${section.id}-title`} className="text-xl font-bold text-ink sm:text-2xl">
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base leading-relaxed text-pretty text-ink/80">
                {paragraph}
              </p>
            ))}
            {section.items ? (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-ink/80 marker:text-brand-blue">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  </article>
);
