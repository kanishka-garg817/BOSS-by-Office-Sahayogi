"use client";

import { useEffect, useState, type ReactNode } from "react";

import type { SubnavItem } from "@/config/module-pages/types";

type ModuleSubnavProps = {
  moduleName: string;
  items: readonly SubnavItem[];
  /** Shown in the panel that opens from the item with `hasFeatureMenu`. */
  featurePanel?: ReactNode;
};

const linkClass =
  "relative flex min-h-11 items-center px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-white";

/**
 * A blue bar under the site header, with the module's name on the left and a few links on the
 * right. It stays in view while the page scrolls and marks the section being read.
 */
export const ModuleSubnav = ({ moduleName, items, featurePanel }: ModuleSubnavProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = items.filter((item) => visible.has(item.id)).at(-1);
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    for (const item of items) {
      if (item.href) continue;
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <div className="sticky top-16 z-40 bg-brand-blue text-white shadow-md shadow-brand-blue/20 lg:top-[4.5rem] dark:bg-brand-navy">
      <div
        onMouseLeave={() => {
          setIsMenuOpen(false);
        }}
        className="relative mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <p className="shrink-0 text-base font-extrabold whitespace-nowrap">{moduleName}</p>
        <nav
          aria-label={`${moduleName} sections`}
          className="-mr-4 scrollbar-none overflow-x-auto pr-4 sm:mr-0 sm:pr-0 lg:overflow-visible"
        >
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = item.isCurrent === true || (!item.href && item.id === activeId);
              const hasMenu = item.hasFeatureMenu === true && featurePanel !== undefined;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={item.href ?? `#${item.id}`}
                    aria-current={item.isCurrent ? "page" : isActive ? "location" : undefined}
                    {...(hasMenu ? { "aria-haspopup": true, "aria-expanded": isMenuOpen } : {})}
                    onMouseEnter={() => {
                      setIsMenuOpen(hasMenu);
                    }}
                    onFocus={() => {
                      setIsMenuOpen(hasMenu);
                    }}
                    className={`${linkClass} ${isActive || (hasMenu && isMenuOpen) ? "font-bold text-white" : "text-white hover:underline"}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-white transition-opacity ${isActive || (hasMenu && isMenuOpen) ? "opacity-100" : "opacity-0"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {isMenuOpen && featurePanel ? (
          <div
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="absolute top-full right-4 z-50 hidden w-[52rem] max-w-[calc(100vw-2rem)] rounded-b-2xl border border-t-0 border-ink/10 bg-surface p-4 text-ink shadow-2xl shadow-brand-navy/25 motion-safe:animate-reveal sm:right-6 lg:right-8 lg:block"
          >
            {featurePanel}
          </div>
        ) : null}
      </div>
    </div>
  );
};
