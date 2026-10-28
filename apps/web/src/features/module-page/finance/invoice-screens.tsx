import { Check } from "lucide-react";

import {
  invoiceDemo,
  invoiceGst,
  invoiceSubtotal,
  invoiceTotal,
  lineTotal,
} from "@/config/module-pages/finance-demo-data";

import { formatRupees } from "../format";
import { FinanceFrame, MockCard, Pill, riseDelay } from "./mock-parts";

/** How far an invoice has got: each number is one step of the invoice flow. */
export type InvoiceStage = number;

const stagePill = (stage: InvoiceStage) => {
  if (stage === 4) return <Pill tone="green">Paid</Pill>;
  if (stage === 3) return <Pill tone="violet">Sent</Pill>;
  if (stage === 2) return <Pill tone="blue">E-Invoice generated</Pill>;
  if (stage === 1) return <Pill tone="amber">GST calculated</Pill>;
  return <Pill tone="gray">Draft</Pill>;
};

const progressSteps = ["E-Invoice", "Sent", "Payment received"] as const;

/** The invoice screen. The stage decides how much of the invoice's life has happened. */
export const InvoiceScreen = ({ stage }: { stage: InvoiceStage }) => (
  <FinanceFrame
    active="invoices"
    title={`Sales Invoice ${invoiceDemo.number}`}
    action={stagePill(stage)}
  >
    <div className="grid h-full grid-cols-[1.7fr_1fr] gap-3">
      <div className="space-y-3">
        <MockCard className="grid grid-cols-3 gap-3 p-3.5 text-[11px]">
          <div>
            <p className="text-app-muted">Customer</p>
            <p className="mt-0.5 text-xs font-bold">{invoiceDemo.customer}</p>
            <p className="text-[10px] text-app-muted">{invoiceDemo.gstin}</p>
          </div>
          <div>
            <p className="text-app-muted">Invoice date</p>
            <p className="mt-0.5 text-xs font-bold">{invoiceDemo.date}</p>
          </div>
          <div>
            <p className="text-app-muted">Invoice no.</p>
            <p className="mt-0.5 text-xs font-bold">{invoiceDemo.number}</p>
          </div>
        </MockCard>
        <MockCard className="overflow-hidden">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-app-soft text-[10px] text-app-muted">
              <tr>
                <th className="px-3 py-2 font-semibold">Item</th>
                <th className="px-2 py-2 text-right font-semibold">Qty</th>
                <th className="px-2 py-2 text-right font-semibold">Price</th>
                <th className="px-2 py-2 text-right font-semibold">Discount</th>
                <th className="px-3 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDemo.items.map((item, index) => (
                <tr
                  key={item.id}
                  style={riseDelay(index)}
                  className="mock-rise border-t border-app-line"
                >
                  <td className="px-3 py-2 font-semibold">{item.name}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{item.qty}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{formatRupees(item.price)}</td>
                  <td className="px-2 py-2 text-right tabular-nums">
                    {item.discountPercent > 0 ? `${String(item.discountPercent)}%` : "—"}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums">
                    {formatRupees(lineTotal(item))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockCard>
      </div>

      <MockCard className="flex flex-col p-3.5 text-[11px]">
        <h4 className="text-xs font-bold">Summary</h4>
        <dl className="mt-3 space-y-2">
          <div className="flex justify-between">
            <dt className="text-app-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatRupees(invoiceSubtotal)}</dd>
          </div>
          <div
            className={`flex justify-between rounded-md px-1.5 py-1 transition-colors duration-500 ${stage === 1 ? "bg-app-amber-soft" : ""}`}
          >
            <dt className="text-app-muted">GST @ {invoiceDemo.gstPercent}%</dt>
            <dd className="tabular-nums">{stage >= 1 ? formatRupees(invoiceGst) : "—"}</dd>
          </div>
          <div className="flex justify-between border-t border-app-line pt-2 text-xs font-bold">
            <dt>Total</dt>
            <dd className="tabular-nums">
              {formatRupees(stage >= 1 ? invoiceTotal : invoiceSubtotal)}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-app-muted">Payment status</span>
          {stage === 4 ? <Pill tone="green">Paid</Pill> : <Pill tone="amber">Unpaid</Pill>}
        </div>
        <ul className="mt-auto space-y-1.5 pt-4">
          {progressSteps.map((step, index) => {
            const isDone = stage >= index + 2;
            return (
              <li
                key={step}
                className={`flex items-center gap-2 transition-colors duration-500 ${isDone ? "text-app-green" : "text-app-muted"}`}
              >
                <span
                  className={`flex size-4 items-center justify-center rounded-full border ${isDone ? "border-app-green bg-app-green text-white" : "border-app-line"}`}
                >
                  {isDone ? <Check aria-hidden="true" className="size-2.5" /> : null}
                </span>
                {step}
              </li>
            );
          })}
        </ul>
      </MockCard>
    </div>
  </FinanceFrame>
);

/** Recording a payment against the invoice. */
export const PaymentScreen = () => (
  <FinanceFrame
    active="invoices"
    title="Record Payment"
    action={<Pill tone="green">Paid in full</Pill>}
  >
    <div className="grid h-full grid-cols-[1.4fr_1fr] gap-3">
      <MockCard className="p-4 text-[11px]">
        <h4 className="text-xs font-bold">Payment details</h4>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          {[
            ["Customer", invoiceDemo.customer],
            ["Against invoice", invoiceDemo.number],
            ["Amount received", formatRupees(invoiceTotal)],
            ["Mode", "Bank transfer (NEFT)"],
            ["Received on", "12 Nov 2026"],
            ["Deposit to", "Demo Bank · Current account"],
          ].map(([label, value], index) => (
            <div key={label} style={riseDelay(index)} className="mock-rise">
              <dt className="text-app-muted">{label}</dt>
              <dd className="mt-1 rounded-lg border border-app-line bg-app-bg px-2.5 py-1.5 text-xs font-semibold">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </MockCard>
      <MockCard className="flex flex-col p-4 text-[11px]">
        <h4 className="text-xs font-bold">Invoice {invoiceDemo.number}</h4>
        <dl className="mt-3 space-y-2">
          <div className="flex justify-between">
            <dt className="text-app-muted">Invoice total</dt>
            <dd className="tabular-nums">{formatRupees(invoiceTotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-app-muted">Received now</dt>
            <dd className="font-semibold text-app-green tabular-nums">
              {formatRupees(invoiceTotal)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-app-line pt-2 text-xs font-bold">
            <dt>Balance</dt>
            <dd className="tabular-nums">₹0</dd>
          </div>
        </dl>
        <p className="mt-auto flex items-center gap-1.5 rounded-lg bg-app-green-soft px-2.5 py-2 font-semibold text-app-green">
          <Check aria-hidden="true" className="size-3.5" />
          The invoice is now marked as paid.
        </p>
      </MockCard>
    </div>
  </FinanceFrame>
);
