/**
 * Sample figures for the Finance & Accounting product screens. Every name and number is made up
 * so the screens can run without a real company's information.
 */

export const demoCompany = "Demo Co HQ";
export const demoPeriod = "FY 2026-27";

export const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"] as const;

/** In lakh rupees. */
export const revenueSeries = [4.8, 5.6, 5.2, 6.4, 6.0, 7.1, 7.6, 5.9] as const;
export const expenseSeries = [3.4, 3.7, 3.6, 4.2, 3.9, 4.5, 4.6, 3.3] as const;
export const profitSeries = revenueSeries.map((revenue, index) =>
  Number((revenue - (expenseSeries[index] ?? 0)).toFixed(1)),
);
export const cashFlowSeries = [1.1, 1.6, 1.2, 2.4, 2.0, 3.1, 3.5, 4.2] as const;

export type Kpi = {
  id: string;
  label: string;
  /** In rupees. */
  value: number;
  note: string;
};

export const dashboardKpis: readonly Kpi[] = [
  { id: "revenue", label: "Total Revenue", value: 4860000, note: "Up 12.5% on last year" },
  { id: "expenses", label: "Total Expenses", value: 3120000, note: "Up 6.2% on last year" },
  { id: "profit", label: "Net Profit", value: 1740000, note: "Up 24.0% on last year" },
  { id: "receivables", label: "Receivables", value: 620000, note: "₹1,20,000 overdue" },
  { id: "payables", label: "Payables", value: 380000, note: "₹70,000 overdue" },
  { id: "cash", label: "Cash / Bank Balance", value: 1294560, note: "Across 3 accounts" },
];

export type Transaction = {
  id: string;
  title: string;
  party: string;
  date: string;
  /** In rupees. Negative amounts are money going out. */
  amount: number;
};

export const recentTransactions: readonly Transaction[] = [
  { id: "t1", title: "Receipt · INV-1042", party: "Demo Traders", date: "12 Nov", amount: 125000 },
  { id: "t2", title: "Bill · BILL-2210", party: "Demo Supplies", date: "12 Nov", amount: -48500 },
  {
    id: "t3",
    title: "Receipt · INV-1039",
    party: "Demo Electronics",
    date: "11 Nov",
    amount: 86400,
  },
  {
    id: "t4",
    title: "Payment · BILL-2204",
    party: "Demo Logistics",
    date: "10 Nov",
    amount: -22300,
  },
  { id: "t5", title: "Receipt · INV-1036", party: "Demo Retail", date: "09 Nov", amount: 64000 },
];

export type AgingBucket = { id: string; label: string; lakh: number };

export const receivableBuckets: readonly AgingBucket[] = [
  { id: "current", label: "Current", lakh: 2.9 },
  { id: "d30", label: "1–30 Days", lakh: 1.8 },
  { id: "d60", label: "31–60 Days", lakh: 0.9 },
  { id: "d60plus", label: "60+ Days", lakh: 0.6 },
];

export const payableBuckets: readonly AgingBucket[] = [
  { id: "today", label: "Due Today", lakh: 0.4 },
  { id: "week", label: "Due This Week", lakh: 1.1 },
  { id: "overdue", label: "Overdue", lakh: 0.7 },
  { id: "later", label: "Due Later", lakh: 1.6 },
];

export const expenseBreakdown = [
  { id: "purchases", label: "Purchases", percent: 52 },
  { id: "salaries", label: "Salaries", percent: 24 },
  { id: "rent", label: "Rent & Utilities", percent: 12 },
  { id: "logistics", label: "Logistics", percent: 8 },
  { id: "other", label: "Other", percent: 4 },
] as const;

export const invoiceDemo = {
  number: "INV-1043",
  date: "12 Nov 2026",
  customer: "Demo Traders",
  gstin: "GSTIN 29DEMO0000A1Z5",
  items: [
    { id: "i1", name: "LED Panel Light 18W", qty: 40, price: 540, discountPercent: 5 },
    { id: "i2", name: "Ceiling Fan 1200mm", qty: 12, price: 2150, discountPercent: 0 },
    { id: "i3", name: "Installation service", qty: 1, price: 4500, discountPercent: 0 },
  ],
  gstPercent: 18,
} as const;

const itemTotal = (item: (typeof invoiceDemo.items)[number]) =>
  item.qty * item.price * (1 - item.discountPercent / 100);

export const invoiceSubtotal = invoiceDemo.items.reduce((sum, item) => sum + itemTotal(item), 0);
export const invoiceGst = Math.round(invoiceSubtotal * (invoiceDemo.gstPercent / 100));
export const invoiceTotal = Math.round(invoiceSubtotal + invoiceGst);
export const lineTotal = (item: (typeof invoiceDemo.items)[number]) => Math.round(itemTotal(item));

export const bankLines = [
  { id: "b1", text: "NEFT · Demo Traders", date: "12 Nov", amount: 125000 },
  { id: "b2", text: "UPI · Demo Retail", date: "11 Nov", amount: 64000 },
  { id: "b3", text: "RTGS · Demo Supplies", date: "11 Nov", amount: -48500 },
] as const;

export const gstFigures = {
  liability: 412600,
  credit: 268400,
  outward: 2292000,
  inward: 1491000,
} as const;
