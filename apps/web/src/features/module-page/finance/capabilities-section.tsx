import {
  capabilitiesOf,
  financeFeatureClusters,
  financeFeaturesPath,
} from "@/config/module-pages/finance-accounting";

import { SectionHeading } from "../section-heading";
import { ClusterIllustration } from "./cluster-illustrations";
import { GroupCarousel, type CarouselGroup } from "./group-carousel";

const groups: readonly CarouselGroup[] = financeFeatureClusters.map((cluster) => ({
  id: cluster.id,
  name: cluster.name,
  summary: cluster.summary,
  illustration: <ClusterIllustration id={cluster.id} />,
  capabilities: capabilitiesOf(cluster).map(({ id, name }) => ({ id, name })),
}));

/** The five feature groups in one row, with arrows to move on to the next cards. */
export const CapabilitiesSection = () => (
  <section
    id="capabilities"
    aria-labelledby="capabilities-heading"
    className="relative scroll-mt-40 py-14 sm:py-24 lg:scroll-mt-32"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="capabilities-heading"
        title="Everything Your Finance Team Needs"
        text="Five groups of features, from setting up the books to bringing a group of companies together."
      />
      <GroupCarousel groups={groups} detailsPath={financeFeaturesPath} />
    </div>
  </section>
);
