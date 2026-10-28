import type { Route } from "next";

import { solutions } from "@/config/solutions";

/** A link to a page that exists, so it can use client-side navigation. */
type LiveLink = { label: string; href: Route };
/** A link to a page that is not built yet, so it stays a plain anchor like the header's. */
type PlannedLink = { label: string; href: `/${string}`; isPlanned: true };
/** A link to one of the solution pages, which are looked up by their slug. */
type SolutionLink = { label: string; solutionSlug: string };
export type FooterLink = LiveLink | PlannedLink | SolutionLink;

export type FooterColumn = { heading: string; links: readonly FooterLink[] };

export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Modules", href: "/modules" },
      { label: "Mobile app", href: "/mobile-app" },
      { label: "Pricing", href: "/pricing", isPlanned: true },
    ],
  },
  {
    heading: "Solutions",
    links: solutions.map((solution): FooterLink => ({
      label: solution.name,
      solutionSlug: solution.slug,
    })),
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/company", isPlanned: true },
      { label: "Resources", href: "/resources", isPlanned: true },
      { label: "Book a demo", href: "/book-demo", isPlanned: true },
    ],
  },
];
