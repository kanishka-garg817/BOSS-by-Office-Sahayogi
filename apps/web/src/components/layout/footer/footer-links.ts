import type { Route } from "next";

import { financePath } from "@/config/module-pages/finance-accounting";

/** A link to a page that exists, so it can use client-side navigation. */
type LiveLink = { label: string; href: Route };
/** A link to a page that is not built yet, so it stays a plain anchor like the header's. */
type PlannedLink = { label: string; href: `/${string}`; isPlanned: true };
export type FooterLink = LiveLink | PlannedLink;

export type FooterColumn = {
  heading: string;
  /** Set when the heading itself leads to a page, such as the industries directory. */
  headingHref?: Route;
  links: readonly FooterLink[];
};

export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Modules", href: "/modules" },
      { label: "Pricing", href: "/pricing", isPlanned: true },
      { label: "Solutions", href: "/#solutions", isPlanned: true },
      { label: "Mobile App", href: "/mobile-app" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "All-in-One Business Software", href: "/modules" },
      { label: "Sales & Customer Management", href: "/modules" },
      { label: "Finance & Accounting", href: financePath },
      { label: "Inventory & Warehouse", href: "/modules" },
      { label: "People & Payroll", href: "/modules" },
      { label: "Operations & Supply Chain", href: "/modules" },
    ],
  },
  {
    heading: "Industries",
    headingHref: "/industries",
    links: [
      { label: "Retail & Electronics", href: "/industries/retail-electronics" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Food & FMCG", href: "/industries/food-fmcg", isPlanned: true },
      { label: "Garments & Fashion", href: "/industries/garments-fashion", isPlanned: true },
      { label: "Education", href: "/industries/education", isPlanned: true },
      {
        label: "Professional Services",
        href: "/industries/professional-services",
        isPlanned: true,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/company", isPlanned: true },
      { label: "Resources", href: "/resources", isPlanned: true },
      { label: "Contact Us", href: "/contact", isPlanned: true },
    ],
  },
];

export const legalLinks: readonly FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
