import { challengesContent } from "./content";

export const ProfessionalServicesChallenges = () => (
  <section
    aria-labelledby="professional-services-challenges-heading"
    className="relative py-14 sm:py-20"
  >
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="professional-services-challenges-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {challengesContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {challengesContent.text}
        </p>
      </div>

      <ol className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
        {challengesContent.items.map((item, index) => (
          <li key={item.title} className="flex gap-6 py-6 sm:gap-10">
            <span
              aria-hidden="true"
              className="shrink-0 text-2xl font-black text-ink/15 tabular-nums sm:text-3xl"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg leading-snug font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink/70 sm:text-base">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
