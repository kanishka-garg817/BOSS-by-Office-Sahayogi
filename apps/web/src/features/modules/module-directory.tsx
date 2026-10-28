"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ModuleIcon } from "@/components/ui/module-icon";
import { type BossModule, modules } from "@/config/modules";

import {
  type CategoryId,
  categories,
  directoryEntries,
  modulePages,
} from "./module-directory-data";

type Filter = CategoryId | "all";

const filters = [{ id: "all", label: "All" }, ...categories] as const;

const cardClass =
  "flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm";
const linkedCardClass =
  "group transition duration-200 hover:border-brand-blue/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-safe:hover:-translate-y-0.5";

const cards = directoryEntries.map((entry) => {
  const bossModule = modules.find((candidate) => candidate.slug === entry.slug);
  if (!bossModule)
    throw new Error(`The directory lists a module that does not exist: ${entry.slug}`);
  return { ...entry, bossModule };
});

type CardContentProps = {
  bossModule: BossModule;
  summary: string;
  keywords: readonly string[];
  isLinked: boolean;
};

const CardContent = ({ bossModule, summary, keywords, isLinked }: CardContentProps) => (
  <>
    <div className="flex items-center gap-3">
      <ModuleIcon module={bossModule} size="lg" />
      <h3 className="text-base font-semibold text-ink">{bossModule.name}</h3>
    </div>
    <p className="text-sm text-pretty text-ink/75">{summary}</p>
    <ul className="flex flex-wrap gap-1.5">
      {keywords.map((keyword) => (
        <li key={keyword} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/70">
          {keyword}
        </li>
      ))}
    </ul>
    {isLinked ? (
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-ink/70 transition-colors duration-200 group-hover:text-brand-blue">
        Explore
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    ) : (
      <span className="mt-auto pt-1 text-sm text-ink/60">Page coming soon</span>
    )}
  </>
);

/** A small category filter above a grid of every module. Cards link to a module's page once it exists. */
export const ModuleDirectory = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = cards.filter((card) => filter === "all" || card.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter modules by category" className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => {
              setFilter(item.id);
            }}
            className={`min-h-9 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${filter === item.id ? "border-brand-blue bg-brand-blue text-white" : "border-ink/15 bg-surface text-ink/75 hover:border-ink/30"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {`Showing ${String(visible.length)} modules`}
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {visible.map(({ bossModule, summary, keywords }) => {
          const page = modulePages.find((candidate) => candidate.slug === bossModule.slug);
          const content = (
            <CardContent
              bossModule={bossModule}
              summary={summary}
              keywords={keywords}
              isLinked={page !== undefined}
            />
          );
          return (
            <li key={bossModule.slug}>
              {page ? (
                <Link href={page.href} className={`${cardClass} ${linkedCardClass}`}>
                  {content}
                </Link>
              ) : (
                <div className={cardClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
