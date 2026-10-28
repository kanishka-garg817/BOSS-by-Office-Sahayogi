import { Check } from "lucide-react";

type FlowStripProps = {
  steps: readonly string[];
  /** The step that is happening now. Earlier steps show as done. */
  activeStep: number;
  /** Called when a visitor picks a step. Without it the strip is only a picture. */
  onSelect?: (step: number) => void;
};

/** A row of steps with a dot travelling along the link after the current one. */
export const FlowStrip = ({ steps, activeStep, onSelect }: FlowStripProps) => (
  <ol className="scrollbar-none flex items-center gap-1 overflow-x-auto py-1">
    {steps.map((step, index) => {
      const isDone = index < activeStep;
      const isActive = index === activeStep;
      const chipClass = `flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold whitespace-nowrap transition-colors ${
        isActive
          ? "border-brand-blue bg-brand-blue text-white shadow-md shadow-brand-blue/30"
          : isDone
            ? "border-brand-blue/30 bg-brand-tint text-brand-blue"
            : "border-ink/10 bg-surface text-ink/60"
      }`;
      const content = (
        <>
          {isDone ? <Check aria-hidden="true" className="size-3.5" /> : null}
          {step}
        </>
      );
      return (
        <li
          key={step}
          className="flex shrink-0 items-center gap-1"
          aria-current={isActive ? "step" : undefined}
        >
          {onSelect ? (
            <button
              type="button"
              onClick={() => {
                onSelect(index);
              }}
              className={`${chipClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue`}
            >
              {content}
            </button>
          ) : (
            <span className={chipClass}>{content}</span>
          )}
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="relative mx-1 h-px w-8 bg-ink/15 sm:w-12">
              {isActive ? (
                <span className="absolute -top-[2px] size-1.5 rounded-full bg-brand-blue motion-safe:animate-flow-dot" />
              ) : null}
              {isDone ? <span className="absolute inset-0 bg-brand-blue" /> : null}
            </span>
          ) : null}
        </li>
      );
    })}
  </ol>
);
