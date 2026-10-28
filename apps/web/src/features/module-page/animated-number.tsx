"use client";

import { useEffect, useState } from "react";

import { useInViewOnce } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const COUNT_MS = 1200;
const indianNumber = new Intl.NumberFormat("en-IN");

type AnimatedNumberProps = {
  value: number;
  /** Shown before the number, e.g. "₹". */
  prefix?: string;
};

/** A figure that counts up from zero the first time it is on screen. */
export const AnimatedNumber = ({ value, prefix = "" }: AnimatedNumberProps) => {
  const [ref, isInView] = useInViewOnce<HTMLSpanElement>(0.3);
  const isReducedMotion = usePrefersReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!isInView || isReducedMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_MS, 1);
      setShown(value * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isInView, isReducedMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {indianNumber.format(Math.round(isInView || isReducedMotion ? shown : 0))}
    </span>
  );
};
