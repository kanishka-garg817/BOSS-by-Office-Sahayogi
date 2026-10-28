export type TourStep = {
  id: string;
  /** The `data-tour` attribute of the area to point at. */
  target: string;
  label: string;
  description: string;
  /** Where the cursor lands inside the area, as a share of its width and height. */
  anchor: { x: number; y: number };
  /** Which side of the cursor the explanation opens on, and whether above or below it. */
  side: "left" | "right";
  vertical: "above" | "below";
};

/** Describes only what the dashboard shows. */
export const tourSteps: readonly TourStep[] = [
  {
    id: "modules",
    target: "modules",
    label: "Modules",
    description:
      "Switch between Finance & Accounting, Sales & CRM, Procurement, Inventory and more.",
    anchor: { x: 0.5, y: 0.22 },
    side: "right",
    vertical: "below",
  },
  {
    id: "key-numbers",
    target: "kpis",
    label: "Key numbers",
    description: "Sales, margin, cash in bank, receivables and inventory value, all at a glance.",
    anchor: { x: 0.4, y: 0.3 },
    side: "right",
    vertical: "below",
  },
  {
    id: "calendar",
    target: "calendar",
    label: "Calendar",
    description: "Your schedule, right beside your numbers.",
    anchor: { x: 0.5, y: 0.4 },
    side: "left",
    vertical: "below",
  },
  {
    id: "categories",
    target: "categories",
    label: "Items by category",
    description: "Find out which product categories bring in the most sales.",
    anchor: { x: 0.4, y: 0.55 },
    side: "right",
    vertical: "above",
  },
  {
    id: "revenue",
    target: "revenue",
    label: "Revenue vs expense",
    description: "See how money coming in compares with money going out, month by month.",
    anchor: { x: 0.45, y: 0.55 },
    side: "left",
    vertical: "above",
  },
  {
    id: "glance",
    target: "glance",
    label: "Modules at a glance",
    description: "Every module you use, with a line on what it covers.",
    anchor: { x: 0.4, y: 0.6 },
    side: "right",
    vertical: "above",
  },
];

export const ASSISTANT_STEP = {
  target: "assistant",
  label: "Ask Sahayogi",
  description: "Ask about your numbers in plain words and get an answer straight away.",
} as const;

export const TOUR_QUESTION = "What is overdue?";
