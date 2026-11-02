import { type ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { seeHowBossWorksAction } from "@/config/navigation";

import { problems, type Problem, type ProblemId } from "./problem-data";
import {
  ApprovalsIllustration,
  FinanceIllustration,
  InventoryIllustration,
  PayrollIllustration,
  ReportsIllustration,
  SalesIllustration,
} from "./problem-illustrations";
import { ProblemSlider } from "./problem-slider";

const illustrations = {
  sales: <SalesIllustration />,
  stock: <InventoryIllustration />,
  payroll: <PayrollIllustration />,
  accounts: <FinanceIllustration />,
  approvals: <ApprovalsIllustration />,
  reports: <ReportsIllustration />,
} as const satisfies Record<ProblemId, ReactNode>;

const formatNumber = (index: number) => String(index + 1).padStart(2, "0");

type ProblemCardProps = { problem: Problem; number: string };

const ProblemCard = ({ problem, number }: ProblemCardProps) => (
  <li className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
    <div className="bg-linear-to-b from-brand-tint to-surface px-6 pt-5">
      <div className="mx-auto aspect-4/3 max-w-56">{illustrations[problem.id]}</div>
    </div>
    <div className="flex flex-1 flex-col p-6 pt-3">
      <p className="text-xs font-semibold tracking-widest text-brand-blue uppercase">
        <span className="sr-only">Problem </span>
        {number} · {problem.area}
      </p>
      <h3 className="mt-1.5 text-xl leading-snug font-bold text-balance text-ink">
        {problem.title}
      </h3>
      <p className="mt-2 text-sm text-pretty text-ink/70">{problem.description}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Where it is done by hand">
        {problem.steps.map((step) => (
          <li
            key={step.title + step.line}
            className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-ink/75"
          >
            {step.title}
          </li>
        ))}
      </ul>
    </div>
  </li>
);

export const ProblemSection = () => (
  <section aria-labelledby="problem-heading" className="relative py-14 sm:py-20">
    <SectionBackdrop tone="slate" />
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <Eyebrow>The Problems</Eyebrow>
      <h2
        id="problem-heading"
        className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        Is Your Business Still Running on Manual Work?
      </h2>
      <p className="mt-4 text-base text-pretty text-ink/70">
        Everyday business challenges can make managing your teams, information and operations harder
        than it needs to be.
      </p>
    </div>

    <div className="mx-auto mt-12 max-w-7xl px-7 sm:px-9 lg:px-12">
      <ProblemSlider label="Business problems">
        {problems.map((problem, index) => (
          <ProblemCard key={problem.id} problem={problem} number={formatNumber(index)} />
        ))}
      </ProblemSlider>
    </div>

    <div className="mx-auto mt-12 max-w-2xl px-4 text-center sm:px-6">
      <p className="text-2xl leading-tight font-extrabold tracking-tight text-ink sm:text-3xl">
        Different Problems. One Connected Solution.
      </p>
      <p className="mt-3 text-base text-pretty text-ink/70 sm:text-lg">
        BoSS brings your business operations together.
      </p>
      <div className="mt-6 flex justify-center">
        <ButtonLink action={seeHowBossWorksAction} size="lg" withArrow />
      </div>
    </div>
  </section>
);
