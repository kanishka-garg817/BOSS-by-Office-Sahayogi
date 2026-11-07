import { workflowContent, workflowSteps } from "./content";

export const GarmentsWorkflow = () => (
  <section
    id="garments-process-flow"
    aria-labelledby="garments-workflow-heading"
    className="relative bg-slate-100 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="garments-workflow-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {workflowContent.heading}
        </h2>
        <p className="mx-auto mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          {workflowContent.subtitle}
        </p>
      </div>

      <ol className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="flex flex-col items-center rounded-2xl border border-ink/10 bg-surface p-4 text-center shadow-sm"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-brand-blue"
              >
                <Icon className="size-5 stroke-[2]" />
              </span>
              <h3 className="mt-3 text-xs leading-snug font-bold text-ink sm:text-sm">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-ink/60">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);
