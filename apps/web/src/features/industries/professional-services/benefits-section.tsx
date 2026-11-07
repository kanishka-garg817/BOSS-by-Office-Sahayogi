import { benefitsContent } from "./content";

export const ProfessionalServicesBenefits = () => (
  <section
    aria-labelledby="professional-services-benefits-heading"
    className="relative py-14 sm:py-20"
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="professional-services-benefits-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {benefitsContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{benefitsContent.text}</p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefitsContent.items.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="rounded-2xl border border-ink/10 bg-surface p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                <Icon className="size-5 stroke-[2]" aria-hidden="true" />
              </span>
              <p className="mt-4 text-base font-bold text-ink">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink/70">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
