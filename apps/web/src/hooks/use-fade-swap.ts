import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * For content that changes when the visitor picks another option: `selected` updates at once, while
 * `shown` follows after `fadeMs`, so the old content can fade out before the new content appears.
 * With reduced motion both change together.
 */
export const useFadeSwap = <T>(initial: T, fadeMs: number) => {
  const isReducedMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState(initial);
  const [shown, setShown] = useState(initial);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(fadeTimer.current);
    },
    [],
  );

  const select = (next: T) => {
    clearTimeout(fadeTimer.current);
    setSelected(next);
    if (isReducedMotion) {
      setShown(next);
      return;
    }
    fadeTimer.current = setTimeout(() => {
      setShown(next);
    }, fadeMs);
  };

  return { selected, shown, isLeaving: selected !== shown, select };
};
