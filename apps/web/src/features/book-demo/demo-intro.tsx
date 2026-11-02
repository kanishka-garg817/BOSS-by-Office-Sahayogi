import { type ReactNode } from "react";

import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

const NEXT_STEPS = [
  {
    title: "Tell us about your business",
    text: "Fill in the short form with your details and what you would like to see.",
  },
  {
    title: "We get in touch",
    text: "Our team contacts you to understand how your business works today.",
  },
  {
    title: "See BoSS for your business",
    text: "We walk you through the BoSS modules that fit your work, and answer your questions.",
  },
] as const;

/** The Book a Demo page: what to expect on the left, the form on the right. */
export const DemoIntro = ({ children }: { children: ReactNode }) => (
  <section aria-labelledby="book-demo-heading" className="relative py-14 sm:py-20">
    <SectionBackdrop tone="hero" />
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
      <div>
        <Eyebrow>Book a Demo</Eyebrow>
        <h1
          id="book-demo-heading"
          className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          See BoSS working for your business
        </h1>
        <p className="mt-5 max-w-xl text-base text-pretty text-ink/75 sm:text-lg">
          Tell us a little about your business. We will show you how accounting, sales, stock and
          payroll can work together in one system, starting with the modules you need.
        </p>

        <h2 className="mt-10 text-lg font-bold text-ink">What happens next</h2>
        <ol className="mt-4 space-y-5">
          {NEXT_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-pretty text-ink/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative rounded-3xl border border-ink/10 bg-surface p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
        {children}
      </div>
    </div>
  </section>
);
