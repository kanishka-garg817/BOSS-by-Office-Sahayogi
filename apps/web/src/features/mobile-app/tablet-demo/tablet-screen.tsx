"use client";

import { useRef, useState } from "react";

import { DashboardView } from "@/features/home/product-dashboard/dashboard-view";
import { useElementWidth } from "@/hooks/use-element-width";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { TourCursor } from "../demo/tour-cursor";
import { ModuleSidebar } from "./module-sidebar";
import { useTabletMenu } from "./use-tablet-menu";
import { useTabletTour } from "./use-tablet-tour";

const TABLET_WIDTH = 1100;
const TABLET_HEIGHT = 700;

type TabletScreenProps = { isInView: boolean };

/** The BoSS dashboard on a tablet. Its module bar opens each module's menu, on its own or by touch. */
export const TabletScreen = ({ isInView }: TabletScreenProps) => {
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const screenRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = usePrefersReducedMotion();
  const menu = useTabletMenu();
  const [isStopped, setIsStopped] = useState(false);

  const scale = boxWidth === null ? 1 : boxWidth / TABLET_WIDTH;
  const pointer = useTabletTour({
    menu,
    screenRef,
    scale,
    isRunning: isInView && !isReducedMotion && !isStopped,
  });

  return (
    <div className="rounded-4xl bg-black p-2.5 shadow-2xl ring-2 shadow-brand-navy/40 ring-white/25">
      <div
        ref={boxRef}
        onPointerDownCapture={() => {
          setIsStopped(true);
        }}
        className="app-light relative overflow-hidden rounded-3xl bg-app-bg text-left"
        style={{ height: TABLET_HEIGHT * scale }}
      >
        <div
          ref={screenRef}
          className="absolute top-0 left-0 flex origin-top-left"
          style={{
            width: TABLET_WIDTH,
            height: TABLET_HEIGHT,
            transform: `scale(${String(scale)})`,
          }}
        >
          <DashboardView sidebar={<ModuleSidebar menu={menu} />} />
          <TourCursor {...pointer} />
        </div>
      </div>
    </div>
  );
};
