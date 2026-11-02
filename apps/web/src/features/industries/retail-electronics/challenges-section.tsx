import Image from "next/image";

import marketPhoto from "@/assets/photos/retail-electronics/market.jpg";
import { MiniWindow } from "@/components/product/mini-window";

import { challengeExamples, challengesContent } from "./content";

export const RetailElectronicsChallenges = () => (
  <section aria-labelledby="industry-challenges-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2
            id="industry-challenges-heading"
            className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
          >
            {challengesContent.heading}
          </h2>
          <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={marketPhoto}
              alt={challengesContent.photoAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {challengesContent.topics.map((topic, index) => (
            <li key={topic.title} className="flex gap-5 py-6">
              <span
                aria-hidden="true"
                className="w-8 shrink-0 text-lg font-semibold text-brand-blue tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{topic.title}</h3>
                <p className="mt-1.5 text-base text-pretty text-ink/70">{topic.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 rounded-3xl bg-brand-tint p-6 sm:p-8">
        <p className="text-center text-sm font-semibold text-ink/60">
          {challengesContent.examplesCaption}
        </p>
        <div className="mx-auto mt-5 grid max-w-3xl gap-5 sm:grid-cols-2">
          {challengeExamples.map((example) => (
            <div key={example.title}>
              <MiniWindow title={example.title} content={example.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
