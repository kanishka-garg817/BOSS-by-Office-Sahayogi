import Image from "next/image";
import { Eyebrow } from "@boss/ui";

import educationPhoto from "@/assets/photos/industries/education.jpg";
import { MiniWindow } from "@/components/product/mini-window";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { exploreModulesAction, heroContent, heroWindows } from "./content";

const [admissions, fees, staff, communication] = heroWindows;

const HeroPhoto = () => (
  <div className="relative overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-lg shadow-brand-navy/10">
    <div aria-hidden="true" className="h-1.5 bg-brand-blue" />
    <div className="relative aspect-4/3">
      <Image
        src={educationPhoto}
        alt={heroContent.photoAlt}
        fill
        priority
        placeholder="blur"
        sizes="(min-width: 1024px) 420px, 100vw"
        className="object-cover"
      />
    </div>
  </div>
);

export const EducationHero = () => (
  <section aria-labelledby="education-hero-heading" className="relative overflow-hidden">
    <SectionBackdrop tone="hero" dots />
    <div className="mx-auto max-w-2xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
      <Eyebrow>{heroContent.eyebrow}</Eyebrow>
      <h1
        id="education-hero-heading"
        className="mx-auto mt-5 max-w-xl text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        {heroContent.heading}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
        {heroContent.text}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink action={bookDemoAction} size="lg" />
        <ButtonLink action={exploreModulesAction} variant="secondary" size="lg" />
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      {/* Desktop and up: the photo flanked by two illustrative admin windows on each side. */}
      <div className="hidden items-center justify-center gap-6 lg:flex xl:gap-10">
        <div className="flex w-56 shrink-0 flex-col gap-6 xl:w-64">
          <MiniWindow title={admissions.title} content={admissions.content} compact />
          <MiniWindow title={fees.title} content={fees.content} compact />
        </div>

        <div className="w-80 shrink-0 xl:w-96">
          <HeroPhoto />
        </div>

        <div className="flex w-56 shrink-0 flex-col gap-6 xl:w-64">
          <MiniWindow title={staff.title} content={staff.content} compact />
          <MiniWindow title={communication.title} content={communication.content} compact />
        </div>
      </div>

      {/* Below desktop: the photo on top, with the same windows in a grid underneath. */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-sm">
          <HeroPhoto />
        </div>
        <div className="mx-auto mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
          {heroWindows.map((window) => (
            <MiniWindow key={window.title} title={window.title} content={window.content} compact />
          ))}
        </div>
      </div>
    </div>
  </section>
);
