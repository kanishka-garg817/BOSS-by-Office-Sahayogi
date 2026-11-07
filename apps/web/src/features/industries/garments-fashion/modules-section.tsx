import Link from "next/link";

import { ModuleIcon } from "@/components/ui/module-icon";
import { modules } from "@/config/modules";
import { modulePages } from "@/features/modules/module-directory-data";

import { modulesContent } from "./content";

const relevantModules = modulesContent.slugs.map((slug) => {
  const bossModule = modules.find((candidate) => candidate.slug === slug);
  if (!bossModule) throw new Error(`The page names a module that does not exist: ${slug}`);
  return { bossModule, page: modulePages.find((item) => item.slug === slug) };
});

const tileClass =
  "flex min-h-11 items-center gap-3 rounded-xl border border-ink/10 bg-surface p-4 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-blue/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export const GarmentsModules = () => (
  <section aria-labelledby="garments-modules-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="garments-modules-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {modulesContent.heading}
        </h2>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {relevantModules.map(({ bossModule, page }) => (
          <li key={bossModule.slug}>
            {page ? (
              <Link href={page.href} className={tileClass}>
                <ModuleIcon module={bossModule} />
                {bossModule.name}
              </Link>
            ) : (
              <span className={tileClass}>
                <ModuleIcon module={bossModule} />
                {bossModule.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
