import type { ReactNode } from "react";

/** Small building blocks shared by the demo app's screens. Sizes are for a 360px-wide screen. */

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-app-line bg-app-card ${className}`}>{children}</div>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="flex items-center gap-2 text-base font-bold text-app-ink">
    <span aria-hidden="true" className="h-4 w-1 rounded-full bg-app-blue" />
    {children}
  </h3>
);

export const Progress = ({
  percent,
  tone,
}: {
  percent: number;
  tone: "blue" | "amber" | "green";
}) => {
  const color = { blue: "bg-app-blue", amber: "bg-app-amber", green: "bg-app-green" }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-app-soft">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${String(percent)}%` }} />
    </div>
  );
};

export const toneClass = {
  blue: { soft: "bg-app-blue-soft", text: "text-app-blue" },
  green: { soft: "bg-app-green-soft", text: "text-app-green" },
  amber: { soft: "bg-app-amber-soft", text: "text-app-amber" },
  violet: { soft: "bg-app-violet-soft", text: "text-app-violet" },
  red: { soft: "bg-app-red-soft", text: "text-app-red" },
  teal: { soft: "bg-app-teal-soft", text: "text-app-teal" },
} as const;

export type Tone = keyof typeof toneClass;

export const IconTile = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
  <span
    aria-hidden="true"
    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${toneClass[tone].soft} ${toneClass[tone].text}`}
  >
    {children}
  </span>
);
