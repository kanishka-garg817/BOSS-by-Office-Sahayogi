import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSolution, solutions } from "@/config/solutions";
import { SolutionCard } from "@/features/solutions/solution-card";
import { SolutionCta } from "@/features/solutions/solution-cta";
import {
  SolutionBenefits,
  SolutionChallenges,
  SolutionModules,
  SolutionSolves,
} from "@/features/solutions/solution-details";
import { SolutionHero } from "@/features/solutions/solution-hero";
import { createPageMetadata } from "@/lib/seo";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

// Only the solutions defined in config exist; anything else is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => solutions.map((solution) => ({ slug: solution.slug }));

export const generateMetadata = async ({ params }: SolutionPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return createPageMetadata({
    title: solution.name,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
  });
};

const SolutionPage = async ({ params }: SolutionPageProps) => {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const otherSolutions = solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <SolutionHero solution={solution} />
      <SolutionChallenges solution={solution} />
      <SolutionSolves solution={solution} />
      <SolutionBenefits solution={solution} />
      <SolutionModules />

      <section aria-labelledby="more-solutions-heading" className="bg-surface pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="more-solutions-heading"
            className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
          >
            More ways BoSS helps
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherSolutions.map((item) => (
              <li key={item.slug}>
                <SolutionCard solution={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SolutionCta
        heading="See how BoSS fits your business"
        text="Book a demo and we’ll show you how BoSS would work for your kind of day-to-day business."
      />
    </>
  );
};

export default SolutionPage;
