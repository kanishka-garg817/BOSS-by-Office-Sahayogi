import { Boxes, Check, FileText, ShoppingBag, Truck, type LucideIcon } from "lucide-react";

import { CardSlider } from "@/components/ui/card-slider";

import { helpsContent } from "./content";

const itemIcons: readonly LucideIcon[] = [Boxes, ShoppingBag, Truck, FileText];

export const FmcgHelps = () => (
  <section aria-labelledby="fmcg-helps-heading" className="relative bg-slate-100 py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2
          id="fmcg-helps-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {helpsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{helpsContent.text}</p>
      </div>

      <div className="mt-12">
        <CardSlider
          label={helpsContent.heading}
          previousLabel="Previous capabilities"
          nextLabel="Next capabilities"
        >
          {helpsContent.items.map((item, index) => {
            const Icon = itemIcons[index];
            return (
              <li
                key={item.title}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)]"
              >
                <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm sm:p-7">
                  {Icon ? (
                    <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                      <Icon className="size-5 stroke-[2]" aria-hidden="true" />
                    </span>
                  ) : null}
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink/75 sm:text-base">
                    {item.text}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm font-medium text-ink/85"
                      >
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue">
                          <Check className="size-3 stroke-[2.5]" aria-hidden="true" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </CardSlider>
      </div>
    </div>
  </section>
);
