import { NextResponse, type NextRequest } from "next/server";

import { isLiveRoute } from "@/config/launch";

const COMING_SOON_PREFIX = "/coming-soon";

/** Shows the "coming soon" page for every address that is not live yet. */
export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (isLiveRoute(pathname)) return NextResponse.next();
  const target = request.nextUrl.clone();
  target.pathname = `${COMING_SOON_PREFIX}${pathname}`;
  return NextResponse.rewrite(target);
};

export const config = {
  // Everything except the API, Next.js internals, files with an extension (robots.txt, sitemap.xml,
  // the manifest) and the generated icons and share images.
  matcher: [
    "/((?!api|_next/static|_next/image|coming-soon|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
