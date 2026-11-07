import Link from "next/link";

import { ModuleIcon } from "@/components/ui/module-icon";
import { modules } from "@/config/modules";
import { modulePages } from "@/features/modules/module-directory-data";

import { moduleCategories, moduleDescriptions, modulesContent } from "./content";

const categorisedModules = moduleCategories.map((category) => ({
  category,
  items: category.slugs.map((slug) => {
    const bossModule = modules.find((candidate) => candidate.slug === slug);
    if (!bossModule) throw new Error(`The page names a module that does not exist: ${slug}`);
    return {
      bossModule,
      description: moduleDescriptions[slug] ?? "",
      page: modulePages.find((candidate) => candidate.slug === slug),
    };
  }),
}));

export const EducationModules = () => (
  <section aria-labelledby="education-modules-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="education-modules-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {modulesContent.heading}
        </h2>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">{modulesContent.text}</p>
      </div>

      <div className="mt-14 space-y-12">
        {categorisedModules.map(({ category, items }) => (
          <div key={category.id}>
            <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
              {category.label}
            </h3>
            <p className="mt-1 text-sm text-pretty text-ink/70 sm:text-base">{category.text}</p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(({ bossModule, description, page }) => (
                <li
                  key={bossModule.slug}
                  className="flex items-start gap-3 rounded-xl border border-ink/10 bg-surface p-4 shadow-sm transition hover:border-brand-blue/30 hover:shadow-md"
                >
                  <ModuleIcon module={bossModule} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-ink">{bossModule.name}</p>
                    <p className="mt-0.5 text-sm text-pretty text-ink/70">{description}</p>
                    {page ? (
                      <Link
                        href={page.href}
                        className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        Explore module →
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
