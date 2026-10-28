"use client";

import { useRef, type ReactNode } from "react";

import { useElementWidth } from "@/hooks/use-element-width";
import { useInViewOnce } from "@/hooks/use-in-view";

type ScaledMockProps = {
  /** What the mock-up is, for people using a screen reader. */
  label: string;
  /** The width the mock-up is drawn at, before it is scaled to fit. */
  width: number;
  /** The height the mock-up is drawn at. */
  height: number;
  /** On narrow screens the mock-up stops shrinking here and scrolls sideways inside its frame. */
  minWidth?: number;
  children: ReactNode;
};

/**
 * A product screen drawn at a fixed size and scaled down to the space it is given. Its frame sets
 * data-visible once it is on screen, which starts the animations inside it.
 */
export const ScaledMock = ({ label, width, height, minWidth = 560, children }: ScaledMockProps) => {
  const [viewRef, isVisible] = useInViewOnce<HTMLDivElement>(0.2);
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const innerRef = useRef<HTMLDivElement>(null);
  const drawnWidth = Math.max(boxWidth ?? width, minWidth);
  const scale = drawnWidth / width;

  return (
    <div
      ref={viewRef}
      data-visible={isVisible}
      role="img"
      aria-label={label}
      className="app-light overflow-hidden rounded-2xl border border-ink/10 bg-app-bg text-left shadow-2xl shadow-brand-navy/15"
    >
      <div ref={boxRef} className="scrollbar-none overflow-x-auto">
        <div style={{ width: drawnWidth, height: height * scale }} className="relative">
          <div
            ref={innerRef}
            aria-hidden="true"
            className="absolute top-0 left-0 origin-top-left"
            style={{ width, height, transform: `scale(${String(scale)})` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
