import Link from "next/link";

import { ModuleIcon } from "@/components/ui/module-icon";
import { modules } from "@/config/modules";
import { directoryEntries, modulePages } from "@/features/modules/module-directory-data";

import { modulesContent } from "./content";

const relevantModules = modulesContent.slugs.map((slug) => {
  const bossModule = modules.find((candidate) => candidate.slug === slug);
  const entry = directoryEntries.find((candidate) => candidate.slug === slug);
  if (!bossModule || !entry)
    throw new Error(`The page names a module that does not exist: ${slug}`);
  return {
    bossModule,
    summary: entry.summary,
    page: modulePages.find((item) => item.slug === slug),
  };
});

export const RetailElectronicsModules = () => (
  <section
    aria-labelledby="industry-modules-heading"
    className="relative bg-brand-tint/60 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2
        id="industry-modules-heading"
        className="mx-auto max-w-3xl text-center text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
      >
        {modulesContent.heading}
      </h2>

      <ul className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-surface">
        {relevantModules.map(({ bossModule, summary, page }) => (
          <li key={bossModule.slug} className="flex flex-wrap items-center gap-x-5 gap-y-2 p-5">
            <ModuleIcon module={bossModule} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-ink">{bossModule.name}</p>
              <p className="text-sm text-ink/70">{summary}</p>
            </div>
            {page ? (
              <Link
                href={page.href}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Explore module →
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
