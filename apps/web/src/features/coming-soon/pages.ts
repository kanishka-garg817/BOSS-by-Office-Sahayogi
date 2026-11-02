import { unbuiltPages } from "@/config/coming-soon";
import { industries } from "@/config/industries";
import { isLiveRoute } from "@/config/launch";
import { modules } from "@/config/modules";
import { solutions } from "@/config/solutions";
import { directoryIndustries } from "@/features/industries/directory/industries-data";
import { directoryEntries } from "@/features/modules/module-directory-data";

export type ComingSoonPageInfo = {
  path: `/${string}`;
  title: string;
  /** What the page will cover, when the site already says so elsewhere. */
  summary?: string;
};

const modulePages: readonly ComingSoonPageInfo[] = modules.map((bossModule) => {
  const summary = directoryEntries.find((entry) => entry.slug === bossModule.slug)?.summary;
  return {
    path: `/modules/${bossModule.slug}`,
    title: bossModule.name,
    ...(summary ? { summary } : {}),
  };
});

const industryPages: readonly ComingSoonPageInfo[] = industries.map((industry) => {
  const summary = directoryIndustries.find((item) => item.slug === industry.slug)?.description;
  return {
    path: `/industries/${industry.slug}`,
    title: industry.name,
    ...(summary ? { summary } : {}),
  };
});

const solutionPages: readonly ComingSoonPageInfo[] = solutions.map((solution) => ({
  path: `/solutions/${solution.slug}`,
  title: solution.name,
  summary: solution.tagline,
}));

const allPages: readonly ComingSoonPageInfo[] = [
  ...unbuiltPages,
  { path: "/modules", title: "Modules" },
  ...modulePages,
  { path: "/modules/finance-accounting/features", title: "Finance & Accounting Features" },
  { path: "/mobile-app", title: "Mobile App" },
  { path: "/industries", title: "Industries" },
  ...industryPages,
  ...solutionPages,
];

/** Every page that shows "coming soon", which excludes the pages that are live. */
export const comingSoonPages: readonly ComingSoonPageInfo[] = allPages.filter(
  (page) => !isLiveRoute(page.path),
);

export const findComingSoonPage = (path: string): ComingSoonPageInfo | undefined =>
  comingSoonPages.find((page) => page.path === path);
