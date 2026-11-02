import { challengesContent } from "./content";

export const ManufacturingChallenges = () => (
  <section aria-labelledby="manufacturing-challenges-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="manufacturing-challenges-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          {challengesContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {challengesContent.text}
        </p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {challengesContent.items.map(({ title, text, icon: Icon }) => (
          <li key={title} className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-ink">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-pretty text-ink/70">{text}</p>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink/60">
        {challengesContent.note}
      </p>
    </div>
  </section>
);
