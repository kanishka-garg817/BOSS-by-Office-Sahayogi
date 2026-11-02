import { workflowContent, workflowSteps } from "./content";

/** The six steps in order, each in its own numbered container. */
export const RetailElectronicsWorkflow = () => (
  <section
    aria-labelledby="industry-workflow-heading"
    className="relative bg-brand-tint/60 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="industry-workflow-heading"
        className="mx-auto max-w-3xl text-center text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
      >
        {workflowContent.heading}
      </h2>

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workflowSteps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg leading-snug font-bold text-ink">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-pretty text-ink/70">{step.text}</p>
            <p className="mt-auto pt-4 text-xs font-semibold text-brand-blue">
              BoSS: {step.module}
            </p>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-pretty text-ink/60">
        {workflowContent.note}
      </p>
    </div>
  </section>
);
