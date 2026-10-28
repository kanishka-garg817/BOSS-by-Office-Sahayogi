import { Play } from "lucide-react";

/** A "Download from Google Play" link. The official badge image can replace this when supplied. */
export const PlayStoreButton = ({ href }: { href: string }) => (
  <a
    href={href}
    className="group inline-flex min-h-14 items-center gap-3 rounded-xl bg-brand-navy px-6 text-white shadow-lg ring-1 shadow-brand-navy/30 ring-white/15 transition hover:-translate-y-0.5 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
  >
    <Play
      aria-hidden="true"
      className="size-7 fill-current transition-transform group-hover:scale-110"
    />
    <span className="flex flex-col text-left leading-tight">
      <span className="text-xs">Download from</span>
      <span className="text-lg font-bold">Google Play</span>
    </span>
  </a>
);
