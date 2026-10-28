import { useEffect, useRef, useState, type RefObject } from "react";

/** True once the referenced element has scrolled into view (and stays true). */
export const useInViewOnce = <T extends Element>(
  threshold = 0.3,
): [RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isInView];
};

/** Whether the referenced element is on screen right now (updates as it enters and leaves). */
export const useIsInView = <T extends Element>(threshold = 0.3): [RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsInView(entry.isIntersecting);
      },
      { threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isInView];
};
