export type Tab = "home" | "business" | "space" | "more";

export type Detail = "attendance" | "leave" | "payslips" | "claim" | "assistant";

export type Route = { tab: Tab; detail: Detail | null };

export type ThemeChoice = "system" | "light" | "dark";

export type ChatMessage = { id: number; from: "user" | "bot"; text: string };

/** What a screen needs to move around the demo app. */
export type Nav = {
  goTab: (tab: Tab) => void;
  open: (detail: Detail) => void;
  back: () => void;
};
