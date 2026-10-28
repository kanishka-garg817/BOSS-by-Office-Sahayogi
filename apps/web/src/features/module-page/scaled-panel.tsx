"use client";

import type { ReactNode } from "react";

import { useElementWidth } from "@/hooks/use-element-width";

type ScaledPanelProps = {
  /** What the picture shows, for people using a screen reader. */
  label: string;
  /** The size the picture is drawn at, before it is scaled to fit. */
  width: number;
  height: number;
  children: ReactNode;
};

/** A soft panel holding a picture drawn at a fixed size and scaled to the width it is given. */
export const ScaledPanel = ({ label, width, height, children }: ScaledPanelProps) => {
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const scale = (boxWidth ?? width) / width;

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={label}
      className="app-light relative overflow-hidden rounded-3xl bg-brand-tint"
      style={{ height: height * scale }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${String(scale)})` }}
      >
        {children}
      </div>
    </div>
  );
};
