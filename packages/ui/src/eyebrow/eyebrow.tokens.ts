/**
 * Global design tokens for BoSS Eyebrow components.
 * Standardized across all pages and sections to maintain visual harmony and brand consistency.
 */
export const eyebrowDesignTokens = {
  // Typography
  fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  fontSize: "0.75rem", // 12px (text-xs)
  fontWeight: "600", // Semi-bold (font-semibold)
  lineHeight: "1rem", // 16px (leading-4)
  letterSpacing: "0.08em", // tracking-wider (0.08em)
  textTransform: "uppercase" as const,

  // Colors
  textColor: "var(--color-brand-blue, #0066ff)",
  backgroundColor: "var(--color-surface, #ffffff)",
  borderColor: "color-mix(in srgb, var(--color-brand-blue, #0066ff) 20%, transparent)",

  // Shape & Spacing
  borderRadius: "9999px", // rounded-full pill
  paddingY: "0.375rem", // py-1.5 (6px)
  paddingX: "1rem", // px-4 (16px)
  spacingBottom: "1rem", // mb-4 (16px) standard spacing between eyebrow and heading

  // Layout & Alignment
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

/**
 * Standard CSS classes adhering to the BoSS Eyebrow design tokens.
 * Centralized so individual sections do not hardcode styles.
 */
export const eyebrowStandardClasses = {
  base: "inline-flex items-center justify-center rounded-full border border-brand-blue/20 bg-surface px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-brand-blue uppercase shadow-xs transition-colors",
  withBottomSpacing: "mb-4",
} as const;
