/**
 * The industries BoSS lists. An industry has an `href` only once its page exists; the rest are
 * shown without a link. The Solutions menu and the industries directory both read this list.
 */
export type Industry = {
  slug: string;
  name: string;
  href?: "/industries/retail-electronics" | "/industries/manufacturing" | "/industries/food-fmcg";
};

export const industries: readonly Industry[] = [
  {
    slug: "retail-electronics",
    name: "Retail & Electronics",
    href: "/industries/retail-electronics",
  },
  { slug: "manufacturing", name: "Manufacturing", href: "/industries/manufacturing" },
  { slug: "food-fmcg", name: "Food & FMCG", href: "/industries/food-fmcg" },
  { slug: "garments-fashion", name: "Garments & Fashion" },
  { slug: "education", name: "Education" },
  { slug: "professional-services", name: "Professional Services" },
];

export const allIndustriesAction = {
  label: "View all industries",
  href: "/industries",
} as const;
