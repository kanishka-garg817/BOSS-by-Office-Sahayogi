import { Check } from "lucide-react";
import Link from "next/link";

import { modules } from "@/config/modules";
import { modulePages } from "@/features/modules/module-directory-data";

import { helpTopics, helpsContent } from "./content";

const ModuleReference = ({ slug }: { slug: string }) => {
  const bossModule = modules.find((candidate) => candidate.slug === slug);
  if (!bossModule) throw new Error(`The page names a module that does not exist: ${slug}`);
  const page = modulePages.find((candidate) => candidate.slug === slug);
  if (!page) return <span className="text-sm font-semibold text-ink">{bossModule.name}</span>;
  return (
    <Link
      href={page.href}
      className="text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      {bossModule.name} →
    </Link>
  );
};

export const GarmentsHelps = () => (
  <section aria-labelledby="garments-helps-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="garments-helps-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          {helpsContent.heading}
        </h2>
        <p className="mt-3 text-base text-pretty text-ink/70">{helpsContent.text}</p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <li
              key={topic.id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <Icon className="size-5 stroke-[2]" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-ink/75 sm:text-base">
                {topic.text}
              </p>

              <ul className="mt-4 space-y-2">
                {topic.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm font-medium text-ink/85"
                  >
                    <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue">
                      <Check className="size-3 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 pt-5">
                {topic.moduleSlugs.map((slug) => (
                  <ModuleReference key={slug} slug={slug} />
                ))}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
