export const categories = [
  { id: "finance", label: "Finance" },
  { id: "sales", label: "Sales" },
  { id: "operations", label: "Operations" },
  { id: "people", label: "People" },
  { id: "business", label: "Business" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

type DirectoryEntry = {
  slug: string;
  category: CategoryId;
  summary: string;
  keywords: readonly string[];
};

/** What each module card says, in the order the cards are shown: grouped by category. */
export const directoryEntries: readonly DirectoryEntry[] = [
  {
    slug: "finance-accounting",
    category: "finance",
    summary: "Keep your books, invoices and payments in order.",
    keywords: ["Invoices", "Payments", "Ledgers", "Reports"],
  },
  {
    slug: "asset-management",
    category: "finance",
    summary: "Keep track of what your business owns and what it is worth.",
    keywords: ["Asset records", "Value", "Upkeep"],
  },
  {
    slug: "compliance-legal",
    category: "finance",
    summary: "Stay on top of your legal and compliance duties.",
    keywords: ["Deadlines", "Contracts", "Reminders"],
  },
  {
    slug: "business-intelligence-analytics",
    category: "finance",
    summary: "See how your business is doing, all in one place.",
    keywords: ["Dashboards", "Reports", "Trends"],
  },
  {
    slug: "sales-crm",
    category: "sales",
    summary: "Manage your customers, enquiries and orders.",
    keywords: ["Customers", "Enquiries", "Quotes", "Orders"],
  },
  {
    slug: "pos-retail-billing",
    category: "sales",
    summary: "Bill your customers quickly at the counter.",
    keywords: ["Billing", "Receipts", "Payments"],
  },
  {
    slug: "marketing-commerce",
    category: "sales",
    summary: "Reach more customers and sell online.",
    keywords: ["Campaigns", "Online store", "Offers"],
  },
  {
    slug: "customer-service",
    category: "sales",
    summary: "Answer your customers and resolve their issues.",
    keywords: ["Support requests", "Follow-ups", "History"],
  },
  {
    slug: "procurement",
    category: "operations",
    summary: "Buy from your suppliers with a clear record of every purchase.",
    keywords: ["Suppliers", "Purchase orders", "Approvals"],
  },
  {
    slug: "inventory",
    category: "operations",
    summary: "Always know what stock you have.",
    keywords: ["Items", "Stock levels", "Stock movement"],
  },
  {
    slug: "warehouse-management",
    category: "operations",
    summary: "Organise your storage and handle goods with ease.",
    keywords: ["Locations", "Receiving", "Dispatch"],
  },
  {
    slug: "manufacturing",
    category: "operations",
    summary: "Plan and track what you make.",
    keywords: ["Production plans", "Materials", "Output"],
  },
  {
    slug: "supply-chain-logistics",
    category: "operations",
    summary: "Follow your goods from supplier to customer.",
    keywords: ["Shipments", "Delivery", "Tracking"],
  },
  {
    slug: "people-payroll",
    category: "people",
    summary: "Look after your team and pay them correctly.",
    keywords: ["Employees", "Attendance", "Leave", "Payroll"],
  },
  {
    slug: "work-management",
    category: "people",
    summary: "Plan tasks and keep work moving.",
    keywords: ["Tasks", "Projects", "Deadlines"],
  },
  {
    slug: "travel-expense",
    category: "people",
    summary: "Handle business trips and expense claims.",
    keywords: ["Travel requests", "Claims", "Approvals"],
  },
  {
    slug: "self-service-portal",
    category: "people",
    summary: "Let your team handle everyday requests themselves.",
    keywords: ["Payslips", "Leave requests", "Documents"],
  },
  {
    slug: "document-management",
    category: "business",
    summary: "Keep your business documents safe and easy to find.",
    keywords: ["Storage", "Search", "Sharing"],
  },
];

/** Modules that already have their own page. The others show no link until theirs is built. */
export const modulePages = [
  { slug: "finance-accounting", href: "/modules/finance-accounting" },
] as const;
