import { Check } from "lucide-react";

import { benefitsContent } from "./content";

export const RetailElectronicsBenefits = () => (
  <section aria-labelledby="industry-benefits-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2
        id="industry-benefits-heading"
        className="mx-auto max-w-3xl text-center text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
      >
        {benefitsContent.heading}
      </h2>
      <ul className="mx-auto mt-10 grid max-w-4xl gap-x-12 gap-y-5 sm:grid-cols-2">
        {benefitsContent.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-base text-ink">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
