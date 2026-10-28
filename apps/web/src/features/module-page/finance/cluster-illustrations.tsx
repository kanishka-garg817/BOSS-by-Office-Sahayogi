import type { ReactNode } from "react";

/**
 * One flat picture for each feature group: simple shapes in the site's blues with a touch of
 * amber and green. Not cartoons and not photographs. They are decoration only.
 */

const PAPER = "fill-white stroke-slate-300";
const BLUE = "fill-brand-blue";
const NAVY = "fill-brand-navy";
const SOFT = "fill-brand-light";
const PALE = "fill-slate-200";
const GOLD = "fill-amber-400";
const GREEN = "fill-emerald-500";

const Picture = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 280 160" aria-hidden="true" className="size-full" strokeWidth="1.5">
    {children}
  </svg>
);

const Rule = ({ x, y, width }: { x: number; y: number; width: number }) => (
  <rect x={x} y={y} width={width} height="5" rx="2.5" className={PALE} />
);

const Arrow = ({ d, head, className }: { d: string; head: string; className: string }) => (
  <g fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
    <path d={head} />
  </g>
);

const CoreAccounting = () => (
  <Picture>
    <path d="M105 26 C88 16 56 16 32 24 V128 C56 120 88 120 105 132 Z" className={PAPER} />
    <path d="M105 26 C122 16 154 16 178 24 V128 C154 120 122 120 105 132 Z" className={PAPER} />
    <path d="M105 26 V132" fill="none" className="stroke-slate-300" />
    <rect x="44" y="32" width="24" height="7" rx="3.5" className={SOFT} />
    <rect x="124" y="32" width="24" height="7" rx="3.5" className={BLUE} />
    {[48, 62, 76, 90, 104].map((y) => (
      <g key={y}>
        <Rule x={44} y={y} width={y % 28 === 0 ? 38 : 50} />
        <Rule x={118} y={y} width={y % 28 === 0 ? 46 : 36} />
      </g>
    ))}
    <rect x="198" y="52" width="56" height="88" rx="10" className={BLUE} />
    <rect x="206" y="60" width="40" height="18" rx="4" className="fill-white" />
    <rect x="212" y="66" width="28" height="6" rx="3" className={PALE} />
    {[88, 102, 116].map((y) => (
      <g key={y}>
        <rect x="206" y={y} width="10" height="9" rx="2.5" className={SOFT} />
        <rect x="221" y={y} width="10" height="9" rx="2.5" className={SOFT} />
        <rect x="236" y={y} width="10" height="9" rx="2.5" className={y === 116 ? GOLD : SOFT} />
      </g>
    ))}
  </Picture>
);

const InAndOut = () => (
  <Picture>
    <rect x="132" y="22" width="92" height="118" rx="10" className={PAPER} />
    <rect x="132" y="22" width="92" height="22" rx="10" className="fill-amber-400" />
    <rect x="132" y="34" width="92" height="10" className="fill-amber-400" />
    <Rule x={142} y={56} width={40} />
    <Rule x={142} y={68} width={56} />
    <Rule x={142} y={80} width={36} />

    <rect x="76" y="12" width="92" height="122" rx="10" className={PAPER} />
    <rect x="76" y="12" width="92" height="22" rx="10" className={BLUE} />
    <rect x="76" y="24" width="92" height="10" className={BLUE} />
    <rect x="86" y="19" width="34" height="6" rx="3" className="fill-white/80" />
    <Rule x={86} y={46} width={48} />
    <Rule x={86} y={58} width={64} />
    <Rule x={86} y={70} width={44} />
    <Rule x={86} y={82} width={64} />
    <circle cx="146" cy="110" r="13" className={GREEN} />
    <path
      d="M139 110 L144 115 L153 104"
      fill="none"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Arrow d="M18 48 H64" head="M54 38 L64 48 L54 58" className="stroke-emerald-500" />
    <Arrow d="M232 108 H266" head="M256 98 L266 108 L256 118" className="stroke-amber-500" />
    <circle cx="36" cy="102" r="15" className={GOLD} />
    <circle cx="36" cy="102" r="8" fill="none" className="stroke-amber-600" />
  </Picture>
);

const CashAndBank = () => (
  <Picture>
    <rect x="94" y="22" width="130" height="68" rx="9" className="fill-emerald-300" />
    <rect x="76" y="38" width="130" height="68" rx="9" className={GREEN} />
    <rect x="84" y="46" width="114" height="52" rx="5" fill="none" className="stroke-white/60" />
    <circle cx="141" cy="72" r="16" className="fill-white/30" />
    <text x="141" y="79" textAnchor="middle" fontSize="20" fontWeight="800" className="fill-white">
      ₹
    </text>
    <circle cx="94" cy="58" r="4" className="fill-white/60" />
    <circle cx="188" cy="86" r="4" className="fill-white/60" />

    <rect x="22" y="84" width="104" height="64" rx="11" className={BLUE} />
    <rect x="22" y="98" width="104" height="12" className={NAVY} />
    <rect x="34" y="120" width="22" height="16" rx="4" className={GOLD} />
    <rect x="66" y="122" width="50" height="5" rx="2.5" className="fill-white/60" />
    <rect x="66" y="131" width="30" height="5" rx="2.5" className="fill-white/40" />

    {[146, 136, 126, 116].map((y) => (
      <ellipse key={y} cx="236" cy={y} rx="26" ry="9" className={`${GOLD} stroke-amber-600`} />
    ))}
    <ellipse cx="236" cy="106" rx="26" ry="9" className="fill-amber-300 stroke-amber-600" />
    <text
      x="236"
      y="110"
      textAnchor="middle"
      fontSize="12"
      fontWeight="800"
      className="fill-amber-700"
    >
      ₹
    </text>
  </Picture>
);

const PlanningAndStructure = () => (
  <Picture>
    <rect x="68" y="14" width="64" height="26" rx="8" className={BLUE} />
    <rect x="78" y="23" width="44" height="6" rx="3" className="fill-white/80" />
    <path
      d="M100 40 V58 M38 58 H162 M38 58 V74 M100 58 V74 M162 58 V74"
      fill="none"
      strokeWidth="2"
      className="stroke-slate-400"
    />
    {[16, 78, 140].map((x) => (
      <g key={x}>
        <rect x={x} y="74" width="44" height="48" rx="8" className={PAPER} />
        <rect x={x} y="74" width="44" height="12" rx="8" className={SOFT} />
        <rect x={x} y="80" width="44" height="6" className={SOFT} />
        <Rule x={x + 8} y={96} width={28} />
        <Rule x={x + 8} y={108} width={20} />
      </g>
    ))}

    <rect x="196" y="20" width="68" height="112" rx="10" className={PAPER} />
    <circle cx="214" cy="42" r="11" className={SOFT} />
    <circle cx="214" cy="42" r="6" className={PAPER} />
    <circle cx="214" cy="42" r="2.5" className={BLUE} />
    <Rule x={230} y={36} width={24} />
    <Rule x={230} y={46} width={16} />
    {[
      { y: 68, fill: 70, className: BLUE },
      { y: 90, fill: 45, className: GREEN },
      { y: 112, fill: 85, className: GOLD },
    ].map((row) => (
      <g key={row.y}>
        <rect x="206" y={row.y} width="48" height="8" rx="4" className={PALE} />
        <rect
          x="206"
          y={row.y}
          width={(48 * row.fill) / 100}
          height="8"
          rx="4"
          className={row.className}
        />
      </g>
    ))}
  </Picture>
);

const ReportingAndGroup = () => (
  <Picture>
    <rect x="86" y="14" width="184" height="116" rx="10" className={NAVY} />
    <rect x="93" y="21" width="170" height="102" rx="5" className="fill-white" />

    <rect
      x="100"
      y="28"
      width="76"
      height="56"
      rx="6"
      className="fill-slate-100 stroke-slate-200"
    />
    <polyline
      points="108,72 122,60 134,66 148,46 168,52"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-brand-blue"
    />
    <Rule x={108} y={34} width={30} />

    <rect
      x="184"
      y="28"
      width="72"
      height="56"
      rx="6"
      className="fill-slate-100 stroke-slate-200"
    />
    <circle cx="220" cy="58" r="17" className={SOFT} />
    <path d="M220 58 V41 A17 17 0 0 1 237 58 Z" className={BLUE} />
    <path d="M220 58 H237 A17 17 0 0 1 226 74 Z" className={GOLD} />

    {[100, 146, 192].map((x) => (
      <g key={x}>
        <rect
          x={x}
          y="92"
          width="40"
          height="24"
          rx="5"
          className="fill-slate-100 stroke-slate-200"
        />
        <Rule x={x + 6} y={98} width={16} />
        <rect
          x={x + 6}
          y="107"
          width="26"
          height="5"
          rx="2.5"
          className={x === 192 ? GREEN : BLUE}
        />
      </g>
    ))}
    <rect x="76" y="132" width="204" height="9" rx="4.5" className={NAVY} />

    {/* A standing woman in a blazer, one arm raised to the report. Drawn with natural proportions. */}
    <rect x="266" y="140" width="6" height="18" rx="2" className={PALE} />
    <rect x="24" y="112" width="15" height="42" rx="5" className="fill-slate-500" />
    <rect x="43" y="112" width="15" height="42" rx="5" className="fill-slate-500" />
    <rect x="22" y="150" width="19" height="8" rx="4" className={NAVY} />
    <rect x="42" y="150" width="19" height="8" rx="4" className={NAVY} />

    <path
      d="M20 70 C16 84 14 98 15 108"
      fill="none"
      strokeWidth="9"
      strokeLinecap="round"
      className="stroke-brand-navy"
    />
    <path d="M18 62 C18 56 26 54 33 54 H47 C54 54 62 56 62 62 L64 114 H16 Z" className={NAVY} />
    <path d="M33 54 L40 80 L47 54 Z" className="fill-white" />
    <path
      d="M33 54 L36 58 L40 52 L44 58 L47 54"
      fill="none"
      className="stroke-brand-blue"
      strokeWidth="2"
    />
    <rect x="35" y="44" width="10" height="12" rx="4" className="fill-orange-300" />
    <ellipse cx="40" cy="31" rx="11.5" ry="14" className="fill-orange-200" />
    <path
      d="M28 32 C26 18 36 12 44 14 C54 16 55 28 52 36 C51 28 46 24 40 24 C34 24 30 27 28 32 Z"
      className="fill-amber-900"
    />
    <path
      d="M52 36 C54 44 52 50 49 52"
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
      className="stroke-amber-900"
    />

    <path
      d="M58 66 L74 86 L90 78"
      fill="none"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-brand-navy"
    />
    <circle cx="92" cy="77" r="5" className="fill-orange-200" />
  </Picture>
);

const pictures: Record<string, () => ReactNode> = {
  "core-accounting": CoreAccounting,
  "receivables-payables-expenses": InAndOut,
  "cash-banking-assets": CashAndBank,
  "planning-structure": PlanningAndStructure,
  "reporting-group-finance": ReportingAndGroup,
};

/** The picture for one feature group, found by the group's id. */
export const ClusterIllustration = ({ id }: { id: string }) => {
  const Illustration = pictures[id];
  return Illustration ? <Illustration /> : null;
};
