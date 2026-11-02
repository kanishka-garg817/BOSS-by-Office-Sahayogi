import { useEffect, useRef, useState, type RefObject } from "react";

import { ASSISTANT_STEP, MORE_MODULES_STEP, TOUR_QUESTION, tourSteps } from "./dashboard-tour";
import type { AssistantChat } from "./use-assistant-chat";

export type TourView = {
  highlight: { x: number; y: number; width: number; height: number };
  cursor: { x: number; y: number };
  /** The size of the picture the areas are measured in. */
  box: { width: number; height: number };
  label: string;
  description: string;
};

const STEP_MS = 3800;
const EDGE_INSET = 3;
/** How long the assistant panel takes to open or close. */
const PANEL_MS = 500;
const MOVE_MS = 900;
const TYPE_MS = 55;

type TourOptions = {
  boxRef: RefObject<HTMLDivElement | null>;
  chat: AssistantChat;
  isRunning: boolean;
  /** Opens or closes the assistant panel. */
  onAssistantOpen: (isOpen: boolean) => void;
  /** Opens or closes the window of the remaining modules. */
  onMoreOpen: (isOpen: boolean) => void;
};

/** How long the cursor rests on the "more" button before it clicks. */
const CLICK_PAUSE_MS = 1100;

/**
 * A cursor that glides over the dashboard on its own, highlighting each area and explaining it,
 * and finally asking the assistant a question. It stops when `isRunning` turns false.
 */
export const useDashboardTour = ({
  boxRef,
  chat,
  isRunning,
  onAssistantOpen,
  onMoreOpen,
}: TourOptions): TourView | null => {
  const [view, setView] = useState<TourView | null>(null);
  const chatRef = useRef(chat);
  const openRef = useRef(onAssistantOpen);
  const moreRef = useRef(onMoreOpen);

  useEffect(() => {
    chatRef.current = chat;
    openRef.current = onAssistantOpen;
    moreRef.current = onMoreOpen;
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

    const measure = (target: string) => {
      const box = boxRef.current;
      const element = box?.querySelector(`[data-tour="${target}"]`);
      if (!box || !element) return null;
      const boxRect = box.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      // Keep the outline fully inside the picture, so an area at its edge is outlined on every side.
      const left = Math.max(EDGE_INSET, rect.left - boxRect.left);
      const top = Math.max(EDGE_INSET, rect.top - boxRect.top);
      const right = Math.min(boxRect.width - EDGE_INSET, rect.right - boxRect.left);
      const bottom = Math.min(boxRect.height - EDGE_INSET, rect.bottom - boxRect.top);
      return {
        area: { x: left, y: top, width: right - left, height: bottom - top },
        box: { width: boxRect.width, height: boxRect.height },
      };
    };

    const point = (
      target: string,
      label: string,
      description: string,
      anchor: { x: number; y: number },
    ) => {
      const measured = measure(target);
      if (!measured) return;
      const { area, box } = measured;
      setView({
        highlight: area,
        cursor: { x: area.x + area.width * anchor.x, y: area.y + area.height * anchor.y },
        box,
        label,
        description,
      });
    };

    const play = async () => {
      while (!isCancelled) {
        // Close the panel and let the dashboard widen again before pointing at anything.
        setView(null);
        chatRef.current.reset();
        openRef.current(false);
        moreRef.current(false);
        await wait(PANEL_MS + 200);
        for (const step of tourSteps) {
          point(step.target, step.label, step.description, step.anchor);
          await wait(STEP_MS);
          if (step.target === "modules") {
            // The cursor goes to the "more" button, clicks it, and the remaining modules open.
            const { button, window } = MORE_MODULES_STEP;
            point(button.target, button.label, button.description, button.anchor);
            await wait(MOVE_MS + CLICK_PAUSE_MS);
            moreRef.current(true);
            await wait(MOVE_MS / 3);
            point(window.target, window.label, window.description, window.anchor);
            await wait(STEP_MS);
            moreRef.current(false);
            await wait(MOVE_MS / 3);
          }
        }

        // Clear the outline before the panel opens, so it cannot sit over the panel while the
        // dashboard narrows to make room.
        setView(null);
        openRef.current(true);
        await wait(MOVE_MS);
        point(ASSISTANT_STEP.target, ASSISTANT_STEP.label, ASSISTANT_STEP.description, {
          x: 0.02,
          y: 0.9,
        });
        await wait(MOVE_MS + 400);
        for (let length = 1; length <= TOUR_QUESTION.length; length += 1) {
          chatRef.current.setDraft(TOUR_QUESTION.slice(0, length));
          await wait(TYPE_MS);
        }
        await wait(400);
        chatRef.current.send(TOUR_QUESTION);
        await wait(STEP_MS + 1200);
      }
    };

    void play();

    return () => {
      isCancelled = true;
      timers.forEach((id) => {
        clearTimeout(id);
      });
    };
  }, [isRunning, boxRef]);

  return isRunning ? view : null;
};
