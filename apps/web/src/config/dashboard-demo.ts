/**
 * Sample data for the dashboard shown on the home page. Every name and figure is made up so the
 * demo can run without a real company's information.
 */

export const dashboardCompany = {
  organisation: "Demo Co",
  workspace: "Demo Co HQ",
  year: "FY 2026-27",
} as const;

export const dashboardUser = { name: "Demo Admin", initials: "DA" } as const;

export const greeting = {
  hello: "Good Evening,",
  note: "Here's a look before you wrap up.",
} as const;

/** Short lines for the "Modules at a Glance" cards, in the order of `sidebarModuleSlugs`. */
export const moduleSummaries: Record<string, string> = {
  "finance-accounting": "Ledgers, invoices, payments and reporting",
  "sales-crm": "Orders, parties, enquiries and pricing",
  procurement: "Purchase orders, vendors and bills",
  inventory: "Items, stock levels and movements",
  "warehouse-management": "Bins, picking, packing and dispatch",
  manufacturing: "Bills of material and production runs",
};

/** The modules in the left bar, in order. */
export const sidebarModuleSlugs = [
  "finance-accounting",
  "sales-crm",
  "procurement",
  "inventory",
  "warehouse-management",
  "manufacturing",
  "supply-chain-logistics",
  "people-payroll",
] as const;

export type Kpi = {
  id: "sales" | "margin" | "cash" | "receipts" | "receivables" | "inventory" | "orders";
  label: string;
  value: string;
  /** A short line under the figure. */
  note: string;
};

export const kpis: readonly Kpi[] = [
  { id: "sales", label: "Total Sales (FY)", value: "₹24,50,000", note: "Up 12.5% on last year" },
  { id: "margin", label: "Trading Margin (FY)", value: "18.4%", note: "Up 2.1 points" },
  { id: "cash", label: "Cash in Bank", value: "₹12,94,560", note: "Across 3 accounts" },
  { id: "receipts", label: "Receipts (FY)", value: "₹21,30,000", note: "Up 9.8% on last year" },
  { id: "receivables", label: "Receivables", value: "₹8,40,000", note: "₹1,20,000 overdue" },
  { id: "inventory", label: "Inventory Value", value: "₹19,45,990", note: "1,240 items in stock" },
  { id: "orders", label: "Sales Orders · 7d", value: "38", note: "Up 12% on last week" },
];

/** Whether a module shows as live, as it does on the real dashboard. */
export const moduleStatus: Record<string, "Live" | "Coming soon"> = {
  "finance-accounting": "Live",
  "sales-crm": "Coming soon",
  procurement: "Coming soon",
  inventory: "Coming soon",
  "warehouse-management": "Coming soon",
  manufacturing: "Coming soon",
};

export const calendar = {
  month: "October",
  year: "2026",
  weekdays: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
  /** The days shown, including the grey ones that belong to the months either side. */
  cells: [
    28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
  ],
  /** How many cells at the start belong to the month before. */
  leadingCells: 3,
  /** The cells from this one on belong to the month after. */
  trailingFrom: 34,
  today: 24,
} as const;

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Monthly revenue and expense, in lakh rupees. */
export const revenueSeries = [18, 20, 19, 23, 25, 24, 28, 30, 29, 33, 35, 38] as const;
export const expenseSeries = [14, 15, 15, 17, 18, 19, 20, 22, 21, 24, 25, 27] as const;

export const categories = [
  { id: "fans", name: "Fans", percent: 32 },
  { id: "lights", name: "Lights", percent: 24 },
  { id: "wires", name: "Wires & cables", percent: 18 },
  { id: "switchgear", name: "Switchgear", percent: 14 },
  { id: "others", name: "Others", percent: 12 },
] as const;

export type DashboardExchange = { keywords: readonly string[]; reply: string };

export const dashboardSuggestions = [
  "Explain these numbers",
  "What is overdue?",
  "Top selling category",
  "Summarise this month",
] as const;

/** Example answers for the demo. The assistant in the demo only knows the sample data above. */
export const dashboardExchanges: readonly DashboardExchange[] = [
  {
    keywords: ["number", "explain"],
    reply:
      "Sales so far this year are ₹24,50,000, up 12.5%. Cash in bank is ₹12,94,560, and ₹8,40,000 is still to be collected from customers.",
  },
  {
    keywords: ["overdue", "receivable", "owe", "pending"],
    reply:
      "₹1,20,000 of your receivables is overdue. The largest is from Patel Electronics: ₹45,000, overdue by 12 days.",
  },
  {
    keywords: ["category", "selling", "top", "best"],
    reply:
      "Fans lead with 32% of sales this year, followed by Lights at 24% and Wires & cables at 18%.",
  },
  {
    keywords: ["month", "summar", "week", "orders"],
    reply:
      "There were 38 sales orders in the last 7 days, up 12%. Revenue has stayed ahead of expenses in every month this year.",
  },
];

export const dashboardFallback =
  "I can help with your sales, cash and stock numbers. Try one of the suggestions.";
