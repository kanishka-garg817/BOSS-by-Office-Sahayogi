import { ChevronRight } from "lucide-react";

import { SectionBackdrop } from "@/components/ui/section-backdrop";

import { workflowContent } from "./content";

export const FmcgWorkflow = () => (
  <section
    id="fmcg-process-flow"
    aria-labelledby="fmcg-workflow-heading"
    className="relative overflow-hidden py-16 sm:py-24"
  >
    <SectionBackdrop tone="hero" glows />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h2
          id="fmcg-workflow-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-[40px]"
        >
          {workflowContent.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-balance text-ink/70 sm:text-base">
          {workflowContent.subtitle}
        </p>
      </div>

      {/* Horizontal Connected Workflow Cards */}
      <div className="-mx-4 mt-12 scrollbar-none overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:px-0 xl:overflow-visible xl:p-0">
        <ol
          className="flex min-w-[1300px] items-stretch gap-3.5 xl:grid xl:min-w-0 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-8 2xl:gap-2.5"
          aria-label="FMCG Operating Flow Stages"
        >
          {workflowContent.stages.map((stage, index) => {
            const isLast = index === workflowContent.stages.length - 1;
            const Icon = stage.icon;
            const ModuleIcon = stage.moduleIcon;
            const isOptional = stage.isOptional;

            return (
              <li
                key={stage.stage}
                id={`stage-0${index + 1}`}
                className={`group relative flex flex-1 flex-col items-center rounded-2xl border p-4 text-center shadow-xs transition-all duration-200 hover:border-brand-blue/30 hover:shadow-md xl:min-w-0 ${
                  isOptional
                    ? "border-dashed border-brand-blue/40 bg-blue-50/30"
                    : "border-slate-200/90 bg-white"
                }`}
              >
                {/* Top Stage Icon */}
                <div
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-blue-50/80 text-brand-blue transition-colors group-hover:bg-blue-100/70"
                >
                  <Icon className="size-5 stroke-[2]" />
                </div>

                {/* Stage Pill Badge */}
                <span
                  className={`mt-2.5 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                    isOptional ? "bg-brand-blue/15 text-brand-blue" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isOptional ? `${stage.stage} · Optional` : stage.stage}
                </span>

                {/* Stage Title */}
                <h3 className="mt-2 text-sm leading-snug font-bold text-ink">
                  <span className="sr-only">Step {index + 1}: </span>
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink/70">{stage.text}</p>

                {/* Bottom Module Tag */}
                <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/70 px-2 py-1 text-[11px] font-semibold text-brand-blue">
                  <ModuleIcon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{stage.module}</span>
                </div>

                {/* Connecting Arrow (Visible between stages in flex & 2xl rows) */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 -right-2.5 z-20 hidden size-5.5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-400 text-white shadow-xs ring-2 ring-white 2xl:flex"
                  >
                    <ChevronRight className="size-3.5 stroke-[2.5]" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-pretty text-ink/60">
        {workflowContent.note}
      </p>
    </div>
  </section>
);
