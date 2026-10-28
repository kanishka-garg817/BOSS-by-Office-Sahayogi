"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { featuredModules } from "@/config/modules";
import { viewAllModulesAction, type NavItem } from "@/config/navigation";

import { ChevronDownIcon } from "./chevron-down-icon";
import { ModuleLink } from "./module-link";

type MobileMenuProps = {
  items: readonly NavItem[];
  primaryAction: NavItem;
};

const linkClass =
  "focus-visible:outline-brand-blue flex min-h-11 items-center justify-between rounded-md px-3 text-base font-medium text-ink hover:bg-brand-tint focus-visible:outline-2";

/** Hamburger toggle and dropdown panel for viewports below `lg`. */
export const MobileMenu = ({ items, primaryAction }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const panelId = useId();
  const modulesPanelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-blue"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-surface px-4 pt-2 pb-6 shadow-lg"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                {item.menu === "modules" ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isModulesOpen}
                      aria-controls={modulesPanelId}
                      className={`${linkClass} w-full`}
                      onClick={() => {
                        setIsModulesOpen((open) => !open);
                      }}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`size-5 shrink-0 opacity-70 transition-transform ${isModulesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div id={modulesPanelId} hidden={!isModulesOpen} className="pb-2 pl-2">
                      <ul>
                        {featuredModules.map((bossModule) => (
                          <li key={bossModule.slug}>
                            <ModuleLink module={bossModule} onNavigate={closeMenu} />
                          </li>
                        ))}
                      </ul>
                      <a
                        href={viewAllModulesAction.href}
                        onClick={closeMenu}
                        className="mt-1 flex min-h-11 items-center justify-between rounded-lg bg-brand-tint px-4 text-sm font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
                      >
                        {viewAllModulesAction.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </>
                ) : null}
                {item.menu === undefined ? (
                  <a href={item.href} className={linkClass} onClick={closeMenu}>
                    {item.label}
                    {item.isPlain ? null : (
                      <ChevronDownIcon className="size-5 shrink-0 opacity-70" />
                    )}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex flex-col gap-3">
          <ButtonLink action={primaryAction} onClick={closeMenu} />
        </div>
      </div>
    </div>
  );
};
