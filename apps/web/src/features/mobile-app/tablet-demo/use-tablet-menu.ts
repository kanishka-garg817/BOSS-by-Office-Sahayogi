import { useState } from "react";

import { tabletMenus } from "@/config/tablet-menus";

/** How far the module's own menu is open beside the module bar. */
export type MenuState = "closed" | "open" | "collapsed";

export type TabletMenu = {
  activeSlug: string | null;
  itemId: string | null;
  state: MenuState;
  selectModule: (slug: string | null) => void;
  selectItem: (itemId: string) => void;
  setState: (state: MenuState) => void;
  reset: () => void;
};

/** What is open in the tablet demo: the chosen module, its menu and the option picked in it. */
export const useTabletMenu = (): TabletMenu => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [state, setState] = useState<MenuState>("closed");

  const selectModule = (slug: string | null) => {
    setActiveSlug(slug);
    setItemId(null);
    setState(slug !== null && slug in tabletMenus ? "collapsed" : "closed");
  };

  const reset = () => {
    setActiveSlug(null);
    setItemId(null);
    setState("closed");
  };

  return { activeSlug, itemId, state, selectModule, selectItem: setItemId, setState, reset };
};
