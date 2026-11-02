import type { MetadataRoute } from "next";

import { liveRoutes } from "@/config/launch";
import { solutions } from "@/config/solutions";
import { absoluteUrl } from "@/lib/site";

// The pages that are built and open. A page is added by adding its route to `config/launch.ts`.
const sitemap = (): MetadataRoute.Sitemap => [
  ...liveRoutes.map((route) => ({ url: absoluteUrl(route) })),
  ...solutions.map((solution) => ({ url: absoluteUrl(`/solutions/${solution.slug}`) })),
];

export default sitemap;
