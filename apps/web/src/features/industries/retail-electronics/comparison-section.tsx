import { Check, Minus } from "lucide-react";

import { comparisonContent } from "./content";

export const RetailElectronicsComparison = () => (
  <section
    aria-labelledby="industry-comparison-heading"
    className="relative bg-brand-tint/60 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2
        id="industry-comparison-heading"
        className="mx-auto max-w-3xl text-center text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
      >
        {comparisonContent.heading}
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8">
          <h3 className="text-lg font-bold text-ink/70">{comparisonContent.without.title}</h3>
          <ul className="mt-5 space-y-4">
            {comparisonContent.without.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-ink/70">
                <Minus className="mt-1 size-4 shrink-0 text-ink/40" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-blue/30 bg-surface p-6 shadow-lg shadow-brand-blue/10 sm:p-8">
          <h3 className="text-lg font-bold text-brand-blue">{comparisonContent.withBoss.title}</h3>
          <ul className="mt-5 space-y-4">
            {comparisonContent.withBoss.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-ink">
                <Check className="mt-1 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
