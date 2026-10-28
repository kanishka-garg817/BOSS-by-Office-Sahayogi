import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BookOpen,
  ChartColumn,
  FileText,
  Landmark,
  LayoutDashboard,
  Scale,
  Search,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import markImage from "@/assets/brand/boss-mark.png";
import { demoCompany, demoPeriod } from "@/config/module-pages/finance-demo-data";

export type FinanceNavId =
  | "dashboard"
  | "accounting"
  | "invoices"
  | "receivables"
  | "payables"
  | "banking"
  | "gst"
  | "reports";

const navItems: readonly { id: FinanceNavId; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "accounting", label: "Accounting", icon: BookOpen },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "receivables", label: "Receivables", icon: ArrowDownToLine },
  { id: "payables", label: "Payables", icon: ArrowUpFromLine },
  { id: "banking", label: "Banking", icon: Landmark },
  { id: "gst", label: "GST", icon: Scale },
  { id: "reports", label: "Reports", icon: ChartColumn },
];

type FinanceFrameProps = {
  active: FinanceNavId;
  title: string;
  children: ReactNode;
  /** Something to show at the right of the title bar, such as a status. */
  action?: ReactNode;
};

/** The Finance & Accounting app: its side menu and title bar around one screen. */
export const FinanceFrame = ({ active, title, children, action }: FinanceFrameProps) => (
  <div className="flex h-full w-full bg-app-bg text-app-ink">
    <aside className="flex w-44 shrink-0 flex-col border-r border-app-line bg-app-card p-3">
      <div className="mb-4 flex items-center gap-2 px-1">
        <Image src={markImage} alt="" className="h-6 w-auto" sizes="24px" />
        <span className="leading-tight">
          <span className="block text-xs font-extrabold">BoSS</span>
          <span className="block text-[10px] text-app-muted">Finance &amp; Accounting</span>
        </span>
      </div>
      <ul className="space-y-0.5">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${
              item.id === active ? "bg-app-blue-soft font-bold text-app-blue" : "text-app-muted"
            }`}
          >
            <item.icon aria-hidden="true" className="size-4" />
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-app-line bg-app-card px-4">
        <h3 className="text-sm font-bold">{title}</h3>
        {action}
        <span className="ml-auto flex w-52 items-center gap-2 rounded-lg border border-app-line px-2.5 py-1.5 text-[11px] text-app-muted">
          <Search aria-hidden="true" className="size-3" />
          Search...
        </span>
        <span className="text-[11px] text-app-muted">
          {demoCompany} · {demoPeriod}
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-app-blue-soft text-[10px] font-bold text-app-blue">
          DA
        </span>
      </header>
      <div className="min-h-0 flex-1 p-4">{children}</div>
    </div>
  </div>
);

export const MockCard = ({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => (
  <div style={style} className={`rounded-xl border border-app-line bg-app-card ${className}`}>
    {children}
  </div>
);

type PillTone = "gray" | "blue" | "green" | "amber" | "violet" | "red";

const pillClass: Record<PillTone, string> = {
  gray: "bg-app-soft text-app-muted",
  blue: "bg-app-blue-soft text-app-blue",
  green: "bg-app-green-soft text-app-green",
  amber: "bg-app-amber-soft text-app-amber",
  violet: "bg-app-violet-soft text-app-violet",
  red: "bg-app-red-soft text-app-red",
};

export const Pill = ({ tone, children }: { tone: PillTone; children: ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap transition-colors duration-500 ${pillClass[tone]}`}
  >
    {children}
  </span>
);

type BarRowProps = {
  label: string;
  value: string;
  percent: number;
  className: string;
  delay?: number;
};

/** One labelled horizontal bar that grows from the left. */
export const BarRow = ({ label, value, percent, className, delay = 0 }: BarRowProps) => (
  <div>
    <div className="flex justify-between text-[10px]">
      <span className="text-app-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-app-soft">
      <div
        className={`h-full mock-grow-x rounded-full ${className}`}
        style={{ width: `${String(percent)}%`, transitionDelay: `${String(delay)}ms` }}
      />
    </div>
  </div>
);

/** The delay that makes a list of rows appear one after another. */
export const riseDelay = (index: number): { transitionDelay: string } => ({
  transitionDelay: `${String(index * 110)}ms`,
});

type LineSeries = { values: readonly number[]; className: string };

type LineChartProps = {
  series: readonly LineSeries[];
  max: number;
  width: number;
  height: number;
  labels?: readonly string[];
};

const CHART_LEFT = 28;
const CHART_RIGHT = 14;
const CHART_BOTTOM = 18;

/** A line chart whose lines draw themselves once the mock-up is on screen. */
export const LineChart = ({ series, max, width, height, labels }: LineChartProps) => {
  const plotWidth = width - CHART_LEFT - CHART_RIGHT;
  const plotHeight = height - CHART_BOTTOM - 6;
  const pointFor = (value: number, index: number, count: number) =>
    `${(CHART_LEFT + (index / (count - 1)) * plotWidth).toFixed(1)},${(6 + (1 - value / max) * plotHeight).toFixed(1)}`;

  return (
    <svg viewBox={`0 0 ${String(width)} ${String(height)}`} className="w-full" aria-hidden="true">
      {[0, 0.5, 1].map((step) => {
        const y = 6 + step * plotHeight;
        return (
          <g key={step}>
            <line
              x1={CHART_LEFT}
              x2={width - CHART_RIGHT}
              y1={y}
              y2={y}
              className="stroke-app-line"
              strokeDasharray="3 4"
            />
            <text
              x={CHART_LEFT - 5}
              y={y + 3}
              textAnchor="end"
              fontSize="8"
              className="fill-app-muted"
            >
              {(max * (1 - step)).toFixed(0)}L
            </text>
          </g>
        );
      })}
      {labels?.map((label, index) => (
        <text
          key={label}
          x={CHART_LEFT + (index / (labels.length - 1)) * plotWidth}
          y={height - 4}
          textAnchor="middle"
          fontSize="8"
          className="fill-app-muted"
        >
          {label}
        </text>
      ))}
      {series.map((line) => (
        <polyline
          key={line.className}
          points={line.values
            .map((value, index) => pointFor(value, index, line.values.length))
            .join(" ")}
          pathLength="1"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`mock-draw ${line.className}`}
        />
      ))}
    </svg>
  );
};
