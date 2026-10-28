import { useEffect, useRef, useState, type RefObject } from "react";

import { assistantSuggestions } from "@/config/mobile-app";

import type { TourPointer } from "./phone-app";
import type { DemoApp } from "./use-demo-app";

const HIDDEN_POINTER: TourPointer = { x: 0, y: 0, isVisible: false, isTapping: false };
const MOVE_MS = 800;
const TAP_MS = 260;
const TYPE_MS = 45;
const TOUR_QUESTION = assistantSuggestions[0];

type TourOptions = {
  app: DemoApp;
  screenRef: RefObject<HTMLDivElement | null>;
  scale: number;
  isRunning: boolean;
  onCaption: (caption: string) => void;
};

/**
 * Plays a scripted visit through the demo app: a finger moves to each control, taps it, and the
 * app responds. It stops for good when `isRunning` turns false, and the app keeps whatever state it
 * was in so a visitor can carry on from there.
 */
export const useAppTour = ({
  app,
  screenRef,
  scale,
  isRunning,
  onCaption,
}: TourOptions): TourPointer => {
  const [pointer, setPointer] = useState<TourPointer>(HIDDEN_POINTER);
  const appRef = useRef(app);
  const scaleRef = useRef(scale);
  const captionRef = useRef(onCaption);

  useEffect(() => {
    appRef.current = app;
    scaleRef.current = scale;
    captionRef.current = onCaption;
  });

  useEffect(() => {
    if (!isRunning) return;
    let isCancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const tap = async (target: string) => {
      const screen = screenRef.current;
      const element = screen?.querySelector(`[data-demo="${target}"]`);
      if (screen && element) {
        const screenBox = screen.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        const factor = scaleRef.current;
        setPointer({
          x: (box.left - screenBox.left + box.width / 2) / factor,
          y: (box.top - screenBox.top + box.height / 2) / factor,
          isVisible: true,
          isTapping: false,
        });
      }
      await wait(MOVE_MS);
      setPointer((current) => ({ ...current, isTapping: true }));
      await wait(TAP_MS);
      setPointer((current) => ({ ...current, isTapping: false }));
    };

    const scrollTo = (top: number) => {
      const scroller = screenRef.current?.querySelector("[data-demo-scroll]");
      if (scroller instanceof HTMLElement) scroller.scrollTo({ top, behavior: "smooth" });
    };

    const typeQuestion = async (text: string) => {
      for (let length = 1; length <= text.length; length += 1) {
        appRef.current.setDraft(text.slice(0, length));
        await wait(TYPE_MS);
      }
    };

    const play = async () => {
      while (!isCancelled) {
        const say = (caption: string) => {
          captionRef.current(caption);
        };

        appRef.current.reset();
        say("Home shows your day at a glance");
        await wait(2200);

        say("Open Attendance and check in");
        await tap("home-attendance");
        appRef.current.open("attendance");
        await wait(1000);
        await tap("attendance-toggle");
        appRef.current.toggleCheckIn();
        await wait(2800);
        await tap("back");
        appRef.current.back();
        await wait(900);

        say("See your leave and what is waiting");
        await tap("home-leave-due");
        appRef.current.open("leave");
        await wait(1400);
        await tap("leave-filter-waiting");
        appRef.current.setLeaveFilter("waiting");
        await wait(2400);

        say("Business: sales, visits and follow-ups");
        await tap("tab-business");
        appRef.current.goTab("business");
        await wait(1600);
        scrollTo(520);
        await wait(2200);
        scrollTo(1100);
        await wait(2200);

        say("My Space: leave, pay and attendance");
        await tap("tab-space");
        appRef.current.goTab("space");
        await wait(1800);
        scrollTo(420);
        await wait(1800);
        await tap("space-payslips");
        appRef.current.open("payslips");
        say("Your payslips, ready to download");
        await wait(2600);

        say("More: settings, including light and dark");
        await tap("tab-more");
        appRef.current.goTab("more");
        await wait(1600);
        await tap("theme-dark");
        appRef.current.setTheme("dark");
        await wait(2400);
        await tap("theme-light");
        appRef.current.setTheme("light");
        await wait(1200);

        say("Ask Sahayogi anything");
        await tap("tab-assistant");
        appRef.current.open("assistant");
        await wait(1400);
        await typeQuestion(TOUR_QUESTION);
        await wait(500);
        await tap("assistant-send");
        appRef.current.send(TOUR_QUESTION);
        await wait(4200);
      }
    };

    void play();

    return () => {
      isCancelled = true;
      timers.forEach((id) => {
        clearTimeout(id);
      });
    };
  }, [isRunning, screenRef]);

  return isRunning ? pointer : HIDDEN_POINTER;
};
