"use client";

import { allIndustriesAction, industries } from "@/config/industries";
import { solutionCategories } from "@/config/solution-categories";
import type { NavItem } from "@/config/navigation";

import { NavDropdown } from "./nav-dropdown";

const industryLinkClass =
  "flex min-h-11 items-center rounded-lg px-2 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue";

/** Desktop "Solutions" nav item: a dropdown of the kinds of business BoSS is made for. */
export const SolutionsMenu = ({ item }: { item: NavItem }) => (
  <NavDropdown label={item.label} panelClassName="w-xl">
    {(close) => (
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-ink/60 uppercase">
            Solutions
          </p>
          <ul>
            {solutionCategories.map((category) => (
              <li key={category.label}>
                <a
                  href={category.href}
                  onClick={close}
                  className="flex min-h-11 items-center rounded-lg px-2 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-l border-ink/10 pl-3">
          <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-ink/60 uppercase">
            Industries
          </p>
          <ul>
            {industries.map((industry) => (
              <li key={industry.slug}>
                {industry.href ? (
                  <a href={industry.href} onClick={close} className={industryLinkClass}>
                    {industry.name}
                  </a>
                ) : (
                  <p className={`${industryLinkClass} text-ink/60`}>{industry.name}</p>
                )}
              </li>
            ))}
          </ul>
          <a
            href={allIndustriesAction.href}
            onClick={close}
            className="mt-1 flex min-h-11 items-center justify-between rounded-lg bg-brand-tint px-3 text-sm font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            {allIndustriesAction.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    )}
  </NavDropdown>
);
