import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EcosystemVisual } from "./ecosystem-visual";

const exploreModulesAction = { label: "Explore Modules", href: "/modules#all-modules" } as const;
const seeHowTheyConnectAction = {
  label: "See How They Connect",
  href: "/modules#module-workflows",
} as const;

/** The top of the Modules page: what BoSS modules are, and how they fit together. */
export const ModulesHero = () => (
  <section aria-labelledby="modules-heading" className="relative py-14 sm:py-20 lg:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div>
        <Eyebrow className="text-xs tracking-widest uppercase">BoSS Business Modules</Eyebrow>
        <h1
          id="modules-heading"
          className="mt-5 text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl"
        >
          Everything Your Business Needs, Connected in One Place
        </h1>
        <p className="mt-5 max-w-xl text-lg text-pretty text-ink/75">
          Connect finance, sales, operations, people, customers, and analytics through one
          integrated business platform.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink action={exploreModulesAction} size="lg" />
          <ButtonLink action={seeHowTheyConnectAction} variant="secondary" size="lg" />
        </div>
      </div>

      <EcosystemVisual />
    </div>
  </section>
);
