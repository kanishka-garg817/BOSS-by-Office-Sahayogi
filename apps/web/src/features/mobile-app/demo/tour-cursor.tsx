import { MousePointer2 } from "lucide-react";

/** Where the arrow's tip sits inside its icon, so the tip lands on the point it is moved to. */
const TIP_OFFSET = 3;

type TourCursorProps = { x: number; y: number; isVisible: boolean; isTapping: boolean };

/** A small arrow that glides over a demo and dips when it taps. */
export const TourCursor = ({ x, y, isVisible, isTapping }: TourCursorProps) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute top-0 left-0 z-50 transition-[translate,opacity] duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    style={{ translate: `${String(x - TIP_OFFSET)}px ${String(y - TIP_OFFSET)}px` }}
  >
    <MousePointer2
      className={`size-6 fill-brand-navy stroke-white stroke-[1.5] drop-shadow-md transition-transform duration-200 ${isTapping ? "scale-75" : ""}`}
      style={{ transformOrigin: "3px 3px" }}
    />
  </span>
);
