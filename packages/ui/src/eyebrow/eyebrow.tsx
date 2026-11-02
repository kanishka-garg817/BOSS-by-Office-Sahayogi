import { eyebrowStandardClasses } from "./eyebrow.tokens";
import type { EyebrowProps } from "./eyebrow.types";

/**
 * Global Eyebrow UI Component for BoSS.
 *
 * Centralizes the standardized eyebrow styling across all pages and sections:
 * - Font family: font-sans (Inter)
 * - Font size: text-xs (12px)
 * - Font weight: font-semibold (600)
 * - Text color: text-brand-blue (#0066ff)
 * - Letter spacing: tracking-wider (0.08em)
 * - Text transform: uppercase
 * - Shape: rounded-full pill with soft border & surface background
 *
 * Use this component for all section and hero label badges across the site.
 */
export const Eyebrow = ({
  children,
  icon,
  as: Component = "p",
  withSpacing = false,
  className = "",
  ...rest
}: EyebrowProps) => {
  const combinedClasses = [
    eyebrowStandardClasses.base,
    withSpacing ? eyebrowStandardClasses.withBottomSpacing : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={combinedClasses} {...rest}>
      {icon ? <span className="mr-1.5 inline-flex shrink-0 items-center">{icon}</span> : null}
      <span>{children}</span>
    </Component>
  );
};
