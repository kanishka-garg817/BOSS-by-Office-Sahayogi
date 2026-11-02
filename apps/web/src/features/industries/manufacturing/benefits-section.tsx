import { Check } from "lucide-react";
import Image from "next/image";

import reviewPhoto from "@/assets/photos/manufacturing/review.jpg";

import { benefitsContent } from "./content";

/**
 * Unified Manufacturing Business Benefits Section.
 * Merged from previous clarity/outcomes sections into a single cohesive, outcome-oriented view.
 * Highlights the 4 core business benefits:
 * 1. Know What You Have
 * 2. Coordinate Purchasing and Production
 * 3. Manage Orders More Smoothly
 * 4. Review Business Performance
 */
export const ManufacturingBenefits = () => (
  <section aria-labelledby="manufacturing-benefits-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
      {/* Left Column: Sticky Title, Description & Manufacturing Image */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2
          id="manufacturing-benefits-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {benefitsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{benefitsContent.text}</p>
        <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
          <Image
            src={reviewPhoto}
            alt={benefitsContent.photoAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 440px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column: 4 Concise Benefit-Driven Blocks */}
      <div className="divide-y divide-ink/10">
        {benefitsContent.items.map((item, index) => (
          <article key={item.title} className="py-8 first:pt-0 last:pb-0">
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

            <p className="mt-2.5 text-base leading-relaxed text-ink/75 sm:text-[17px]">
              {item.text}
            </p>

            <ul className="mt-4 space-y-2.5">
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
