"use client";

import { useEffect, useRef } from "react";

const ATTRIBUTE = "data-assistant-lifted";

/**
 * Place inside an element the floating assistant must not cover. While that element is on screen the
 * page marks itself `data-assistant-lifted`, and the assistant moves up out of the way. See `globals.css`.
 */
export const LiftAssistantMarker = () => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = markerRef.current?.parentElement;
    if (!target) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) root.setAttribute(ATTRIBUTE, "");
      else root.removeAttribute(ATTRIBUTE);
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      root.removeAttribute(ATTRIBUTE);
    };
  }, []);

  return <span ref={markerRef} hidden />;
};
