import { MiniWindow } from "@/components/product/mini-window";
import type { Solution } from "@/config/solutions";

type SolutionVisualProps = {
  solution: Solution;
  /** A smaller version for cards. */
  compact?: boolean;
};

/** Two example screens showing the solution at work, with made-up data. */
export const SolutionVisual = ({ solution, compact = false }: SolutionVisualProps) => {
  const [first, second] = solution.visuals;
  return (
    <div aria-hidden="true">
      <div className="w-11/12">
        <MiniWindow title={first.title} content={first.content} compact={compact} />
      </div>
      <div className={`${compact ? "mt-2" : "mt-2.5"} ml-auto w-11/12`}>
        <MiniWindow title={second.title} content={second.content} compact={compact} />
      </div>
    </div>
  );
};
