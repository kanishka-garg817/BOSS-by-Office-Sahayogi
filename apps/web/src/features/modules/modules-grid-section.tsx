import { ModuleDirectory } from "./module-directory";

/** The "Explore Modules" button in the hero scrolls here. */
export const ALL_MODULES_ID = "all-modules";

/** Where visitors browse every module and open the ones that interest them. */
export const ModulesGridSection = () => (
  <section
    id={ALL_MODULES_ID}
    aria-labelledby="all-modules-heading"
    className="scroll-mt-24 bg-linear-to-b from-brand-tint to-canvas py-16 sm:py-20 lg:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="all-modules-heading"
        className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
      >
        Explore All Business Modules
      </h2>
      <p className="mt-4 mb-8 max-w-xl text-lg text-pretty text-ink/75">
        Choose the capabilities your business needs and explore each module in detail.
      </p>
      <ModuleDirectory />
    </div>
  </section>
);
