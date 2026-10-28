import { useEffect, useRef, useState, type RefObject } from "react";

import { ASSISTANT_STEP, TOUR_QUESTION, tourSteps } from "./dashboard-tour";
import type { AssistantChat } from "./use-assistant-chat";

export type TourView = {
  highlight: { x: number; y: number; width: number; height: number };
  cursor: { x: number; y: number };
  label: string;
  description: string;
  side: "left" | "right";
  vertical: "above" | "below";
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
};

/**
 * A cursor that glides over the dashboard on its own, highlighting each area and explaining it,
 * and finally asking the assistant a question. It stops when `isRunning` turns false.
 */
export const useDashboardTour = ({
  boxRef,
  chat,
  isRunning,
  onAssistantOpen,
}: TourOptions): TourView | null => {
  const [view, setView] = useState<TourView | null>(null);
  const chatRef = useRef(chat);
  const openRef = useRef(onAssistantOpen);

  useEffect(() => {
    chatRef.current = chat;
    openRef.current = onAssistantOpen;
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
      return { x: left, y: top, width: right - left, height: bottom - top };
    };

    const point = (
      target: string,
      label: string,
      description: string,
      anchor: { x: number; y: number },
      side: "left" | "right",
      vertical: "above" | "below",
    ) => {
      const area = measure(target);
      if (!area) return;
      setView({
        highlight: area,
        cursor: { x: area.x + area.width * anchor.x, y: area.y + area.height * anchor.y },
        label,
        description,
        side,
        vertical,
      });
    };

    const play = async () => {
      while (!isCancelled) {
        // Close the panel and let the dashboard widen again before pointing at anything.
        setView(null);
        chatRef.current.reset();
        openRef.current(false);
        await wait(PANEL_MS + 200);
        for (const step of tourSteps) {
          point(step.target, step.label, step.description, step.anchor, step.side, step.vertical);
          await wait(STEP_MS);
        }

        // Clear the outline before the panel opens, so it cannot sit over the panel while the
        // dashboard narrows to make room.
        setView(null);
        openRef.current(true);
        await wait(MOVE_MS);
        point(
          ASSISTANT_STEP.target,
          ASSISTANT_STEP.label,
          ASSISTANT_STEP.description,
          { x: 0.02, y: 0.9 },
          "left",
          "above",
        );
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
