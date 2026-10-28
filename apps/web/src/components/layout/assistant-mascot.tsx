import Image from "next/image";

import robotImage from "@/assets/brand/assistant-robot.png";

/**
 * Floating robot mascot fixed to the bottom-right corner. Purely visual for now: it ignores
 * pointer events so it never blocks content, and the bobbing is disabled for reduced motion.
 */
export const AssistantMascot = () => (
  <div className="assistant-mascot pointer-events-none fixed right-3 bottom-3 z-40 flex flex-col items-center sm:right-6 sm:bottom-6">
    <Image
      src={robotImage}
      alt=""
      sizes="(min-width: 640px) 64px, 48px"
      className="w-12 motion-safe:animate-float sm:w-16"
    />
    <span className="-mt-1 rounded-full bg-brand-navy px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-white shadow-md">
      Ask Sahayogi
    </span>
  </div>
);
