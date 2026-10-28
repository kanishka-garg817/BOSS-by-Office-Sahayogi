import { ButtonLink } from "@/components/ui/button-link";
import { bookDemoAction } from "@/config/navigation";
import type { Solution } from "@/config/solutions";

import { SolutionVisual } from "./solution-visual";

const otherSolutionsAction = { label: "Other solutions", href: "/#solutions" } as const;

type SolutionHeroProps = { solution: Solution };

export const SolutionHero = ({ solution }: SolutionHeroProps) => {
  return (
    <section
      aria-labelledby="solution-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-brand-tint to-canvas"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-brand-light/40 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
        <div>
          <h1
            id="solution-title"
            className="text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl"
          >
            {solution.name}
          </h1>
          <p className="mt-4 max-w-xl text-base text-pretty text-ink/75 sm:text-lg">
            {solution.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink action={bookDemoAction} size="lg" />
            <ButtonLink action={otherSolutionsAction} variant="secondary" size="lg" />
          </div>
        </div>
        <div className="rounded-3xl bg-surface/60 p-5 ring-1 ring-ink/5 sm:p-8">
          <SolutionVisual solution={solution} />
        </div>
      </div>
    </section>
  );
};
