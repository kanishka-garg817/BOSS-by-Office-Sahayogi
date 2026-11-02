import { Hammer } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { exploreModulesAction } from "@/config/navigation";

type ComingSoonPageProps = {
  /** What the page will be, e.g. "Pricing" or "Sales & CRM". */
  title: string;
  /** One line on what the page will cover, when the site already says so elsewhere. */
  summary?: string;
};

/** The page shown in place of a page that is still being built. */
export const ComingSoonPage = ({ title, summary }: ComingSoonPageProps) => (
  <section
    aria-labelledby="coming-soon-heading"
    className="relative flex min-h-[70svh] items-center py-16 sm:py-24"
  >
    <SectionBackdrop tone="hero" />
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-2xl bg-brand-tint text-brand-blue"
      >
        <Hammer className="size-8" />
      </span>
      <Eyebrow className="mt-6">Coming Soon</Eyebrow>
      <h1
        id="coming-soon-heading"
        className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl"
      >
        {title}
      </h1>
      {summary ? (
        <p className="mt-4 max-w-xl text-base text-pretty text-ink/70">{summary}</p>
      ) : null}
      <p className="mt-4 max-w-xl text-base text-pretty text-ink/70 sm:text-lg">
        This page is coming soon. We are working on it and it will be ready shortly.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-blue px-7 text-base font-semibold text-white transition-colors hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          Back to home
        </Link>
        <ButtonLink action={exploreModulesAction} variant="secondary" size="lg" />
      </div>
    </div>
  </section>
);
