import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  financeFeatureGroups,
  financeFeaturesPath,
} from "@/config/module-pages/finance-accounting";

/** The panel under "Features": the main capabilities, with a way into the page that explains them. */
export const FinanceFeatureMenu = () => (
  <div>
    <ul className="grid grid-cols-3 gap-x-2 gap-y-0.5">
      {financeFeatureGroups.map((group) => (
        <li key={group.id}>
          <Link
            href={`${financeFeaturesPath}#${group.id}`}
            className="flex items-center gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-blue">
              <group.icon aria-hidden="true" className="size-4" />
            </span>
            <span className="text-sm leading-tight font-semibold text-ink">{group.name}</span>
          </Link>
        </li>
      ))}
    </ul>
    <Link
      href={financeFeaturesPath}
      className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-tint text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-light/50 focus-visible:outline-2 focus-visible:outline-brand-blue"
    >
      See all features
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  </div>
);
