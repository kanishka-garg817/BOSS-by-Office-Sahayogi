import "server-only";

import { socialProfiles } from "@/config/social";

import { absoluteUrl, siteConfig } from "./site";

const SCHEMA_CONTEXT = "https://schema.org";

/** The graph ids, so the pieces of the home page's data can point at one another. */
const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  software: absoluteUrl("/#software"),
  webPage: absoluteUrl("/#webpage"),
} as const;

const socialUrls = socialProfiles.flatMap((profile) => (profile.href ? [profile.href] : []));

const organization = {
  "@type": "Organization",
  "@id": ids.organization,
  name: siteConfig.publisher,
  legalName: siteConfig.legalName,
  url: absoluteUrl("/"),
  logo: { "@type": "ImageObject", url: absoluteUrl("/apple-icon"), width: 180, height: 180 },
  brand: { "@type": "Brand", name: siteConfig.name },
  identifier: { "@type": "PropertyValue", propertyID: "CIN", value: siteConfig.cin },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  ...(socialUrls.length > 0 ? { sameAs: socialUrls } : {}),
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  name: `${siteConfig.name} by ${siteConfig.publisher}`,
  alternateName: siteConfig.tagline,
  url: absoluteUrl("/"),
  inLanguage: siteConfig.locale,
  publisher: { "@id": ids.organization },
};

type SoftwareInput = {
  /** The Google Play listing, once the app is published. */
  playStoreUrl: string | undefined;
};

const softwareApplication = ({ playStoreUrl }: SoftwareInput) => ({
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: siteConfig.name,
  alternateName: siteConfig.tagline,
  description: siteConfig.description,
  url: absoluteUrl("/"),
  applicationCategory: "BusinessApplication",
  operatingSystem: playStoreUrl ? "Web, Android" : "Web",
  inLanguage: siteConfig.locale,
  publisher: { "@id": ids.organization },
  ...(playStoreUrl ? { downloadUrl: playStoreUrl } : {}),
});

type HomePageInput = SoftwareInput & { title: string; description: string };

/** The structured data of the home page: who is behind BoSS, the site, the product and the page. */
export const homeStructuredData = ({ title, description, playStoreUrl }: HomePageInput) => ({
  "@context": SCHEMA_CONTEXT,
  "@graph": [
    organization,
    website,
    softwareApplication({ playStoreUrl }),
    {
      "@type": "WebPage",
      "@id": ids.webPage,
      url: absoluteUrl("/"),
      name: title,
      description,
      inLanguage: siteConfig.locale,
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.software },
    },
  ],
});

type Crumb = { name: string; path: `/${string}` };

/** The trail from the home page to a page, for the breadcrumb line search engines show. */
export const breadcrumbStructuredData = (trail: readonly Crumb[]) => ({
  "@context": SCHEMA_CONTEXT,
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" as const }, ...trail].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});
