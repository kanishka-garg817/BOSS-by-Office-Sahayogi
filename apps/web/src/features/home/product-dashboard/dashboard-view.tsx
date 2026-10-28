import {
  Bell,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Hourglass,
  Landmark,
  LayoutDashboard,
  Package,
  Percent,
  Plus,
  ReceiptIndianRupee,
  Search,
  ShoppingCart,
  Sunset,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import markImage from "@/assets/brand/boss-mark.png";
import {
  calendar,
  categories,
  dashboardCompany,
  dashboardUser,
  expenseSeries,
  greeting,
  kpis,
  moduleStatus,
  moduleSummaries,
  months,
  revenueSeries,
  sidebarModuleSlugs,
  type Kpi,
} from "@/config/dashboard-demo";
import { modules, type ModuleTone } from "@/config/modules";
import { toneClass, type Tone } from "@/features/mobile-app/demo/ui";

const moduleTone: Record<ModuleTone, Tone> = {
  green: "green",
  blue: "blue",
  pink: "red",
  orange: "amber",
  purple: "violet",
  teal: "teal",
  red: "red",
  indigo: "violet",
  amber: "amber",
  sky: "blue",
};

const kpiIcons = {
  sales: TrendingUp,
  margin: Percent,
  cash: Landmark,
  receipts: ReceiptIndianRupee,
  receivables: Hourglass,
  inventory: Package,
  orders: ShoppingCart,
} as const satisfies Record<Kpi["id"], LucideIcon>;

const card = "rounded-2xl border border-app-line bg-app-card shadow-sm";

export const moduleTile = (slug: string) => {
  const bossModule = modules.find((candidate) => candidate.slug === slug);
  if (!bossModule) return null;
  return { bossModule, tone: toneClass[moduleTone[bossModule.tone]] };
};

const Sidebar = () => (
  <div className="flex w-20 shrink-0 flex-col items-center bg-app-card py-3">
    <Image src={markImage} alt="" className="mb-3 h-8 w-auto" sizes="32px" />
    <nav
      aria-label="Modules"
      data-tour="modules"
      className="flex w-full flex-col items-center gap-0.5"
    >
      <span className="relative flex w-full flex-col items-center gap-1 py-1.5 text-[11px] font-semibold text-app-ink">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-full w-0.5 rounded-r bg-app-blue"
        />
        <span className="flex size-8 items-center justify-center rounded-lg bg-app-blue-soft text-app-blue">
          <LayoutDashboard aria-hidden="true" className="size-4" />
        </span>
        Dashboard
      </span>
      {sidebarModuleSlugs.map((slug) => {
        const tile = moduleTile(slug);
        if (!tile) return null;
        return (
          <span
            key={slug}
            className="flex w-full flex-col items-center gap-1 px-1 py-1.5 text-center text-[11px] leading-tight text-app-muted"
          >
            <span
              className={`flex size-8 items-center justify-center rounded-lg ${tile.tone.soft} ${tile.tone.text}`}
            >
              <tile.bossModule.icon aria-hidden="true" className="size-4" />
            </span>
            {tile.bossModule.name}
          </span>
        );
      })}
    </nav>
  </div>
);

const TopBar = () => (
  <header className="flex items-center gap-3 px-4 py-3">
    <span className={`flex items-center gap-2.5 px-2.5 py-1.5 ${card}`}>
      <Building2 aria-hidden="true" className="size-4 text-app-muted" />
      <span className="leading-tight">
        <span className="block text-[11px] text-app-muted">
          {dashboardCompany.organisation} /{" "}
          <b className="text-xs text-app-ink">{dashboardCompany.workspace}</b>
        </span>
        <span className="block text-[11px] text-app-muted">{dashboardCompany.year}</span>
      </span>
      <ChevronDown aria-hidden="true" className="size-3.5 text-app-muted" />
    </span>
    <span className="ml-auto flex w-80 items-center gap-2 rounded-xl border border-app-line bg-app-card px-3 py-2 text-xs text-app-muted">
      <Search aria-hidden="true" className="size-3.5" />
      Search modules and pages...
    </span>
    <Plus aria-hidden="true" className="ml-3 size-4 text-app-ink" />
    <Bell aria-hidden="true" className="size-4 text-app-ink" />
    <span className="flex size-8 items-center justify-center rounded-lg bg-brand-navy text-white">
      <CookingPot aria-hidden="true" className="size-4" />
    </span>
    <span className="flex size-8 items-center justify-center rounded-full bg-app-blue-soft text-xs font-bold text-app-blue">
      {dashboardUser.initials}
    </span>
  </header>
);

const KpiCard = ({ kpi }: { kpi: Kpi }) => {
  const Icon = kpiIcons[kpi.id];
  return (
    <div className={`px-3.5 py-3 ${card}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-app-muted">{kpi.label}</p>
        <span className="flex size-7 items-center justify-center rounded-lg bg-app-soft text-app-ink">
          <Icon aria-hidden="true" className="size-3.5" />
        </span>
      </div>
      <p className="mt-1.5 text-lg font-bold text-app-ink">{kpi.value}</p>
      <p className="mt-0.5 text-[11px] text-app-muted">{kpi.note}</p>
    </div>
  );
};

const CalendarCard = () => (
  <section data-tour="calendar" aria-label="Calendar" className={`p-3.5 ${card}`}>
    <div className="flex items-start justify-between">
      <div className="leading-tight">
        <p className="text-sm font-bold text-app-blue">{calendar.month}</p>
        <p className="text-xs text-app-muted">{calendar.year}</p>
      </div>
      <span className="flex gap-2 text-app-muted">
        <ChevronLeft aria-hidden="true" className="size-3.5" />
        <ChevronRight aria-hidden="true" className="size-3.5" />
      </span>
    </div>
    <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px]">
      {calendar.weekdays.map((weekday) => (
        <span key={weekday} className="font-semibold text-app-muted">
          {weekday}
        </span>
      ))}
      {calendar.cells.map((day, index) => {
        const isOutside = index < calendar.leadingCells || index >= calendar.trailingFrom;
        const isToday = !isOutside && day === calendar.today;
        return (
          <span
            key={`${String(index)}-${String(day)}`}
            className={`mx-auto flex size-6 items-center justify-center rounded-full ${isToday ? "bg-brand-navy font-bold text-white" : isOutside ? "text-app-line" : "text-app-ink"}`}
          >
            {day}
          </span>
        );
      })}
    </div>
  </section>
);

const CHART = {
  width: 560,
  height: 170,
  left: 34,
  right: 10,
  top: 8,
  bottom: 20,
  max: 40,
} as const;

const pointsFor = (series: readonly number[]): string =>
  series
    .map((value, index) => {
      const x =
        CHART.left + (index / (series.length - 1)) * (CHART.width - CHART.left - CHART.right);
      const y = CHART.top + (1 - value / CHART.max) * (CHART.height - CHART.top - CHART.bottom);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

const RevenueChart = () => (
  <section data-tour="revenue" aria-label="Revenue versus expense" className={`p-4 ${card}`}>
    <div className="flex items-start justify-between">
      <h3 className="text-sm font-bold text-app-ink">Revenue vs Expense</h3>
      <span className="flex gap-3 text-[11px] text-app-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-app-blue" />
          Revenue
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-app-amber" />
          Expense
        </span>
      </span>
    </div>
    <svg
      viewBox={`0 0 ${String(CHART.width)} ${String(CHART.height)}`}
      className="mt-2 w-full"
      role="img"
      aria-label="Revenue is above expense in every month"
    >
      {[0, 10, 20, 30, 40].map((tick) => {
        const y = CHART.top + (1 - tick / CHART.max) * (CHART.height - CHART.top - CHART.bottom);
        return (
          <g key={tick}>
            <line
              x1={CHART.left}
              x2={CHART.width - CHART.right}
              y1={y}
              y2={y}
              className="stroke-app-line"
              strokeDasharray="3 4"
            />
            <text
              x={CHART.left - 6}
              y={y + 3}
              textAnchor="end"
              className="fill-app-muted"
              fontSize="10"
            >
              ₹{tick}L
            </text>
          </g>
        );
      })}
      {months.map((month, index) => (
        <text
          key={month}
          x={CHART.left + (index / (months.length - 1)) * (CHART.width - CHART.left - CHART.right)}
          y={CHART.height - 5}
          textAnchor="middle"
          className="fill-app-muted"
          fontSize="10"
        >
          {month}
        </text>
      ))}
      <polyline
        points={pointsFor(expenseSeries)}
        fill="none"
        className="stroke-app-amber"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={pointsFor(revenueSeries)}
        fill="none"
        className="stroke-app-blue"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  </section>
);

const categoryColors = [
  "bg-app-blue",
  "bg-app-teal",
  "bg-app-violet",
  "bg-app-amber",
  "bg-app-muted",
] as const;

const CategoryChart = () => (
  <section data-tour="categories" aria-label="Items by category" className={`p-4 ${card}`}>
    <h3 className="text-sm font-bold text-app-ink">Items by category</h3>
    <ul className="mt-3 space-y-2.5">
      {categories.map((category, index) => (
        <li key={category.id} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-app-ink">{category.name}</span>
            <span className="text-app-muted">{category.percent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-app-soft">
            <div
              className={`h-full rounded-full ${categoryColors[index] ?? "bg-app-blue"}`}
              style={{ width: `${String(category.percent * 2.6)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const ModulesGlance = () => (
  <section data-tour="glance" aria-label="Modules at a glance" className={`p-4 ${card}`}>
    <h3 className="text-sm font-bold text-app-ink">Modules at a Glance</h3>
    <p className="text-[11px] text-app-muted">Every module you have access to</p>
    <ul className="mt-3 grid grid-cols-3 gap-2.5">
      {sidebarModuleSlugs.slice(0, 6).map((slug) => {
        const tile = moduleTile(slug);
        if (!tile) return null;
        const status = moduleStatus[slug] ?? "Coming soon";
        return (
          <li
            key={slug}
            className="flex items-center gap-2.5 rounded-xl border border-app-line px-2.5 py-2"
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${tile.tone.soft} ${tile.tone.text}`}
            >
              <tile.bossModule.icon aria-hidden="true" className="size-4" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="flex items-center justify-between gap-2">
                <span className="truncate text-xs font-semibold text-app-ink">
                  {tile.bossModule.name}
                </span>
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] ${status === "Live" ? "bg-app-green-soft text-app-green" : "bg-app-soft text-app-muted"}`}
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-current" />
                  {status}
                </span>
              </span>
              <span className="block truncate text-[11px] text-app-muted">
                {moduleSummaries[slug] ?? ""}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  </section>
);

type DashboardViewProps = {
  /** Replaces the plain module bar, for pages that make it interactive. */
  sidebar?: ReactNode;
};

/** The dashboard's own picture: sidebar, top bar, key numbers, calendar, charts and modules. */
export const DashboardView = ({ sidebar }: DashboardViewProps) => (
  <div className="flex min-w-0 flex-1">
    {sidebar ?? <Sidebar />}
    <div className="flex min-w-0 flex-1 flex-col bg-app-bg">
      <TopBar />
      <div className="space-y-3 px-4 pb-4">
        <div className="grid grid-cols-[1fr_15rem] gap-3">
          <div data-tour="kpis" className="grid grid-cols-4 gap-3">
            <div className="flex flex-col justify-center rounded-2xl bg-brand-navy px-4 py-3 text-white">
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <Sunset aria-hidden="true" className="size-3.5 text-amber-400" />
                {greeting.hello}
              </p>
              <p className="mt-1 text-base font-bold">{dashboardUser.name}</p>
              <p className="mt-1.5 text-[11px] text-white/60">{greeting.note}</p>
            </div>
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
          <CalendarCard />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CategoryChart />
          <RevenueChart />
        </div>
        <ModulesGlance />
      </div>
    </div>
  </div>
);
