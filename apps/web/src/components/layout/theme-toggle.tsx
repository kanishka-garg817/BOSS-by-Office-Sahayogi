"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

const THEME_EVENT = "boss-themechange";

type Theme = "light" | "dark";

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
  };
};

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const getServerTheme = (): Theme => "light";

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts until the page is closed.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
};

/** Switches the site between its light and dark themes. The choice is remembered. */
export const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="flex size-10 items-center justify-center rounded-lg text-ink/70 transition-colors hover:bg-brand-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
};
