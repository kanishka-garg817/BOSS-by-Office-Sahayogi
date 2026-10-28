import { Check, Loader2 } from "lucide-react";

import { bankLines } from "@/config/module-pages/finance-demo-data";

import { formatRupees } from "../format";
import { FinanceFrame, MockCard, Pill, riseDelay } from "./mock-parts";

/** 0 bank entry arrives, 1 matching, 2 verify, 3 reconciled. */
export type ReconcileStage = number;

const statusFor = (stage: ReconcileStage) => {
  if (stage === 3) {
    return (
      <Pill tone="green">
        <Check aria-hidden="true" className="size-2.5" />
        Reconciled
      </Pill>
    );
  }
  if (stage === 2) return <Pill tone="violet">Verify match</Pill>;
  if (stage === 1) {
    return (
      <Pill tone="blue">
        <Loader2 aria-hidden="true" className="size-2.5 motion-safe:animate-spin" />
        Matching
      </Pill>
    );
  }
  return <Pill tone="amber">Unmatched</Pill>;
};

export const ReconcileScreen = ({ stage }: { stage: ReconcileStage }) => (
  <FinanceFrame active="banking" title="Bank Reconciliation">
    <div className="grid h-full grid-cols-2 gap-3">
      <MockCard className="p-3.5">
        <h4 className="text-xs font-bold">Bank statement</h4>
        <ul className="mt-2.5 space-y-2">
          {bankLines.map((line, index) => (
            <li
              key={line.id}
              className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[11px] transition-colors duration-500 ${
                index === 0 && stage === 3
                  ? "border-app-green/40 bg-app-green-soft/40"
                  : "border-app-line"
              }`}
            >
              <span className="leading-tight">
                <span className="block font-semibold">{line.text}</span>
                <span className="text-[10px] text-app-muted">{line.date}</span>
              </span>
              <span className="flex flex-col items-end gap-1">
                <span
                  className={`font-bold tabular-nums ${line.amount < 0 ? "text-app-red" : "text-app-green"}`}
                >
                  {formatRupees(line.amount)}
                </span>
                {index === 0 ? statusFor(stage) : <Pill tone="gray">Unmatched</Pill>}
              </span>
            </li>
          ))}
        </ul>
      </MockCard>
      <MockCard className="p-3.5">
        <h4 className="text-xs font-bold">Your books</h4>
        <ul className="mt-2.5 space-y-2">
          {[
            { id: "r1", text: "Receipt · INV-1042 · Demo Traders", date: "12 Nov", amount: 125000 },
            { id: "r2", text: "Receipt · INV-1036 · Demo Retail", date: "11 Nov", amount: 64000 },
            { id: "r3", text: "Bill · BILL-2210 · Demo Supplies", date: "11 Nov", amount: -48500 },
          ].map((entry, index) => (
            <li
              key={entry.id}
              style={riseDelay(index)}
              className={`flex mock-rise items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[11px] transition-colors duration-500 ${
                index === 0 && stage >= 1
                  ? "border-app-blue bg-app-blue-soft/50"
                  : "border-app-line"
              }`}
            >
              <span className="leading-tight">
                <span className="block font-semibold">{entry.text}</span>
                <span className="text-[10px] text-app-muted">{entry.date}</span>
              </span>
              <span className="flex flex-col items-end gap-1">
                <span
                  className={`font-bold tabular-nums ${entry.amount < 0 ? "text-app-red" : "text-app-green"}`}
                >
                  {formatRupees(entry.amount)}
                </span>
                {index === 0 && stage >= 1 ? <Pill tone="blue">Match found</Pill> : null}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-app-muted">
          Reconciled:{" "}
          <b className="text-app-ink">
            {stage === 3 ? 1 : 0} of {bankLines.length}
          </b>{" "}
          bank entries
        </p>
      </MockCard>
    </div>
  </FinanceFrame>
);
