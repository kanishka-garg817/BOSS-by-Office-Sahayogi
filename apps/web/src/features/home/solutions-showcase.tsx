import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { solutionAnimations } from "@/config/solution-animations";
import { solutions } from "@/config/solutions";
import { SolutionAnimation } from "@/features/solutions/solution-animation";
import { SolutionVisual } from "@/features/solutions/solution-visual";

const OUTCOMES_SHOWN = 2;
const STICKY_BASE_REM = 5.5;
const STICKY_STEP_REM = 1.25;

/**
 * The homepage solutions. On large screens the cards stack: as you scroll, each card slides up
 * and settles over the one before it, leaving a thin edge of each visible.
 */
export const SolutionsShowcase = () => (
  <section
    id="solutions"
    aria-labelledby="solution-heading"
    className="relative scroll-mt-20 py-14 sm:py-24"
  >
    <SectionBackdrop tone="blue" glows />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>The Solution</Eyebrow>
        <h2
          id="solution-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          One business. One connected system.
        </h2>
        <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">
          BoSS connects your people, processes and data so your business can work as one.
        </p>
      </div>

      <ol className="mt-10 sm:mt-14">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          const animation = solutionAnimations[solution.slug];
          return (
            <li
              key={solution.slug}
              className="pb-5 lg:sticky lg:pb-10"
              style={{ top: `${String(STICKY_BASE_REM + index * STICKY_STEP_REM)}rem` }}
            >
              <article className="group grid overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-xl shadow-brand-navy/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-navy/15 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative flex flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand-blue">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold text-ink/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                    >
                      {solution.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-base text-pretty text-ink/70">{solution.tagline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {solution.solves.slice(0, OUTCOMES_SHOWN).map((item) => (
                      <li key={item.outcome} className="flex gap-2.5 text-base text-ink/80">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        {item.outcome}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-base font-semibold text-brand-blue">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="flex items-center bg-linear-to-br from-brand-tint to-slate-100 p-5 sm:p-8 lg:p-8">
                  <div className="w-full">
                    {animation ? (
                      <SolutionAnimation animation={animation} />
                    ) : (
                      <SolutionVisual solution={solution} compact />
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);
