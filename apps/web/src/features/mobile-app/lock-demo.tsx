"use client";

import { Fingerprint } from "lucide-react";

import { useCycle } from "@/hooks/use-cycle";

const LOCK_MOMENTS = [1800, 2000, 2600] as const;
const LABELS = ["App locked", "Checking your fingerprint", "Welcome back"] as const;

/** The app lock at work: locked, checking a fingerprint, then unlocked. */
export const LockDemo = () => {
  const [ref, step] = useCycle<HTMLDivElement>(LOCK_MOMENTS);
  const isUnlocked = step === 2;
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-ink/10">
        <Fingerprint
          aria-hidden="true"
          className={`size-10 transition-colors duration-500 ${isUnlocked ? "text-emerald-500" : "text-brand-blue"}`}
        />
        {step === 1 ? (
          <span
            aria-hidden="true"
            className="absolute top-2 h-0.5 w-12 rounded-full bg-brand-blue shadow-md shadow-brand-blue motion-safe:animate-scan"
          />
        ) : null}
      </span>
      <p
        aria-live="polite"
        className={`text-lg font-bold transition-colors duration-500 ${isUnlocked ? "text-emerald-600" : "text-ink"}`}
      >
        {LABELS[step] ?? ""}
      </p>
    </div>
  );
};
