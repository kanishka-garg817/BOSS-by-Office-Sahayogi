"use client";

import { useState } from "react";

import { useCycle } from "@/hooks/use-cycle";

import { FlowStrip } from "../flow-strip";
import { ScaledMock } from "../scaled-mock";
import { drillLevels, ReportScreen, reportSpecs, type ReportId } from "./report-screen";

const DRILL_MOMENTS = [2400, 2400, 2400, 2400, 3000] as const;

/** Report tabs on top, the chosen report as a full screen below, and what it tells you in a line. */
export const ReportsDemo = () => {
  const [reportId, setReportId] = useState<ReportId>("pnl");
  const [ref, drillLevel] = useCycle<HTMLDivElement>(DRILL_MOMENTS);
  const selected = reportSpecs.find((spec) => spec.id === reportId) ?? reportSpecs[0];

  return (
    <div ref={ref} className="space-y-4">
      <div
        role="tablist"
        aria-label="Reports"
        className="scrollbar-none flex gap-2 overflow-x-auto py-1"
      >
        {reportSpecs.map((spec) => {
          const isSelected = spec.id === reportId;
          return (
            <button
              key={spec.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setReportId(spec.id);
              }}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${isSelected ? "border-brand-blue bg-brand-blue text-white" : "border-ink/15 bg-surface text-ink hover:border-brand-blue/50"}`}
            >
              {spec.label}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-pretty text-ink/70">
        <b className="text-ink">{selected?.label}:</b> {selected?.meaning}
      </p>
      {reportId === "pnl" ? <FlowStrip steps={drillLevels} activeStep={drillLevel} /> : null}
      <div key={reportId} className="motion-safe:animate-reveal">
        <ScaledMock
          label={`${selected?.label ?? "Report"} report screen, with sample data`}
          width={960}
          height={540}
        >
          <ReportScreen reportId={reportId} drillLevel={reportId === "pnl" ? drillLevel : 0} />
        </ScaledMock>
      </div>
    </div>
  );
};
