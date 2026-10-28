import { CalendarDays, ChevronDown, FileText, Send, X } from "lucide-react";

import { claimCategories } from "@/config/mobile-app";

export type ClaimForm = { title: string; category: string; amount: string; isSent: boolean };

type ClaimScreenProps = {
  form: ClaimForm;
  onChange: (changes: Partial<ClaimForm>) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const fieldClass =
  "w-full rounded-xl border border-app-line bg-app-soft/60 px-3.5 py-3 text-sm text-app-ink placeholder:text-app-muted";

export const ClaimScreen = ({ form, onChange, onSubmit, onClose }: ClaimScreenProps) => (
  <>
    <header className="flex shrink-0 items-center gap-3 px-4 py-3">
      <button
        type="button"
        data-demo="back"
        aria-label="Close"
        onClick={onClose}
        className="flex size-9 items-center justify-center rounded-full bg-app-soft text-app-ink"
      >
        <X className="size-5" />
      </button>
      <h2 className="text-lg font-bold text-app-ink">New claim</h2>
    </header>
    <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
      <p className="flex items-center gap-3 rounded-2xl bg-app-blue p-3 text-sm text-white">
        <FileText aria-hidden="true" className="size-6 shrink-0" />
        Keep the bill. HR may ask to see it before approving.
      </p>
      <label className="block space-y-1.5 text-sm font-bold text-app-ink">
        Title *
        <input
          data-demo="claim-title"
          value={form.title}
          onChange={(event) => {
            onChange({ title: event.target.value });
          }}
          placeholder="e.g. Cab to client office"
          className={`${fieldClass} font-normal`}
        />
      </label>
      <label className="block space-y-1.5 text-sm font-bold text-app-ink">
        Category
        <span className="relative block">
          <select
            value={form.category}
            onChange={(event) => {
              onChange({ category: event.target.value });
            }}
            className={`${fieldClass} appearance-none font-normal`}
          >
            {claimCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-app-muted"
          />
        </span>
      </label>
      <label className="block space-y-1.5 text-sm font-bold text-app-ink">
        Expense date *
        <span className="relative block">
          <input readOnly value="Oct 24, 2026" className={`${fieldClass} font-normal`} />
          <CalendarDays
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-app-muted"
          />
        </span>
      </label>
      <label className="block space-y-1.5 text-sm font-bold text-app-ink">
        Amount (₹) *
        <input
          data-demo="claim-amount"
          value={form.amount}
          inputMode="decimal"
          onChange={(event) => {
            onChange({ amount: event.target.value });
          }}
          placeholder="0.00"
          className={`${fieldClass} font-normal`}
        />
      </label>
      {form.isSent ? (
        <p
          role="status"
          className="rounded-xl bg-app-green-soft p-3 text-sm font-semibold text-app-green"
        >
          Claim sent for approval.
        </p>
      ) : null}
    </div>
    <div className="flex shrink-0 gap-3 px-4 pt-2 pb-4">
      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-app-line px-6 py-3 text-sm font-bold text-app-ink"
      >
        Cancel
      </button>
      <button
        type="button"
        data-demo="claim-submit"
        onClick={onSubmit}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-app-blue py-3 text-sm font-bold text-white shadow-lg shadow-app-blue/30"
      >
        <Send aria-hidden="true" className="size-4" />
        Submit claim
      </button>
    </div>
  </>
);
