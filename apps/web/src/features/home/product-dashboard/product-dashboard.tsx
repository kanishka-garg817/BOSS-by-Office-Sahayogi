"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import robotImage from "@/assets/brand/assistant-robot.png";
import { useElementWidth } from "@/hooks/use-element-width";
import { useIsInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { AssistantPanel } from "./assistant-panel";
import { DashboardView } from "./dashboard-view";
import { useAssistantChat } from "./use-assistant-chat";
import { useDashboardTour, type TourView } from "./use-dashboard-tour";

const SCREEN_WIDTH = 1440;
const SCREEN_HEIGHT = 830;
const NARROW_BREAKPOINT = 720;
const MOVE_TRANSITION = "900ms cubic-bezier(0.65, 0, 0.35, 1)";

const TourOverlay = ({ view }: { view: TourView }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
    <div
      className="absolute rounded-xl bg-brand-blue/5 ring-2 ring-brand-blue"
      style={{
        left: view.highlight.x,
        top: view.highlight.y,
        width: view.highlight.width,
        height: view.highlight.height,
        transition: `left ${MOVE_TRANSITION}, top ${MOVE_TRANSITION}, width ${MOVE_TRANSITION}, height ${MOVE_TRANSITION}`,
      }}
    />
    <svg
      viewBox="0 0 24 24"
      className="absolute z-20 size-5 drop-shadow-md sm:size-6"
      style={{
        left: view.cursor.x,
        top: view.cursor.y,
        transition: `left ${MOVE_TRANSITION}, top ${MOVE_TRANSITION}`,
      }}
    >
      <path
        d="M3 2l7 19 3-8 8-3L3 2z"
        fill="white"
        stroke="#001f4d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
    <div
      key={view.label}
      className={`absolute z-10 ${view.vertical === "above" ? "-mt-3 -translate-y-full" : "mt-5"} ${view.side === "left" ? "-ml-3 -translate-x-full" : "ml-5"}`}
      style={{ left: view.cursor.x, top: view.cursor.y }}
    >
      <div
        className="w-44 rounded-xl bg-brand-navy p-3 text-left text-white shadow-xl motion-safe:animate-reveal sm:w-64 sm:p-4"
        style={{ animationDelay: "700ms" }}
      >
        <p className="text-xs font-semibold text-brand-light sm:text-sm">{view.label}</p>
        <p className="mt-1 text-xs leading-snug sm:text-sm">{view.description}</p>
      </div>
    </div>
  </div>
);

/**
 * The BoSS dashboard, drawn in code and scaled to fit. A cursor tours it by itself; touching the
 * dashboard hands it over. The assistant slides in from the right, from the robot button.
 */
export const ProductDashboard = () => {
  const [viewRef, isInView] = useIsInView<HTMLElement>(0.25);
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const isReducedMotion = usePrefersReducedMotion();
  const chat = useAssistantChat();
  const [isStopped, setIsStopped] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const boxElement = useRef<HTMLDivElement | null>(null);

  const isNarrow = boxWidth !== null && boxWidth < NARROW_BREAKPOINT;
  const scale = boxWidth === null ? 1 : boxWidth / SCREEN_WIDTH;
  const isTouring = isInView && !isReducedMotion && !isStopped && !isNarrow;
  const view = useDashboardTour({
    boxRef: boxElement,
    chat,
    isRunning: isTouring,
    onAssistantOpen: setIsAssistantOpen,
  });

  return (
    <figure
      ref={viewRef}
      className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-2xl shadow-brand-navy/15"
    >
      <div
        ref={(node) => {
          boxRef.current = node;
          boxElement.current = node;
        }}
        onPointerDownCapture={() => {
          setIsStopped(true);
        }}
        className="app-light relative overflow-hidden bg-app-bg text-left"
        style={{ height: SCREEN_HEIGHT * scale }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `scale(${String(scale)})`,
          }}
        >
          <div className="relative flex h-full overflow-hidden">
            <DashboardView />
            <div
              className={`h-full shrink-0 overflow-hidden transition-[width] duration-500 ease-out ${isAssistantOpen ? "w-85" : "w-0"}`}
              {...(isAssistantOpen ? {} : { inert: true })}
            >
              <AssistantPanel
                chat={chat}
                onClose={() => {
                  setIsAssistantOpen(false);
                }}
              />
            </div>
            {isAssistantOpen ? null : (
              <button
                type="button"
                aria-label="Open Sahayogi"
                aria-expanded={false}
                onClick={() => {
                  setIsAssistantOpen(true);
                }}
                className="absolute right-0 bottom-0 z-30 flex size-12 items-center justify-center rounded-tl-2xl border-t border-l border-app-blue/20 bg-app-blue-soft"
              >
                <Image src={robotImage} alt="" className="w-7" sizes="28px" />
              </button>
            )}
          </div>
        </div>
        {view ? <TourOverlay view={view} /> : null}
      </div>
      <figcaption className="sr-only">
        The BoSS dashboard with key business numbers, a calendar, charts and the Sahayogi assistant.
      </figcaption>
    </figure>
  );
};
