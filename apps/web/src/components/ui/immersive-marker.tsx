"use client";

import { useEffect, useRef } from "react";

/** The sections currently in the middle of the screen. */
const activeSections = new Set<Element>();

const syncAttribute = () => {
  const root = document.documentElement;
  if (activeSections.size > 0) root.setAttribute("data-immersive", "");
  else root.removeAttribute("data-immersive");
};

/**
 * Place inside a section that should have the screen to itself. While the section fills the middle
 * of the viewport the page marks itself `data-immersive`, which hides the floating assistant. See
 * `globals.css`.
 */
export const ImmersiveMarker = () => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = markerRef.current?.parentElement;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) activeSections.add(section);
        else activeSections.delete(section);
        syncAttribute();
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      activeSections.delete(section);
      syncAttribute();
    };
  }, []);

  return <span ref={markerRef} hidden />;
};
