import { Eyebrow } from "@boss/ui";

import { MiniWindow } from "@/components/product/mini-window";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { exploreModulesAction, heroContent, heroWindows } from "./content";

const [engagements, workTracker, invoice] = heroWindows;

export const ProfessionalServicesHero = () => (
  <section
    aria-labelledby="professional-services-hero-heading"
    className="relative overflow-hidden"
  >
    <SectionBackdrop tone="hero" dots />
    <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
      <div>
        <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        <h1
          id="professional-services-hero-heading"
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

      {/* A cascading stack of windows standing in for a firm's day-to-day admin work. */}
      <div className="relative mx-auto h-80 w-full max-w-sm sm:h-96 lg:mx-0 lg:ml-auto">
        <div className="absolute top-0 left-0 w-56 -rotate-6 sm:w-64">
          <MiniWindow title={engagements.title} content={engagements.content} compact />
        </div>
        <div className="absolute top-14 right-0 w-60 rotate-3 sm:top-16 sm:w-72">
          <MiniWindow title={workTracker.title} content={workTracker.content} compact />
        </div>
        <div className="absolute bottom-0 left-6 w-52 -rotate-2 sm:w-60">
          <MiniWindow title={invoice.title} content={invoice.content} compact />
        </div>
      </div>
    </div>
  </section>
);
