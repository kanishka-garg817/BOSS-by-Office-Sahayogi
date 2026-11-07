import { ArrowRight } from "lucide-react";

import {
  workflowAreasContent,
  workflowContent,
  workflowPhases,
  type WorkflowPhaseTone,
} from "./content";

const toneClass = {
  blue: "bg-blue-50 text-brand-blue",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
} as const satisfies Record<WorkflowPhaseTone, string>;

export const EducationWorkflow = () => (
  <section aria-labelledby="education-workflow-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="education-workflow-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {workflowContent.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-pretty text-ink/70 sm:text-lg">
          {workflowContent.text}
        </p>
      </div>

      <ol className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
        {workflowPhases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === workflowPhases.length - 1;

          return (
            <li key={phase.title} className="flex flex-1 items-stretch gap-3">
              <div className={`flex-1 rounded-2xl p-6 ${toneClass[phase.tone]}`}>
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-xl bg-surface/70"
                >
                  <Icon className="size-5 stroke-[2]" />
                </span>
                <h3 className="mt-4 text-base leading-snug font-bold text-ink">
                  {index + 1}. {phase.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink/70">
                  {phase.summary}
                </p>
              </div>

              {isLast ? null : (
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 self-center text-ink/30 lg:flex"
                >
                  <ArrowRight className="size-5" />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-ink/10 bg-blue-50/60 px-6 py-6 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-ink/15 lg:px-8">
        <p className="max-w-44 text-lg leading-snug font-bold text-balance text-ink lg:shrink-0 lg:pr-6">
          {workflowAreasContent.heading}
        </p>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5 sm:gap-x-2 lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-0 lg:divide-x lg:divide-ink/15 lg:pl-6">
          {workflowAreasContent.areas.map((area) => {
            const Icon = area.icon;
            return (
              <li
                key={area.label}
                className="flex flex-col items-center gap-2 text-center lg:px-4 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon aria-hidden="true" className="size-5 text-brand-blue" />
                <span className="text-sm font-semibold text-pretty text-ink">{area.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);
