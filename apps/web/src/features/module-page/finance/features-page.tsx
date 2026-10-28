import { Check } from "lucide-react";

import { SectionBackdrop } from "@/components/ui/section-backdrop";
import {
  capabilitiesOf,
  financeFeatureClusters,
  financeFeaturesSubnav,
} from "@/config/module-pages/finance-accounting";

import { ModuleCta } from "../module-cta";
import { ProductShotFrame } from "../product-shot";
import { ProductVideo } from "../product-video";
import { SectionHeading } from "../section-heading";
import { ModuleSubnav } from "../module-subnav";
import { FinanceFeatureMenu } from "./feature-menu";
import { financeProductShots } from "./finance-product-shots";
import { GroupVisual } from "./group-visuals";
import { financeProductVideo, financeVideoJourney } from "./finance-product-video";

/** The features page: five groups, and under each the capabilities that belong to it. */
export const FinanceFeaturesPage = () => (
  <>
    <ModuleSubnav
      moduleName="Finance & Accounting"
      items={financeFeaturesSubnav}
      featurePanel={<FinanceFeatureMenu />}
    />

    <section
      aria-labelledby="features-hero-heading"
      className="relative overflow-hidden pt-14 pb-6 sm:pt-20"
    >
      <SectionBackdrop tone="hero" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1
          id="features-hero-heading"
          className="text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl"
        >
          Finance &amp; Accounting Features
        </h1>
        <p className="mt-4 text-base text-pretty text-ink/70 sm:text-lg">
          Five groups of features, each with the capabilities inside it.
        </p>
      </div>
    </section>

    {financeFeatureClusters.map((cluster, index) => (
      <section
        key={cluster.id}
        id={cluster.id}
        aria-labelledby={`${cluster.id}-heading`}
        className="scroll-mt-40 py-16 sm:py-24 lg:scroll-mt-32"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p
              aria-hidden="true"
              className="text-6xl leading-none font-extrabold tracking-tight text-brand-blue/30 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2
              id={`${cluster.id}-heading`}
              className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink"
            >
              <span className="sr-only">Group {index + 1}: </span>
              {cluster.name}
            </h2>
            <p className="mt-3 text-base text-pretty text-ink/70">{cluster.summary}</p>
          </div>

          <div className="space-y-8">
            {financeProductShots[cluster.id]?.image ? (
              <ProductShotFrame shot={financeProductShots[cluster.id] ?? { title: cluster.name }} />
            ) : (
              <GroupVisual id={cluster.id} />
            )}
            <ul className="space-y-5">
              {capabilitiesOf(cluster).map((capability) => (
                <li
                  key={capability.id}
                  id={capability.id}
                  className="scroll-mt-40 rounded-2xl border border-ink/10 bg-surface p-6 sm:p-7 lg:scroll-mt-32"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-blue">
                      <capability.icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{capability.name}</h3>
                      <p className="mt-1 text-sm text-pretty text-ink/70 sm:text-base">
                        {capability.summary}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-x-6 gap-y-3 border-t border-ink/10 pt-5 sm:grid-cols-2 xl:grid-cols-3">
                    {capability.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm font-medium text-ink"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand-blue"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    ))}

    <section
      id="video"
      aria-labelledby="video-heading"
      className="scroll-mt-40 py-16 sm:py-24 lg:scroll-mt-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="video-heading"
          title="See Finance & Accounting in Action"
          text="Follow the journey from everyday transactions to reconciliation and financial reporting."
        />
        <div className="mt-10">
          <ProductVideo video={financeProductVideo} />
        </div>
        <ol className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-ink/60">
          {financeVideoJourney.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              {step}
              {index < financeVideoJourney.length - 1 ? <span aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>

    <ModuleCta
      title="Simplify Finance. Run Your Business Better."
      text="Bring accounting, invoicing, compliance and financial visibility together with BoSS."
    />
  </>
);
