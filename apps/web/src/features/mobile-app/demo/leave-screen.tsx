import { leaveBalances, leaveRequests, type LeaveStatus } from "@/config/mobile-app";

import { Card } from "./ui";
import { ScreenHeader } from "./screen-header";

export type LeaveFilter = "all" | LeaveStatus;

const filters: readonly { id: LeaveFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "waiting", label: "Waiting" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const statusStyle = {
  waiting: { label: "WAITING", text: "text-app-amber" },
  approved: { label: "APPROVED", text: "text-app-green" },
  rejected: { label: "REJECTED", text: "text-app-red" },
} as const satisfies Record<LeaveStatus, { label: string; text: string }>;

const total = leaveBalances.reduce((sum, balance) => sum + balance.total, 0);
const available = leaveBalances.reduce((sum, balance) => sum + balance.left, 0);

type LeaveScreenProps = {
  filter: LeaveFilter;
  cancelledIds: readonly string[];
  onFilter: (filter: LeaveFilter) => void;
  onCancel: (id: string) => void;
  onBack: () => void;
};

export const LeaveScreen = ({
  filter,
  cancelledIds,
  onFilter,
  onCancel,
  onBack,
}: LeaveScreenProps) => {
  const visible = leaveRequests.filter((request) => filter === "all" || request.status === filter);
  const countOf = (id: LeaveFilter) =>
    id === "all"
      ? leaveRequests.length
      : leaveRequests.filter((request) => request.status === id).length;

  return (
    <>
      <ScreenHeader title="My Leave" onBack={onBack} />
      <div className="space-y-4 overflow-y-auto px-4 pt-4 pb-6">
        <div className="space-y-3 rounded-3xl bg-app-blue p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">My Leave Balance</h3>
            <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">2026</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: "TOTAL", value: String(total) },
              { label: "USED", value: String(total - available) },
              { label: "AVAILABLE", value: String(available) },
            ].map((stat) => (
              <span key={stat.label} className="rounded-2xl bg-white/15 py-2.5">
                <b className="block text-2xl">{stat.value}</b>
                <span className="text-xs">{stat.label}</span>
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {leaveBalances.map((balance) => (
              <span key={balance.id} className="space-y-1 rounded-2xl bg-white/15 p-2">
                <span className="block truncate text-xs">{balance.name}</span>
                <span className="block text-base font-bold">
                  {balance.left}{" "}
                  <span className="text-xs font-normal">of {balance.total} left</span>
                </span>
                <span className="block h-1 overflow-hidden rounded-full bg-white/25">
                  <span
                    className="block h-full rounded-full bg-white"
                    style={{ width: `${String((balance.left / balance.total) * 100)}%` }}
                  />
                </span>
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-base font-bold text-app-ink">Leave Status</h3>
        <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Filter leave requests">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              data-demo={`leave-filter-${item.id}`}
              aria-pressed={filter === item.id}
              onClick={() => {
                onFilter(item.id);
              }}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${filter === item.id ? "border-app-blue bg-app-blue text-white" : "border-app-line bg-app-card text-app-ink"}`}
            >
              {item.label} <span className="font-normal opacity-70">{countOf(item.id)}</span>
            </button>
          ))}
        </div>

        {visible.map((request) => {
          const isCancelled = cancelledIds.includes(request.id);
          const style = statusStyle[request.status];
          return (
            <Card key={request.id} className="space-y-2 p-3">
              <div className="flex items-start gap-3">
                <span className="flex size-12 flex-col items-center justify-center rounded-xl bg-app-blue-soft text-app-blue">
                  <span className="text-xs font-bold">{request.month}</span>
                  <b className="text-lg leading-none">{request.day}</b>
                </span>
                <span className="flex-1">
                  <span className="block text-base font-bold text-app-ink">{request.type}</span>
                  <span className="block text-xs text-app-muted">{request.length}</span>
                </span>
                <span
                  className={`text-xs font-bold ${isCancelled ? "text-app-muted" : style.text}`}
                >
                  {isCancelled ? "CANCELLED" : style.label}
                </span>
              </div>
              <p className="text-sm text-app-muted">“{request.note}”</p>
              {request.status === "waiting" && !isCancelled ? (
                <button
                  type="button"
                  onClick={() => {
                    onCancel(request.id);
                  }}
                  className="w-full rounded-xl border border-app-line py-2 text-sm font-bold text-app-red"
                >
                  Cancel request
                </button>
              ) : null}
            </Card>
          );
        })}
      </div>
    </>
  );
};
