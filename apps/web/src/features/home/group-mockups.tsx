import { Check, IndianRupee, MessageSquare, ThumbsUp, Truck } from "lucide-react";

/**
 * Simple, quiet pictures of each module family's screens, in the spirit of a product preview:
 * a few labels, placeholder lines and faces, no real figures. Decorative only.
 */

const Line = ({ width }: { width: string }) => (
  <span className={`block h-2 rounded-full bg-slate-200/80 ${width}`} />
);

const Avatar = ({ initials, tone }: { initials: string; tone: string }) => (
  <span
    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-surface ${tone}`}
  >
    {initials}
  </span>
);

/** Two invoice columns: paid and due. */
export const FinanceMockup = () => (
  <div aria-hidden="true" className="grid w-full max-w-64 grid-cols-2 gap-2.5">
    {[
      { label: "Paid", tone: "bg-emerald-100 text-emerald-700", count: "12" },
      { label: "Due", tone: "bg-amber-100 text-amber-700", count: "3" },
    ].map((column) => (
      <div
        key={column.label}
        className="rounded-xl bg-surface/90 p-2.5 shadow-sm ring-1 ring-slate-100"
      >
        <div className="flex items-center justify-between">
          <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${column.tone}`}>
            {column.label}
          </span>
          <span className="text-xs font-semibold text-slate-400">{column.count}</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          <Line width="w-full" />
          <Line width="w-2/3" />
        </div>
        <div className="mt-2.5 flex items-center gap-1 text-slate-300">
          <IndianRupee className="size-3" aria-hidden="true" />
          <Line width="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

/** A dispatch card with its delivery steps. */
export const OperationsMockup = () => (
  <div
    aria-hidden="true"
    className="w-full max-w-64 rounded-xl bg-surface/90 p-3 shadow-sm ring-1 ring-slate-100"
  >
    <div className="flex items-center gap-2">
      <span className="flex size-6 items-center justify-center rounded-md bg-teal-100 text-teal-600">
        <Truck className="size-3.5" aria-hidden="true" />
      </span>
      <Line width="w-24" />
    </div>
    <div className="mt-3 flex items-center">
      {[0, 1, 2, 3].map((step) => (
        <span key={step} className="flex flex-1 items-center last:flex-none">
          <span className={`size-3 rounded-full ${step < 3 ? "bg-teal-400" : "bg-teal-100"}`} />
          {step < 3 ? (
            <span className={`h-0.5 flex-1 ${step < 2 ? "bg-teal-300" : "bg-teal-100"}`} />
          ) : null}
        </span>
      ))}
    </div>
    <div className="mt-3 space-y-1.5">
      <Line width="w-full" />
      <Line width="w-3/4" />
    </div>
  </div>
);

/** A short team thread with faces and reactions. */
export const PeopleMockup = () => (
  <div aria-hidden="true" className="w-full max-w-64 space-y-2.5">
    {[
      { initials: "NV", tone: "bg-violet-400", widths: ["w-20", "w-36"] },
      { initials: "RS", tone: "bg-amber-400", widths: ["w-16", "w-28"] },
    ].map((row) => (
      <div key={row.initials} className="flex items-start gap-2">
        <Avatar initials={row.initials} tone={row.tone} />
        <div className="space-y-1.5 pt-1">
          <span className={`block h-2 rounded-full bg-blue-200 ${row.widths[0] ?? ""}`} />
          <Line width={row.widths[1] ?? ""} />
        </div>
      </div>
    ))}
    <div className="flex gap-1.5 pl-8">
      <span className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
        <ThumbsUp className="size-3 text-blue-500" aria-hidden="true" />4
      </span>
      <span className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
        <MessageSquare className="size-3 text-blue-500" aria-hidden="true" />2
      </span>
      <span className="hidden items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-100 xl:flex">
        <Check className="size-3 text-emerald-500" aria-hidden="true" />
        Approved
      </span>
    </div>
  </div>
);

/** A report page sitting on top of another, with a small chart line. */
export const ControlMockup = () => (
  <div aria-hidden="true" className="relative w-full max-w-64">
    <div className="absolute inset-x-6 -top-2 h-full rotate-3 rounded-xl bg-surface/60 ring-1 ring-slate-100" />
    <div className="relative rounded-xl bg-surface/95 p-3 shadow-sm ring-1 ring-slate-100">
      <span className="block h-2.5 w-24 rounded-full bg-indigo-200" />
      <div className="mt-2.5 space-y-1.5">
        <Line width="w-full" />
        <Line width="w-5/6" />
      </div>
      <svg viewBox="0 0 120 32" className="mt-2.5 h-8 w-full" aria-hidden="true">
        <path
          d="M 2 26 L 22 20 L 40 23 L 60 12 L 80 15 L 100 6 L 118 8"
          fill="none"
          className="stroke-indigo-300"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);
