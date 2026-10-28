import Image from "next/image";

import markImage from "@/assets/brand/boss-mark.png";
import { ModuleIcon } from "@/components/ui/module-icon";
import { type BossModule, modules } from "@/config/modules";

/** The modules that sit on the inner ring. The rest circle on the outer ring. */
const INNER_SLUGS = [
  "finance-accounting",
  "sales-crm",
  "inventory",
  "procurement",
  "people-payroll",
  "business-intelligence-analytics",
];

/** Ring sizes as a share of the picture's width. */
const INNER_RADIUS = 27;
const OUTER_RADIUS = 44;
const MIDDLE = 50;

const innerModules = modules.filter((candidate) => INNER_SLUGS.includes(candidate.slug));
const outerModules = modules.filter((candidate) => !INNER_SLUGS.includes(candidate.slug));

type RingProps = {
  ringModules: readonly BossModule[];
  radius: number;
  ringClass: string;
  uprightClass: string;
};

/** One circle of module icons, with no line drawn between them. The circle turns slowly, and each icon turns back so it stays upright. */
const Ring = ({ ringModules, radius, ringClass, uprightClass }: RingProps) => (
  <div className={`absolute inset-0 ${ringClass}`}>
    {ringModules.map((bossModule, index) => {
      const angle = (index / ringModules.length) * 2 * Math.PI - Math.PI / 2;
      return (
        <div
          key={bossModule.slug}
          style={{
            left: `${String(MIDDLE + radius * Math.cos(angle))}%`,
            top: `${String(MIDDLE + radius * Math.sin(angle))}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div className={`relative ${uprightClass}`}>
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-brand-blue/35 blur-lg"
            />
            <div className="relative rounded-xl bg-surface p-1.5 shadow-lg ring-1 shadow-brand-blue/30 ring-brand-blue/20">
              <ModuleIcon module={bossModule} />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

/**
 * A small BoSS logo in the middle, with every module's icon moving slowly around it in two circles.
 * With reduced motion the icons stand still.
 */
export const EcosystemVisual = () => (
  <div
    role="img"
    aria-label="The BoSS logo at the centre, with the icons of all its modules circling around it"
    className="relative mx-auto aspect-square w-full max-w-xs lg:max-w-sm"
  >
    <Ring
      ringModules={outerModules}
      radius={OUTER_RADIUS}
      ringClass="motion-safe:animate-orbit-outer"
      uprightClass="motion-safe:animate-orbit-outer-upright"
    />
    <Ring
      ringModules={innerModules}
      radius={INNER_RADIUS}
      ringClass="motion-safe:animate-orbit-inner"
      uprightClass="motion-safe:animate-orbit-inner-upright"
    />
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/50 blur-2xl"
    />
    <div className="absolute top-1/2 left-1/2 flex size-[16%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow-xl ring-4 shadow-brand-blue/60 ring-brand-blue/30">
      <Image src={markImage} alt="" className="h-1/2 w-auto" sizes="48px" />
    </div>
  </div>
);
