import "server-only";

import { env } from "@/env";

export const siteConfig = {
  name: "BoSS",
  publisher: "Office Sahayogi",
  legalName: "Sahayogi One Private Limited",
  cin: "U62010UP2024PTC205006",
  tagline: "Business Operations & System Suite",
  /** The default meta description, used wherever a page does not set its own. */
  description:
    "BoSS by Office Sahayogi connects accounting, sales, stock and payroll in one business management system. Start with one module and add more as you grow.",
  keywords: [
    "business management software",
    "all-in-one business software",
    "accounting software",
    "inventory management software",
    "payroll software",
    "sales CRM",
    "GST billing software",
    "BoSS",
    "Office Sahayogi",
  ],
  /** The language of the pages, as a BCP 47 tag for `<html lang>` and structured data. */
  locale: "en-IN",
  /** The same locale in Open Graph's form. */
  openGraphLocale: "en_IN",
  /** The browser toolbar colour on phones, matching the light and dark page backgrounds. */
  themeColor: { light: "#ffffff", dark: "#0a0f1f" },
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;

/** Where the shared preview image of every page is served from. */
export const SOCIAL_IMAGE_PATH = "/opengraph-image";

/** Absolute URL for a site-relative path ("/" or "/pricing"). */
export const absoluteUrl = (path: `/${string}`): string => new URL(path, siteConfig.url).toString();
