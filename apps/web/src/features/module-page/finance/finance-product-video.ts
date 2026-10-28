import type { ProductVideoSource } from "../product-video";

/** The steps the video walks through, in order. They are shown as a caption under the video. */
export const financeVideoJourney = [
  "Dashboard",
  "Invoice / Transaction",
  "Payment",
  "Bank Transaction",
  "Reconciliation",
  "Financial Report",
] as const;

/**
 * The product video for the features page. There is no recording of the real product yet, so
 * only a placeholder shows. To add it, put the video in `public/videos/`, then set `src` (for
 * example "/videos/finance-accounting.mp4") and, if you have them, `poster` and `captionsSrc`.
 */
export const financeProductVideo: ProductVideoSource = {
  title: "See Finance & Accounting in Action",
};
