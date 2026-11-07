import { benefitsContent } from "./content";

export const EducationBenefits = () => (
  <section aria-labelledby="education-benefits-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2
          id="education-benefits-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {benefitsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{benefitsContent.text}</p>
      </div>

      <ol className="mt-14 space-y-10 sm:space-y-12">
        {benefitsContent.items.map((text, index) => {
          const isReversed = index % 2 === 1;
          return (
            <li
              key={text}
              className={`flex items-start gap-5 ${isReversed ? "sm:flex-row-reverse sm:text-right" : ""}`}
            >
              <span
                aria-hidden="true"
                className="shrink-0 text-sm font-bold text-brand-blue tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xl leading-snug font-bold text-balance text-ink sm:text-2xl">
                {text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);
