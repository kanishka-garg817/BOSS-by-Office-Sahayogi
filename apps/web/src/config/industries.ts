/**
 * The industries BoSS lists. An industry has an `href` only once its page exists; the rest are
 * shown without a link. The Solutions menu and the industries directory both read this list.
 */
export type Industry = {
  slug: string;
  name: string;
  href?:
    | "/industries/retail-electronics"
    | "/industries/manufacturing"
    | "/industries/food-fmcg"
    | "/industries/garments-fashion"
    | "/industries/education"
    | "/industries/professional-services";
};

export const industries: readonly Industry[] = [
  {
    slug: "retail-electronics",
    name: "Retail & Electronics",
    href: "/industries/retail-electronics",
  },
  { slug: "manufacturing", name: "Manufacturing", href: "/industries/manufacturing" },
  { slug: "food-fmcg", name: "Food & FMCG", href: "/industries/food-fmcg" },
  { slug: "garments-fashion", name: "Garments & Fashion", href: "/industries/garments-fashion" },
  { slug: "education", name: "Education", href: "/industries/education" },
  {
    slug: "professional-services",
    name: "Professional Services",
    href: "/industries/professional-services",
  },
];

export const allIndustriesAction = {
  label: "View all industries",
  href: "/industries",
} as const;
