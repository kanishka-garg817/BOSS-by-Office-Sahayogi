/**
 * Pages that are linked from the site but have no page built at all. Pages that are built but not
 * launched yet are listed in `config/launch.ts`; both open a "coming soon" page.
 */
export type ComingSoonEntry = {
  path: `/${string}`;
  title: string;
};

export const unbuiltPages: readonly ComingSoonEntry[] = [
  { path: "/pricing", title: "Pricing" },
  { path: "/resources", title: "Resources" },
  { path: "/company", title: "About Us" },
  { path: "/compare", title: "How BoSS Compares" },
  { path: "/contact", title: "Contact Us" },
  { path: "/careers", title: "Careers" },
];
