import { Bell, Check, Lock } from "lucide-react";
import type { ReactNode } from "react";

import { ScaledPanel } from "../scaled-panel";

/**
 * A picture for each feature group: a few light interface cards floating on a soft panel, with
 * sample data. They show the idea of the screens, not the exact product.
 */

const WIDTH = 760;
const HEIGHT = 440;

const UiCard = ({
  x,
  y,
  w,
  children,
  className = "",
}: {
  x: number;
  y: number;
  w: number;
  children: ReactNode;
  className?: string;
}) => (
  <div
    style={{ left: x, top: y, width: w }}
    className={`absolute rounded-2xl border border-app-line bg-app-card p-4 text-[11px] text-app-ink shadow-xl shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

const Title = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div className="mb-2.5">
    <p className="text-xs font-bold">{children}</p>
    {sub ? <p className="text-[10px] text-app-muted">{sub}</p> : null}
  </div>
);

const Pill = ({
  tone,
  children,
}: {
  tone: "green" | "amber" | "blue" | "gray";
  children: ReactNode;
}) => {
  const toneClass = {
    green: "bg-app-green-soft text-app-green",
    amber: "bg-app-amber-soft text-app-amber",
    blue: "bg-app-blue-soft text-app-blue",
    gray: "bg-app-soft text-app-muted",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
};

const Toast = ({ x, y, children }: { x: number; y: number; children: ReactNode }) => (
  <div
    style={{ left: x, top: y }}
    className="absolute flex items-center gap-2 rounded-xl bg-app-card px-3.5 py-2.5 text-[11px] font-semibold text-app-ink shadow-xl shadow-black/10"
  >
    {children}
  </div>
);

const Dot = ({ className }: { className: string }) => (
  <span aria-hidden="true" className={`mt-1 size-2 shrink-0 rounded-full ${className}`} />
);

const Flow = ({ steps }: { steps: readonly string[] }) => (
  <div className="flex items-center gap-1.5">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center gap-1.5">
        <span className="rounded-lg bg-app-blue-soft px-2.5 py-2 text-[10px] font-semibold whitespace-nowrap text-app-blue">
          {step}
        </span>
        {index < steps.length - 1 ? (
          <span aria-hidden="true" className="text-app-muted">
            →
          </span>
        ) : null}
      </div>
    ))}
  </div>
);

const CoreAccountingVisual = () => (
  <>
    <UiCard x={30} y={34} w={226} className="h-80">
      <Title sub="Your accounts, in a tree">Chart of Accounts</Title>
      {[
        { group: "Assets", kids: ["Cash and Bank", "Accounts Receivable", "Stock"] },
        { group: "Liabilities", kids: ["Accounts Payable", "GST Payable"] },
        { group: "Income", kids: ["Sales"] },
        { group: "Expenses", kids: ["Rent", "Salaries"] },
      ].map((node) => (
        <div key={node.group} className="mb-1">
          <p className="font-bold">{node.group}</p>
          <div className="ml-1.5 border-l border-app-line pl-3">
            {node.kids.map((kid) => (
              <p
                key={kid}
                className={`relative my-0.5 rounded-md px-1.5 py-0.5 before:absolute before:top-1/2 before:-left-3 before:h-px before:w-2.5 before:bg-app-line ${kid === "Accounts Receivable" ? "bg-app-blue-soft font-semibold text-app-blue" : ""}`}
              >
                {kid}
              </p>
            ))}
          </div>
        </div>
      ))}
    </UiCard>

    <UiCard x={272} y={24} w={330}>
      <Title>From invoice to trial balance</Title>
      <Flow steps={["Invoice", "Journal", "Ledger", "Trial Balance"]} />
    </UiCard>

    <UiCard x={296} y={128} w={300} className="h-60">
      <Title>Recent activity</Title>
      <div className="space-y-3">
        {[
          ["Journal JV-0231 posted", "2 min ago", "bg-app-green"],
          ["Opening balance added to Demo Bank", "1 hr ago", "bg-app-blue"],
          ["November 2026 period opened", "Today", "bg-app-violet"],
          ["Ledger exported by Anita", "Yesterday", "bg-app-amber"],
        ].map(([text, time, color]) => (
          <div key={text} className="flex gap-3">
            <Dot className={color ?? ""} />
            <div>
              <p className="font-semibold">{text}</p>
              <p className="text-[10px] text-app-muted">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </UiCard>

    <Toast x={512} y={324}>
      <span className="flex size-5 items-center justify-center rounded-full bg-app-green text-white">
        <Check aria-hidden="true" className="size-3" />
      </span>
      Debits equal credits
    </Toast>
  </>
);

const donutSegments = [
  { label: "Salaries", value: 42, className: "stroke-app-blue", dot: "bg-app-blue" },
  { label: "Rent", value: 26, className: "stroke-app-green", dot: "bg-app-green" },
  { label: "Travel", value: 18, className: "stroke-app-amber", dot: "bg-app-amber" },
  { label: "Other", value: 14, className: "stroke-app-violet", dot: "bg-app-violet" },
] as const;

const ReceivablesVisual = () => (
  <>
    <UiCard x={30} y={20} w={300} className="h-96">
      <div className="flex items-start justify-between">
        <Title sub="Demo Traders">Invoice INV-1043</Title>
        <Pill tone="green">
          <Check className="size-3" />
          Paid
        </Pill>
      </div>
      <div className="divide-y divide-app-line tabular-nums">
        {[
          ["LED Panel Light × 40", "₹20,520"],
          ["Ceiling Fan × 12", "₹25,800"],
          ["Installation", "₹4,500"],
        ].map(([item, amount]) => (
          <div key={item} className="flex justify-between py-1.5">
            <span className="text-app-muted">{item}</span>
            <span>{amount}</span>
          </div>
        ))}
        <div className="flex justify-between py-2 font-bold">
          <span>Total</span>
          <span>₹59,968</span>
        </div>
      </div>
      <p className="mt-2 mb-2.5 text-[10px] font-semibold tracking-wider text-app-muted uppercase">
        What happened
      </p>
      <div className="relative space-y-3 border-l-2 border-app-line pl-5">
        {[
          ["Invoice created", "10:12", "bg-app-blue"],
          ["Sent to Demo Traders", "10:12", "bg-app-violet"],
          ["Payment received", "10:31", "bg-app-green"],
          ["Receipt recorded in the books", "10:31", "bg-app-green"],
        ].map(([step, time, color]) => (
          <div key={step} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1 -left-[1.6rem] size-2.5 rounded-full ring-4 ring-app-card ${color ?? ""}`}
            />
            <p className="font-semibold">{step}</p>
            <p className="text-[10px] text-app-muted">{time}</p>
          </div>
        ))}
      </div>
    </UiCard>

    <UiCard x={356} y={56} w={196}>
      <Title sub="This month">Expenses by type</Title>
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="size-20 shrink-0 -rotate-90">
          {donutSegments.map((segment, index) => (
            <circle
              key={segment.label}
              cx="50"
              cy="50"
              r="36"
              fill="none"
              strokeWidth="16"
              pathLength="100"
              strokeDasharray={`${String(segment.value)} ${String(100 - segment.value)}`}
              strokeDashoffset={
                -donutSegments.slice(0, index).reduce((sum, item) => sum + item.value, 0)
              }
              className={segment.className}
            />
          ))}
        </svg>
        <ul className="space-y-1">
          {donutSegments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${segment.dot}`} />
              {segment.label}
            </li>
          ))}
        </ul>
      </div>
    </UiCard>

    <UiCard x={338} y={236} w={250}>
      <Title>Due this week</Title>
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {[
          ["Mon", false],
          ["Tue", true],
          ["Wed", false],
          ["Thu", false],
          ["Fri", true],
        ].map(([day, due]) => (
          <div
            key={String(day)}
            className={`rounded-lg py-2 ${due ? "bg-app-amber-soft font-bold text-app-amber" : "bg-app-soft text-app-muted"}`}
          >
            <p className="text-[10px]">{day}</p>
            <p className="mt-0.5 text-sm">{due ? "•" : "–"}</p>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[10px] text-app-muted">Fri · Supplier bill of ₹48,500</p>
    </UiCard>

    <Toast x={566} y={36}>
      <span className="flex size-5 items-center justify-center rounded-full bg-app-green text-white">
        <Check aria-hidden="true" className="size-3" />
      </span>
      Payment received
    </Toast>
    <Toast x={592} y={282}>
      <Bell aria-hidden="true" className="size-4 text-app-blue" />
      Reminder sent
    </Toast>
  </>
);

const CashBankingVisual = () => (
  <>
    <UiCard x={30} y={34} w={310} className="h-52">
      <div className="flex items-start justify-between">
        <Title sub="Last six months">Cash in and out</Title>
        <div className="flex gap-3 text-[10px] text-app-muted">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-app-green" />
            In
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-app-amber" />
            Out
          </span>
        </div>
      </div>
      <div className="flex h-28 items-end gap-3 border-b border-app-line px-1">
        {[
          [60, 48],
          [72, 55],
          [66, 58],
          [84, 62],
          [78, 60],
          [96, 70],
        ].map(([inflow, outflow], index) => (
          <div key={index} className="flex h-full flex-1 items-end justify-center gap-0.5">
            <div style={{ height: `${String(inflow)}%` }} className="w-3 rounded-t bg-app-green" />
            <div style={{ height: `${String(outflow)}%` }} className="w-3 rounded-t bg-app-amber" />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between px-1 text-[9px] text-app-muted">
        {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </UiCard>

    <UiCard x={352} y={26} w={378} className="h-56">
      <Title sub="Each bank entry finds its match">Matching</Title>
      <div className="grid grid-cols-[1fr_2rem_1fr] items-center gap-y-2.5">
        {[
          ["NEFT · Demo Traders", "₹1,25,000", "RCT-0412", true],
          ["UPI · Demo Retail", "₹64,000", "INV-1036", true],
          ["RTGS · Demo Supplies", "₹48,500", "BILL-2210", false],
        ].map(([bank, amount, book, matched]) => (
          <div key={String(bank)} className="contents">
            <div className="rounded-lg bg-app-soft px-3 py-2">
              <p className="font-semibold">{bank}</p>
              <p className="text-[10px] text-app-muted tabular-nums">{amount}</p>
            </div>
            <span
              className={`mx-auto flex size-6 items-center justify-center rounded-full ${matched ? "bg-app-green text-white" : "border-2 border-dashed border-app-amber text-app-amber"}`}
            >
              {matched ? <Check aria-hidden="true" className="size-3.5" /> : "?"}
            </span>
            <div
              className={`rounded-lg px-3 py-2 ${matched ? "bg-app-green-soft" : "bg-app-amber-soft"}`}
            >
              <p className="font-semibold">{book}</p>
              <p className="text-[10px] text-app-muted">
                {matched ? "Matched" : "Waiting for a match"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </UiCard>

    <UiCard x={30} y={262} w={300} className="h-36">
      <Title sub="Computer equipment">Laptop · value over time</Title>
      <div className="flex h-20 items-end gap-2">
        {[
          ["Y1", 100],
          ["Y2", 80],
          ["Y3", 62],
          ["Y4", 46],
          ["Y5", 32],
        ].map(([year, height]) => (
          <div
            key={String(year)}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1"
          >
            <div
              style={{ height: `${String(height)}%` }}
              className={`w-full rounded-t ${year === "Y2" ? "bg-app-blue" : "bg-app-blue-soft"}`}
            />
            <span className="text-[9px] text-app-muted">{year}</span>
          </div>
        ))}
      </div>
    </UiCard>

    <Toast x={388} y={320}>
      <span className="flex size-5 items-center justify-center rounded-full bg-app-green text-white">
        <Check aria-hidden="true" className="size-3" />
      </span>
      11 of 12 entries reconciled
    </Toast>
  </>
);

const PlanningVisual = () => (
  <>
    <UiCard x={30} y={30} w={356} className="h-72">
      <Title sub="Branches and companies, in one place">Your business structure</Title>
      <svg viewBox="0 0 320 200" aria-hidden="true" className="w-full">
        <g fill="none" strokeWidth="1.5" className="stroke-app-line">
          <path d="M160 30 V50 M70 50 H250 M70 50 V70 M250 50 V70" />
          <path d="M70 108 V128 M30 128 H110 M30 128 V146 M110 128 V146" />
        </g>
        <rect x="104" y="4" width="112" height="28" rx="8" className="fill-app-blue" />
        <text
          x="160"
          y="22"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          className="fill-white"
        >
          Demo Co Group
        </text>
        {[
          { x: 14, y: 70, label: "Demo Co HQ", tag: "INR" },
          { x: 194, y: 70, label: "Demo Exports", tag: "USD" },
        ].map((entity) => (
          <g key={entity.label}>
            <rect
              x={entity.x}
              y={entity.y}
              width="112"
              height="38"
              rx="8"
              className="fill-app-blue-soft"
            />
            <text
              x={entity.x + 10}
              y={entity.y + 16}
              fontSize="10"
              fontWeight="700"
              className="fill-app-ink"
            >
              {entity.label}
            </text>
            <text x={entity.x + 10} y={entity.y + 30} fontSize="9" className="fill-app-muted">
              {entity.tag}
            </text>
          </g>
        ))}
        {[
          { x: -4, label: "Branch · Pune" },
          { x: 76, label: "Branch · Delhi" },
        ].map((branch) => (
          <g key={branch.label}>
            <rect
              x={branch.x + 8}
              y="146"
              width="78"
              height="30"
              rx="8"
              className="fill-app-soft"
            />
            <text
              x={branch.x + 47}
              y="165"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              className="fill-app-ink"
            >
              {branch.label}
            </text>
          </g>
        ))}
      </svg>
    </UiCard>

    <UiCard x={408} y={34} w={200}>
      <Title sub="November">Budget used</Title>
      <svg viewBox="0 0 120 70" aria-hidden="true" className="mx-auto w-40">
        <path
          d="M10 62 A50 50 0 0 1 110 62"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          pathLength="100"
          className="stroke-app-soft"
        />
        <path
          d="M10 62 A50 50 0 0 1 110 62"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="78 100"
          className="stroke-app-blue"
        />
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          className="fill-app-ink"
        >
          78%
        </text>
      </svg>
      <p className="mt-1 text-center text-[10px] text-app-muted">₹3.9L of ₹5L</p>
      <p className="mt-2 text-center">
        <Pill tone="green">On track</Pill>
      </p>
    </UiCard>

    <UiCard x={372} y={236} w={330}>
      <Title sub="An invoice raised in dollars">Currency</Title>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-xl bg-app-soft px-3 py-2.5">
          <p className="text-[10px] text-app-muted">You bill</p>
          <p className="text-base font-extrabold tabular-nums">$1,000</p>
        </div>
        <span aria-hidden="true" className="text-app-blue">
          ⇄
        </span>
        <div className="flex-1 rounded-xl bg-app-blue-soft px-3 py-2.5">
          <p className="text-[10px] text-app-muted">In your books</p>
          <p className="text-base font-extrabold text-app-blue tabular-nums">₹83,200</p>
        </div>
      </div>
      <p className="mt-2.5 flex items-center justify-between text-[10px] text-app-muted">
        1 USD = ₹83.20 today
        <Pill tone="green">Exchange gain ₹1,240</Pill>
      </p>
    </UiCard>
  </>
);

const ReportingVisual = () => (
  <>
    <UiCard x={30} y={38} w={270} className="h-72">
      <div className="flex items-start justify-between">
        <Title sub="November 2026">Month-end close</Title>
        <Pill tone="blue">4 of 5</Pill>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-app-soft">
        <div className="h-full w-4/5 rounded-full bg-app-blue" />
      </div>
      {[
        ["Bank reconciled", true],
        ["Depreciation posted", true],
        ["Receivables reviewed", true],
        ["Payables reviewed", true],
        ["Lock the period", false],
      ].map(([step, done]) => (
        <p key={String(step)} className="flex items-center gap-2.5 py-1.5">
          <span
            className={`flex size-5 items-center justify-center rounded-full ${done ? "bg-app-green text-white" : "border-2 border-dashed border-app-line"}`}
          >
            {done ? <Check aria-hidden="true" className="size-3" /> : null}
          </span>
          <span className={done ? "" : "font-semibold text-app-blue"}>{step}</span>
        </p>
      ))}
    </UiCard>

    <UiCard x={286} y={64} w={330} className="h-56">
      <Title sub="Companies in, one group view out">Group consolidation</Title>
      <svg viewBox="0 0 300 150" aria-hidden="true" className="w-full">
        <g fill="none" strokeWidth="1.5" className="stroke-app-line">
          <path d="M96 22 C130 22 130 75 176 75" />
          <path d="M96 75 H176" />
          <path d="M96 128 C130 128 130 75 176 75" />
        </g>
        {[
          { y: 6, label: "Demo Co HQ" },
          { y: 59, label: "Branch · Pune" },
          { y: 112, label: "Demo Exports" },
        ].map((entity) => (
          <g key={entity.label}>
            <rect x="4" y={entity.y} width="92" height="32" rx="8" className="fill-app-soft" />
            <text x="14" y={entity.y + 20} fontSize="10" fontWeight="600" className="fill-app-ink">
              {entity.label}
            </text>
          </g>
        ))}
        <rect x="176" y="44" width="116" height="62" rx="12" className="fill-app-blue" />
        <text
          x="234"
          y="68"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          className="fill-white"
        >
          Group
        </text>
        <text
          x="234"
          y="90"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          className="fill-white"
        >
          ₹48.6L
        </text>
        <rect x="132" y="66" width="56" height="18" rx="9" className="fill-app-amber-soft" />
        <text
          x="160"
          y="78"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          className="fill-app-amber"
        >
          Eliminations
        </text>
      </svg>
    </UiCard>

    <UiCard x={440} y={252} w={290}>
      <div className="mb-2.5 flex gap-1.5 text-[10px] font-semibold">
        <span className="rounded-full bg-app-blue px-2.5 py-1 text-white">Profit &amp; Loss</span>
        <span className="rounded-full bg-app-soft px-2.5 py-1 text-app-muted">Balance Sheet</span>
        <span className="rounded-full bg-app-soft px-2.5 py-1 text-app-muted">Cash Flow</span>
      </div>
      <svg viewBox="0 0 250 56" aria-hidden="true" className="w-full">
        {[18, 28, 22, 36, 32, 44].map((height, index) => (
          <rect
            key={index}
            x={index * 40 + 8}
            y={56 - height}
            width="22"
            height={height}
            rx="3"
            className="fill-app-blue-soft"
          />
        ))}
        <polyline
          points="19,34 59,26 99,30 139,16 179,20 219,6"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-app-blue"
        />
      </svg>
    </UiCard>

    <Toast x={524} y={46}>
      <Lock aria-hidden="true" className="size-4 text-app-blue" />
      Shared with your auditor
    </Toast>
  </>
);

const visuals: Record<string, { label: string; draw: () => ReactNode }> = {
  "core-accounting": {
    label: "A chart of accounts, a general ledger and a journal entry, shown with sample data",
    draw: CoreAccountingVisual,
  },
  "receivables-payables-expenses": {
    label:
      "An invoice, the balance receivable with a reminder button, and a supplier bill, shown with sample data",
    draw: ReceivablesVisual,
  },
  "cash-banking-assets": {
    label:
      "Bank and cash accounts, a bank reconciliation and a fixed asset, shown with sample data",
    draw: CashBankingVisual,
  },
  "planning-structure": {
    label:
      "A budget against actual, a branch and entity list and exchange rates, shown with sample data",
    draw: PlanningVisual,
  },
  "reporting-group-finance": {
    label: "A profit and loss, a group consolidation and a closed period, shown with sample data",
    draw: ReportingVisual,
  },
};

/** The picture for one feature group, found by the group's id. */
export const GroupVisual = ({ id }: { id: string }) => {
  const visual = visuals[id];
  if (!visual) return null;
  return (
    <figure>
      <ScaledPanel label={visual.label} width={WIDTH} height={HEIGHT}>
        {visual.draw()}
      </ScaledPanel>
      <figcaption className="mt-3 text-xs text-ink/50">
        An illustration of the screens, with sample data.
      </figcaption>
    </figure>
  );
};
