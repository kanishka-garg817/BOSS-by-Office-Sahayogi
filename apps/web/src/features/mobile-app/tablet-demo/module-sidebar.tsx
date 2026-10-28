import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import Image from "next/image";

import markImage from "@/assets/brand/boss-mark.png";
import { sidebarModuleSlugs } from "@/config/dashboard-demo";
import { tabletMenus } from "@/config/tablet-menus";
import { moduleTile } from "@/features/home/product-dashboard/dashboard-view";

import type { TabletMenu } from "./use-tablet-menu";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-app-blue";

const OPEN_WIDTH = "w-52";
const COLLAPSED_WIDTH = "w-14";

const MenuPanel = ({ menu }: { menu: TabletMenu }) => {
  const bossModule = menu.activeSlug ? moduleTile(menu.activeSlug)?.bossModule : undefined;
  const items = menu.activeSlug ? (tabletMenus[menu.activeSlug] ?? []) : [];
  const isOpen = menu.state === "open";
  const width = menu.state === "closed" ? "w-0" : isOpen ? OPEN_WIDTH : COLLAPSED_WIDTH;

  return (
    <div
      className={`flex shrink-0 flex-col overflow-hidden bg-app-card transition-[width] duration-500 ease-in-out ${width}`}
    >
      <div
        className={`${isOpen ? OPEN_WIDTH : COLLAPSED_WIDTH} mt-14 flex-1 border-r border-app-line p-2`}
      >
        <div
          className={`flex items-center py-1.5 ${isOpen ? "justify-between px-1.5" : "justify-center"}`}
        >
          {isOpen ? (
            <span className="truncate text-sm font-bold text-app-ink">{bossModule?.name}</span>
          ) : null}
          <button
            type="button"
            data-demo="menu-toggle"
            aria-label={isOpen ? "Collapse the menu" : "Expand the menu"}
            onClick={() => {
              menu.setState(isOpen ? "collapsed" : "open");
            }}
            className={`flex size-6 items-center justify-center rounded-md text-app-muted ${focusRing}`}
          >
            {isOpen ? (
              <ChevronLeft aria-hidden="true" className="size-4" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
        <ul className="mt-1 space-y-0.5">
          {items.map((item) => {
            const isSelected = menu.itemId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  data-demo={`menu-${item.id}`}
                  aria-label={item.label}
                  aria-current={isSelected ? "true" : undefined}
                  onClick={() => {
                    menu.selectItem(item.id);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg py-2 text-left text-xs transition-colors ${isOpen ? "px-2.5" : "justify-center"} ${isSelected ? "bg-app-blue-soft font-bold text-app-blue" : "text-app-ink hover:bg-app-soft"} ${focusRing}`}
                >
                  <item.icon aria-hidden="true" className="size-4 shrink-0" />
                  {isOpen ? <span className="truncate">{item.label}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

/** The module bar, with the chosen module's own menu opening beside it. */
export const ModuleSidebar = ({ menu }: { menu: TabletMenu }) => (
  <div className="flex shrink-0">
    <div className="flex w-20 shrink-0 flex-col items-center bg-app-card py-3">
      <Image src={markImage} alt="" className="mb-3 h-8 w-auto" sizes="32px" />
      <nav aria-label="Modules" className="flex w-full flex-col items-center gap-0.5">
        <button
          type="button"
          data-demo="module-dashboard"
          onClick={() => {
            menu.selectModule(null);
          }}
          className={`relative flex w-full flex-col items-center gap-1 py-1.5 text-[11px] ${menu.activeSlug === null ? "font-semibold text-app-ink" : "text-app-muted"} ${focusRing}`}
        >
          {menu.activeSlug === null ? (
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-full w-0.5 rounded-r bg-app-blue"
            />
          ) : null}
          <span className="flex size-8 items-center justify-center rounded-lg bg-app-blue-soft text-app-blue">
            <LayoutDashboard aria-hidden="true" className="size-4" />
          </span>
          Dashboard
        </button>
        {sidebarModuleSlugs.map((slug) => {
          const tile = moduleTile(slug);
          if (!tile) return null;
          const isActive = menu.activeSlug === slug;
          return (
            <button
              key={slug}
              type="button"
              data-demo={`module-${slug}`}
              aria-pressed={isActive}
              onClick={() => {
                menu.selectModule(slug);
              }}
              className={`relative flex w-full flex-col items-center gap-1 px-1 py-1.5 text-center text-[11px] leading-tight ${isActive ? "font-semibold text-app-ink" : "text-app-muted"} ${focusRing}`}
            >
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-0.5 rounded-r bg-app-blue"
                />
              ) : null}
              <span
                className={`flex size-8 items-center justify-center rounded-lg ${tile.tone.soft} ${tile.tone.text}`}
              >
                <tile.bossModule.icon aria-hidden="true" className="size-4" />
              </span>
              {tile.bossModule.name}
            </button>
          );
        })}
      </nav>
    </div>
    <MenuPanel menu={menu} />
  </div>
);
