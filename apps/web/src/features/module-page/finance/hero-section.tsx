import { ArrowDown } from "lucide-react";

import { ScaledMock } from "../scaled-mock";
import { DashboardScreen } from "./dashboard-screen";
import { FinancePhoto } from "./finance-photo";

/** Shared by both hero buttons. Colours are set where each is used, so contrast is checked in one place. */
const buttonClass =
  "inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-base font-bold whitespace-nowrap transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Both buttons move down this page. The header already has Book a Demo, Features and Pricing. */
const seeItInActionAction = { label: "See it in action", href: "#dashboard-preview" } as const;
const whatYouCanDoAction = { label: "What you can do", href: "#capabilities" } as const;

/**
 * The top of the page: a softly blurred finance photo behind the headline and the buttons, with
 * the dashboard right below. The photo is darkened, most of all behind the words, so the white text stays readable.
 */
export const FinanceHero = () => (
  <section
    aria-labelledby="finance-hero-heading"
    className="relative isolate overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-24"
  >
    <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-136 overflow-hidden">
      <div className="absolute -inset-3">
        <FinancePhoto id="hero" isPriority sizes="100vw" className="blur-xs brightness-75" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-brand-navy/50 via-brand-navy/40 to-canvas" />
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgba(0,0,0,0.6),transparent)]" />
    </div>

    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          id="finance-hero-heading"
          className="text-4xl leading-tight font-extrabold tracking-tight text-balance text-white drop-shadow-lg motion-safe:animate-reveal sm:text-5xl"
        >
          Finance &amp; Accounting, Simplified for Your Business
        </h1>
        <p
          style={{ animationDelay: "120ms" }}
          className="mt-4 text-base text-pretty text-white drop-shadow-md motion-safe:animate-reveal sm:text-xl"
        >
          Manage accounting, invoicing, payments, taxes and financial reports in one connected
          platform.
        </p>
        <div
          style={{ animationDelay: "240ms" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-reveal"
        >
          <a
            href={seeItInActionAction.href}
            className={`${buttonClass} gap-2 bg-white text-black hover:bg-white/90`}
          >
            {seeItInActionAction.label}
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
          <a
            href={whatYouCanDoAction.href}
            className={`${buttonClass} border-2 border-white text-white hover:bg-white/15`}
          >
            {whatYouCanDoAction.label}
          </a>
        </div>
      </div>

      <div
        id="dashboard-preview"
        style={{ animationDelay: "360ms" }}
        className="mt-14 scroll-mt-40 motion-safe:animate-reveal lg:scroll-mt-32"
      >
        <ScaledMock
          label="Finance dashboard with revenue, expenses, profit, receivables, payables and recent transactions, with sample data"
          width={960}
          height={540}
        >
          <DashboardScreen />
        </ScaledMock>
        <p className="mt-3 text-center text-xs text-ink/60">Screens show sample data.</p>
      </div>
    </div>
  </section>
);
