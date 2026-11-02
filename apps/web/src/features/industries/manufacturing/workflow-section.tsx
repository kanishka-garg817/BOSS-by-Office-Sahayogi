import { ChevronRight } from "lucide-react";

import { SectionBackdrop } from "@/components/ui/section-backdrop";

import { workflowContent } from "./content";

/**
 * Manufacturing Process Flow section.
 * Shows the 6 key stages of a manufacturing business flow connected sequentially.
 * Built for optimal SEO, AEO (semantic schema & machine-readable hierarchy), and responsive UX.
 */
export const ManufacturingWorkflow = () => (
  <section
    id="manufacturing-process-flow"
    aria-labelledby="manufacturing-workflow-heading"
    className="relative overflow-hidden py-16 sm:py-24"
  >
    <SectionBackdrop tone="hero" glows />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header with Heading and Subtitle */}
      <div className="text-center">
        <h2
          id="manufacturing-workflow-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-[42px]"
        >
          {workflowContent.heading}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-balance text-ink/70 sm:text-base">
          {workflowContent.subtitle}
        </p>
      </div>

      {/* Process Flow Cards with Connecting Arrows */}
      <div className="-mx-4 mt-12 scrollbar-none overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:px-0 xl:overflow-visible xl:p-0">
        <ol
          className="flex min-w-[1080px] items-stretch gap-3.5 xl:grid xl:min-w-0 xl:grid-cols-6 xl:gap-3"
          aria-label="Manufacturing Process Flow Stages"
        >
          {workflowContent.stages.map((stage, index) => {
            const isLast = index === workflowContent.stages.length - 1;
            const Icon = stage.icon;
            const ModuleIcon = stage.moduleIcon;

            return (
              <li
                key={stage.stage}
                id={`stage-0${index + 1}`}
                className="group relative flex flex-1 flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-200 hover:border-brand-blue/30 hover:shadow-md xl:min-w-0"
              >
                {/* Top Stage Icon */}
                <div
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-blue-50/80 text-brand-blue transition-colors group-hover:bg-blue-100/70"
                >
                  <Icon className="size-5 stroke-[2]" />
                </div>

                {/* Stage Pill Badge */}
                <span className="mt-3 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {stage.stage}
                </span>

                {/* Stage Title */}
                <h3 className="mt-2 text-base leading-snug font-bold text-ink">
                  <span className="sr-only">Step {index + 1}: </span>
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink/70">{stage.text}</p>

                {/* Bottom Module Tag */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/70 px-2.5 py-1 text-[11px] font-semibold text-brand-blue">
                  <ModuleIcon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{stage.module}</span>
                </div>

                {/* Connecting Right Arrow Between Stages */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 z-20 flex size-6.5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-400 text-white shadow-xs ring-4 ring-white"
                  >
                    <ChevronRight className="size-4 stroke-[2.5]" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  </section>
);
