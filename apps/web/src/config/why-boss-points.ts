import {
  BellRing,
  Gauge,
  Layers,
  MessageCircleQuestion,
  Repeat,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Point = { id: string; icon: LucideIcon; title: string; detail: string };

/** Why a business needs one connected system, in plain words. */
export const reasons: readonly Point[] = [
  {
    id: "one-place",
    icon: Layers,
    title: "Stop running the business from many places",
    detail:
      "Orders, stock, accounts and people often sit in separate files and apps. BoSS keeps them in one system.",
  },
  {
    id: "whole-view",
    icon: Gauge,
    title: "See the whole business at once",
    detail:
      "One dashboard shows sales, stock and payments as they stand, so you do not wait for a report.",
  },
  {
    id: "type-once",
    icon: Repeat,
    title: "Stop typing the same thing twice",
    detail: "Enter it once and every team that needs it can see it.",
  },
  {
    id: "grow",
    icon: Rocket,
    title: "Start small, grow when ready",
    detail: "Begin with the one module you need and connect more as your business grows.",
  },
];

/** How BoSS helps day to day. */
export const helps: readonly Point[] = [
  {
    id: "answers",
    icon: MessageCircleQuestion,
    title: "Answers your everyday questions",
    detail:
      "Where is this order? How much stock is left? Who has not paid? Find out in a few clicks, without calling around.",
  },
  {
    id: "solves",
    icon: BellRing,
    title: "Catches problems early",
    detail:
      "Low-stock alerts and payment reminders point out what needs your attention before it turns into a loss.",
  },
  {
    id: "easier",
    icon: Sparkles,
    title: "Makes the work easier",
    detail:
      "Fewer files, fewer hand-offs and less re-entry, so your team spends its time on real work.",
  },
];
