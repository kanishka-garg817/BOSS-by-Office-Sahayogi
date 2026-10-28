import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { exploreModulesAction, seeHowItWorksAction } from "@/config/navigation";

import { ProductDashboard } from "./product-dashboard/product-dashboard";
import { TypewriterText } from "./typewriter-text";

const HEADING_SEGMENTS = [
  { text: "Your whole business," },
  { text: "working as one.", highlight: true, breakBefore: true },
] as const;

const HEADING_TEXT = HEADING_SEGMENTS.map((segment) => segment.text.trim()).join(" ");

export const HeroSection = () => (
  <section aria-labelledby="hero-heading" className="relative">
    <SectionBackdrop tone="hero" />
    <div
      aria-hidden="true"
      className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-brand-light/40 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="absolute top-40 -left-24 -z-10 size-80 rounded-full bg-brand-blue/10 blur-3xl"
    />

    <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-14 pb-14 text-center sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20">
      <Eyebrow className="motion-safe:animate-reveal">
        BoSS · Business Operations & System Suite
      </Eyebrow>

      <h1
        id="hero-heading"
        aria-label={HEADING_TEXT}
        className="mt-6 max-w-6xl text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
      >
        <TypewriterText segments={HEADING_SEGMENTS} />
      </h1>

      <p
        className="mt-5 max-w-2xl text-base text-pretty text-ink/75 motion-safe:animate-reveal sm:text-lg"
        style={{ animationDelay: "500ms" }}
      >
        BoSS connects your accounting, sales, stock and people in one easy place. Start with one
        module and add more anytime.
      </p>

      <div
        className="mt-10 flex w-full flex-col gap-3 motion-safe:animate-reveal sm:w-auto sm:flex-row sm:gap-4"
        style={{ animationDelay: "700ms" }}
      >
        <ButtonLink action={exploreModulesAction} size="lg" withArrow />
        <ButtonLink action={seeHowItWorksAction} variant="secondary" size="lg" />
      </div>

      <div
        className="mt-10 w-full motion-safe:animate-reveal sm:mt-12"
        style={{ animationDelay: "900ms" }}
      >
        <ProductDashboard />
      </div>
    </div>
  </section>
);
