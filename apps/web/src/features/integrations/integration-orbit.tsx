"use client";

import { useId } from "react";

import robotImage from "@/assets/brand/assistant-robot.png";
import { useElementWidth } from "@/hooks/use-element-width";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { ConnectionCaption } from "./connection-caption";
import { integrations, type Integration } from "./integrations-data";

type Point = { x: number; y: number };
type Size = { w: number; h: number };
type Side = 0 | 1;

/**
 * The scene is described along two axes. "Main" runs from one page edge, through BoSS, to the
 * other; "across" is the other way. Wide screens put main on x, phones put it on y.
 */
type Scene = {
  isWide: boolean;
  width: number;
  height: number;
  main: number;
  across: number;
  boss: Point & { r: number };
  /** Room one logo takes up. */
  logo: Size;
  /** Radius of the outermost half-circle. */
  radius: number;
  arcs: readonly Arc[];
  /** How far either side of its tip a logo travels along an arc. */
  travelDegrees: number;
};

type Arc = {
  /** Radius as a share of the outermost half-circle. */
  reach: number;
  /** Logos riding this arc. */
  count: number;
  /** 1 runs from the start of the arc to its end, -1 the other way. */
  direction: 1 | -1;
  durationS: number;
};

const WIDE_BREAKPOINT = 768;
const BOSS_GAP = 40;
const RIDE_FADE = "0;1;1;0";
const RIDE_FADE_TIMES = "0;0.1;0.9;1";
const SWEEP_DASH = "240 760";
const EDGE_FADE = 0.06;

/** Outermost first. Each set holds the nine logos of one side. */
const WIDE_ARCS: readonly Arc[] = [
  { reach: 1, count: 4, direction: 1, durationS: 36 },
  { reach: 0.7, count: 3, direction: -1, durationS: 30 },
  { reach: 0.4, count: 2, direction: 1, durationS: 24 },
];

/** Phones are narrow, so two arcs carry the same logos. */
const NARROW_ARCS: readonly Arc[] = [
  { reach: 1, count: 5, direction: 1, durationS: 36 },
  { reach: 0.62, count: 4, direction: -1, durationS: 28 },
];

const SIDES: readonly Side[] = [0, 1];
const LOGOS_PER_SIDE = WIDE_ARCS.reduce((total, arc) => total + arc.count, 0);

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const toDegrees = (radians: number): number => (radians * 180) / Math.PI;
const fixed = (value: number): string => value.toFixed(2);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Space the whole scene leaves for the page header and a little breathing room. */
const VIEWPORT_MARGIN = 130;
/** How far the BoSS pulse ring grows; the caption starts below it (see `orbit-pulse` in globals.css). */
const BOSS_PULSE_SCALE = 1.7;
const CAPTION_ROOM = 80;
const CAPTION_GAP = 10;

const buildScene = (width: number, viewportHeight: number): Scene => {
  if (width >= WIDE_BREAKPOINT) {
    const height = clamp(viewportHeight - VIEWPORT_MARGIN, 520, 760);
    const boss = { x: width / 2, y: height / 2, r: clamp(Math.round(height * 0.15), 72, 100) };
    const logo = { w: 100, h: 38 };
    const radius = Math.min(height * 0.62, boss.x - boss.r - BOSS_GAP - logo.w / 2);
    const reachable = (height / 2 - logo.h - 6) / radius;
    return {
      isWide: true,
      width,
      height,
      main: width,
      across: height,
      boss,
      logo,
      radius,
      arcs: WIDE_ARCS,
      travelDegrees: Math.min(62, toDegrees(Math.asin(Math.min(1, reachable)))),
    };
  }
  const radius = Math.min(width / 2 - 8, 190);
  const bossRadius = 58;
  const bossY = radius + BOSS_GAP - 6 + bossRadius;
  const height = 2 * radius + 2 * (BOSS_GAP - 6) + 2 * bossRadius + CAPTION_ROOM;
  return {
    isWide: false,
    width,
    height,
    main: height,
    across: width,
    boss: { x: width / 2, y: bossY, r: bossRadius },
    logo: { w: 58, h: 24 },
    radius,
    arcs: NARROW_ARCS,
    travelDegrees: 54,
  };
};

const toPoint = (scene: Scene, main: number, across: number): Point =>
  scene.isWide ? { x: main, y: across } : { x: across, y: main };

/** A point on an arc. `degrees` is 0 at the tip, negative towards the start, positive towards the end. */
const arcPoint = (scene: Scene, side: Side, arc: Arc, degrees: number): Point => {
  const radius = scene.radius * arc.reach;
  const edge = side === 0 ? 0 : scene.main;
  const inward = side === 0 ? 1 : -1;
  const angle = toRadians(degrees);
  return toPoint(
    scene,
    edge + inward * radius * Math.cos(angle),
    scene.across / 2 + radius * Math.sin(angle),
  );
};

/** SVG arc flag that makes the stroke bulge towards BoSS, travelling start to end (or back). */
const bulgeSweep = (scene: Scene, side: Side, isForward: boolean): "0" | "1" => {
  const forwardSweep = scene.isWide === (side === 0);
  return forwardSweep === isForward ? "1" : "0";
};

const arcSegment = (scene: Scene, side: Side, arc: Arc, from: number, to: number): string => {
  const radius = fixed(scene.radius * arc.reach);
  const start = arcPoint(scene, side, arc, from);
  const end = arcPoint(scene, side, arc, to);
  const sweep = bulgeSweep(scene, side, to > from);
  return `M ${fixed(start.x)} ${fixed(start.y)} A ${radius} ${radius} 0 0 ${sweep} ${fixed(end.x)} ${fixed(end.y)}`;
};

/** The whole half-circle, from one page edge back to the same edge. */
const halfCirclePath = (scene: Scene, side: Side, arc: Arc): string =>
  arcSegment(scene, side, arc, -90, 90);

/** The stretch of the arc a logo travels, in the arc's own direction. */
const ridePath = (scene: Scene, side: Side, arc: Arc): string =>
  arcSegment(
    scene,
    side,
    arc,
    arc.direction * -scene.travelDegrees,
    arc.direction * scene.travelDegrees,
  );

type LogoProps = { integration: Integration; room: Size };

const PILL_PAD = { x: 12, y: 7 } as const;

/** A light pill behind every logo keeps dark marks readable in both themes. */
const LogoPill = ({ width, height }: { width: number; height: number }) => (
  <rect
    x={-width / 2 - PILL_PAD.x}
    y={-height / 2 - PILL_PAD.y}
    width={width + PILL_PAD.x * 2}
    height={height + PILL_PAD.y * 2}
    rx={(height + PILL_PAD.y * 2) / 2}
    className="fill-white stroke-ink/15 dark:stroke-transparent"
  />
);

const Logo = ({ integration, room }: LogoProps) => {
  const { logo } = integration;
  if (logo.kind === "icon") {
    const side = room.h * 0.95 * logo.scale;
    return (
      <>
        <LogoPill width={Math.max(side, room.h)} height={room.h} />
        <svg
          x={-side / 2}
          y={-side / 2}
          width={side}
          height={side}
          viewBox="0 0 24 24"
          overflow="visible"
        >
          <path d={logo.path} fill={logo.color} />
        </svg>
      </>
    );
  }
  return (
    <>
      <LogoPill width={room.w} height={room.h} />
      <image
        href={logo.image.src}
        x={-room.w / 2}
        y={-room.h / 2}
        width={room.w}
        height={room.h}
        preserveAspectRatio="xMidYMid meet"
      />
    </>
  );
};

type RidingLogosProps = {
  scene: Scene;
  side: Side;
  arc: Arc;
  items: readonly Integration[];
  isStatic: boolean;
};

/** Logos spaced evenly along one arc. Each glides along it, fading in at one end and out at the other. */
const RidingLogos = ({ scene, side, arc, items, isStatic }: RidingLogosProps) =>
  items.map((integration, index) => {
    const share = index / items.length;
    if (isStatic) {
      const degrees = -scene.travelDegrees + (share + 0.5 / items.length) * scene.travelDegrees * 2;
      const at = arcPoint(scene, side, arc, degrees);
      return (
        <g key={integration.id} transform={`translate(${fixed(at.x)} ${fixed(at.y)})`}>
          <Logo integration={integration} room={scene.logo} />
        </g>
      );
    }
    const timing = {
      dur: `${String(arc.durationS)}s`,
      begin: `${fixed(-share * arc.durationS)}s`,
      repeatCount: "indefinite",
    } as const;
    return (
      <g key={integration.id} opacity={0}>
        <animateMotion {...timing} path={ridePath(scene, side, arc)} />
        <animate
          {...timing}
          attributeName="opacity"
          values={RIDE_FADE}
          keyTimes={RIDE_FADE_TIMES}
        />
        <Logo integration={integration} room={scene.logo} />
      </g>
    );
  });

type GradientIds = {
  stroke: string;
  layer: string;
  glow: string;
  fadeAcross: string;
  fadeDown: string;
  maskAcross: string;
  maskDown: string;
};

/** Nested half-circles growing out of both page edges, each with a gradient arc running along it. */
const HalfRings = ({ scene, ids }: { scene: Scene; ids: GradientIds }) => (
  <g mask={scene.isWide ? `url(#${ids.maskAcross})` : undefined}>
    <g mask={scene.isWide ? `url(#${ids.maskDown})` : undefined}>
      {SIDES.map((side) =>
        scene.arcs.map((arc, index) => {
          const path = halfCirclePath(scene, side, arc);
          return (
            <g key={`${String(side)}-${String(arc.reach)}`}>
              <path d={path} fill={`url(#${ids.layer})`} stroke="none" />
              <path d={path} className="fill-none stroke-brand-blue/20" strokeWidth={1.5} />
              <path
                d={path}
                pathLength={1000}
                fill="none"
                stroke={`url(#${ids.stroke})`}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={SWEEP_DASH}
                className={
                  index % 2 === 0
                    ? "motion-safe:animate-orbit-sweep"
                    : "motion-safe:animate-orbit-sweep-reverse"
                }
              />
            </g>
          );
        }),
      )}
    </g>
  </g>
);

const BossBadge = ({ boss, glowId }: { boss: Scene["boss"]; glowId: string }) => {
  const robotHeight = boss.r * 1.5;
  const robotWidth = (robotHeight * robotImage.width) / robotImage.height;
  return (
    <g transform={`translate(${fixed(boss.x)} ${fixed(boss.y)})`}>
      <circle r={boss.r * 2.6} fill={`url(#${glowId})`} />
      <circle
        r={boss.r}
        className="svg-origin-center fill-brand-blue motion-safe:animate-orbit-pulse"
      />
      <circle
        r={boss.r}
        className="svg-origin-center fill-brand-blue motion-safe:animate-orbit-pulse-late"
      />
      <circle r={boss.r} className="fill-white stroke-brand-blue/30" strokeWidth={3} />
      <image
        href={robotImage.src}
        x={-robotWidth / 2}
        y={-robotHeight / 2}
        width={robotWidth}
        height={robotHeight}
      />
    </g>
  );
};

const ACCESSIBLE_LABEL = `Sahayogi, the BoSS assistant, connected to ${integrations.map((item) => item.name).join(", ")}`;

const itemsFor = (scene: Scene, side: Side, arcIndex: number): readonly Integration[] => {
  const before = scene.arcs.slice(0, arcIndex).reduce((total, arc) => total + arc.count, 0);
  const count = scene.arcs[arcIndex]?.count ?? 0;
  const start = side * LOGOS_PER_SIDE + before;
  return integrations.slice(start, start + count);
};

/**
 * BoSS in the middle, with half-circles growing out of both page edges towards it and the tools it
 * connects to gliding along them. On phones it turns on its side: arcs from the top and bottom.
 */
export const IntegrationOrbit = () => {
  const baseId = useId().replaceAll(":", "");
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const viewportHeight = useViewportHeight();
  const reducedMotion = usePrefersReducedMotion();
  const scene = width === null ? null : buildScene(width, viewportHeight);
  const ids: GradientIds = {
    stroke: `${baseId}-stroke`,
    layer: `${baseId}-layer`,
    glow: `${baseId}-glow`,
    fadeAcross: `${baseId}-fade-across`,
    fadeDown: `${baseId}-fade-down`,
    maskAcross: `${baseId}-mask-across`,
    maskDown: `${baseId}-mask-down`,
  };

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-7xl">
      {scene ? (
        <svg
          role="img"
          aria-label={ACCESSIBLE_LABEL}
          viewBox={`0 0 ${String(scene.width)} ${String(scene.height)}`}
          width={scene.width}
          height={scene.height}
          className="block h-auto w-full"
        >
          <defs>
            <linearGradient id={ids.stroke} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0066ff" />
              <stop offset="0.55" stopColor="#9cc3ff" />
              <stop offset="1" stopColor="#001f4d" />
            </linearGradient>
            <linearGradient id={ids.layer} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0066ff" stopOpacity="0.07" />
              <stop offset="1" stopColor="#9cc3ff" stopOpacity="0.03" />
            </linearGradient>
            <radialGradient id={ids.glow}>
              <stop offset="0" stopColor="#0066ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#0066ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={ids.fadeAcross}>
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset={EDGE_FADE} stopColor="#fff" stopOpacity="1" />
              <stop offset={1 - EDGE_FADE} stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={ids.fadeDown} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset={EDGE_FADE} stopColor="#fff" stopOpacity="1" />
              <stop offset={1 - EDGE_FADE} stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={ids.maskAcross}>
              <rect width={scene.width} height={scene.height} fill={`url(#${ids.fadeAcross})`} />
            </mask>
            <mask id={ids.maskDown}>
              <rect width={scene.width} height={scene.height} fill={`url(#${ids.fadeDown})`} />
            </mask>
          </defs>

          <HalfRings scene={scene} ids={ids} />

          {SIDES.map((side) =>
            scene.arcs.map((arc, arcIndex) => (
              <RidingLogos
                key={`${String(side)}-${String(arc.reach)}`}
                scene={scene}
                side={side}
                arc={arc}
                items={itemsFor(scene, side, arcIndex)}
                isStatic={reducedMotion}
              />
            )),
          )}

          <BossBadge boss={scene.boss} glowId={ids.glow} />
        </svg>
      ) : null}
      {scene ? (
        <div
          className="absolute left-1/2 w-full max-w-xs -translate-x-1/2 px-4"
          style={{ top: scene.boss.y + scene.boss.r * BOSS_PULSE_SCALE + CAPTION_GAP }}
        >
          <ConnectionCaption />
        </div>
      ) : null}
    </div>
  );
};
