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
      <div className="mx-auto max-w-2xl text-center">
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

      <ol
        className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        aria-label="FMCG Operating Flow Stages"
      >
        {workflowContent.stages.map((stage, index) => {
          const Icon = stage.icon;
          const ModuleIcon = stage.moduleIcon;
          const isOptional = stage.isOptional;

          return (
            <li
              key={stage.stage}
              id={`stage-0${index + 1}`}
              className={`flex flex-col rounded-2xl border p-4 shadow-xs sm:p-5 ${
                isOptional
                  ? "border-dashed border-brand-blue/40 bg-blue-50/30"
                  : "border-slate-200/90 bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  aria-hidden="true"
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    isOptional ? "bg-blue-50/80 text-brand-blue" : "bg-blue-50 text-brand-blue"
                  }`}
                >
                  <Icon className="size-5 stroke-[2]" />
                </span>
                <span className="text-sm font-black text-ink/20 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <span
                className={`mt-3 inline-flex w-fit rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                  isOptional ? "bg-brand-blue/15 text-brand-blue" : "bg-slate-100 text-slate-500"
                }`}
              >
                {isOptional ? `${stage.stage} · Optional` : stage.stage}
              </span>

              <h3 className="mt-2 text-sm leading-snug font-bold text-ink">{stage.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink/70">{stage.text}</p>

              <div className="mt-3.5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/70 px-2 py-1 text-[11px] font-semibold text-brand-blue">
                <ModuleIcon className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{stage.module}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-pretty text-ink/60">
        {workflowContent.note}
      </p>
    </div>
  </section>
);
