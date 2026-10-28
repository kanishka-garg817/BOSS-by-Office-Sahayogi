import { Hand, Layers, Split, type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

import { ProblemExplorer } from "./problem-explorer";

const PAIN_POINTS: readonly { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Too many tools",
    description: "Sales in one app, accounts in another, stock in a spreadsheet.",
    icon: Layers,
  },
  {
    title: "Scattered data",
    description:
      "The same customer, order or amount saved in different places, and never matching.",
    icon: Split,
  },
  {
    title: "Too much manual work",
    description: "Re-typing, copying and cross-checking take hours every week.",
    icon: Hand,
  },
];

export const ProblemSection = () => (
  <section aria-labelledby="problem-heading" className="relative py-12 sm:py-20">
    <SectionBackdrop tone="slate" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow>The Problem</Eyebrow>
        <h2
          id="problem-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          Your business is growing. But your systems aren’t connected.
        </h2>
        <ul className="mt-6 grid gap-4 text-left sm:grid-cols-3 sm:gap-6">
          {PAIN_POINTS.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex gap-3 sm:flex-col sm:items-center sm:text-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-blue">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-bold text-ink">{title}</p>
                <p className="mt-1 text-sm text-pretty text-ink/65">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 sm:mt-10">
        <ProblemExplorer />
      </div>
    </div>
  </section>
);
