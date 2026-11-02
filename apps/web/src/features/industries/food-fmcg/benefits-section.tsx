import { Check } from "lucide-react";

import { benefitsContent } from "./content";

export const FmcgBenefits = () => (
  <section aria-labelledby="fmcg-benefits-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="fmcg-benefits-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {benefitsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{benefitsContent.text}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {benefitsContent.items.map((item, index) => (
          <article
            key={item.title}
            className="flex flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm transition hover:border-brand-blue/30 hover:shadow-md sm:p-8"
          >
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="text-sm font-bold tracking-wider text-brand-blue tabular-nums"
              >
                0{index + 1}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {item.title}
              </h3>
            </div>

            <p className="mt-3 text-base leading-relaxed text-ink/75 sm:text-[17px]">{item.text}</p>

            <ul className="mt-6 space-y-2.5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm font-medium text-ink/85 sm:text-base"
                >
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue">
                    <Check className="size-3 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
