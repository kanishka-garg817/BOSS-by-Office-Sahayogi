import { ChevronRight, Download, GitCompare } from "lucide-react";
import {
  expenseSeries,
  months,
  payableBuckets,
  receivableBuckets,
  revenueSeries,
} from "@/config/module-pages/finance-demo-data";

import { formatRupees } from "../format";
import { FinanceFrame, MockCard, Pill, riseDelay } from "./mock-parts";

export type ReportId =
  "pnl" | "balance" | "cashflow" | "trial" | "ledger" | "receivables" | "payables";

type Row = {
  label: string;
  /** One figure for each column. */
  values: readonly number[];
  isTotal?: boolean;
  isIndented?: boolean;
};

type Insight = { label: string; value: string; note: string };

type ReportSpec = {
  id: ReportId;
  label: string;
  /** What the report tells the owner, in one line. */
  meaning: string;
  columns: readonly string[];
  /** Whether the last column is a change against the first two. */
  hasChange: boolean;
  rows: readonly Row[];
  insights: readonly Insight[];
};

export const reportSpecs: readonly ReportSpec[] = [
  {
    id: "pnl",
    label: "Profit & Loss",
    meaning: "Are you making money? Revenue minus costs, month by month.",
    columns: ["This year", "Last year"],
    hasChange: true,
    rows: [
      { label: "Revenue", values: [4860000, 4320000] },
      { label: "Cost of goods sold", values: [-2310000, -2170000], isIndented: true },
      { label: "Gross profit", values: [2550000, 2150000], isTotal: true },
      { label: "Operating expenses", values: [-810000, -750000], isIndented: true },
      { label: "Net profit", values: [1740000, 1400000], isTotal: true },
    ],
    insights: [],
  },
  {
    id: "balance",
    label: "Balance Sheet",
    meaning: "What the business owns and what it owes, today.",
    columns: ["Today", "Last year"],
    hasChange: true,
    rows: [
      { label: "Cash and bank", values: [1294560, 840000] },
      { label: "Accounts receivable", values: [620000, 540000] },
      { label: "Stock", values: [1945990, 1500550] },
      { label: "Total assets", values: [3860550, 2880550], isTotal: true },
      { label: "Accounts payable", values: [380000, 340000] },
      { label: "Capital and profit", values: [3480550, 2540550] },
      { label: "Liabilities and equity", values: [3860550, 2880550], isTotal: true },
    ],
    insights: [
      { label: "Total assets", value: "₹38.6L", note: "What the business owns" },
      { label: "Total liabilities", value: "₹3.8L", note: "What it owes" },
      { label: "Equity", value: "₹34.8L", note: "What is left for the owners" },
    ],
  },
  {
    id: "cashflow",
    label: "Cash Flow",
    meaning: "Where your cash came from and where it went.",
    columns: ["This year", "Last year"],
    hasChange: true,
    rows: [
      { label: "Opening cash", values: [840000, 610000] },
      { label: "Received from customers", values: [4120000, 3640000], isIndented: true },
      { label: "Paid to suppliers and staff", values: [-3665440, -3410000], isIndented: true },
      { label: "Closing cash", values: [1294560, 840000], isTotal: true },
    ],
    insights: [
      { label: "Cash in", value: "₹41.2L", note: "From customers" },
      { label: "Cash out", value: "₹36.7L", note: "To suppliers and staff" },
      { label: "Net change", value: "+₹4.5L", note: "Cash grew this year" },
    ],
  },
  {
    id: "trial",
    label: "Trial Balance",
    meaning: "Proof that the books add up: debits equal credits.",
    columns: ["Debit", "Credit"],
    hasChange: false,
    rows: [
      { label: "Cash and bank", values: [1294560, 0] },
      { label: "Accounts receivable", values: [620000, 0] },
      { label: "Stock", values: [1945990, 0] },
      { label: "Purchases and expenses", values: [3120000, 0] },
      { label: "Accounts payable", values: [0, 380000] },
      { label: "Capital", values: [0, 1740550] },
      { label: "Sales and income", values: [0, 4860000] },
      { label: "Total", values: [6980550, 6980550], isTotal: true },
    ],
    insights: [
      { label: "Total debits", value: "₹69.8L", note: "All debit balances" },
      { label: "Total credits", value: "₹69.8L", note: "All credit balances" },
      { label: "Difference", value: "₹0", note: "The books balance" },
    ],
  },
  {
    id: "ledger",
    label: "General Ledger",
    meaning: "Every account with its balance and its entries.",
    columns: ["Debit", "Credit"],
    hasChange: false,
    rows: [
      { label: "Sales", values: [0, 4860000] },
      { label: "Purchases", values: [2310000, 0] },
      { label: "Stock", values: [1945990, 0] },
      { label: "Cash and bank", values: [1294560, 0] },
      { label: "Accounts receivable", values: [620000, 0] },
      { label: "GST payable", values: [0, 412600] },
    ],
    insights: [
      { label: "Accounts", value: "6", note: "Shown on this page" },
      { label: "Largest balance", value: "₹48.6L", note: "Sales" },
      { label: "Open one", value: "Entries", note: "With a running balance" },
    ],
  },
  {
    id: "receivables",
    label: "Receivables",
    meaning: "Who owes you money, and for how long.",
    columns: ["Outstanding", "Overdue"],
    hasChange: false,
    rows: [
      { label: "Demo Electronics", values: [391620, 60000] },
      { label: "Demo Traders", values: [164380, 60000] },
      { label: "Demo Retail", values: [64000, 0] },
      { label: "Total receivable", values: [620000, 120000], isTotal: true },
    ],
    insights: [
      { label: "Total outstanding", value: "₹6.2L", note: "Across 3 customers" },
      { label: "Overdue", value: "₹1.2L", note: "Open for over 30 days" },
      { label: "Not yet due", value: "₹2.9L", note: "Current invoices" },
    ],
  },
  {
    id: "payables",
    label: "Payables",
    meaning: "Whom you owe, and when it is due.",
    columns: ["Payable", "Overdue"],
    hasChange: false,
    rows: [
      { label: "Demo Supplies", values: [148500, 40000] },
      { label: "Demo Wholesale", values: [139200, 0] },
      { label: "Demo Logistics", values: [92300, 30000] },
      { label: "Total payable", values: [380000, 70000], isTotal: true },
    ],
    insights: [
      { label: "Total payable", value: "₹3.8L", note: "Across 3 vendors" },
      { label: "Overdue", value: "₹0.7L", note: "Past the due date" },
      { label: "Due this week", value: "₹1.5L", note: "Including today" },
    ],
  },
];

type Bar = { label: string; values: readonly number[]; className: string };

const cashIn = [4.5, 5.0, 4.6, 5.5, 5.2, 6.3, 6.4, 3.7] as const;
const cashOut = [4.2, 4.4, 4.3, 4.9, 4.6, 5.2, 5.3, 3.75] as const;

type ChartSpec = { title: string; labels: readonly string[]; max: number; bars: readonly Bar[] };

const chartFor = (id: ReportId): ChartSpec => {
  switch (id) {
    case "cashflow":
      return {
        title: "Cash in and cash out",
        labels: months,
        max: 8,
        bars: [
          { label: "Cash in", values: cashIn, className: "bg-app-green" },
          { label: "Cash out", values: cashOut, className: "bg-app-amber" },
        ],
      };
    case "receivables":
      return {
        title: "How long it has been open (₹ lakh)",
        labels: receivableBuckets.map((bucket) => bucket.label),
        max: 4,
        bars: [
          {
            label: "Outstanding",
            values: receivableBuckets.map((bucket) => bucket.lakh),
            className: "bg-app-blue",
          },
        ],
      };
    case "payables":
      return {
        title: "When it falls due (₹ lakh)",
        labels: payableBuckets.map((bucket) => bucket.label),
        max: 2,
        bars: [
          {
            label: "Payable",
            values: payableBuckets.map((bucket) => bucket.lakh),
            className: "bg-app-violet",
          },
        ],
      };
    case "balance":
      return {
        title: "Assets and what funds them (₹ lakh)",
        labels: ["Cash", "Receivables", "Stock", "Payables", "Equity"],
        max: 40,
        bars: [
          {
            label: "Amount",
            values: [12.9, 6.2, 19.5, 3.8, 34.8],
            className: "bg-app-blue",
          },
        ],
      };
    case "trial":
      return {
        title: "Debits and credits (₹ lakh)",
        labels: ["Assets", "Expenses", "Liabilities", "Capital", "Income"],
        max: 50,
        bars: [
          { label: "Debit", values: [38.6, 31.2, 0, 0, 0], className: "bg-app-blue" },
          { label: "Credit", values: [0, 0, 3.8, 17.4, 48.6], className: "bg-app-green" },
        ],
      };
    case "ledger":
      return {
        title: "Account balances (₹ lakh)",
        labels: ["Sales", "Purchases", "Stock", "Cash", "Receivable", "GST"],
        max: 50,
        bars: [
          {
            label: "Balance",
            values: [48.6, 23.1, 19.5, 12.9, 6.2, 4.1],
            className: "bg-app-blue",
          },
        ],
      };
    default:
      return {
        title: "Revenue and expenses (₹ lakh)",
        labels: months,
        max: 8,
        bars: [
          { label: "Revenue", values: revenueSeries, className: "bg-app-blue" },
          { label: "Expenses", values: expenseSeries, className: "bg-app-amber" },
        ],
      };
  }
};

const GRID_STEPS = 4;

const ColumnsChart = ({ chart }: { chart: ChartSpec }) => (
  <div>
    <div className="flex gap-2">
      <div className="flex h-28 flex-col justify-between text-right text-[9px] text-app-muted tabular-nums">
        {Array.from({ length: GRID_STEPS + 1 }, (_, index) => (
          <span key={index}>{Math.round((chart.max * (GRID_STEPS - index)) / GRID_STEPS)}</span>
        ))}
      </div>
      <div className="relative h-28 flex-1">
        <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: GRID_STEPS + 1 }, (_, index) => (
            <span key={index} className="block border-t border-app-line" />
          ))}
        </div>
        <div className="relative flex h-full items-end gap-1.5">
          {chart.labels.map((label, labelIndex) => (
            <div key={label} className="flex h-full flex-1 items-end justify-center gap-0.5">
              {chart.bars.map((bar) => (
                <div
                  key={bar.label}
                  style={{
                    height: `${String(((bar.values[labelIndex] ?? 0) / chart.max) * 100)}%`,
                    transitionDelay: `${String(labelIndex * 60)}ms`,
                  }}
                  className={`w-full max-w-4 mock-grow-y rounded-t ${bar.className}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-1 flex gap-2">
      <span className="w-4 shrink-0" />
      <div className="flex flex-1 gap-1.5">
        {chart.labels.map((label) => (
          <span key={label} className="flex-1 text-center text-[9px] text-app-muted">
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const changePercent = (now: number, before: number) => ((now - before) / Math.abs(before)) * 100;

/** Steps from a total down to one entry, shown beside the Profit & Loss report. */
export const drillLevels = ["Profit & Loss", "Revenue", "Sales", "Invoice", "Entry"] as const;

const drillContent: readonly { title: string; rows: readonly (readonly [string, number])[] }[] = [
  {
    title: "Profit & Loss",
    rows: [
      ["Revenue", 4860000],
      ["Gross profit", 2550000],
      ["Net profit", 1740000],
    ],
  },
  {
    title: "Revenue",
    rows: [
      ["Sales", 4742000],
      ["Service income", 98000],
      ["Other income", 20000],
    ],
  },
  {
    title: "Sales invoices",
    rows: [
      ["INV-1043 · Demo Traders", 139300],
      ["INV-1042 · Demo Traders", 125000],
      ["INV-1039 · Demo Electronics", 86400],
    ],
  },
  {
    title: "Invoice INV-1043",
    rows: [
      ["LED Panel Light × 40", 20520],
      ["Ceiling Fan × 12", 25800],
      ["Installation service", 4500],
    ],
  },
  {
    title: "Entry JV-0231",
    rows: [
      ["Dr · Demo Traders", 164380],
      ["Cr · Sales", 139300],
      ["Cr · GST Payable", 25080],
    ],
  },
];

const DrillPanel = ({ level }: { level: number }) => {
  const content = drillContent[level] ?? drillContent[0];
  return (
    <MockCard className="p-3 text-[11px]">
      <h4 className="text-xs font-bold">Follow a number down</h4>
      <p className="mt-1 flex flex-wrap items-center gap-0.5 text-[9px] text-app-muted">
        {drillLevels.map((name, index) => (
          <span key={name} className="flex items-center gap-0.5">
            <span className={index === level ? "font-bold text-app-blue" : ""}>{name}</span>
            {index < drillLevels.length - 1 ? (
              <ChevronRight aria-hidden="true" className="size-2.5" />
            ) : null}
          </span>
        ))}
      </p>
      <p className="mt-2 font-semibold">{content?.title}</p>
      <ul className="mt-1 divide-y divide-app-line tabular-nums">
        {content?.rows.map(([label, amount]) => (
          <li key={label} className="flex justify-between gap-2 py-1.5">
            <span className="truncate">{label}</span>
            <span className="font-semibold">{formatRupees(amount)}</span>
          </li>
        ))}
      </ul>
    </MockCard>
  );
};

type ReportScreenProps = {
  reportId: ReportId;
  /** The step shown in the follow-a-number-down panel of the Profit & Loss report. */
  drillLevel: number;
};

/** A full report screen: toolbar, a chart, the statement line by line, and a side panel. */
export const ReportScreen = ({ reportId, drillLevel }: ReportScreenProps) => {
  const spec = reportSpecs.find((candidate) => candidate.id === reportId) ?? reportSpecs[0];
  if (!spec) return null;
  const chart = chartFor(spec.id);
  const topValue = Math.max(...spec.rows.map((row) => Math.abs(row.values[0] ?? 0)), 1);

  return (
    <FinanceFrame active="reports" title={spec.label} action={<Pill tone="gray">FY 2026-27</Pill>}>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="rounded-lg border border-app-line bg-app-card px-2.5 py-1.5 font-semibold">
          Apr 2026 – Nov 2026
        </span>
        {spec.hasChange ? (
          <span className="flex items-center gap-1 rounded-lg border border-app-line bg-app-card px-2.5 py-1.5 text-app-muted">
            <GitCompare aria-hidden="true" className="size-3" />
            Compare with last year
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-1 rounded-lg border border-app-line bg-app-card px-2.5 py-1.5 text-app-muted">
          <Download aria-hidden="true" className="size-3" />
          Export
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_14.5rem] gap-3">
        <div className="space-y-3">
          <MockCard className="p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold">{chart.title}</h4>
              <span className="flex gap-2.5 text-[9px] text-app-muted">
                {chart.bars.map((bar) => (
                  <span key={bar.label} className="flex items-center gap-1">
                    <span aria-hidden="true" className={`size-1.5 rounded-sm ${bar.className}`} />
                    {bar.label}
                  </span>
                ))}
              </span>
            </div>
            <div className="mt-2">
              <ColumnsChart chart={chart} />
            </div>
          </MockCard>

          <MockCard className="overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-app-soft text-[10px] text-app-muted">
                <tr>
                  <th className="px-3 py-1.5 font-semibold">{spec.label}</th>
                  {spec.columns.map((column) => (
                    <th key={column} className="px-2 py-1.5 text-right font-semibold">
                      {column}
                    </th>
                  ))}
                  {spec.hasChange ? (
                    <th className="px-3 py-1.5 text-right font-semibold">Change</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {spec.rows.map((row, index) => {
                  const now = row.values[0] ?? 0;
                  const before = row.values[1] ?? 0;
                  const change = spec.hasChange && before !== 0 ? changePercent(now, before) : null;
                  return (
                    <tr
                      key={row.label}
                      style={riseDelay(index)}
                      className={`mock-rise border-t border-app-line tabular-nums ${row.isTotal ? "bg-app-soft font-bold" : ""}`}
                    >
                      <td className={`px-3 py-1.5 ${row.isIndented ? "pl-6" : ""}`}>
                        {row.label}
                        {spec.hasChange && !row.isTotal ? (
                          <span className="mt-1 block h-1 w-24 overflow-hidden rounded-full bg-app-soft">
                            <span
                              style={{ width: `${String((Math.abs(now) / topValue) * 100)}%` }}
                              className="block h-full mock-grow-x rounded-full bg-app-blue/60"
                            />
                          </span>
                        ) : null}
                      </td>
                      {row.values.map((value, valueIndex) => (
                        <td
                          key={spec.columns[valueIndex] ?? valueIndex}
                          className={`px-2 py-1.5 text-right ${value < 0 ? "text-app-red" : ""}`}
                        >
                          {value === 0 ? "—" : formatRupees(value)}
                        </td>
                      ))}
                      {spec.hasChange ? (
                        <td
                          className={`px-3 py-1.5 text-right ${change !== null && change > 0 ? "text-app-green" : "text-app-muted"}`}
                        >
                          {change === null ? "—" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </MockCard>
        </div>

        <div className="space-y-3">
          {spec.id === "pnl" ? (
            <DrillPanel level={drillLevel} />
          ) : (
            spec.insights.map((insight, index) => (
              <MockCard key={insight.label} style={riseDelay(index)} className="mock-rise p-3">
                <p className="text-[10px] text-app-muted">{insight.label}</p>
                <p className="mt-0.5 text-lg font-bold">{insight.value}</p>
                <p className="text-[10px] text-app-muted">{insight.note}</p>
              </MockCard>
            ))
          )}
        </div>
      </div>
    </FinanceFrame>
  );
};
