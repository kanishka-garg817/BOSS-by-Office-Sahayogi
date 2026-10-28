import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * The width in pixels of the referenced element, kept current as it resizes. It is `null` until
 * the element has been measured, so callers can avoid drawing a guess.
 */
export const useElementWidth = <T extends Element>(): [RefObject<T | null>, number | null] => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.round(entry.contentRect.width));
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, width];
};
