import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type EyebrowProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Optional icon or decorative element preceding the eyebrow text */
  icon?: ReactNode;
  /** Render element type, defaults to "p" */
  as?: ElementType;
  /**
   * Applies the standardized global bottom spacing token (mb-4)
   * to automatically space the eyebrow from the subsequent heading.
   */
  withSpacing?: boolean;
  /** Optional class override or extension */
  className?: string;
};
