"use client";

import { useRef } from "react";

import { useElementWidth } from "@/hooks/use-element-width";

import type { Route } from "./demo/app-types";
import { PhoneApp, type TourPointer } from "./demo/phone-app";
import { useDemoApp } from "./demo/use-demo-app";
import { PhoneFrame } from "./phone-frame";

const SCREEN_WIDTH = 360;
const HIDDEN_POINTER: TourPointer = { x: 0, y: 0, isVisible: false, isTapping: false };

type PhonePreviewProps = {
  /** The screen to show. Without it the app opens on its home screen. */
  route?: Route;
  isDark?: boolean;
  /** The width of the phone. */
  className?: string;
};

/** A still picture of the BoSS app on a phone, for pages that only need to show what it looks like. */
export const PhonePreview = ({ route, isDark = false, className }: PhonePreviewProps) => {
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>();
  const screenRef = useRef<HTMLDivElement>(null);
  const base = useDemoApp();
  const app = { ...base, route: route ?? base.route, theme: isDark ? "dark" : base.theme } as const;
  const scale = boxWidth === null ? 1 : boxWidth / SCREEN_WIDTH;

  return (
    <PhoneFrame {...(className ? { className } : {})}>
      <div
        ref={boxRef}
        aria-hidden="true"
        className="pointer-events-none relative aspect-360/800 overflow-hidden rounded-3xl bg-app-bg"
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: `scale(${String(scale)})` }}
        >
          <PhoneApp app={app} pointer={HIDDEN_POINTER} screenRef={screenRef} />
        </div>
      </div>
    </PhoneFrame>
  );
};
