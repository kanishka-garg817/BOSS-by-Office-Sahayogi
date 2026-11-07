import Image from "next/image";

import { challengesContent } from "./content";

export const EducationChallenges = () => (
  <section aria-labelledby="education-challenges-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="education-challenges-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {challengesContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {challengesContent.text}
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {challengesContent.items.map(({ title, text, icon: Icon, photo, photoAlt }) => (
          <li
            key={title}
            className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-sm transition hover:border-brand-blue/30 hover:shadow-md"
          >
            <div className="relative aspect-4/3">
              <Image
                src={photo}
                alt={photoAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                <Icon className="size-4 stroke-[2]" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-base leading-snug font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink/70">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
