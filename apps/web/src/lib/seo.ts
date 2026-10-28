import "server-only";

import type { Metadata } from "next";

import { isProduction } from "@/env";

import { siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path used for the canonical URL, e.g. "/pricing". */
  path: `/${string}`;
  /** Set for pages that must not be indexed (e.g. authenticated areas). */
  noIndex?: boolean;
};

/** Builds per-page metadata: canonical URL, Open Graph, Twitter and robots. */
export const createPageMetadata = ({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, siteName: siteConfig.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots:
    isProduction && !noIndex ? { index: true, follow: true } : { index: false, follow: false },
});
