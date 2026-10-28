import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Solution } from "@/config/solutions";

type SolutionCardProps = { solution: Solution };

/** A compact, fully clickable card that leads to a solution's page. */
export const SolutionCard = ({ solution }: SolutionCardProps) => {
  const Icon = solution.icon;
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-navy/10">
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">
        <Link
          href={`/solutions/${solution.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          {solution.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-pretty text-ink/70">{solution.tagline}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-blue">
        Learn more
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </article>
  );
};
