import {
  ArrowLeftRight,
  BookOpen,
  ChartColumn,
  ChartPie,
  Factory,
  GitCompareArrows,
  Globe,
  HandCoins,
  Landmark,
  Layers,
  ListTree,
  Network,
  ReceiptIndianRupee,
  Target,
} from "lucide-react";

import type { FeatureCluster, FeatureGroup, SubnavItem } from "./types";

export const financePath = "/modules/finance-accounting";
export const financeFeaturesPath = "/modules/finance-accounting/features";

/** The bar on the module's main page. */
export const financeSubnav: readonly SubnavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "reports", label: "Reports" },
  { id: "features", label: "Features", href: financeFeaturesPath, hasFeatureMenu: true },
  { id: "pricing", label: "Pricing", href: "/pricing" },
];

/** The same bar on the features page, where Features is the page the visitor is on. */
export const financeFeaturesSubnav: readonly SubnavItem[] = [
  { id: "overview", label: "Overview", href: financePath },
  { id: "reports", label: "Reports", href: `${financePath}#reports` },
  {
    id: "features",
    label: "Features",
    href: financeFeaturesPath,
    hasFeatureMenu: true,
    isCurrent: true,
  },
  { id: "pricing", label: "Pricing", href: "/pricing" },
];

/**
 * The thirteen main capabilities of Finance & Accounting. Each page and menu reads from this list.
 * Under each one: a short value line and its main feature highlights, as shown on the website.
 */
export const financeFeatureGroups: readonly FeatureGroup[] = [
  {
    id: "setup",
    name: "Accounting Setup & Chart of Accounts",
    icon: ListTree,
    summary: "Set up your books once, the way your business works.",
    highlights: [
      "Chart of Accounts",
      "Account Groups",
      "Sub-Accounts",
      "Account Balances",
      "Financial Periods",
    ],
  },
  {
    id: "general",
    name: "General Accounting & Journals",
    icon: BookOpen,
    summary: "Record every transaction in ledgers and journals.",
    highlights: [
      "General Ledger",
      "Journal Entries",
      "Debit & Credit Tracking",
      "Recurring Journals",
      "Transaction History",
    ],
  },
  {
    id: "receivables",
    name: "Receivables & Customer Payments",
    icon: ReceiptIndianRupee,
    summary: "Bill customers and collect what you are owed.",
    highlights: [
      "Customer Invoices",
      "Outstanding Receivables",
      "Payment Tracking",
      "Customer Balances",
      "Receivables Aging",
    ],
  },
  {
    id: "payables",
    name: "Payables & Supplier Payments",
    icon: HandCoins,
    summary: "Record supplier bills and pay them on time.",
    highlights: [
      "Supplier Bills",
      "Outstanding Payables",
      "Payment Tracking",
      "Supplier Balances",
      "Payables Aging",
    ],
  },
  {
    id: "cash-bank",
    name: "Cash & Bank Management",
    icon: Landmark,
    summary: "Keep track of every bank and cash account.",
    highlights: [
      "Bank Accounts",
      "Cash Position",
      "Bank Transactions",
      "Cash Flow Visibility",
      "Transaction Tracking",
    ],
  },
  {
    id: "reconciliation",
    name: "Bank Reconciliation",
    icon: GitCompareArrows,
    summary: "Match the bank statement with your books.",
    highlights: [
      "Bank Statement Import",
      "Transaction Matching",
      "Reconciliation",
      "Difference Tracking",
      "Reconciliation History",
    ],
  },
  {
    id: "assets",
    name: "Fixed Assets & Depreciation",
    icon: Factory,
    summary: "Know what the business owns and how its value changes.",
    highlights: [
      "Asset Register",
      "Asset Categories",
      "Depreciation Tracking",
      "Asset Valuation",
      "Asset History",
    ],
  },
  {
    id: "expenses",
    name: "Expenses, Costs & Profitability",
    icon: ChartPie,
    summary: "See where money goes and what each part of the business earns.",
    highlights: [
      "Expense Tracking",
      "Expense Categories",
      "Cost Tracking",
      "Profitability Analysis",
      "Expense Reporting",
    ],
  },
  {
    id: "budgets",
    name: "Budgets & Financial Planning",
    icon: Target,
    summary: "Plan the year and compare it with what actually happened.",
    highlights: [
      "Budget Creation",
      "Budget Allocation",
      "Budget vs Actual",
      "Financial Planning",
      "Variance Tracking",
    ],
  },
  {
    id: "currency",
    name: "Multi-Currency & Foreign Exchange",
    icon: Globe,
    summary: "Do business in more than one currency.",
    highlights: [
      "Multi-Currency Transactions",
      "Exchange Rates",
      "Currency Conversion",
      "Exchange Differences",
      "Foreign Currency Reporting",
    ],
  },
  {
    id: "multi-entity",
    name: "Multi-Branch & Multi-Entity Accounting",
    icon: Network,
    summary: "Run the books for many branches or companies in one system.",
    highlights: [
      "Multiple Branches",
      "Multiple Entities",
      "Entity-wise Accounting",
      "Branch-wise Reporting",
      "Inter-Entity Financial Visibility",
    ],
  },
  {
    id: "reports",
    name: "Financial Reports & Closing",
    icon: ChartColumn,
    summary: "Understand your numbers, then close the period.",
    highlights: [
      "Profit & Loss",
      "Balance Sheet",
      "Cash Flow",
      "Trial Balance",
      "Period-End Closing",
    ],
  },
  {
    id: "group",
    name: "Group Finance & Consolidation",
    icon: Layers,
    summary: "Bring the accounts of a group of companies into one view.",
    highlights: [
      "Multi-Entity Consolidation",
      "Consolidated Financial Statements",
      "Entity-wise Results",
      "Group-Level Reporting",
      "Consolidation Adjustments",
    ],
  },
];

/** The five groups the thirteen capabilities are shown under. Every capability is in exactly one. */
export const financeFeatureClusters: readonly FeatureCluster[] = [
  {
    id: "core-accounting",
    navLabel: "Accounting",
    name: "Core Accounting",
    icon: BookOpen,
    summary: "The foundation: set up your books and record every transaction.",
    capabilityIds: ["setup", "general"],
  },
  {
    id: "receivables-payables-expenses",
    navLabel: "Receivables & Payables",
    name: "Receivables, Payables & Expenses",
    icon: ArrowLeftRight,
    summary: "Money coming in, money going out, and what it all costs.",
    capabilityIds: ["receivables", "payables", "expenses"],
  },
  {
    id: "cash-banking-assets",
    navLabel: "Cash & Banking",
    name: "Cash, Banking & Assets",
    icon: Landmark,
    summary: "Keep cash, the bank and what the business owns in order.",
    capabilityIds: ["cash-bank", "reconciliation", "assets"],
  },
  {
    id: "planning-structure",
    navLabel: "Planning",
    name: "Planning & Business Structure",
    icon: Target,
    summary: "Plan ahead, and run more than one branch, company or currency.",
    capabilityIds: ["budgets", "currency", "multi-entity"],
  },
  {
    id: "reporting-group-finance",
    navLabel: "Reporting",
    name: "Reporting & Group Finance",
    icon: ChartColumn,
    summary: "Understand your results, then bring a group of companies together.",
    capabilityIds: ["reports", "group"],
  },
];

/** The capabilities of one group, in order. A wrong id fails loudly instead of leaving a gap. */
export const capabilitiesOf = (cluster: FeatureCluster): readonly FeatureGroup[] =>
  cluster.capabilityIds.map((capabilityId) => {
    const capability = financeFeatureGroups.find((candidate) => candidate.id === capabilityId);
    if (!capability) throw new Error(`Unknown finance capability: ${capabilityId}`);
    return capability;
  });
