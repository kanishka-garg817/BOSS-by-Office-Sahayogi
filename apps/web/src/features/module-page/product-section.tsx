import type { ReactNode } from "react";

import { SectionBackdrop } from "@/components/ui/section-backdrop";

import { FeatureChips } from "./feature-chips";
import { SectionHeading } from "./section-heading";

type ProductSectionProps = {
  /** Also the anchor the page's sub-navigation scrolls to. */
  id: string;
  title: string;
  text: string;
  eyebrow?: string;
  /** Names of what the section covers, shown under the visual. */
  chips?: readonly string[];
  chipsLabel?: string;
  backdrop?: "slate" | "blue";
  children: ReactNode;
};

/** One section of a module page: a heading, a product visual and the features it shows. */
export const ProductSection = ({
  id,
  title,
  text,
  eyebrow,
  chips,
  chipsLabel = "Features",
  backdrop,
  children,
}: ProductSectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className="relative scroll-mt-40 py-14 sm:py-24 lg:scroll-mt-32"
  >
    {backdrop ? <SectionBackdrop tone={backdrop} /> : null}
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id={`${id}-heading`}
        title={title}
        text={text}
        {...(eyebrow ? { eyebrow } : {})}
      />
      <div className="mt-10">{children}</div>
      {chips ? (
        <div className="mt-8">
          <FeatureChips label={chipsLabel} features={chips} />
        </div>
      ) : null}
      <p className="mt-6 text-xs text-ink/50">Screens show sample data.</p>
    </div>
  </section>
);
