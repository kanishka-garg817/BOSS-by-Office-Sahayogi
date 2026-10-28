import type { BossModule, ModuleTone } from "@/config/modules";

const toneClass = {
  green: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  pink: "bg-pink-50 text-pink-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-violet-50 text-violet-600",
  teal: "bg-teal-50 text-teal-600",
  red: "bg-red-50 text-red-600",
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  sky: "bg-sky-50 text-sky-600",
} as const satisfies Record<ModuleTone, string>;

const sizeClass = {
  md: { tile: "size-9", icon: "size-5" },
  lg: { tile: "size-12", icon: "size-6" },
} as const;

type ModuleIconProps = {
  module: BossModule;
  size?: keyof typeof sizeClass;
};

/** A module's icon on its colored tile. Decorative: the module name is always shown beside it. */
export const ModuleIcon = ({ module: bossModule, size = "md" }: ModuleIconProps) => {
  const Icon = bossModule.icon;
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-lg ${sizeClass[size].tile} ${toneClass[bossModule.tone]}`}
    >
      <Icon className={sizeClass[size].icon} strokeWidth={2} />
    </span>
  );
};
