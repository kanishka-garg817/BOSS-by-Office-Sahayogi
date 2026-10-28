import {
  dashboardKpis,
  expenseSeries,
  months,
  recentTransactions,
  revenueSeries,
} from "@/config/module-pages/finance-demo-data";

import { AnimatedNumber } from "../animated-number";
import { formatRupees } from "../format";
import { FinanceFrame, LineChart, MockCard, riseDelay } from "./mock-parts";

const LEGEND = (
  <span className="flex gap-3 text-[10px] text-app-muted">
    <span className="flex items-center gap-1">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-app-blue" />
      Revenue
    </span>
    <span className="flex items-center gap-1">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-app-amber" />
      Expenses
    </span>
  </span>
);

/** The finance dashboard that opens the page: key figures, a chart and the latest entries. */
export const DashboardScreen = () => (
  <FinanceFrame active="dashboard" title="Finance Dashboard">
    <div className="grid grid-cols-3 gap-3">
      {dashboardKpis.map((kpi, index) => (
        <MockCard key={kpi.id} style={riseDelay(index)} className="mock-rise px-3.5 py-3">
          <p className="text-[11px] text-app-muted">{kpi.label}</p>
          <p className="mt-1 text-lg font-bold">
            <AnimatedNumber value={kpi.value} prefix="₹" />
          </p>
          <p className="text-[10px] text-app-muted">{kpi.note}</p>
        </MockCard>
      ))}
    </div>
    <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-3">
      <MockCard className="p-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold">Revenue vs Expenses</h4>
          {LEGEND}
        </div>
        <div className="mt-2">
          <LineChart
            width={440}
            height={150}
            max={8}
            labels={months}
            series={[
              { values: expenseSeries, className: "stroke-app-amber" },
              { values: revenueSeries, className: "stroke-app-blue" },
            ]}
          />
        </div>
      </MockCard>
      <MockCard className="p-3.5">
        <h4 className="text-xs font-bold">Recent transactions</h4>
        <ul className="mt-2 divide-y divide-app-line">
          {recentTransactions.map((transaction, index) => (
            <li
              key={transaction.id}
              style={riseDelay(index + 3)}
              className="flex mock-rise items-center justify-between gap-2 py-1.5"
            >
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[11px] font-semibold">
                  {transaction.title}
                </span>
                <span className="block text-[10px] text-app-muted">
                  {transaction.party} · {transaction.date}
                </span>
              </span>
              <span
                className={`shrink-0 text-[11px] font-bold ${transaction.amount < 0 ? "text-app-red" : "text-app-green"}`}
              >
                {transaction.amount < 0 ? "" : "+"}
                {formatRupees(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      </MockCard>
    </div>
  </FinanceFrame>
);
