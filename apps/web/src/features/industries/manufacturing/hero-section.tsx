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
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
      <div>
        <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        <h1
          id="manufacturing-hero-heading"
          className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          {heroContent.heading}
        </h1>
        <p className="mt-5 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
          {heroContent.text}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink action={bookDemoAction} size="lg" />
          <ButtonLink action={exploreBossModulesAction} variant="secondary" size="lg" />
        </div>
      </div>

      <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-ink/10 shadow-xl shadow-brand-navy/10">
        <Image
          src={factoryPhoto}
          alt={heroContent.photoAlt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  </section>
);
