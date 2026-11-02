import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/features/coming-soon/coming-soon-page";
import { comingSoonPages, findComingSoonPage } from "@/features/coming-soon/pages";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ path: string[] }> };

// Visitors reach this page through the proxy, which sends every address that is not live here.
// Only the addresses the site knows about are valid; any other address is a 404.
export const dynamicParams = false;

export const generateStaticParams = () =>
  comingSoonPages.map((page) => ({ path: page.path.split("/").slice(1) }));

const pathOf = (segments: readonly string[]) => `/${segments.join("/")}`;

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { path } = await params;
  const page = findComingSoonPage(pathOf(path));
  if (!page) return {};
  return createPageMetadata({
    title: `${page.title} (Coming Soon)`,
    description: `${page.title} is coming soon to BoSS.`,
    path: page.path,
    noIndex: true,
  });
};

const ComingSoonRoute = async ({ params }: PageProps) => {
  const { path } = await params;
  const page = findComingSoonPage(pathOf(path));
  if (!page) notFound();
  return page.summary ? (
    <ComingSoonPage title={page.title} summary={page.summary} />
  ) : (
    <ComingSoonPage title={page.title} />
  );
};

export default ComingSoonRoute;
