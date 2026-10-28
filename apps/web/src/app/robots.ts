import type { MetadataRoute } from "next";

import { isProduction } from "@/env";
import { absoluteUrl } from "@/lib/site";

const robots = (): MetadataRoute.Robots =>
  isProduction
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: absoluteUrl("/sitemap.xml"),
      }
    : // Development and staging must never be indexed.
      { rules: { userAgent: "*", disallow: "/" } };

export default robots;
