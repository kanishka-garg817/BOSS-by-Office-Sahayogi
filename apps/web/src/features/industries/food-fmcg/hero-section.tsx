import Image from "next/image";
import { Eyebrow } from "@boss/ui";

import aislePhoto from "@/assets/photos/food-fmcg/supermarket-aisle.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { exploreModulesAction, heroContent, heroStats } from "./content";

const [challengesStat, workflowStat, fefoStat] = heroStats;

export const FmcgHero = () => (
  <section aria-labelledby="fmcg-hero-heading" className="relative overflow-hidden">
    <SectionBackdrop tone="hero" dots />
    <div className="mx-auto grid max-w-6xl items-center gap-20 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:py-28">
      <div>
        <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        <h1
          id="fmcg-hero-heading"
          className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          {heroContent.heading}
        </h1>
        <p className="mt-5 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
          {heroContent.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink action={bookDemoAction} size="lg" />
          <ButtonLink action={exploreModulesAction} variant="secondary" size="lg" />
        </div>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-surface px-4 py-2 shadow-sm">
          <span className="text-lg font-extrabold text-brand-blue">{fefoStat.value}</span>
          <span className="text-xs font-semibold text-ink/70">{fefoStat.label}</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-xl shadow-brand-navy/10">
          <Image
            src={aislePhoto}
            alt={heroContent.photoAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-4 rounded-2xl border border-ink/10 bg-surface p-4 shadow-lg lg:absolute lg:-top-6 lg:-left-16 lg:mt-0 lg:w-44">
          <dt className="text-[11px] font-bold tracking-wider text-ink/50 uppercase">
            {challengesStat.label}
          </dt>
          <dd className="mt-0.5 text-2xl font-extrabold text-brand-blue">{challengesStat.value}</dd>
        </div>

        <div className="mt-4 rounded-2xl border border-ink/10 bg-surface p-4 shadow-lg lg:absolute lg:-right-10 lg:-bottom-8 lg:mt-0 lg:w-48">
          <dt className="text-[11px] font-bold tracking-wider text-ink/50 uppercase">
            {workflowStat.label}
          </dt>
          <dd className="mt-0.5 text-2xl font-extrabold text-brand-blue">{workflowStat.value}</dd>
        </div>
      </div>
    </div>
  </section>
);
