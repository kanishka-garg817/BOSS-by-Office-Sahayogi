import Image from "next/image";

import factoryPhoto from "@/assets/photos/manufacturing/factory-floor.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { exploreBossModulesAction, heroContent } from "./content";

export const ManufacturingHero = () => (
  <section aria-labelledby="manufacturing-hero-heading" className="relative">
    <SectionBackdrop tone="hero" />
    <div className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
      <Eyebrow>{heroContent.eyebrow}</Eyebrow>
      <h1
        id="manufacturing-hero-heading"
        className="mx-auto mt-5 max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        {heroContent.heading}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
        {heroContent.text}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink action={bookDemoAction} size="lg" />
        <ButtonLink action={exploreBossModulesAction} variant="secondary" size="lg" />
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-ink/10 shadow-xl shadow-brand-navy/10 sm:aspect-[21/8]">
        <Image
          src={factoryPhoto}
          alt={heroContent.photoAlt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  </section>
);
