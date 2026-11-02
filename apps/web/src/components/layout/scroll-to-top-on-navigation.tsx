"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** How long a back or forward press counts as the reason for the next page change. */
const HISTORY_MOVE_WINDOW_MS = 1000;

/**
 * Takes the visitor to the top of a page they have just opened. Next.js skips this when a page
 * starts with a sticky bar, such as the module sub-bar, so the new page would open at the old
 * scroll position. Links that point at a section (`#section`) and the browser's back and forward
 * buttons keep their own behaviour.
 */
export const ScrollToTopOnNavigation = () => {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const lastHistoryMoveAt = useRef(0);

  useEffect(() => {
    const markHistoryMove = () => {
      lastHistoryMoveAt.current = Date.now();
    };
    window.addEventListener("popstate", markHistoryMove);
    return () => {
      window.removeEventListener("popstate", markHistoryMove);
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const isHistoryMove = Date.now() - lastHistoryMoveAt.current < HISTORY_MOVE_WINDOW_MS;
    if (isHistoryMove || window.location.hash) return;
    const toTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    toTop();
    // Once more after the new page has painted, in case it was laid out after the first jump.
    const frame = requestAnimationFrame(toTop);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
};
