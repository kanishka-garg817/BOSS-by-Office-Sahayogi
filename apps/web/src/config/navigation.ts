export type NavItem = {
  label: string;
  href: `/${string}`;
  /** Items with a menu open a dropdown on click instead of navigating straight away. */
  menu?: "modules";
  /** Plain links show no dropdown arrow. */
  isPlain?: boolean;
};

export const primaryNav: readonly NavItem[] = [
  { label: "Modules", href: "/modules", menu: "modules" },
  { label: "Pricing", href: "/pricing", isPlain: true },
  { label: "Solutions", href: "/#solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export const viewAllModulesAction = {
  label: "View all modules",
  href: "/modules",
} as const satisfies NavItem;

export const bookDemoAction = {
  label: "Book a Demo",
  href: "/book-demo",
} as const satisfies NavItem;
export const exploreModulesAction = {
  label: "Explore Modules",
  href: "/modules",
} as const satisfies NavItem;

export const seeHowItWorksAction = {
  label: "See how it works",
  href: "/#solutions",
} as const satisfies NavItem;
