import Link from "next/link";

import { ModuleIcon } from "@/components/ui/module-icon";
import { modules } from "@/config/modules";
import { directoryEntries, modulePages } from "@/features/modules/module-directory-data";

import { modulesContent } from "./content";

const relevantModules = modulesContent.slugs.map((slug) => {
  const bossModule = modules.find((candidate) => candidate.slug === slug);
  const entry = directoryEntries.find((candidate) => candidate.slug === slug);
  if (!bossModule || !entry) {
    throw new Error(`The page names a module that does not exist: ${slug}`);
  }
  return {
    bossModule,
    summary: entry.summary,
    keywords: entry.keywords,
    page: modulePages.find((item) => item.slug === slug),
  };
});

export const ManufacturingModules = () => (
  <section
    aria-labelledby="manufacturing-modules-heading"
    className="relative bg-slate-100 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="manufacturing-modules-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          {modulesContent.heading}
        </h2>
        <p className="mt-3 text-base text-pretty text-ink/70">{modulesContent.text}</p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {relevantModules.map(({ bossModule, summary, keywords, page }) => (
          <li
            key={bossModule.slug}
            className="flex flex-col rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm"
          >
            <ModuleIcon module={bossModule} size="lg" />
            <h3 className="mt-4 text-base font-bold text-ink">{bossModule.name}</h3>
            <p className="mt-1.5 text-sm text-pretty text-ink/70">{summary}</p>
            <p className="mt-3 text-xs text-ink/60">{keywords.join(" · ")}</p>
            {page ? (
              <Link
                href={page.href}
                className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
