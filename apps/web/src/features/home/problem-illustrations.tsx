/**
 * Small isometric blue illustrations for the Problem section, drawn in SVG so they stay sharp at
 * any size, need no image requests and share one soft-lit look.
 */

const FACE = {
  top: "url(#ill-top)",
  left: "url(#ill-left)",
  right: "url(#ill-right)",
} as const;

const HALF_WIDTH_RATIO = 0.866;
const HALF_HEIGHT_RATIO = 0.5;

type Point = readonly [number, number];

const toPoints = (points: readonly Point[]) => points.map(([x, y]) => `${x},${y}`).join(" ");

/** Shared gradients, shadow and sphere fills. Rendered once per illustration. */
const Defs = () => (
  <defs>
    <linearGradient id="ill-top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#dcebff" />
      <stop offset="1" stopColor="#a9ccff" />
    </linearGradient>
    <linearGradient id="ill-left" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5a9cff" />
      <stop offset="1" stopColor="#2f78f0" />
    </linearGradient>
    <linearGradient id="ill-right" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#1f6bee" />
      <stop offset="1" stopColor="#0a4ec4" />
    </linearGradient>
    <radialGradient id="ill-sphere" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#e4f0ff" />
      <stop offset="0.45" stopColor="#5a9cff" />
      <stop offset="1" stopColor="#0a4ec4" />
    </radialGradient>
    <radialGradient id="ill-shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#0a2a66" stopOpacity="0.28" />
      <stop offset="1" stopColor="#0a2a66" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const GroundShadow = ({ x, y, rx, ry }: { x: number; y: number; rx: number; ry: number }) => (
  <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="url(#ill-shadow)" />
);

type PrismProps = {
  /** Top vertex of the top face. */
  x: number;
  y: number;
  size: number;
  height: number;
  /** Draws only the outline, to show something that is missing. */
  isGhost?: boolean;
};

const Prism = ({ x, y, size, height, isGhost = false }: PrismProps) => {
  const w = size * HALF_WIDTH_RATIO;
  const h = size * HALF_HEIGHT_RATIO;
  const top = [
    [x, y],
    [x + w, y + h],
    [x, y + 2 * h],
    [x - w, y + h],
  ] as const;
  const left = [top[3], top[2], [x, y + 2 * h + height], [x - w, y + h + height]] as const;
  const right = [top[2], top[1], [x + w, y + h + height], [x, y + 2 * h + height]] as const;
  if (isGhost) {
    return (
      <g fill="none" stroke="#2f78f0" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7">
        <polygon points={toPoints(top)} />
        <polygon points={toPoints(left)} />
        <polygon points={toPoints(right)} />
      </g>
    );
  }
  return (
    <g strokeLinejoin="round" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.75">
      <polygon points={toPoints(left)} fill={FACE.left} />
      <polygon points={toPoints(right)} fill={FACE.right} />
      <polygon points={toPoints(top)} fill={FACE.top} />
    </g>
  );
};

const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 240 180"
    aria-hidden="true"
    focusable="false"
    className="h-full w-full drop-shadow-sm"
  >
    <Defs />
    {children}
  </svg>
);

const CUBE = 34;
const CUBE_W = CUBE * HALF_WIDTH_RATIO;
const CUBE_H = CUBE * HALF_HEIGHT_RATIO;

/** Stacked boxes with one missing from the pile: inventory. */
export const InventoryIllustration = () => (
  <Svg>
    <GroundShadow x={120} y={150} rx={78} ry={14} />
    <Prism x={110} y={78} size={CUBE} height={CUBE} />
    <Prism x={110 - CUBE_W} y={78 + CUBE_H} size={CUBE} height={CUBE} />
    <Prism x={110 + CUBE_W} y={78 + CUBE_H} size={CUBE} height={CUBE} />
    <Prism x={110} y={78 - CUBE} size={CUBE} height={CUBE} />
    <Prism x={110 - CUBE_W} y={78 + CUBE_H - CUBE} size={CUBE} height={CUBE} isGhost />
    <Prism x={110 + CUBE_W * 2} y={78 + CUBE_H * 2} size={CUBE} height={CUBE} />
  </Svg>
);

const SHEET = 62;
const SHEET_W = SHEET * HALF_WIDTH_RATIO;
const SHEET_H = SHEET * HALF_HEIGHT_RATIO;

/** How far each ruled line sits from the centre of the top sheet, along the sheet's short edge. */
const LINE_OFFSETS = [-0.45, 0, 0.45] as const;
const LINE_HALF_LENGTH = 0.5;

/** Three loose sheets piled up, the top one ruled like an order form: sales. */
export const SalesIllustration = () => (
  <Svg>
    <GroundShadow x={120} y={150} rx={80} ry={14} />
    <Prism x={112} y={80} size={SHEET} height={8} />
    <Prism x={104} y={64} size={SHEET} height={8} />
    <Prism x={122} y={46} size={SHEET} height={8} />
    {LINE_OFFSETS.map((k) => {
      const cx = 122 + k * SHEET_W;
      const cy = 46 + SHEET_H + k * SHEET_H;
      return (
        <line
          key={k}
          x1={cx - LINE_HALF_LENGTH * SHEET_W}
          y1={cy + LINE_HALF_LENGTH * SHEET_H}
          x2={cx + LINE_HALF_LENGTH * SHEET_W}
          y2={cy - LINE_HALF_LENGTH * SHEET_H}
          stroke="#7aaeff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      );
    })}
  </Svg>
);

const COIN_RX = 26;
const COIN_RY = 10;
const COIN_THICKNESS = 7;

type CoinProps = { x: number; y: number; hasSymbol?: boolean; scale?: number };

const Coin = ({ x, y, hasSymbol = false, scale = 1 }: CoinProps) => (
  <g
    transform={`translate(${String(x)} ${String(y)}) scale(${String(scale)}) translate(${String(-x)} ${String(-y)})`}
  >
    <path
      d={`M${String(x - COIN_RX)} ${String(y)} v${String(COIN_THICKNESS)} a${String(COIN_RX)} ${String(COIN_RY)} 0 0 0 ${String(COIN_RX * 2)} 0 v-${String(COIN_THICKNESS)} z`}
      fill="url(#ill-right)"
    />
    <ellipse cx={x} cy={y} rx={COIN_RX} ry={COIN_RY} fill="url(#ill-top)" />
    {hasSymbol ? (
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#0a4ec4"
        fontFamily="inherit"
      >
        ₹
      </text>
    ) : null}
  </g>
);

const FINANCE_BAR = 24;
const FINANCE_BASE_Y = 142;
const FINANCE_BARS = [
  { x: 60, height: 34 },
  { x: 98, height: 56 },
  { x: 136, height: 80 },
] as const;

/** The growth line over the bars, as points from the lowest to the highest. */
const GROWTH_LINE = "44,100 86,76 106,88 156,36";
const GROWTH_ARROW_HEAD = "148,30 166,26 160,44";

const RUPEE_EXTRUSION = [3, 2, 1] as const;

/** Rising bars, a growth arrow, a big rupee sign, coins and a bundle of notes: finance. */
export const FinanceIllustration = () => (
  <Svg>
    <GroundShadow x={120} y={152} rx={90} ry={13} />
    {FINANCE_BARS.map((bar) => (
      <Prism
        key={bar.x}
        x={bar.x}
        y={FINANCE_BASE_Y - FINANCE_BAR - bar.height}
        size={FINANCE_BAR}
        height={bar.height}
      />
    ))}
    <polyline
      points={GROWTH_LINE}
      fill="none"
      stroke="#0a4ec4"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points={GROWTH_LINE}
      fill="none"
      stroke="#cfe2ff"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polygon
      points={GROWTH_ARROW_HEAD}
      fill="#0a4ec4"
      stroke="#0a4ec4"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <polygon points={GROWTH_ARROW_HEAD} fill="#cfe2ff" />
    {RUPEE_EXTRUSION.map((offset) => (
      <text
        key={offset}
        x={190 + offset}
        y={108 + offset}
        textAnchor="middle"
        fontSize="68"
        fontWeight="800"
        fill="#0a4ec4"
        fontFamily="inherit"
      >
        ₹
      </text>
    ))}
    <text
      x="190"
      y="108"
      textAnchor="middle"
      fontSize="68"
      fontWeight="800"
      fill="url(#ill-left)"
      fontFamily="inherit"
    >
      ₹
    </text>
    <Coin x={176} y={140} scale={0.55} />
    <Coin x={176} y={134} scale={0.55} />
    <Coin x={196} y={146} scale={0.55} />
    <Prism x={34} y={118} size={30} height={8} />
    <line
      x1="24"
      y1="132"
      x2="46"
      y2="120"
      stroke="#2f78f0"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

type PersonProps = { x: number; y: number; scale: number };

/** A head and shoulders, built from the same blue gradients as the rest. */
const Person = ({ x, y, scale }: PersonProps) => (
  <g transform={`translate(${String(x)} ${String(y)}) scale(${String(scale)})`}>
    <path d="M-30 52 v-8 a30 26 0 0 1 60 0 v8 z" fill="url(#ill-left)" />
    <path d="M0 18 a30 26 0 0 1 30 26 v8 h-30 z" fill="url(#ill-right)" opacity="0.55" />
    <circle cx="0" cy="-2" r="19" fill="url(#ill-sphere)" />
    <circle cx="-6" cy="-9" r="3.5" fill="#ffffff" opacity="0.7" />
  </g>
);

/** Three people and a payslip: people and payroll. */
export const PayrollIllustration = () => (
  <Svg>
    <GroundShadow x={120} y={154} rx={86} ry={12} />
    <Person x={62} y={78} scale={0.72} />
    <Person x={178} y={78} scale={0.72} />
    <Person x={120} y={66} scale={1} />
    <Prism x={120} y={118} size={30} height={5} />
    <line
      x1="106"
      y1="128"
      x2="128"
      y2="116"
      stroke="#7aaeff"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="112"
      y1="134"
      x2="134"
      y2="122"
      stroke="#7aaeff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

const CHECK_ROWS = [0, 1, 2] as const;
const CHECK_ROW_GAP = 26;

/** A clipboard checklist with ticks and one box still open: approvals. */
export const ApprovalsIllustration = () => (
  <Svg>
    <GroundShadow x={120} y={156} rx={74} ry={11} />
    <rect x="68" y="26" width="112" height="124" rx="10" fill="url(#ill-right)" />
    <rect x="62" y="22" width="112" height="124" rx="10" fill="url(#ill-left)" />
    <rect x="72" y="38" width="92" height="98" rx="5" fill="#f4f8ff" />
    <rect
      x="98"
      y="14"
      width="40"
      height="18"
      rx="6"
      fill="url(#ill-top)"
      stroke="#2f78f0"
      strokeWidth="2"
    />
    {CHECK_ROWS.map((row) => {
      const y = 50 + row * CHECK_ROW_GAP;
      const isDone = row < 2;
      return (
        <g key={row}>
          <rect
            x="80"
            y={y}
            width="18"
            height="18"
            rx="4"
            fill={isDone ? "url(#ill-right)" : "#ffffff"}
            stroke="#2f78f0"
            strokeWidth="2"
            strokeDasharray={isDone ? undefined : "3 2"}
          />
          {isDone ? (
            <path
              d={`M84 ${String(y + 9)} l4 4 l7 -8`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <rect x="106" y={y + 3} width="48" height="5" rx="2.5" fill="#9cc3ff" />
          <rect x="106" y={y + 11} width="30" height="4" rx="2" fill="#cfe0ff" />
        </g>
      );
    })}
  </Svg>
);

const BAR_HEIGHTS = [26, 44, 62] as const;
const REPORT_BAR_WIDTH = 16;

/** An upright report with a bar chart on it: reports. */
export const ReportsIllustration = () => (
  <Svg>
    <GroundShadow x={122} y={156} rx={74} ry={11} />
    <polygon points="170,30 182,22 182,138 170,146" fill="url(#ill-right)" />
    <polygon points="64,30 76,22 182,22 170,30" fill="url(#ill-top)" />
    <rect
      x="64"
      y="30"
      width="106"
      height="116"
      rx="4"
      fill="#f4f8ff"
      stroke="#9cc3ff"
      strokeWidth="1.5"
    />
    <rect x="76" y="42" width="48" height="6" rx="3" fill="#2f78f0" />
    <rect x="76" y="54" width="30" height="4" rx="2" fill="#bcd6ff" />
    {BAR_HEIGHTS.map((height, index) => (
      <rect
        key={height}
        x={80 + index * 26}
        y={134 - height}
        width={REPORT_BAR_WIDTH}
        height={height}
        rx="2"
        fill={index === BAR_HEIGHTS.length - 1 ? "url(#ill-right)" : "url(#ill-left)"}
      />
    ))}
    <line x1="74" y1="134" x2="160" y2="134" stroke="#9cc3ff" strokeWidth="1.5" />
  </Svg>
);
