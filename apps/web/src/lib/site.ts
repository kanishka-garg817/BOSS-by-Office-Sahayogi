import "server-only";

import { env } from "@/env";

export const siteConfig = {
  name: "BOSS",
  publisher: "Office Sahayogi",
  locale: "en",
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;

/** Absolute URL for a site-relative path ("/" or "/pricing"). */
export const absoluteUrl = (path: `/${string}`): string => new URL(path, siteConfig.url).toString();
