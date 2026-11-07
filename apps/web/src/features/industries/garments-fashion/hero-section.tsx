import Image from "next/image";
import { Eyebrow } from "@boss/ui";

import storePhoto from "@/assets/photos/industries/garments-fashion.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { exploreModulesAction, heroContent } from "./content";

export const GarmentsHero = () => (
  <section aria-labelledby="garments-hero-heading" className="relative overflow-hidden">
    <SectionBackdrop tone="hero" />
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.8fr] lg:gap-16 lg:px-8">
      <div>
        <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        <h1
          id="garments-hero-heading"
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
      </div>

      <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
        <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] border border-ink/10 shadow-xl shadow-brand-navy/10">
          <Image
            src={storePhoto}
            alt={heroContent.photoAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute top-6 -right-6 rotate-6 rounded-xl border border-ink/10 bg-surface px-4 py-2 shadow-lg">
          <p className="text-[10px] font-bold tracking-wider text-ink/50 uppercase">Tracked by</p>
          <p className="text-sm font-extrabold text-brand-blue">Style · Colour · Size</p>
        </div>
      </div>
    </div>
  </section>
);
