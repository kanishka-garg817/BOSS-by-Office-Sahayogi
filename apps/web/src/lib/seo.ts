import "server-only";

import type { Metadata } from "next";

import { isProduction } from "@/env";

import { SOCIAL_IMAGE_PATH, siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path used for the canonical URL, e.g. "/pricing". */
  path: `/${string}`;
  /** Set for pages that must not be indexed (e.g. pages that are not ready yet). */
  noIndex?: boolean;
  /** Set when the page's title already includes the brand, so the template is not added. */
  hasFullTitle?: boolean;
};

/** The longest meta description search engines usually show in full. */
const META_DESCRIPTION_MAX_LENGTH = 155;

/** Shortens a longer text to whole sentences that fit a meta description. */
export const toMetaDescription = (text: string): string => {
  if (text.length <= META_DESCRIPTION_MAX_LENGTH) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let description = "";
  for (const sentence of sentences) {
    if ((description + sentence).trim().length > META_DESCRIPTION_MAX_LENGTH) break;
    description += sentence;
  }
  if (description.trim().length > 0) return description.trim();
  const cut = text.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

const SOCIAL_IMAGE_ALT = `${siteConfig.name} by ${siteConfig.publisher}: ${siteConfig.tagline}`;

/** Builds per-page metadata: canonical URL, Open Graph, Twitter, preview image and robots. */
export const createPageMetadata = ({
  title,
  description,
  path,
  noIndex = false,
  hasFullTitle = false,
}: PageMetadataInput): Metadata => {
  const socialTitle = hasFullTitle ? title : `${title} | ${siteConfig.name}`;
  const isIndexable = isProduction && !noIndex;
  return {
    title: hasFullTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.openGraphLocale,
      images: [{ url: SOCIAL_IMAGE_PATH, width: 1200, height: 630, alt: SOCIAL_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: SOCIAL_IMAGE_PATH, alt: SOCIAL_IMAGE_ALT }],
    },
    robots: isIndexable
      ? {
          index: true,
          follow: true,
          googleBot: { "max-image-preview": "large", "max-snippet": -1 },
        }
      : { index: false, follow: false },
  };
};
