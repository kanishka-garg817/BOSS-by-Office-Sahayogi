import {
  ArrowRight,
  CalendarDays,
  Clock,
  Receipt,
  Sparkles,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { homeFeatures } from "@/config/mobile-app";
import { bookDemoAction } from "@/config/navigation";
import { AppStoreBadge } from "@/features/mobile-app/app-store-badge";
import { PhonePreview } from "@/features/mobile-app/phone-preview";
import { PlayStoreButton } from "@/features/mobile-app/play-store-button";

const featureIcons: Record<string, LucideIcon> = {
  "check-in": Clock,
  hours: Timer,
  leave: CalendarDays,
  payslips: Wallet,
  claims: Receipt,
  assistant: Sparkles,
};

type MobileAppSectionProps = { playStoreHref: string | undefined };

/** A short introduction to the mobile app, with a way into the full page about it. */
export const MobileAppSection = ({ playStoreHref }: MobileAppSectionProps) => (
  <section aria-labelledby="home-mobile-heading" className="relative py-14 sm:py-24">
    <SectionBackdrop tone="blue" />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="text-center lg:text-left">
          <Eyebrow>Mobile App</Eyebrow>
          <h2
            id="home-mobile-heading"
            className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
          >
            Your business, right in your pocket
          </h2>
          <p className="mt-3 text-base text-pretty text-ink/70 sm:text-lg">
            Check in, apply for leave, see your payslips and raise claims, all from your phone.
          </p>

          <p className="mt-8 text-sm font-bold tracking-widest text-brand-blue uppercase">
            Download the app
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-center gap-3 lg:justify-start">
            {playStoreHref ? (
              <PlayStoreButton href={playStoreHref} />
            ) : (
              <ButtonLink action={bookDemoAction} size="lg" withArrow />
            )}
            <AppStoreBadge />
          </div>

          <p className="mt-6">
            <Link
              href="/mobile-app"
              className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Take the app tour
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </p>
        </div>

        <div aria-hidden="true" className="mx-auto w-56 sm:w-64">
          <div className="motion-safe:animate-phone-sway">
            <PhonePreview route={{ tab: "home", detail: null }} />
          </div>
        </div>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {homeFeatures.map((feature) => {
          const Icon = featureIcons[feature.id] ?? Clock;
          return (
            <li
              key={feature.id}
              className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/10"
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-blue"
              >
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{feature.title}</h3>
                <p className="mt-0.5 text-sm text-pretty text-ink/70">{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
