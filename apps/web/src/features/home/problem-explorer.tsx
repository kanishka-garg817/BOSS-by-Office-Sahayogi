"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { Unlink } from "lucide-react";

import { MiniWindow } from "@/components/product/mini-window";
import { problemFlows } from "./problem-data";

/** "Where does your business get stuck?" — five cards; the chosen one shows its broken chain of tools. */
export const ProblemExplorer = () => {
  const baseId = useId();
  const [activeId, setActiveId] = useState<string>(problemFlows[0].id);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeIndex = Math.max(
    0,
    problemFlows.findIndex((flow) => flow.id === activeId),
  );
  const flow = problemFlows[activeIndex] ?? problemFlows[0];

  const moveTo = (index: number) => {
    const next = problemFlows[(index + problemFlows.length) % problemFlows.length];
    if (!next) return;
    setActiveId(next.id);
    cardRefs.current.get(next.id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number | undefined> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: problemFlows.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    moveTo(target);
  };

  return (
    <div>
      <h3 className="text-center text-xl font-extrabold tracking-tight text-ink sm:text-2xl lg:text-3xl">
        Where does your business get stuck?
      </h3>

      <div
        role="tablist"
        aria-label="Areas of your business"
        onKeyDown={onKeyDown}
        className="mt-5 grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-5"
      >
        {problemFlows.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(element) => {
                if (element) cardRefs.current.set(item.id, element);
                else cardRefs.current.delete(item.id);
              }}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                setActiveId(item.id);
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActiveId(item.id);
              }}
              className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:px-4 ${
                index === problemFlows.length - 1 ? "col-span-2 lg:col-span-1" : ""
              } ${
                isActive
                  ? "-translate-y-0.5 border-ink bg-brand-navy text-white shadow-xl shadow-brand-navy/25"
                  : "border-ink/10 bg-surface text-ink opacity-55 hover:opacity-100"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? "bg-white/15" : "bg-brand-tint text-brand-blue"}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-sm leading-tight font-bold sm:text-base">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${flow.id}`}
        className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-linear-to-b from-slate-50 to-surface px-3 py-6 sm:px-5 sm:py-8 lg:px-6"
      >
        <ol key={flow.id} className="grid gap-3 lg:grid-cols-6">
          {flow.nodes.map((node, index) => (
            <li
              key={node.title}
              className={`flex flex-col motion-safe:animate-reveal ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span
                  className={`flex items-center gap-1.5 text-sm font-semibold ${index === 0 ? "text-ink/60" : "text-red-700"}`}
                >
                  {index > 0 ? <Unlink className="size-3.5" aria-hidden="true" /> : null}
                  {node.handoff}
                </span>
              </div>
              <div className="flex-1">
                <MiniWindow title={node.title} content={node.content} />
              </div>
            </li>
          ))}
        </ol>

        <div key={`${flow.id}-result`} className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8">
          <p className="text-sm font-semibold tracking-wide text-ink/60 uppercase">
            What it costs you
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {flow.results.map((result, index) => (
              <li
                key={result}
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 ring-1 ring-red-200 motion-safe:animate-reveal sm:text-base"
                style={{ animationDelay: `${600 + index * 120}ms` }}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
