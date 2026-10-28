import { ModuleIcon } from "@/components/ui/module-icon";
import type { BossModule } from "@/config/modules";

type ModuleLinkProps = {
  module: BossModule;
  onNavigate?: () => void;
};

/** A module's icon and name as a menu link to its (future) module page. */
export const ModuleLink = ({ module: bossModule, onNavigate }: ModuleLinkProps) => (
  <a
    href={`/modules/${bossModule.slug}`}
    onClick={onNavigate}
    className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue"
  >
    <ModuleIcon module={bossModule} />
    {bossModule.name}
  </a>
);
