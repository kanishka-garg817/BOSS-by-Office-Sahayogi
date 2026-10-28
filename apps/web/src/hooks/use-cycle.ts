import { useEffect, useState, type RefObject } from "react";

import { useIsInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Steps through a list of moments, each lasting the given number of milliseconds, and starts over
 * at the end. It only runs while the element is on screen. With reduced motion it stays on the last
 * moment, which is the finished picture.
 */
export const useCycle = <T extends Element>(
  durations: readonly number[],
): [RefObject<T | null>, number] => {
  const [ref, isInView] = useIsInView<T>(0.4);
  const isReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView || isReducedMotion) return;
    const timer = setTimeout(() => {
      setStep((current) => (current + 1) % durations.length);
    }, durations[step] ?? 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isInView, isReducedMotion, step, durations]);

  return [ref, isReducedMotion ? durations.length - 1 : step];
};
