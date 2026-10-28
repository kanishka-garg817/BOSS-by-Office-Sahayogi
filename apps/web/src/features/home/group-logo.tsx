import type { ReactNode } from "react";

import type { ModuleGroupId } from "@/config/modules";

type LogoSpec = { from: string; to: string; mark: ReactNode };

/** Two-tone marks drawn on a 32 × 32 grid, white on a gradient tile, like product logos. */
const LOGOS = {
  "business-finance": {
    from: "#34D399",
    to: "#059669",
    mark: (
      <>
        <rect x={8} y={17} width={4} height={7} rx={2} fill="white" opacity={0.7} />
        <rect x={14} y={13} width={4} height={11} rx={2} fill="white" opacity={0.85} />
        <rect x={20} y={8} width={4} height={16} rx={2} fill="white" />
      </>
    ),
  },
  operations: {
    from: "#2DD4BF",
    to: "#0E7490",
    mark: (
      <>
        <path d="M16 7 L25 11.5 L16 16 L7 11.5 Z" fill="white" />
        <path d="M7 11.5 L16 16 L16 25.5 L7 21 Z" fill="white" opacity={0.7} />
        <path d="M25 11.5 L16 16 L16 25.5 L25 21 Z" fill="white" opacity={0.85} />
      </>
    ),
  },
  people: {
    from: "#60A5FA",
    to: "#2563EB",
    mark: (
      <>
        <circle cx={20} cy={12} r={3.6} fill="white" opacity={0.7} />
        <path d="M14 24 a6 6 0 0 1 12 0 Z" fill="white" opacity={0.7} />
        <circle cx={13} cy={13} r={4} fill="white" />
        <path d="M6 25 a7 7 0 0 1 14 0 Z" fill="white" />
      </>
    ),
  },
  control: {
    from: "#A78BFA",
    to: "#4F46E5",
    mark: (
      <>
        <path
          d="M16 6 L24.5 9.5 V15.5 C24.5 20.5 20.8 24.4 16 26 C11.2 24.4 7.5 20.5 7.5 15.5 V9.5 Z"
          fill="white"
        />
        <path
          d="M12.5 16 L15 18.5 L19.8 13.5"
          fill="none"
          stroke={"#4F46E5"}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
} as const satisfies Record<ModuleGroupId, LogoSpec>;

/** A small logo for a module family. Decorative: the family's name is always shown beside it. */
export const GroupLogo = ({ group }: { group: ModuleGroupId }) => {
  const logo = LOGOS[group];
  const gradientId = `group-logo-${group}`;
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 shrink-0 drop-shadow-sm">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={logo.from} />
          <stop offset="1" stopColor={logo.to} />
        </linearGradient>
      </defs>
      <rect width={32} height={32} rx={9} fill={`url(#${gradientId})`} />
      {logo.mark}
    </svg>
  );
};
