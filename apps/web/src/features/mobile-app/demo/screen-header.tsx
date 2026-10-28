import { ArrowLeft, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
  action?: ReactNode;
};

/** The top bar of a detail screen: a back arrow, the title, and the search and bell icons. */
export const ScreenHeader = ({ title, onBack, action }: ScreenHeaderProps) => (
  <header className="flex shrink-0 items-center gap-3 border-b border-app-line px-4 py-3">
    <button
      type="button"
      data-demo="back"
      aria-label="Back"
      onClick={onBack}
      className="flex size-8 items-center justify-center rounded-full text-app-ink"
    >
      <ArrowLeft className="size-5" />
    </button>
    <h2 className="flex-1 text-lg font-bold text-app-ink">{title}</h2>
    {action}
    <Search className="size-5 text-app-ink" aria-hidden="true" />
    <Bell className="size-5 text-app-ink" aria-hidden="true" />
  </header>
);
