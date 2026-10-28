"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { ModuleIcon } from "@/components/ui/module-icon";
import { modules } from "@/config/modules";
import { useFadeSwap } from "@/hooks/use-fade-swap";

import { type Workflow, workflows } from "./module-workflows-data";

/** How long the current workflow takes to fade out before the next one appears. */
const FADE_OUT_MS = 150;
const STEP_DELAY_MS = 220;
const LINE_EXTRA_DELAY_MS = 200;
const PULSE_EXTRA_DELAY_MS = 550;
const ARRIVE_EXTRA_DELAY_MS = 500;

/** How wide each row of the small preview is drawn, so the rows look like real content. */
const previewBarWidths = ["w-16", "w-10", "w-12"] as const;

const firstWorkflow = workflows[0];

type StepData = Workflow["steps"][number];

const StepIcon = ({ step }: { step: StepData }) => {
  if ("moduleSlug" in step) {
    const bossModule = modules.find((candidate) => candidate.slug === step.moduleSlug);
    return bossModule ? <ModuleIcon module={bossModule} /> : null;
  }
  const Icon = step.icon;
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink/70"
    >
      <Icon className="size-5" strokeWidth={2} />
    </span>
  );
};

const StepPreview = ({ rows }: { rows: StepData["preview"] }) => (
  <div aria-hidden="true" className="space-y-2 rounded-lg border border-ink/10 bg-canvas p-3">
    {rows.map((row, index) => (
      <div key={row} className="flex items-center justify-between gap-3 text-xs text-ink/60">
        <span className="truncate">{row}</span>
        <span
          className={`h-1.5 shrink-0 rounded-full ${previewBarWidths[index]} ${index === rows.length - 1 ? "bg-brand-blue/30" : "bg-ink/15"}`}
        />
      </div>
    ))}
  </div>
);

const Connector = ({ index }: { index: number }) => {
  const lineDelay = `${String(index * STEP_DELAY_MS + LINE_EXTRA_DELAY_MS)}ms`;
  const pulseDelay = `${String(index * STEP_DELAY_MS + PULSE_EXTRA_DELAY_MS)}ms`;
  return (
    <li
      aria-hidden="true"
      className="relative flex h-10 w-full shrink-0 items-center justify-center lg:h-auto lg:w-12"
    >
      <span className="absolute inset-y-0 left-1/2 w-px bg-ink/10 lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:left-0 lg:h-px lg:w-full" />
      <span
        style={{ animationDelay: lineDelay }}
        className="absolute inset-y-0 left-1/2 w-px origin-top bg-brand-blue/50 motion-safe:animate-workflow-draw-y lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:left-0 lg:h-px lg:w-full lg:origin-left motion-safe:lg:animate-workflow-draw-x"
      />
      <span className="relative flex size-6 items-center justify-center rounded-full bg-surface text-brand-blue ring-1 ring-ink/10">
        <ArrowDown className="size-3.5 lg:hidden" />
        <ArrowRight className="hidden size-3.5 lg:block" />
      </span>
      <span
        style={{ animationDelay: pulseDelay }}
        className="absolute size-1.5 rounded-full bg-brand-blue opacity-0 motion-safe:animate-workflow-pulse-y motion-safe:lg:animate-workflow-pulse-x"
      />
    </li>
  );
};

/**
 * Four examples of a business process moving through several modules. Choosing one fades the current
 * example out, then brings its steps in from left to right, drawing the path between them. After that
 * the picture stays still.
 */
export const ModuleWorkflows = () => {
  const { selected, shown, isLeaving, select } = useFadeSwap(firstWorkflow?.id, FADE_OUT_MS);
  const workflow = workflows.find((candidate) => candidate.id === shown) ?? firstWorkflow;

  return (
    <>
      <div role="group" aria-label="Choose a business process" className="flex flex-wrap gap-2">
        {workflows.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === item.id}
            onClick={() => {
              select(item.id);
            }}
            className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${selected === item.id ? "border-brand-blue bg-brand-blue text-white" : "border-ink/15 bg-surface text-ink/75 hover:border-ink/30"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {workflow ? (
        <ol
          key={workflow.id}
          aria-live="polite"
          aria-label={`Steps in ${workflow.label}`}
          className={`mt-10 flex flex-col items-center transition-opacity duration-150 lg:flex-row lg:items-stretch ${isLeaving ? "opacity-0" : "opacity-100"}`}
        >
          {workflow.steps.map((step, index) => {
            const isLast = index === workflow.steps.length - 1;
            return (
              <Fragment key={step.name}>
                <li
                  style={{ animationDelay: `${String(index * STEP_DELAY_MS)}ms` }}
                  className="relative w-full max-w-sm min-w-0 motion-safe:animate-workflow-step lg:max-w-none lg:flex-1"
                >
                  <div
                    className={`flex h-full flex-col gap-4 rounded-2xl border bg-surface p-5 shadow-sm transition duration-200 hover:border-brand-blue/40 hover:shadow-md motion-safe:hover:-translate-y-0.5 ${isLast ? "border-brand-blue/30" : "border-ink/10"}`}
                  >
                    <div className="flex items-center justify-between">
                      <StepIcon step={step} />
                      <span className="text-sm font-semibold text-ink/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{step.name}</h3>
                      <p className="mt-1 text-sm text-pretty text-ink/75">{step.description}</p>
                    </div>
                    <div className="mt-auto">
                      <StepPreview rows={step.preview} />
                    </div>
                  </div>
                  {isLast ? (
                    <span
                      aria-hidden="true"
                      style={{
                        animationDelay: `${String(index * STEP_DELAY_MS + ARRIVE_EXTRA_DELAY_MS)}ms`,
                      }}
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-4 ring-brand-blue/15 motion-safe:animate-workflow-arrive"
                    />
                  ) : null}
                </li>
                {isLast ? null : <Connector index={index} />}
              </Fragment>
            );
          })}
        </ol>
      ) : null}

      <div className="mt-14 max-w-2xl">
        <p className="text-lg font-semibold text-ink">
          One business process. Multiple connected functions.
        </p>
        <p className="mt-2 text-sm text-pretty text-ink/70">
          BoSS helps bring the information your teams need together, so your business can work from
          one connected platform.
        </p>
        <p className="mt-4 text-xs text-ink/60">
          An example of a connected workflow, shown for illustration. The previews are simplified.
        </p>
      </div>
    </>
  );
};
