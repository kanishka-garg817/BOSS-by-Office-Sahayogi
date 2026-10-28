import { Clock, LogIn, LogOut } from "lucide-react";

import { demoUser } from "@/config/mobile-app";

import { Card } from "./ui";
import { ScreenHeader } from "./screen-header";

const pad = (value: number): string => String(value).padStart(2, "0");

export const formatElapsed = (seconds: number): string =>
  `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;

type AttendanceScreenProps = {
  isCheckedIn: boolean;
  elapsedSeconds: number;
  onToggle: () => void;
  onBack: () => void;
};

export const AttendanceScreen = ({
  isCheckedIn,
  elapsedSeconds,
  onToggle,
  onBack,
}: AttendanceScreenProps) => (
  <>
    <ScreenHeader title="My Attendance" onBack={onBack} />
    <div className="space-y-4 overflow-y-auto px-4 pt-4 pb-6">
      <Card className="space-y-4 bg-app-soft/60 p-4">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${isCheckedIn ? "bg-app-green-soft text-app-green" : "bg-app-soft text-app-muted"}`}
          >
            {isCheckedIn ? "Checked in" : "Not checked in"}
          </span>
          <span className="text-xs text-app-muted">Worked Hours</span>
        </div>
        <div>
          <p className="text-lg font-bold text-app-ink">{demoUser.name}</p>
          <p className="text-xs text-app-muted">{demoUser.location}</p>
        </div>
        <div className="rounded-2xl bg-app-blue-soft p-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-app-blue">
            <Clock aria-hidden="true" className="size-4" />
            Live Timer
          </p>
          <p className="mt-2 text-3xl font-extrabold tracking-wider text-app-ink tabular-nums">
            {isCheckedIn ? formatElapsed(elapsedSeconds) : "--:--:--"}
          </p>
        </div>
        <button
          type="button"
          data-demo="attendance-toggle"
          onClick={onToggle}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white shadow-lg ${isCheckedIn ? "bg-app-red shadow-app-red/30" : "bg-app-blue shadow-app-blue/30"}`}
        >
          {isCheckedIn ? (
            <LogOut aria-hidden="true" className="size-5" />
          ) : (
            <LogIn aria-hidden="true" className="size-5" />
          )}
          {isCheckedIn ? "Check Out" : "Check In"}
        </button>
      </Card>

      <Card className="space-y-3 p-4">
        <h4 className="text-base font-bold text-app-ink">This Week</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <span>
            <span className="block text-xs text-app-muted">Total Hours</span>
            <b className="text-xl text-app-ink">0h</b>
          </span>
          <span>
            <span className="block text-xs text-app-muted">Present Days</span>
            <b className="text-xl text-app-green">0</b>
          </span>
          <span>
            <span className="block text-xs text-app-muted">Absent Days</span>
            <b className="text-xl text-app-amber">4</b>
          </span>
        </div>
      </Card>

      <Card className="space-y-3 p-4">
        <h4 className="text-base font-bold text-app-ink">This Month</h4>
        <div className="grid grid-cols-2 gap-2.5">
          <span className="rounded-xl bg-app-blue-soft p-3">
            <span className="block text-xs text-app-blue">Worked Hours</span>
            <b className="text-xl text-app-ink">97h 20m</b>
          </span>
          <span className="rounded-xl bg-app-green-soft p-3">
            <span className="block text-xs text-app-green">Present Days</span>
            <b className="text-xl text-app-ink">11</b>
          </span>
        </div>
      </Card>
    </div>
  </>
);
