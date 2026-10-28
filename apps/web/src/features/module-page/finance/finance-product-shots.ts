import type { ProductShot } from "../product-shot";

/**
 * The product screen shown with each feature group. There are no real Finance screenshots yet, so
 * each one is a placeholder. To add one, save the image in `src/assets/product/finance/`, import
 * it here and set `image` and `alt` on the group's entry. Nothing else needs to change.
 */
export const financeProductShots: Record<string, ProductShot> = {
  "core-accounting": { title: "Chart of Accounts / General Ledger" },
  "receivables-payables-expenses": { title: "Invoices / Receivables / Payables" },
  "cash-banking-assets": { title: "Bank Management / Reconciliation" },
  "planning-structure": { title: "Budget / Multi-Entity / Multi-Currency" },
  "reporting-group-finance": { title: "Financial Reports / Consolidation" },
};
