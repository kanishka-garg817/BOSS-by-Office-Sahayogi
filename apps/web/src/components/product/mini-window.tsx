import { Check, Mail, X } from "lucide-react";

import type { WindowContent } from "@/types/window-content";

const COLUMN_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

type ContentProps<K extends WindowContent["kind"]> = {
  content: Extract<WindowContent, { kind: K }>;
  /** Tighter padding and smaller text, for small spaces such as cards. */
  compact?: boolean;
};

/** Spacing and text size for the simple windows, in the normal and the compact size. */
const getDensity = (compact: boolean) =>
  compact
    ? { pad: "p-2.5", text: "text-xs", row: "py-1", stack: "space-y-1.5", gap: "mt-1" }
    : { pad: "p-3.5", text: "text-sm", row: "py-1.5", stack: "space-y-2", gap: "mt-2" };

const ChatBody = ({ content }: ContentProps<"chat">) => (
  <div>
    <div className="flex items-center gap-2 bg-emerald-600 px-4 py-2.5 text-white">
      <span className="flex size-6 items-center justify-center rounded-full bg-white/25 text-sm font-bold">
        {content.contact.charAt(0)}
      </span>
      <span className="text-sm font-semibold">{content.contact}</span>
    </div>
    <ul className="space-y-2 bg-stone-100 p-3.5">
      {content.messages.map((message) => (
        <li
          key={message.time + message.text}
          className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-sm leading-snug text-ink shadow-sm ${
            message.side === "out" ? "ml-auto bg-emerald-100" : "bg-surface"
          }`}
        >
          {message.text}
          <span className="mt-0.5 block text-right text-sm text-ink/40">{message.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SheetBody = ({ content }: ContentProps<"sheet">) => (
  <div>
    <div className="flex items-center gap-2 border-b border-slate-200 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
      Excel
      <span className="font-normal text-white/80">· {content.file}</span>
    </div>
    <table className="w-full table-fixed border-collapse text-sm text-ink">
      <thead>
        <tr className="bg-slate-100 text-center text-ink/50">
          <th className="w-6 border border-slate-200" />
          {content.columns.map((_, index) => (
            <th key={index} className="border border-slate-200 py-0.5 font-medium">
              {COLUMN_LETTERS[index]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-emerald-50 font-semibold">
          <td className="border border-slate-200 bg-slate-100 text-center text-ink/50">1</td>
          {content.columns.map((column) => (
            <td key={column} className="truncate border border-slate-200 px-1.5 py-1">
              {column}
            </td>
          ))}
        </tr>
        {content.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-slate-200 bg-slate-100 text-center text-ink/50">
              {rowIndex + 2}
            </td>
            {row.map((cell, cellIndex) => {
              const isFlagged = content.flag?.[0] === rowIndex && content.flag[1] === cellIndex;
              return (
                <td
                  key={cellIndex}
                  className={`truncate border px-1.5 py-1 ${isFlagged ? "border-amber-400 bg-amber-100 font-semibold" : "border-slate-200"}`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MailBody = ({ content, compact = false }: ContentProps<"mail">) => {
  const d = getDensity(compact);
  return (
    <div className={d.pad}>
      <div className="flex items-start gap-2">
        <Mail className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
        <div className="min-w-0">
          <p className={`${d.text} font-bold text-ink`}>{content.subject}</p>
          <p className={`mt-0.5 ${d.text} text-ink/55`}>
            {content.from} · {content.time}
          </p>
        </div>
      </div>
      <p className={`${d.gap} ${d.text} leading-snug text-ink/70 ${compact ? "line-clamp-2" : ""}`}>
        {content.preview}
      </p>
    </div>
  );
};

const FormBody = ({ content, compact = false }: ContentProps<"form">) => {
  const d = getDensity(compact);
  return (
    <div className={d.pad}>
      {compact ? null : <p className="text-sm font-bold text-ink">{content.title}</p>}
      <dl className={`${compact ? "" : "mt-2"} divide-y divide-slate-100`}>
        {content.fields.map((field) => (
          <div
            key={field.label}
            className={`flex items-center justify-between gap-3 ${d.row} ${d.text}`}
          >
            <dt className="text-ink/55">{field.label}</dt>
            <dd
              className={`text-right font-semibold ${field.flag ? "rounded bg-amber-100 px-1.5 py-0.5 text-amber-900" : "text-ink"}`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const ListBody = ({ content, compact = false }: ContentProps<"list">) => {
  const d = getDensity(compact);
  return (
    <div className={d.pad}>
      {compact ? null : <p className="text-sm font-bold text-ink">{content.title}</p>}
      <ul className={`${compact ? "" : "mt-2"} ${d.stack}`}>
        {content.items.map((item) => (
          <li key={item} className={`flex gap-2 ${d.text} leading-snug text-ink/80`}>
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-blue/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CheckBody = ({ content, compact = false }: ContentProps<"check">) => {
  const d = getDensity(compact);
  return (
    <div className={d.pad}>
      {compact ? null : <p className="text-sm font-bold text-ink">{content.title}</p>}
      <ul className={`${compact ? "" : "mt-2"} ${d.stack}`}>
        {content.items.map((item) => (
          <li key={item.text} className={`flex items-start gap-2 ${d.text} leading-snug`}>
            <span
              className={`mt-px flex size-4 shrink-0 items-center justify-center rounded border ${
                item.done
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : content.neutral
                    ? "border-slate-300 bg-surface text-transparent"
                    : "border-red-300 bg-red-50 text-red-500"
              }`}
            >
              {item.done ? <Check className="size-3" /> : <X className="size-3" />}
            </span>
            <span
              className={item.done && !content.neutral ? "text-ink/50 line-through" : "text-ink"}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderBody = (content: WindowContent, compact: boolean) => {
  switch (content.kind) {
    case "chat":
      return <ChatBody content={content} />;
    case "sheet":
      return <SheetBody content={content} />;
    case "mail":
      return <MailBody content={content} compact={compact} />;
    case "form":
      return <FormBody content={content} compact={compact} />;
    case "list":
      return <ListBody content={content} compact={compact} />;
    case "check":
      return <CheckBody content={content} compact={compact} />;
  }
};

type MiniWindowProps = {
  title: string;
  content: WindowContent;
  /** A smaller version for cards: tighter spacing and text, without the repeated inner title. */
  compact?: boolean;
};

/** A small window that looks like the everyday tool it stands in for, filled with example data. */
export const MiniWindow = ({ title, content, compact = false }: MiniWindowProps) => (
  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-lg shadow-brand-navy/10">
    <div
      className={`flex items-center gap-1.5 border-b border-ink/10 bg-slate-50 px-3.5 ${compact ? "py-1.5" : "py-2"}`}
    >
      <span className="size-2 rounded-full bg-red-300" />
      <span className="size-2 rounded-full bg-amber-300" />
      <span className="size-2 rounded-full bg-emerald-300" />
      <span className={`ml-1.5 truncate font-semibold text-ink ${compact ? "text-xs" : "text-sm"}`}>
        {title}
      </span>
    </div>
    <div className="flex-1">{renderBody(content, compact)}</div>
  </div>
);
