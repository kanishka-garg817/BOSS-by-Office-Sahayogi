/**
 * The pages that are built and open to visitors. A page that is not listed here shows a "coming
 * soon" page instead, so add a route here when its page is built, and leave a page out while it is
 * still to be built.
 */
export const liveRoutes: readonly `/${string}`[] = [
  "/",
  "/book-demo",
  "/mobile-app",
  "/privacy-policy",
  "/terms-of-service",
  "/modules",
  "/modules/finance-accounting",
  "/modules/finance-accounting/features",
  "/industries",
  "/industries/retail-electronics",
  "/industries/manufacturing",
  "/industries/food-fmcg",
  "/industries/fmcg",
  "/industries/garments-fashion",
  "/industries/education",
  "/industries/professional-services",
];

/**
 * Sections whose pages are all built from one list, so every address under them is open. An
 * address under one that has no page is a 404.
 */
export const liveSections: readonly `/${string}/`[] = ["/solutions/"];

const liveRouteSet: ReadonlySet<string> = new Set(liveRoutes);

/** Whether a path is open to visitors. A trailing slash is ignored. */
export const isLiveRoute = (pathname: string): boolean => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    liveRouteSet.has(normalized) || liveSections.some((section) => normalized.startsWith(section))
  );
};
