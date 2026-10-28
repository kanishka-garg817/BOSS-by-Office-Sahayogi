"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import type { financeFeaturesPath } from "@/config/module-pages/finance-accounting";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type CarouselGroup = {
  id: string;
  name: string;
  summary: string;
  /** The group's picture, drawn by the page so it can be passed in. */
  illustration: ReactNode;
  capabilities: readonly { id: string; name: string }[];
};

type GroupCarouselProps = {
  groups: readonly CarouselGroup[];
  /** The page that explains the groups in full. */
  detailsPath: typeof financeFeaturesPath;
};

/** Three cards fill a laptop row, two a tablet and one a phone, each the same width. */
const cardSizeClass =
  "basis-full sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]";

/** The space between cards, in pixels. It matches the gap-5 on the row. */
const CARD_GAP = 20;

const arrowButtonClass =
  "flex size-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/30 transition hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";

const GroupCard = ({
  group,
  number,
  detailsPath,
}: {
  group: CarouselGroup;
  number: number;
  detailsPath: GroupCarouselProps["detailsPath"];
}) => (
  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm">
    <div className="relative h-52 bg-brand-tint px-8 py-5">
      {group.illustration}
      <span className="absolute top-4 left-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2.5 text-xs font-bold text-black tabular-nums shadow-sm">
        {String(number).padStart(2, "0")}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="min-h-14 text-xl leading-7 font-bold text-ink">{group.name}</h3>
      <p className="mt-1 min-h-12 text-sm text-pretty text-ink/70">{group.summary}</p>
      <ul className="mt-4 space-y-0.5 border-t border-ink/10 pt-3">
        {group.capabilities.map((capability) => (
          <li key={capability.id}>
            <Link
              href={`${detailsPath}#${capability.id}`}
              className="flex min-h-9 items-center gap-2.5 rounded-lg px-2 text-sm font-medium text-ink transition-colors hover:bg-brand-tint hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
              {capability.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`${detailsPath}#${group.id}`}
        className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        See this group
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  </div>
);

/** The groups side by side in one row. The arrows move to the next cards; a swipe works too. */
export const GroupCarousel = ({ groups, detailsPath }: GroupCarouselProps) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const isReducedMotion = usePrefersReducedMotion();
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrevious(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !(firstCard instanceof HTMLElement)) return;
    track.scrollBy({
      left: direction * (firstCard.offsetWidth + CARD_GAP),
      behavior: isReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative mt-12">
      <ul
        ref={trackRef}
        onScroll={update}
        aria-label="Feature groups"
        className="flex items-stretch gap-5 overflow-x-hidden"
      >
        {groups.map((group, index) => (
          <li key={group.id} className={`shrink-0 ${cardSizeClass}`}>
            <GroupCard group={group} number={index + 1} detailsPath={detailsPath} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Previous group"
        disabled={!canPrevious}
        onClick={() => {
          move(-1);
        }}
        className={`${arrowButtonClass} absolute top-1/2 left-2 z-10 -translate-y-1/2 lg:-left-6`}
      >
        <ArrowLeft aria-hidden="true" className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next group"
        disabled={!canNext}
        onClick={() => {
          move(1);
        }}
        className={`${arrowButtonClass} absolute top-1/2 right-2 z-10 -translate-y-1/2 lg:-right-6`}
      >
        <ArrowRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
};
