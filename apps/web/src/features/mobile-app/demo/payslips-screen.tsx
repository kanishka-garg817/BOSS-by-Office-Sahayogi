import { Download, FileText } from "lucide-react";

import { payslips } from "@/config/mobile-app";

import { Card } from "./ui";
import { ScreenHeader } from "./screen-header";

export const PayslipsScreen = ({ onBack }: { onBack: () => void }) => (
  <>
    <ScreenHeader title="My Payslips" onBack={onBack} />
    <div className="space-y-4 overflow-y-auto px-4 pt-4 pb-6">
      <div className="space-y-3 rounded-3xl bg-app-blue-soft p-4">
        <span className="inline-block rounded-full bg-app-card px-3 py-1 text-sm font-semibold text-app-ink">
          October 2026
        </span>
        <p className="text-2xl leading-tight font-extrabold text-app-ink">
          Your latest payslip is ready
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-app-ink px-4 py-2 text-sm font-bold text-app-bg">
          <Download aria-hidden="true" className="size-4" />
          Download
        </span>
      </div>

      <h3 className="text-lg font-bold text-app-ink">Monthly statements</h3>
      {payslips.map((payslip) => (
        <Card key={payslip.id} className="flex items-center gap-3 p-3">
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-xl bg-app-blue-soft text-app-blue"
          >
            <FileText className="size-5" />
          </span>
          <span className="flex-1">
            <span className="flex items-center gap-2 text-base font-bold text-app-ink">
              Payslip
              {payslip.isLatest ? (
                <span className="rounded-full bg-app-blue px-2 py-0.5 text-xs font-bold text-white">
                  LATEST
                </span>
              ) : null}
            </span>
            <span className="block text-xs text-app-muted">
              {payslip.month} · Net {payslip.net}
            </span>
          </span>
          <Download aria-hidden="true" className="size-5 text-app-ink" />
        </Card>
      ))}
    </div>
  </>
);
