import { useEffect, useRef, useState, type RefObject } from "react";

import type { TourPointer } from "@/features/mobile-app/demo/phone-app";

import type { TabletMenu } from "./use-tablet-menu";

const HIDDEN_POINTER: TourPointer = { x: 0, y: 0, isVisible: false, isTapping: false };
const MOVE_MS = 900;
const TAP_MS = 260;
const READ_MS = 1800;

type TabletTourOptions = {
  menu: TabletMenu;
  screenRef: RefObject<HTMLDivElement | null>;
  scale: number;
  isRunning: boolean;
};

/**
 * A pointer that opens a few modules on the tablet by itself: tap a module and its icon column appears, tap
 * the arrow to open it with names, pick an option, then move on. It stops when `isRunning` turns false.
 */
export const useTabletTour = ({
  menu,
  screenRef,
  scale,
  isRunning,
}: TabletTourOptions): TourPointer => {
  const [pointer, setPointer] = useState<TourPointer>(HIDDEN_POINTER);
  const menuRef = useRef(menu);
  const scaleRef = useRef(scale);

  useEffect(() => {
    menuRef.current = menu;
    scaleRef.current = scale;
  });

  useEffect(() => {
    if (!isRunning) return;
    let isCancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const tap = async (target: string) => {
      const screen = screenRef.current;
      const element = screen?.querySelector(`[data-demo="${target}"]`);
      if (screen && element) {
        const screenBox = screen.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        const factor = scaleRef.current;
        setPointer({
          x: (box.left - screenBox.left + box.width / 2) / factor,
          y: (box.top - screenBox.top + box.height / 2) / factor,
          isVisible: true,
          isTapping: false,
        });
      }
      await wait(MOVE_MS);
      setPointer((current) => ({ ...current, isTapping: true }));
      await wait(TAP_MS);
      setPointer((current) => ({ ...current, isTapping: false }));
    };

    const visit = async (slug: string, itemId: string) => {
      await tap(`module-${slug}`);
      menuRef.current.selectModule(slug);
      await wait(READ_MS);
      await tap("menu-toggle");
      menuRef.current.setState("open");
      await wait(READ_MS);
      await tap(`menu-${itemId}`);
      menuRef.current.selectItem(itemId);
      await wait(READ_MS);
    };

    const play = async () => {
      while (!isCancelled) {
        menuRef.current.reset();
        await wait(READ_MS);

        await visit("finance-accounting", "invoices");
        await visit("sales-crm", "orders");
        await visit("inventory", "stock");

        await tap("module-dashboard");
        menuRef.current.selectModule(null);
        await wait(READ_MS * 2);
      }
    };

    void play();

    return () => {
      isCancelled = true;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [isRunning, screenRef]);

  return isRunning ? pointer : HIDDEN_POINTER;
};
