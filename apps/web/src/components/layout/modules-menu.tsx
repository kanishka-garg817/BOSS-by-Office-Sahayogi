"use client";

import { featuredModules } from "@/config/modules";
import { viewAllModulesAction, type NavItem } from "@/config/navigation";

import { ModuleLink } from "./module-link";
import { NavDropdown } from "./nav-dropdown";

/** Desktop "Modules" nav item: a dropdown of featured modules. */
export const ModulesMenu = ({ item }: { item: NavItem }) => (
  <NavDropdown label={item.label} panelClassName="w-136">
    {(close) => (
      <>
        <div className="flex items-center justify-between px-2 pb-2">
          <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Modules</p>
          <a
            href={viewAllModulesAction.href}
            onClick={close}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            {viewAllModulesAction.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-x-2">
          {featuredModules.map((bossModule) => (
            <li key={bossModule.slug}>
              <ModuleLink module={bossModule} onNavigate={close} />
            </li>
          ))}
        </ul>
      </>
    )}
  </NavDropdown>
);
