"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { type ModuleTone } from "@/config/modules";
import { bookDemoAction } from "@/config/navigation";

import { capabilities, toneOf, type Capability } from "./capabilities-data";

/** Icon colour on hover, matching each module's colour in the Modules menu. */
const hoverTone = {
  green: "group-hover:text-emerald-600",
  blue: "group-hover:text-blue-600",
  pink: "group-hover:text-pink-600",
  orange: "group-hover:text-orange-600",
  purple: "group-hover:text-violet-600",
  teal: "group-hover:text-teal-600",
  red: "group-hover:text-red-600",
  indigo: "group-hover:text-indigo-600",
  amber: "group-hover:text-amber-600",
  sky: "group-hover:text-sky-600",
} as const satisfies Record<ModuleTone, string>;

const ROW_COUNT = 6;

/** Rows that run beside the four large tiles, not behind them: the second to the fifth. */
const isBesideTiles = (rowIndex: number): boolean => rowIndex >= 1 && rowIndex <= 4;

/** Seconds one full pass of a row takes. Each row differs a little so they never move in step. */
const ROW_DURATIONS_S = [70, 85, 62, 78, 92, 66] as const;

/** Deals the tiles out to the rows one by one, so neighbouring rows hold different features. */
const dealToRows = (): readonly (readonly Capability[])[] =>
  Array.from({ length: ROW_COUNT }, (_, row) =>
    capabilities.filter((_, index) => index % ROW_COUNT === row),
  );

const rows = dealToRows();

type TileProps = { capability: Capability; onOpen: () => void; isExposed: boolean };

const Tile = ({ capability, onOpen, isExposed }: TileProps) => {
  const Icon = capability.icon;
  return (
    <li
      className="h-full w-32 shrink-0 border-r border-ink/10 bg-surface sm:w-36"
      {...(isExposed ? {} : { "aria-hidden": true, inert: true })}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={onOpen}
        className="group flex size-full flex-col items-center justify-center gap-2 px-2 py-4 text-center transition-colors duration-300 hover:bg-brand-tint/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue lg:gap-2.5 lg:py-0 xl:gap-3"
      >
        <Icon
          className={`size-6 text-ink/55 transition-colors duration-300 lg:size-7 ${hoverTone[toneOf(capability)]}`}
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <span className="text-xs leading-snug font-medium text-ink/75 sm:text-sm">
          {capability.label}
        </span>
      </button>
    </li>
  );
};

/**
 * The everyday features as rows that drift without end, the first from right to left, the second
 * from left to right, and so on. Hovering a row pauses it, so a tile can be chosen. Choosing one opens a
 * window over a blurred page that invites the visitor to book a demo.
 */
export const CapabilityMarquee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) dialog.showModal();
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="border-y border-ink/10">
        {rows.map((row, rowIndex) => (
          <div
            key={row[0]?.label ?? String(rowIndex)}
            className={`capability-marquee capability-row overflow-hidden border-b border-ink/10 last:border-b-0 ${isBesideTiles(rowIndex) ? "lg:capability-side-clip" : ""}`}
          >
            <ul
              className="capability-track flex h-full w-max motion-safe:animate-marquee"
              style={{
                animationDuration: `${String(ROW_DURATIONS_S[rowIndex] ?? 70)}s`,
                animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse",
                animationDelay: `-${String(rowIndex * 11)}s`,
              }}
            >
              {[0, 1, 2, 3].map((copy) =>
                row.map((capability) => (
                  <Tile
                    key={`${String(copy)}-${capability.label}`}
                    capability={capability}
                    onOpen={open}
                    isExposed={copy === 0}
                  />
                )),
              )}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setIsOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-11/12 max-w-md rounded-3xl border border-ink/10 bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:motion-safe:animate-reveal"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              dialogRef.current?.close();
            }}
            className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-ink/60 hover:bg-brand-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <h2 id={titleId} className="pr-8 text-2xl font-extrabold tracking-tight text-ink">
            Want to know more about this?
          </h2>
          <p className="mt-3 text-base text-pretty text-ink/75">
            Book a demo and we will show you how it works for your business.
          </p>
          <ButtonLink action={bookDemoAction} size="lg" className="mt-6 w-full" />
        </div>
      </dialog>
    </>
  );
};
