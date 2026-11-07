import { challengesContent } from "./content";

export const FmcgChallenges = () => (
  <section aria-labelledby="fmcg-challenges-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2
          id="fmcg-challenges-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {challengesContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {challengesContent.text}
        </p>
      </div>

      <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
        {challengesContent.items.map(({ title, text, icon: Icon }, index) => (
          <li key={title} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex items-center gap-4 sm:w-72 sm:shrink-0">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue"
              >
                <Icon className="size-5 stroke-[2]" />
              </span>
              <h3 className="text-base leading-snug font-bold text-ink">
                <span className="sr-only">Challenge {index + 1}: </span>
                {title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-pretty text-ink/70 sm:flex-1 sm:text-base">
              {text}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-3xl text-sm text-ink/60">{challengesContent.note}</p>
    </div>
  </section>
);
