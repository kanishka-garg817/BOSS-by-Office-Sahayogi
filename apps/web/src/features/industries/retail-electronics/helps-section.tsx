import { Check } from "lucide-react";
import Link from "next/link";

import { modules } from "@/config/modules";
import { ProductShotFrame } from "@/features/module-page/product-shot";
import { modulePages } from "@/features/modules/module-directory-data";

import { helpTopics, helpsContent, type HelpTopic } from "./content";

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

const HelpRow = ({ topic, isReversed }: { topic: HelpTopic; isReversed: boolean }) => (
  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
    <div className={isReversed ? "lg:order-last" : ""}>
      <h3 className="text-2xl font-bold tracking-tight text-ink">{topic.title}</h3>
      <p className="mt-2 text-base text-pretty text-ink/70">{topic.text}</p>
      <ul className="mt-5 space-y-2">
        {topic.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-base text-ink">
            <Check className="mt-1 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
        {topic.moduleSlugs.map((slug) => (
          <ModuleReference key={slug} slug={slug} />
        ))}
      </p>
    </div>
    <ProductShotFrame shot={{ title: topic.shotTitle }} />
  </div>
);

export const RetailElectronicsHelps = () => (
  <section aria-labelledby="industry-helps-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="industry-helps-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          {helpsContent.heading}
        </h2>
        <p className="mt-3 text-base text-pretty text-ink/70">{helpsContent.text}</p>
      </div>

      <div className="mt-14 space-y-16 sm:space-y-20">
        {helpTopics.map((topic, index) => (
          <HelpRow key={topic.id} topic={topic} isReversed={index % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);
