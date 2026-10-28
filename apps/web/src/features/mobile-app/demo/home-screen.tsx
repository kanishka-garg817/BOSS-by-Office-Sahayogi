import {
  CalendarDays,
  ChevronRight,
  Fingerprint,
  Receipt,
  Banknote,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { business, demoUser } from "@/config/mobile-app";

import type { Nav } from "./app-types";
import { Card, IconTile, Progress, SectionTitle, type Tone } from "./ui";

type QuickAction = { id: string; label: string; icon: LucideIcon; tone: Tone; run: () => void };

type HomeScreenProps = { nav: Nav; isCheckedIn: boolean };

export const HomeScreen = ({ nav, isCheckedIn }: HomeScreenProps) => {
  const actions: readonly QuickAction[] = [
    {
      id: "leave",
      label: "Apply leave",
      icon: CalendarDays,
      tone: "blue",
      run: () => {
        nav.open("leave");
      },
    },
    {
      id: "claim",
      label: "New claim",
      icon: Receipt,
      tone: "green",
      run: () => {
        nav.open("claim");
      },
    },
    {
      id: "advance",
      label: "Salary advance",
      icon: Banknote,
      tone: "amber",
      run: () => {
        nav.open("payslips");
      },
    },
    {
      id: "punch",
      label: "Punch in / out",
      icon: Fingerprint,
      tone: "violet",
      run: () => {
        nav.open("attendance");
      },
    },
  ];

  return (
    <div className="space-y-5 px-4 pt-4 pb-6">
      <Card className="flex items-center gap-3 bg-app-violet-soft p-3.5">
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-app-soft text-lg font-bold text-app-muted"
        >
          {demoUser.firstName.slice(0, 1)}
        </span>
        <div className="flex-1">
          <p className="text-xs text-app-muted">Good afternoon,</p>
          <p className="text-lg font-bold text-app-ink">{demoUser.name}</p>
          <p className="text-xs text-app-muted">{demoUser.location}</p>
        </div>
        <ChevronRight aria-hidden="true" className="size-5 text-app-muted" />
      </Card>

      <button
        type="button"
        data-demo="home-attendance"
        onClick={() => {
          nav.open("attendance");
        }}
        className="flex w-full items-center gap-3 rounded-2xl bg-app-blue p-3.5 text-left text-white shadow-lg shadow-app-blue/30"
      >
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-xl bg-white/20"
        >
          <CalendarDays className="size-6" />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-bold">Today&apos;s Attendance</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${isCheckedIn ? "bg-app-green" : "bg-white"}`}
            />
            {isCheckedIn ? "Checked in" : "Not checked in yet"}
          </span>
        </span>
        <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-app-blue">
          {isCheckedIn ? "View" : "Check In"}
        </span>
      </button>

      <section className="space-y-3">
        <SectionTitle>Due Today</SectionTitle>
        <button
          type="button"
          data-demo="home-leave-due"
          onClick={() => {
            nav.open("leave");
          }}
          className="flex w-3/4 items-center gap-3 rounded-2xl bg-app-amber-soft p-3 text-left"
        >
          <IconTile tone="amber">
            <CalendarDays className="size-5" />
          </IconTile>
          <span className="flex-1">
            <span className="block text-sm font-bold text-app-ink">Leave waiting</span>
            <span className="block text-xs text-app-muted">2 requests awaiting a decision</span>
          </span>
        </button>
      </section>

      <section className="space-y-3">
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.run}
              className="flex flex-col items-center gap-2 rounded-2xl bg-app-soft px-1 py-3 text-center"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-app-card">
                <action.icon aria-hidden="true" className="size-5 text-app-ink" />
              </span>
              <span className="text-xs leading-tight font-semibold text-app-ink">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle>Business Overview</SectionTitle>
        <button
          type="button"
          onClick={() => {
            nav.goTab("business");
          }}
          className="w-full text-left"
        >
          <Card className="space-y-2 p-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-semibold text-app-ink">
                <Wallet aria-hidden="true" className="size-4 text-app-blue" />
                Monthly target
              </span>
              <span className="font-bold text-app-blue">{business.target.percent}%</span>
            </div>
            <Progress percent={business.target.percent} tone="blue" />
            <p className="text-xs text-app-muted">
              {business.target.achieved} of {business.target.goal}
            </p>
          </Card>
        </button>
      </section>
    </div>
  );
};
