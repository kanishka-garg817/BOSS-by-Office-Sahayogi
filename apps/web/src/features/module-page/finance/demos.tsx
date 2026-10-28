"use client";

import { useCycle } from "@/hooks/use-cycle";

import { FlowStrip } from "../flow-strip";
import { ScaledMock } from "../scaled-mock";
import { ReconcileScreen } from "./bank-gst-screens";
import { InvoiceScreen } from "./invoice-screens";
import { LedgerScreen } from "./ledger-screen";
import { OutstandingScreen } from "./outstanding-screen";

const MOCK_WIDTH = 960;

const INVOICE_STEPS = [
  "Create Invoice",
  "Calculate GST",
  "Generate E-Invoice",
  "Send",
  "Payment Received",
] as const;
const INVOICE_MOMENTS = [2400, 2600, 2600, 2400, 3400] as const;

/** The invoice screen playing through its life, with the steps shown above it. */
export const InvoiceDemo = () => {
  const [ref, step] = useCycle<HTMLDivElement>(INVOICE_MOMENTS);
  return (
    <div ref={ref} className="space-y-4">
      <FlowStrip steps={INVOICE_STEPS} activeStep={step} />
      <ScaledMock label="Sales invoice screen, with sample data" width={MOCK_WIDTH} height={500}>
        <InvoiceScreen stage={step} />
      </ScaledMock>
    </div>
  );
};

const ACCOUNTING_STEPS = [
  "Chart of Accounts",
  "Ledger",
  "Journal",
  "Trial Balance",
  "Reports",
] as const;
const ACCOUNTING_MOMENTS = [2800, 2800, 2800, 2800, 2800] as const;

export const AccountingDemo = () => {
  const [ref, step] = useCycle<HTMLDivElement>(ACCOUNTING_MOMENTS);
  return (
    <div ref={ref} className="space-y-4">
      <FlowStrip steps={ACCOUNTING_STEPS} activeStep={step} />
      <ScaledMock
        label="Accounting screen with a ledger, journal entry and trial balance, with sample data"
        width={MOCK_WIDTH}
        height={600}
      >
        <LedgerScreen stage={step} />
      </ScaledMock>
    </div>
  );
};

const OUTSTANDING_STEPS = [
  "Invoice Due",
  "Reminder",
  "Payment Received",
  "Outstanding Updated",
] as const;
const OUTSTANDING_MOMENTS = [2600, 3000, 3000, 3600] as const;

export const OutstandingDemo = () => {
  const [ref, step] = useCycle<HTMLDivElement>(OUTSTANDING_MOMENTS);
  return (
    <div ref={ref} className="space-y-4">
      <FlowStrip steps={OUTSTANDING_STEPS} activeStep={step} />
      <ScaledMock
        label="Receivables and payables screen, with sample data"
        width={MOCK_WIDTH}
        height={440}
      >
        <OutstandingScreen stage={step} />
      </ScaledMock>
    </div>
  );
};

const RECONCILE_STEPS = ["Bank Transaction", "Match Transaction", "Verify", "Reconcile"] as const;
const RECONCILE_MOMENTS = [2600, 2800, 2600, 3800] as const;

export const ReconcileDemo = () => {
  const [ref, step] = useCycle<HTMLDivElement>(RECONCILE_MOMENTS);
  return (
    <div ref={ref} className="space-y-4">
      <FlowStrip steps={RECONCILE_STEPS} activeStep={step} />
      <ScaledMock
        label="Bank reconciliation screen, with sample data"
        width={MOCK_WIDTH}
        height={440}
      >
        <ReconcileScreen stage={step} />
      </ScaledMock>
    </div>
  );
};
