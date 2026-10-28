import { Check, ChevronDown, ChevronRight } from "lucide-react";

import { formatRupees } from "../format";
import { FinanceFrame, MockCard, Pill } from "./mock-parts";

/** 0 chart of accounts, 1 ledger, 2 journal, 3 trial balance, 4 reports. */
export type LedgerStage = number;

const accountGroups = [
  {
    id: "assets",
    name: "Assets",
    children: ["Cash in Hand", "Demo Bank", "Accounts Receivable", "Stock"],
  },
  { id: "liabilities", name: "Liabilities", children: ["Accounts Payable", "GST Payable"] },
  { id: "income", name: "Income", children: ["Sales", "Other Income"] },
  { id: "expenses", name: "Expenses", children: ["Purchases", "Salaries", "Rent"] },
] as const;

const ledgerRows = [
  {
    id: "l1",
    date: "01 Nov",
    voucher: "Opening",
    particulars: "Opening balance",
    debit: 540000,
    credit: 0,
    balance: 540000,
  },
  {
    id: "l2",
    date: "05 Nov",
    voucher: "INV-1036",
    particulars: "Demo Retail",
    debit: 64000,
    credit: 0,
    balance: 604000,
  },
  {
    id: "l3",
    date: "09 Nov",
    voucher: "RCT-0412",
    particulars: "Demo Electronics",
    debit: 0,
    credit: 86400,
    balance: 517600,
  },
  {
    id: "l4",
    date: "12 Nov",
    voucher: "INV-1043",
    particulars: "Demo Traders",
    debit: 164380,
    credit: 0,
    balance: 681980,
  },
] as const;

const ring = (isActive: boolean) =>
  `transition-shadow duration-500 ${isActive ? "ring-2 ring-app-blue shadow-lg shadow-app-blue/20" : ""}`;

const Callout = ({ className, children }: { className: string; children: string }) => (
  <span
    className={`absolute z-10 flex items-center gap-1.5 rounded-full bg-brand-navy px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-white shadow-lg ${className}`}
  >
    <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-300" />
    {children}
  </span>
);

/** The accounting screen: accounts tree, a ledger, a journal entry and the trial balance. */
export const LedgerScreen = ({ stage }: { stage: LedgerStage }) => (
  <FinanceFrame active="accounting" title="Accounting">
    <div className="relative grid h-full grid-cols-[10rem_1fr_12.5rem] gap-3">
      <MockCard className={`relative p-3 text-[11px] ${ring(stage === 0)}`}>
        <Callout className="-top-2.5 left-3">Group accounts in a tree</Callout>
        <h4 className="text-xs font-bold">Chart of Accounts</h4>
        <ul className="mt-2 space-y-1.5">
          {accountGroups.map((group) => (
            <li key={group.id}>
              <p className="flex items-center gap-1 font-semibold">
                <ChevronDown aria-hidden="true" className="size-3" />
                {group.name}
              </p>
              <ul className="mt-1 space-y-0.5 pl-4">
                {group.children.map((child) => (
                  <li
                    key={child}
                    className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${child === "Accounts Receivable" ? "bg-app-blue-soft font-semibold text-app-blue" : "text-app-muted"}`}
                  >
                    <ChevronRight aria-hidden="true" className="size-2.5" />
                    {child}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </MockCard>

      <div className="relative">
        <Callout className="-top-2.5 left-3">Every entry keeps a running balance</Callout>
        <MockCard className={`h-full overflow-hidden ${ring(stage === 1)}`}>
          <div className="flex items-center justify-between border-b border-app-line px-3.5 py-2.5">
            <h4 className="text-xs font-bold">Ledger · Accounts Receivable</h4>
            <Pill tone="gray">Nov 2026</Pill>
          </div>
          <table className="w-full text-left text-[11px]">
            <thead className="bg-app-soft text-[10px] text-app-muted">
              <tr>
                <th className="px-3 py-1.5 font-semibold">Date</th>
                <th className="px-2 py-1.5 font-semibold">Particulars</th>
                <th className="px-2 py-1.5 text-right font-semibold">Debit</th>
                <th className="px-2 py-1.5 text-right font-semibold">Credit</th>
                <th className="px-3 py-1.5 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerRows.map((row) => (
                <tr key={row.id} className="border-t border-app-line tabular-nums">
                  <td className="px-3 py-2 whitespace-nowrap">{row.date}</td>
                  <td className="px-2 py-2">
                    <span className="font-semibold">{row.voucher}</span>
                    <span className="block text-[10px] text-app-muted">{row.particulars}</span>
                  </td>
                  <td className="px-2 py-2 text-right">
                    {row.debit > 0 ? formatRupees(row.debit) : ""}
                  </td>
                  <td className="px-2 py-2 text-right">
                    {row.credit > 0 ? formatRupees(row.credit) : ""}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {formatRupees(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockCard>
      </div>

      <div className="space-y-3">
        <MockCard className={`p-3 text-[11px] ${ring(stage === 2)}`}>
          <h4 className="text-xs font-bold">Journal entry JV-0231</h4>
          <ul className="mt-2 space-y-1 tabular-nums">
            <li className="flex justify-between">
              <span>Dr · Demo Traders</span>
              <span>{formatRupees(164380)}</span>
            </li>
            <li className="flex justify-between text-app-muted">
              <span>Cr · Sales</span>
              <span>{formatRupees(139300)}</span>
            </li>
            <li className="flex justify-between text-app-muted">
              <span>Cr · GST Payable</span>
              <span>{formatRupees(25080)}</span>
            </li>
          </ul>
        </MockCard>
        <MockCard className={`relative p-3 text-[11px] ${ring(stage === 3)}`}>
          <Callout className="-top-2.5 right-3">Debits always equal credits</Callout>
          <h4 className="text-xs font-bold">Trial Balance</h4>
          <dl className="mt-2 space-y-1 tabular-nums">
            <div className="flex justify-between">
              <dt className="text-app-muted">Debit total</dt>
              <dd>{formatRupees(6980000)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-app-muted">Credit total</dt>
              <dd>{formatRupees(6980000)}</dd>
            </div>
          </dl>
          <p className="mt-2 flex items-center gap-1 font-semibold text-app-green">
            <Check aria-hidden="true" className="size-3" />
            Debits equal credits
          </p>
        </MockCard>
        <MockCard className={`p-3 text-[11px] ${ring(stage === 4)}`}>
          <h4 className="text-xs font-bold">Reports</h4>
          <p className="mt-1.5 flex flex-wrap gap-1">
            <Pill tone="blue">Profit &amp; Loss</Pill>
            <Pill tone="blue">Balance Sheet</Pill>
          </p>
        </MockCard>
      </div>
    </div>
  </FinanceFrame>
);
