import { ArrowRight, Check, CircleAlert } from "lucide-react";
import Link from "next/link";

import type { Solution } from "@/config/solutions";

type SolutionProps = { solution: Solution };

/** Short, recognisable situations — the "yes, that's us" moment. */
export const SolutionChallenges = ({ solution }: SolutionProps) => (
  <section aria-labelledby="challenges-heading" className="bg-surface py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="challenges-heading"
        className="text-center text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
      >
        Sound familiar?
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {solution.challenges.map((challenge) => (
          <li
            key={challenge}
            className="flex reveal-on-scroll gap-3 rounded-2xl border border-ink/10 bg-slate-50 p-5"
          >
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" aria-hidden="true" />
            <p className="text-base font-medium text-ink">{challenge}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/** Each customer problem next to how BoSS solves it. */
export const SolutionSolves = ({ solution }: SolutionProps) => (
  <section
    aria-labelledby="solves-heading"
    className="bg-linear-to-b from-slate-100 via-brand-tint/70 to-canvas py-12 sm:py-16"
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2
          id="solves-heading"
          className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
        >
          How BoSS solves it
        </h2>
        <p className="mt-3 text-sm text-ink/70 sm:text-base">
          The same situation, before and after.
        </p>
      </div>
      <ul className="mt-10 space-y-5">
        {solution.solves.map((item) => (
          <li
            key={item.problem}
            className="grid reveal-on-scroll items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4"
          >
            <div className="rounded-2xl border border-ink/10 bg-surface/70 p-5">
              <p className="text-xs font-bold tracking-wide text-ink/45 uppercase">Today</p>
              <p className="mt-2 text-base text-ink/70">{item.problem}</p>
            </div>
            <span
              aria-hidden="true"
              className="flex items-center justify-center text-brand-blue md:px-1"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-blue text-white shadow-md shadow-brand-blue/30">
                <ArrowRight className="size-5 rotate-90 md:rotate-0" />
              </span>
            </span>
            <div className="rounded-2xl border border-brand-blue/25 bg-surface p-5 shadow-lg shadow-brand-navy/5">
              <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-700 uppercase">
                <Check className="size-3.5" aria-hidden="true" />
                With BoSS
              </p>
              <p className="mt-2 text-base font-medium text-ink">{item.outcome}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const SolutionBenefits = ({ solution }: SolutionProps) => (
  <section aria-labelledby="benefits-heading" className="bg-surface py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="benefits-heading"
        className="text-center text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
      >
        What you get
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {solution.benefits.map((benefit, index) => (
          <li key={benefit.title} className="reveal-on-scroll">
            <span className="text-sm font-bold text-brand-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-bold text-ink">{benefit.title}</h3>
            <p className="mt-1.5 text-base text-ink/70">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/** A pointer to the full module list, for visitors who want to see what is inside BoSS. */
export const SolutionModules = () => (
  <section aria-labelledby="inside-heading" className="bg-surface pb-12 sm:pb-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-ink/10 bg-slate-50 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2
            id="inside-heading"
            className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
          >
            Curious what is inside BoSS?
          </h2>
          <p className="mt-2 text-sm text-ink/70 sm:text-base">
            See every BoSS module, from accounting and payroll to inventory and legal.
          </p>
        </div>
        <Link
          href="/modules"
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          Explore the modules
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);
