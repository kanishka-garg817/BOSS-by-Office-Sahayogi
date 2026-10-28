import { BellRing, Check } from "lucide-react";

import { payableBuckets, receivableBuckets } from "@/config/module-pages/finance-demo-data";

import { formatLakh, formatRupees } from "../format";
import { BarRow, FinanceFrame, MockCard, Pill } from "./mock-parts";

/** 0 invoice due, 1 reminder sent, 2 payment received, 3 outstanding updated. */
export type OutstandingStage = number;

/** The payment that comes in during the walk-through, in lakh rupees. */
const PAYMENT_LAKH = 1.25;

const stageBuckets = (stage: OutstandingStage) =>
  receivableBuckets.map((bucket) => ({
    ...bucket,
    lakh: stage >= 3 && bucket.id === "d30" ? bucket.lakh - PAYMENT_LAKH : bucket.lakh,
  }));

const invoicePill = (stage: OutstandingStage) => {
  if (stage >= 2) return <Pill tone="green">Paid</Pill>;
  if (stage === 1) return <Pill tone="blue">Reminder sent</Pill>;
  return <Pill tone="red">Due</Pill>;
};

/** Receivables and payables side by side, with an invoice moving from due to paid. */
export const OutstandingScreen = ({ stage }: { stage: OutstandingStage }) => {
  const receivables = stageBuckets(stage);
  const receivableTotal = receivables.reduce((sum, bucket) => sum + bucket.lakh, 0);
  const payableTotal = payableBuckets.reduce((sum, bucket) => sum + bucket.lakh, 0);

  return (
    <FinanceFrame active="receivables" title="Receivables & Payables">
      <div className="relative grid h-full grid-cols-2 gap-3">
        <MockCard className="p-4">
          <p className="text-[11px] text-app-muted">Total Outstanding</p>
          <p
            className={`mt-1 text-2xl font-extrabold tabular-nums transition-colors duration-500 ${stage === 3 ? "text-app-green" : ""}`}
          >
            {formatLakh(receivableTotal)}
          </p>
          <div className="mt-4 space-y-2.5">
            {receivables.map((bucket, index) => (
              <BarRow
                key={bucket.id}
                label={bucket.label}
                value={formatLakh(bucket.lakh)}
                percent={(bucket.lakh / 3) * 100}
                className={index < 2 ? "bg-app-blue" : "bg-app-amber"}
                delay={index * 90}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-app-line bg-app-bg px-3 py-2 text-[11px]">
            <span className="leading-tight">
              <span className="block font-semibold">INV-1042 · Demo Traders</span>
              <span className="text-[10px] text-app-muted">{formatRupees(125000)}</span>
            </span>
            {invoicePill(stage)}
          </div>
        </MockCard>

        <MockCard className="p-4">
          <p className="text-[11px] text-app-muted">Total Payable</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums">{formatLakh(payableTotal)}</p>
          <div className="mt-4 space-y-2.5">
            {payableBuckets.map((bucket, index) => (
              <BarRow
                key={bucket.id}
                label={bucket.label}
                value={formatLakh(bucket.lakh)}
                percent={(bucket.lakh / 3) * 100}
                className={bucket.id === "overdue" ? "bg-app-red" : "bg-app-violet"}
                delay={index * 90}
              />
            ))}
          </div>
        </MockCard>

        <div
          className={`absolute right-3 bottom-3 flex w-64 items-start gap-2.5 rounded-xl border bg-app-card p-3 text-[11px] shadow-xl transition-all duration-500 ${
            stage === 1 || stage === 2 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          } ${stage === 2 ? "border-app-green/40" : "border-app-blue/40"}`}
        >
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full ${stage === 2 ? "bg-app-green-soft text-app-green" : "bg-app-blue-soft text-app-blue"}`}
          >
            {stage === 2 ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <BellRing aria-hidden="true" className="size-4" />
            )}
          </span>
          <span className="leading-snug">
            <span className="block font-bold">
              {stage === 2 ? "Payment received" : "Payment reminder"}
            </span>
            <span className="text-app-muted">
              {stage === 2
                ? `${formatRupees(125000)} from Demo Traders against INV-1042.`
                : "INV-1042 for Demo Traders is due. A reminder is on its way."}
            </span>
          </span>
        </div>
      </div>
    </FinanceFrame>
  );
};
