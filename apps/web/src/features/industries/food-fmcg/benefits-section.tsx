import { benefitsContent } from "./content";

export const FmcgBenefits = () => (
  <section aria-labelledby="fmcg-benefits-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2
          id="fmcg-benefits-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {benefitsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{benefitsContent.text}</p>
      </div>

      <dl className="mt-12 grid gap-x-12 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2">
        {benefitsContent.items.map((item) => (
          <div key={item.title}>
            <dt className="text-lg font-bold tracking-tight text-ink sm:text-xl">{item.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty text-ink/75 sm:text-base">
              {item.text}
            </dd>
            <ul className="mt-3 space-y-1.5 border-l-2 border-brand-blue/30 pl-4">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-xs leading-relaxed text-pretty text-ink/70 sm:text-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
