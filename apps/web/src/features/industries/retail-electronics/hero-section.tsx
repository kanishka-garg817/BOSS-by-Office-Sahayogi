import Image from "next/image";

import storePhoto from "@/assets/photos/retail-electronics/store.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { heroContent } from "./content";

export const RetailElectronicsHero = () => (
  <section aria-labelledby="industry-hero-heading" className="relative">
    <SectionBackdrop tone="hero" />
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
      <div>
        <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        <h1
          id="industry-hero-heading"
          className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          {heroContent.heading}
        </h1>
        <p className="mt-5 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
          {heroContent.text}
        </p>
        <div className="mt-8">
          <ButtonLink action={bookDemoAction} size="lg" />
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -top-5 -right-5 -bottom-5 left-10 -z-10 rounded-[2rem] bg-brand-tint sm:-right-6 sm:-bottom-6"
        />
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-xl shadow-brand-navy/10 sm:aspect-4/3">
          <Image
            src={storePhoto}
            alt={heroContent.photoAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);
