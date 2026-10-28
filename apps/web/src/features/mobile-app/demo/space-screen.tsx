import { CirclePlus, CalendarDays, Receipt, Wallet, Banknote, Repeat } from "lucide-react";

import { calendar, demoUser, leaveBalances, payslips, type DayStatus } from "@/config/mobile-app";

import type { Nav } from "./app-types";
import { Card, IconTile, SectionTitle, type Tone } from "./ui";

const dayClass: Record<DayStatus, string> = {
  present: "border-app-green bg-app-green-soft text-app-ink",
  half: "border-app-amber bg-app-amber-soft text-app-ink",
  absent: "border-app-red bg-app-red-soft text-app-ink",
  leave: "border-app-blue bg-app-blue-soft text-app-ink",
  today: "border-app-blue bg-app-card text-app-ink",
  none: "border-transparent text-app-muted",
};

const legend = [
  { label: "Present", dot: "bg-app-green" },
  { label: "Half day", dot: "bg-app-amber" },
  { label: "Absent", dot: "bg-app-red" },
] as const;

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

const availableDays = leaveBalances.reduce((sum, balance) => sum + balance.left, 0);

type Service = {
  id: string;
  label: string;
  hint: string;
  tone: Tone;
  icon: typeof Wallet;
  target: "leave" | "payslips" | "claim";
};

const services: readonly Service[] = [
  {
    id: "leave",
    label: "Leave",
    hint: "Balance and requests",
    tone: "blue",
    icon: CalendarDays,
    target: "leave",
  },
  {
    id: "apply",
    label: "Apply for leave",
    hint: "Send a new request",
    tone: "green",
    icon: CirclePlus,
    target: "leave",
  },
  {
    id: "payslips",
    label: "Payslips",
    hint: "Monthly pay",
    tone: "amber",
    icon: Wallet,
    target: "payslips",
  },
  {
    id: "claims",
    label: "Claims",
    hint: "Reimbursements",
    tone: "violet",
    icon: Receipt,
    target: "claim",
  },
  {
    id: "advance",
    label: "Salary advance",
    hint: "Requests and status",
    tone: "red",
    icon: Banknote,
    target: "payslips",
  },
  {
    id: "encash",
    label: "Leave encashment",
    hint: "Requests and status",
    tone: "teal",
    icon: Repeat,
    target: "leave",
  },
];

export const SpaceScreen = ({ nav }: { nav: Nav }) => {
  const cells = [
    ...Array.from({ length: calendar.leadingBlanks }, (_, index) => ({
      key: `blank-${String(index)}`,
      day: 0,
    })),
    ...Array.from({ length: calendar.days }, (_, index) => ({
      key: `day-${String(index + 1)}`,
      day: index + 1,
    })),
  ];
  const latest = payslips[0];

  return (
    <div className="space-y-4 px-4 pt-4 pb-6">
      <Card className="bg-app-violet-soft p-3.5">
        <p className="text-lg font-bold text-app-ink">{demoUser.name}</p>
        <p className="text-xs text-app-muted">Employee ID {demoUser.employeeId}</p>
        <p className="text-xs text-app-muted">
          {demoUser.role} · {demoUser.department}
        </p>
        <p className="text-xs text-app-muted">{demoUser.location}</p>
      </Card>

      <div className="grid grid-cols-2 gap-2.5">
        <Card className="space-y-1 bg-app-blue-soft p-3">
          <p className="text-xs font-semibold text-app-muted">Leave Balance</p>
          <p className="text-xl font-extrabold text-app-ink">{availableDays} days</p>
          <p className="text-xs text-app-muted">{leaveBalances.length} leave types</p>
        </Card>
        <Card className="space-y-1 bg-app-green-soft p-3">
          <p className="text-xs font-semibold text-app-muted">Latest Payslip</p>
          <p className="text-xl font-extrabold text-app-ink">{latest.net}</p>
          <p className="text-xs text-app-muted">Net pay · {latest.month}</p>
        </Card>
      </div>

      <Card className="space-y-1 bg-app-amber-soft p-3">
        <p className="text-xs font-semibold text-app-muted">Pending Requests</p>
        <p className="text-xl font-extrabold text-app-ink">4 requests</p>
        <p className="text-xs text-app-muted">Waiting for a decision</p>
      </Card>

      <Card className="p-3.5">
        <p className="text-center text-sm font-bold text-app-ink">{calendar.title}</p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-app-muted">
          {WEEKDAYS.map((weekday, index) => (
            <span key={`${weekday}-${String(index)}`}>{weekday}</span>
          ))}
          {cells.map((cell) => {
            const status: DayStatus = calendar.status[cell.day] ?? "none";
            return cell.day === 0 ? (
              <span key={cell.key} />
            ) : (
              <span
                key={cell.key}
                className={`mx-auto flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${dayClass[status]}`}
              >
                {cell.day}
              </span>
            );
          })}
        </div>
        <div className="mt-3 flex justify-center gap-3 text-xs text-app-muted">
          {legend.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={`size-2 rounded-full ${item.dot}`} />
              {item.label}
            </span>
          ))}
        </div>
      </Card>

      <SectionTitle>My Services</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            data-demo={`space-${service.id}`}
            onClick={() => {
              nav.open(service.target);
            }}
            className="flex items-center gap-2.5 rounded-2xl border border-app-line bg-app-card p-2.5 text-left"
          >
            <IconTile tone={service.tone}>
              <service.icon className="size-5" />
            </IconTile>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-app-ink">{service.label}</span>
              <span className="block truncate text-xs text-app-muted">{service.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
