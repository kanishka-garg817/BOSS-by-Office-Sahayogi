import { ModuleWorkflows } from "./module-workflows";

/** Shows, through four everyday examples, how modules can be used together. */
export const ModuleWorkflowsSection = () => (
  <section
    id="module-workflows"
    aria-labelledby="module-workflows-heading"
    className="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="module-workflows-heading"
        className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
      >
        See How Your Business Works Together
      </h2>
      <p className="mt-4 mb-8 max-w-2xl text-lg text-pretty text-ink/75">
        From your first customer order to the final financial report, BoSS connects the work
        happening across your business.
      </p>
      <ModuleWorkflows />
    </div>
  </section>
);
