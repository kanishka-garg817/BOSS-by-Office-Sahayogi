import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { bookDemoAction } from "@/config/navigation";

type SolutionCtaProps = {
  heading: string;
  text: string;
};

/** A compact closing call to action: say it, then give the next step. */
export const SolutionCta = ({ heading, text }: SolutionCtaProps) => (
  <section aria-label="Next steps" className="bg-surface pb-14 sm:pb-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-brand-navy px-6 py-10 text-center text-white sm:px-10 sm:py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-pretty text-white/75 sm:text-base">
          {text}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink action={bookDemoAction} size="lg" />
          <Link
            href="/#solutions"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See other solutions
          </Link>
        </div>
      </div>
    </div>
  </section>
);
