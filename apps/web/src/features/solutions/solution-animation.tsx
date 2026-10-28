"use client";

import type { AnimationItem } from "lottie-web/build/player/lottie_light";
import { useEffect, useRef } from "react";

import type { SolutionAnimation as Animation } from "@/config/solution-animations";
import { useInViewOnce, useIsInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Where to hold the picture when it is not playing: far enough in that the scene is complete. */
const STILL_FRAME_SHARE = 0.6;
/** Start fetching a little before the card scrolls into view. */
const LOAD_THRESHOLD = 0;
const PLAY_THRESHOLD = 0.25;

type SolutionAnimationProps = { animation: Animation };

/**
 * Plays a solution's animated illustration. The player and the animation are fetched only once
 * the card reaches the screen, it plays only while visible, and it holds one still frame for
 * people who prefer reduced motion.
 */
export const SolutionAnimation = ({ animation }: SolutionAnimationProps) => {
  const [loadRef, hasBeenSeen] = useInViewOnce<HTMLDivElement>(LOAD_THRESHOLD);
  const [playRef, isInView] = useIsInView<HTMLDivElement>(PLAY_THRESHOLD);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<AnimationItem | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const shouldPlay = isInView && !reducedMotion;
  const shouldPlayRef = useRef(shouldPlay);

  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
    const player = playerRef.current;
    if (!player) return;
    if (shouldPlay) player.play();
    else player.pause();
  }, [shouldPlay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!hasBeenSeen || !container) return;
    let isCancelled = false;

    void import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (isCancelled) return;
      const player = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: animation.src,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      playerRef.current = player;
      player.addEventListener("DOMLoaded", () => {
        if (shouldPlayRef.current) player.play();
        else player.goToAndStop(Math.round(player.totalFrames * STILL_FRAME_SHARE), true);
      });
    });

    return () => {
      isCancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [hasBeenSeen, animation.src]);

  return (
    <div ref={loadRef} aria-hidden="true">
      <div ref={playRef}>
        <div
          ref={containerRef}
          className="max-h-80 w-full"
          style={{ aspectRatio: `${String(animation.width)} / ${String(animation.height)}` }}
        />
      </div>
    </div>
  );
};
