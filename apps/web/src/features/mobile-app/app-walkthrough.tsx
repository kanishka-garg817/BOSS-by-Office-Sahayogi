"use client";

import { Play } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { useElementWidth } from "@/hooks/use-element-width";
import { useIsInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import type { Detail, Tab } from "./demo/app-types";
import { PhoneApp } from "./demo/phone-app";
import { useAppTour } from "./demo/use-app-tour";
import { useDemoApp } from "./demo/use-demo-app";
import { PhoneFrame } from "./phone-frame";
import { TabletScreen } from "./tablet-demo/tablet-screen";

const SCREEN_WIDTH = 360;
const START_CAPTION = "Tap around the app to try it";

type Jump = { id: string; label: string; tab: Tab; detail: Detail | null };

const jumps: readonly Jump[] = [
  { id: "home", label: "Home", tab: "home", detail: null },
  { id: "business", label: "Business", tab: "business", detail: null },
  { id: "space", label: "My Space", tab: "space", detail: null },
  { id: "more", label: "More", tab: "more", detail: null },
  { id: "attendance", label: "Attendance", tab: "space", detail: "attendance" },
  { id: "leave", label: "Leave", tab: "space", detail: "leave" },
  { id: "payslips", label: "Payslips", tab: "space", detail: "payslips" },
  { id: "claim", label: "Claims", tab: "space", detail: "claim" },
  { id: "assistant", label: "Sahayogi", tab: "home", detail: "assistant" },
];

type AppWalkthroughProps = {
  /** The headline and buttons above the devices. */
  intro: ReactNode;
};

/** The BoSS app on a phone beside a tablet. It plays a short tour by itself; touching it hands control to the visitor. */
export const AppWalkthrough = ({ intro }: AppWalkthroughProps) => {
  const [viewRef, isInView] = useIsInView<HTMLDivElement>(0.3);
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const screenRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = usePrefersReducedMotion();
  const app = useDemoApp();
  const [isStopped, setIsStopped] = useState(false);
  const [caption, setCaption] = useState(START_CAPTION);

  const scale = boxWidth === null ? 1 : boxWidth / SCREEN_WIDTH;
  const isTouring = isInView && !isReducedMotion && !isStopped;
  const pointer = useAppTour({
    app,
    screenRef,
    scale,
    isRunning: isTouring,
    onCaption: setCaption,
  });

  const takeOver = () => {
    setIsStopped(true);
    setCaption(START_CAPTION);
  };

  const jumpTo = (jump: Jump) => {
    takeOver();
    app.goTab(jump.tab);
    if (jump.detail) app.open(jump.detail);
  };

  const replay = () => {
    app.reset();
    setIsStopped(false);
  };

  return (
    <div ref={viewRef}>
      {intro}

      <div className="relative mx-auto mt-12 w-full max-w-4xl pb-16 sm:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-8 -bottom-4 -z-10 rounded-full bg-brand-blue/15 blur-3xl"
        />
        <div className="w-[88%]">
          <TabletScreen isInView={isInView} />
        </div>

        <div className="absolute right-0 bottom-0 w-[30%]">
          <PhoneFrame className="w-full">
            <div
              ref={boxRef}
              onPointerDownCapture={takeOver}
              className="relative aspect-360/800 overflow-hidden rounded-3xl bg-app-bg"
            >
              <div
                className="absolute top-0 left-0 origin-top-left"
                style={{ transform: `scale(${String(scale)})` }}
              >
                <PhoneApp app={app} pointer={pointer} screenRef={screenRef} />
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>

      <div aria-live="polite" className="min-h-16 text-center">
        <p className="text-base font-bold text-ink">{caption}</p>
        {isStopped && !isReducedMotion ? (
          <button
            type="button"
            onClick={replay}
            className="mx-auto mt-2 flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Play aria-hidden="true" className="size-4" />
            Watch the tour again
          </button>
        ) : null}
      </div>

      <div
        role="group"
        aria-label="Open a screen of the app"
        className="-mx-4 mt-6 scrollbar-none flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {jumps.map((jump) => (
          <button
            key={jump.id}
            type="button"
            onClick={() => {
              jumpTo(jump);
            }}
            className="min-h-11 shrink-0 rounded-full border border-ink/15 bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:border-brand-blue/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            {jump.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-ink/50">
        The demo runs on sample data, and the assistant&apos;s replies are examples.
      </p>
    </div>
  );
};
