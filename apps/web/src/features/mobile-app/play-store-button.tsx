/** The four coloured parts of the Google Play mark; the mark belongs to Google. */
const PlayMark = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-7 shrink-0 transition-transform group-hover:scale-110"
  >
    <path d="M2.5 1.2 L11.6 12 L2.5 22.8 Z" fill="#00B7FF" />
    <path d="M2.5 1.2 L14.6 7 L11.6 12 Z" fill="#00E676" />
    <path d="M2.5 22.8 L14.6 17 L11.6 12 Z" fill="#FF3D57" />
    <path d="M14.6 7 L21.4 10.9 Q22.6 12 21.4 13.1 L14.6 17 L11.6 12 Z" fill="#FFCB00" />
  </svg>
);

/** A "Download from Google Play" link. */
export const PlayStoreButton = ({ href }: { href: string }) => (
  <a
    href={href}
    className="group inline-flex min-h-14 items-center gap-3 rounded-xl bg-brand-navy px-6 text-white shadow-lg ring-1 shadow-brand-navy/30 ring-white/15 transition hover:-translate-y-0.5 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
  >
    <PlayMark />
    <span className="flex flex-col text-left leading-tight">
      <span className="text-xs">Download from</span>
      <span className="text-lg font-bold">Google Play</span>
    </span>
  </a>
);
