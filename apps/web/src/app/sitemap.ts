import type { MetadataRoute } from "next";

import { solutions } from "@/config/solutions";
import { absoluteUrl } from "@/lib/site";

// Public, indexable routes. Add a route here when its page is implemented.
const sitemap = (): MetadataRoute.Sitemap => [
  { url: absoluteUrl("/") },
  { url: absoluteUrl("/modules") },
  { url: absoluteUrl("/modules/finance-accounting") },
  { url: absoluteUrl("/modules/finance-accounting/features") },
  { url: absoluteUrl("/mobile-app") },
  ...solutions.map((solution) => ({ url: absoluteUrl(`/solutions/${solution.slug}`) })),
];

export default sitemap;
