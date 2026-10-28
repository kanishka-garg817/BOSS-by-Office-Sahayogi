import type { ReactNode } from "react";

type PhoneFrameProps = { children: ReactNode; /** The width of the phone. */ className?: string };

const sideButton = "absolute w-[3px] bg-linear-to-b from-zinc-300 via-zinc-500 to-zinc-300";

/**
 * A modern iPhone drawn in code: a titanium rim, a thin black bezel, the dynamic island, the
 * action and volume buttons on the left, the power button on the right and the home bar.
 * The screen inside takes its height from its own content.
 */
export const PhoneFrame = ({ children, className = "w-64 sm:w-72" }: PhoneFrameProps) => (
  <div
    className={`relative mx-auto ${className} rounded-[3rem] bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-300 p-[3px] shadow-2xl shadow-brand-navy/40`}
  >
    <span aria-hidden="true" className={`${sideButton} top-[12%] -left-[3px] h-[3%] rounded-l`} />
    <span aria-hidden="true" className={`${sideButton} top-[18%] -left-[3px] h-[6%] rounded-l`} />
    <span aria-hidden="true" className={`${sideButton} top-[26%] -left-[3px] h-[6%] rounded-l`} />
    <span aria-hidden="true" className={`${sideButton} top-[22%] -right-[3px] h-[10%] rounded-r`} />
    <div className="rounded-[2.85rem] bg-black p-[6px]">
      <div className="relative overflow-hidden rounded-[2.4rem]">
        {children}
        <span
          aria-hidden="true"
          className="absolute top-[1.6%] left-1/2 z-40 aspect-7/2 w-[30%] -translate-x-1/2 rounded-full bg-black"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-1/2 z-40 h-1 w-[34%] -translate-x-1/2 rounded-full bg-zinc-500"
        />
      </div>
    </div>
  </div>
);
