"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** The gap between cards in pixels (Tailwind's gap-5). One page is the visible width plus one gap. */
const CARD_GAP_PX = 20;

/** Slack in pixels so the ends count as reached despite sub-pixel rounding. */
const END_TOLERANCE_PX = 4;

const arrowClass =
  "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink shadow-md transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-40 disabled:hover:bg-surface";

type CardSliderProps = {
  children: ReactNode;
  /** Accessible name for the scrolling list of cards. */
  label: string;
  /** Accessible name for the "scroll back" button. */
  previousLabel: string;
  /** Accessible name for the "scroll forward" button. */
  nextLabel: string;
};

/** A row of cards that scrolls sideways one arrow press at a time. */
export const CardSlider = ({ children, label, previousLabel, nextLabel }: CardSliderProps) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateEnds = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCanGoBack(scroller.scrollLeft > END_TOLERANCE_PX);
    setCanGoForward(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - END_TOLERANCE_PX,
    );
  };

  useEffect(() => {
    window.addEventListener("resize", updateEnds);
    return () => {
      window.removeEventListener("resize", updateEnds);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({
      left: direction * (scroller.clientWidth + CARD_GAP_PX),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative">
      <ul
        ref={scrollerRef}
        onScroll={updateEnds}
        aria-label={label}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth py-3 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <button
        type="button"
        aria-label={previousLabel}
        disabled={!canGoBack}
        onClick={() => {
          move(-1);
        }}
        className={`${arrowClass} left-0 -translate-x-1/2`}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        disabled={!canGoForward}
        onClick={() => {
          move(1);
        }}
        className={`${arrowClass} right-0 translate-x-1/2`}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
};
