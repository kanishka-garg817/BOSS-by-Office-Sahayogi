"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { ChevronDownIcon } from "./chevron-down-icon";

type NavDropdownProps = {
  label: string;
  /** Width and any other classes for the panel's card. */
  panelClassName: string;
  /** The panel's content. `close` hides the panel, for links that navigate. */
  children: (close: () => void) => ReactNode;
};

/** A desktop nav item that opens a panel on hover, click or keyboard, and closes on Escape or an outside click. */
export const NavDropdown = ({ label, panelClassName, children }: NavDropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isOpen = isHovered || isPinned;
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsPinned(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsHovered(false);
      setIsPinned(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const close = () => {
    setIsHovered(false);
    setIsPinned(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          setIsPinned((pinned) => !pinned);
        }}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-brand-tint hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue ${isOpen ? "bg-brand-tint text-brand-blue" : "text-ink"}`}
      >
        {label}
        <ChevronDownIcon
          className={`size-4 shrink-0 opacity-70 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Padding (not margin) bridges the gap to the button so hover is not lost in between. */}
      <div id={panelId} hidden={!isOpen} className="absolute top-full left-0 pt-3">
        <div
          className={`rounded-2xl border border-slate-200 bg-surface p-3 shadow-xl ${panelClassName}`}
        >
          {children(close)}
        </div>
      </div>
    </div>
  );
};
