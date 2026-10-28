import { type ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { ImmersiveMarker } from "@/components/ui/immersive-marker";
import { moduleGroups, type ModuleGroupId } from "@/config/modules";

import { CapabilityMarquee } from "./capability-marquee";
import { GroupLogo } from "./group-logo";
import { ControlMockup, FinanceMockup, OperationsMockup, PeopleMockup } from "./group-mockups";

type GroupStyle = {
  /** A soft wash behind the tile, in the family's colour. */
  backgroundClass: string;
  mockup: ReactNode;
};

/** How each module family appears as one of the four large tiles in the middle. */
const GROUP_TILES = {
  "business-finance": {
    backgroundClass: "from-emerald-50",
    mockup: <FinanceMockup />,
  },
  operations: {
    backgroundClass: "from-teal-50",
    mockup: <OperationsMockup />,
  },
  people: {
    backgroundClass: "from-blue-50",
    mockup: <PeopleMockup />,
  },
  control: {
    backgroundClass: "from-indigo-50",
    mockup: <ControlMockup />,
  },
} as const satisfies Record<ModuleGroupId, GroupStyle>;

/**
 * A wall of everything teams do in BoSS: the four module families as large tiles in the
 * middle, and rows of everyday features drifting past on either side of them and above and below.
 * The outer edges fade away on wide screens to suggest there is more.
 */
export const CapabilitiesSection = () => (
  <section
    id="inside-boss"
    aria-labelledby="capabilities-heading"
    className="relative flex min-h-svh scroll-mt-20 flex-col justify-center py-14 sm:py-24"
  >
    <ImmersiveMarker />
    <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
      <Eyebrow>Inside BoSS</Eyebrow>
      <h2
        id="capabilities-heading"
        className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-3xl xl:text-4xl"
      >
        Everything your business runs on, in one place
      </h2>
      <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">
        From the first enquiry to the final payslip, this is the work your teams do every day in
        BoSS.
      </p>
    </div>

    <div className="relative mx-auto mt-10 w-full max-w-screen-2xl sm:mt-14 lg:fade-x">
      <ul className="grid grid-cols-1 gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:absolute lg:capability-overlay lg:left-3/10 lg:z-10 lg:w-2/5 lg:grid-rows-2 lg:border-x">
        {moduleGroups.map((group) => {
          const tile = GROUP_TILES[group.id];
          return (
            <li
              key={group.id}
              className={`flex flex-col items-center justify-between gap-6 overflow-hidden bg-surface bg-linear-to-b to-surface px-6 pt-8 pb-8 lg:gap-3 lg:pt-6 lg:pb-5 ${tile.backgroundClass}`}
            >
              <div className="flex w-full flex-1 items-center justify-center mask-b-from-60% opacity-90">
                {tile.mockup}
              </div>
              <h3 className="flex items-center gap-2.5 text-base font-semibold text-ink xl:text-lg">
                <GroupLogo group={group.id} />
                {group.name}
              </h3>
            </li>
          );
        })}
      </ul>

      <CapabilityMarquee />
    </div>
  </section>
);
