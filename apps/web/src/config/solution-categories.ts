import type { NavItem } from "@/config/navigation";

/**
 * The kinds of business shown in the Solutions menu, in display order. Each one has its own page
 * planned; until those exist they all open the Solutions section of the home page. Change an
 * `href` here to connect its page.
 */
export const solutionCategories: readonly NavItem[] = [
  { label: "Trading & Distribution Businesses", href: "/#solutions" },
  { label: "Retail Businesses", href: "/#solutions" },
  { label: "Manufacturing Businesses", href: "/#solutions" },
  { label: "Service-Based Businesses", href: "/#solutions" },
  { label: "Growing & Multi-Branch Businesses", href: "/#solutions" },
];
