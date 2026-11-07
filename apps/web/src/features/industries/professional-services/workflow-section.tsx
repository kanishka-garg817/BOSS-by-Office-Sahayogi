import { workflowContent, workflowStages } from "./content";

export const ProfessionalServicesWorkflow = () => (
  <section
    id="professional-services-process-flow"
    aria-labelledby="professional-services-workflow-heading"
    className="relative bg-slate-100 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="professional-services-workflow-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {workflowContent.heading}
        </h2>
        <p className="mx-auto mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {workflowContent.text}
        </p>
      </div>

      <ol className="relative mt-16 flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-0">
        {workflowStages.map((stage, index) => {
          const Icon = stage.icon;
          const isLast = index === workflowStages.length - 1;

          return (
            <li
              key={stage.title}
              className="relative flex flex-1 gap-4 sm:flex-col sm:items-center"
            >
              {isLast ? null : (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-6 h-[calc(100%+1.5rem)] w-px bg-ink/15 sm:top-6 sm:left-1/2 sm:h-px sm:w-full sm:translate-x-1/2"
                />
              )}

              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-blue bg-surface text-brand-blue shadow-sm">
                <Icon className="size-5 stroke-[2]" aria-hidden="true" />
              </span>

              <div className="sm:mt-4 sm:max-w-40 sm:text-center">
                <p className="text-xs font-bold tracking-wider text-brand-blue uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-0.5 text-base leading-snug font-bold text-ink">{stage.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-pretty text-ink/70">{stage.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);
