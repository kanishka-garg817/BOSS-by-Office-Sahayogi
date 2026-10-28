import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { bookDemoAction } from "@/config/navigation";

import { AppWalkthrough } from "./app-walkthrough";
import { AppStoreBadge } from "./app-store-badge";
import { PlayStoreButton } from "./play-store-button";

type MobileAppHeroProps = { playStoreHref: string | undefined };

/** Each piece of the intro eases in a little after the one before it. */
const stagger = (step: number) => ({ animationDelay: `${String(step * 120)}ms` });

export const MobileAppHero = ({ playStoreHref }: MobileAppHeroProps) => (
  <section aria-labelledby="mobile-app-heading" className="relative overflow-hidden py-14 sm:py-24">
    <SectionBackdrop tone="hero" glows />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <AppWalkthrough
        intro={
          <div className="mx-auto max-w-2xl text-center">
            <div className="motion-safe:animate-reveal" style={stagger(0)}>
              <Eyebrow>Every screen</Eyebrow>
            </div>
            <h1
              id="mobile-app-heading"
              style={stagger(1)}
              className="mt-4 text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink motion-safe:animate-reveal sm:text-5xl"
            >
              Your work, on every screen
            </h1>
            <p
              style={stagger(2)}
              className="mt-4 text-base text-pretty text-ink/70 motion-safe:animate-reveal sm:text-lg"
            >
              Check in from your phone, then review hours and payslips on a bigger screen. One
              simple BoSS, whichever device is in your hand.
            </p>
            <div
              style={stagger(3)}
              className="mt-8 flex flex-wrap items-start justify-center gap-4 motion-safe:animate-reveal"
            >
              {playStoreHref ? (
                <PlayStoreButton href={playStoreHref} />
              ) : (
                <ButtonLink action={bookDemoAction} size="lg" withArrow />
              )}
              <AppStoreBadge />
            </div>
          </div>
        }
      />
    </div>
  </section>
);
