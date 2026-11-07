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
  const customSummary = modulesContent.customDescriptions[slug] ?? entry.summary;
  return {
    bossModule,
    summary: customSummary,
    keywords: entry.keywords,
    page: modulePages.find((item) => item.slug === slug),
  };
});

export const FmcgModules = () => (
  <section aria-labelledby="fmcg-modules-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2
          id="fmcg-modules-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {modulesContent.heading}
        </h2>
        <p className="mt-3 text-base text-pretty text-ink/70">{modulesContent.text}</p>
      </div>

      <ul className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
        {relevantModules.map(({ bossModule, summary, keywords, page }, index) => (
          <li
            key={bossModule.slug}
            className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${
              index > 0 ? "border-t border-ink/10" : ""
            }`}
          >
            <div className="flex items-center gap-4 sm:w-72 sm:shrink-0">
              <ModuleIcon module={bossModule} size="lg" />
              <h3 className="text-base font-bold text-ink">{bossModule.name}</h3>
            </div>
            <div className="sm:flex-1">
              <p className="text-sm leading-relaxed text-pretty text-ink/70">{summary}</p>
              <p className="mt-1.5 text-xs text-ink/60">{keywords.join(" · ")}</p>
            </div>
            {page ? (
              <Link
                href={page.href}
                className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
