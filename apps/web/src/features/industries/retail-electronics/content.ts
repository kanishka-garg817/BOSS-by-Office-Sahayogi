import type { WindowContent } from "@/types/window-content";

/**
 * Everything the Retail & Electronics page says. Product statements here come only from what the
 * BoSS module pages and the module list already state; anything not confirmed is worded as
 * something to confirm in a demo.
 */

export const heroContent = {
  eyebrow: "Retail & Electronics",
  heading: "Manage Your Retail & Electronics Business with Greater Control",
  text: "From product purchasing and inventory to customer sales and financial records, electronics businesses manage several connected activities every day. BoSS helps businesses organize the relevant operations through its business management capabilities.",
  photoAlt:
    "Modern electronics and home appliances showroom displaying kitchen appliances and equipment",
} as const;

export const challengesContent = {
  heading: "The Everyday Challenges of Running an Electronics Business",
  photoAlt:
    "Electronics retail showroom with washing machines, refrigerators, and television displays",
  topics: [
    {
      title: "Managing products and stock",
      text: "Electronics businesses may handle multiple brands, models, product variants, accessories, and different storage locations. Maintaining accurate product and stock records can become difficult as the business grows.",
    },
    {
      title: "Keeping purchasing and sales organized",
      text: "Businesses need to track products ordered from suppliers, goods received, customer orders, completed sales, and stock availability.",
    },
    {
      title: "Maintaining accurate business records",
      text: "Purchases, sales, invoices, customer payments, supplier bills, and other records may be spread across separate applications or spreadsheets.",
    },
    {
      title: "Understanding business performance",
      text: "Owners need access to relevant information about sales, inventory, outstanding payments, and other business activities to make informed decisions.",
    },
  ],
  examplesCaption: "Sample records of the kind many businesses keep, shown for illustration",
} as const;

type ExampleWindow = { title: string; content: WindowContent };

export const challengeExamples: readonly [ExampleWindow, ExampleWindow] = [
  {
    title: "Stock.xlsx",
    content: {
      kind: "sheet",
      file: "Stock.xlsx",
      columns: ["Model", "Brand", "In stock"],
      rows: [
        ["43-inch TV", "Brand X", "14"],
        ["Earbuds", "Brand Y", "62"],
        ["Fast charger", "Brand Y", "—"],
      ],
      flag: [2, 2],
    },
  },
  {
    title: "Supplier bill",
    content: {
      kind: "form",
      title: "Bill SB-2041",
      fields: [
        { label: "Supplier", value: "Example Supplier" },
        { label: "Amount", value: "₹1,86,000" },
        { label: "Status", value: "Payment pending", flag: true },
      ],
    },
  },
];

export type WorkflowStep = {
  title: string;
  text: string;
  /** The BoSS module this step relates to, named as on the modules page. */
  module: string;
};

export const workflowContent = {
  heading: "From Purchasing Products to Selling Them",
  note: "This is a typical flow for an electronics business. Which steps you use in BoSS, and how they connect, depends on the modules you choose. Confirm the details for your business in a demo.",
} as const;

export const workflowSteps: readonly WorkflowStep[] = [
  {
    title: "Purchasing Products",
    text: "Products are ordered from suppliers.",
    module: "Procurement",
  },
  {
    title: "Receiving and Recording Stock",
    text: "Incoming products are checked and stock records are updated.",
    module: "Procurement and Warehouse Management",
  },
  {
    title: "Managing Inventory",
    text: "Product availability and quantities are tracked.",
    module: "Inventory",
  },
  {
    title: "Handling Customer Sales",
    text: "Customer orders or sales are recorded and processed.",
    module: "Sales & CRM",
  },
  {
    title: "Billing and Financial Records",
    text: "Relevant invoices, transactions, and payment records are maintained.",
    module: "POS & Retail Billing and Finance & Accounting",
  },
  {
    title: "Reviewing Business Performance",
    text: "Owners review available sales, stock, and financial reports.",
    module: "Business Intelligence & Analytics",
  },
];

export type HelpTopic = {
  id: string;
  title: string;
  text: string;
  /** Capabilities the module pages and the module list name for this need. */
  points: readonly string[];
  /** Modules this need relates to, by slug. */
  moduleSlugs: readonly string[];
  /** What the product screen here would show, until a real screenshot is added. */
  shotTitle: string;
};

export const helpsContent = {
  heading: "Bring Your Business Activities Together with BoSS",
  text: "Each need below relates to one or more BoSS modules. The points listed are capabilities named for those modules.",
} as const;

export const helpTopics: readonly HelpTopic[] = [
  {
    id: "purchasing",
    title: "Purchasing and Supplier Records",
    text: "BoSS Procurement is for buying from your suppliers with a clear record of every purchase.",
    points: ["Suppliers and vendors", "Purchase orders", "Approvals", "Goods receipts"],
    moduleSlugs: ["procurement"],
    shotTitle: "Procurement: Purchase orders and suppliers",
  },
  {
    id: "inventory",
    title: "Product and Inventory Management",
    text: "BoSS Inventory helps you know what stock you have, and Warehouse Management helps you organise storage and handle goods.",
    points: [
      "Items and stock levels",
      "Stock movement and stock transfers",
      "Low-stock alerts",
      "Storage locations, receiving and dispatch",
    ],
    moduleSlugs: ["inventory", "warehouse-management"],
    shotTitle: "Inventory: Items and stock levels",
  },
  {
    id: "sales",
    title: "Sales and Billing",
    text: "BoSS Sales & CRM manages customers, enquiries and orders, and POS & Retail Billing is for billing customers quickly at the counter.",
    points: [
      "Customers and enquiries",
      "Quotes and orders",
      "Counter billing and receipts",
      "Payments",
    ],
    moduleSlugs: ["sales-crm", "pos-retail-billing"],
    shotTitle: "Sales & CRM: Orders and billing",
  },
  {
    id: "finance",
    title: "Finance and Payments",
    text: "BoSS Finance & Accounting keeps your books, invoices and payments in order.",
    points: [
      "Customer invoices and outstanding receivables",
      "Supplier bills and outstanding payables",
      "Payment tracking and bank reconciliation",
      "Receivables and payables ageing",
    ],
    moduleSlugs: ["finance-accounting"],
    shotTitle: "Finance & Accounting: Invoices and outstanding payments",
  },
  {
    id: "reports",
    title: "Reports and Business Visibility",
    text: "BoSS Finance & Accounting includes financial reports, and Business Intelligence & Analytics shows how your business is doing in one place.",
    points: [
      "Profit & Loss, Balance Sheet, Cash Flow and Trial Balance",
      "Dashboards and reports",
      "Trends",
    ],
    moduleSlugs: ["finance-accounting", "business-intelligence-analytics"],
    shotTitle: "Reports and dashboards",
  },
];

export const comparisonContent = {
  heading: "Move from Disconnected Records to More Organized Operations",
  without: {
    title: "Without a connected process",
    points: [
      "Product information maintained in separate records.",
      "Sales and stock information requiring manual coordination.",
      "Business reports collected from multiple sources.",
    ],
  },
  withBoss: {
    title: "With relevant BoSS capabilities",
    points: [
      "More organized product and stock records.",
      "Better coordination between supported business processes.",
      "Easier access to relevant information and reports.",
    ],
  },
} as const;

export const benefitsContent = {
  heading: "Make Everyday Electronics Business Operations Easier to Manage",
  points: [
    "Better organization of product and stock information.",
    "Easier tracking of relevant purchasing and sales records.",
    "Less repeated data entry where processes genuinely share information.",
    "Better access to available financial and operational information.",
    "A clearer view of business activities for owners and managers.",
  ],
} as const;

export const modulesContent = {
  heading: "Explore the BoSS Capabilities Relevant to Your Business",
  /** The modules that match the workflow above, by slug, in workflow order. */
  slugs: [
    "procurement",
    "warehouse-management",
    "inventory",
    "sales-crm",
    "pos-retail-billing",
    "finance-accounting",
    "business-intelligence-analytics",
  ],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "purchasing-sales-inventory",
      question: "Can BoSS help manage purchasing, sales, and inventory?",
      answer:
        "Yes. BoSS has Procurement for suppliers, purchase orders and approvals, Inventory for items, stock levels and stock movement, and Sales & CRM for customers, enquiries, quotes and orders. POS & Retail Billing covers billing at the counter. You can start with the modules you need and add more later.",
    },
    {
      id: "locations",
      question: "Can I manage stock across multiple locations?",
      answer:
        "BoSS Inventory includes stock levels and stock transfers, and Warehouse Management covers storage locations, receiving and dispatch. How your own shops, godowns and branches would be set up is best confirmed in a demo, using your requirements.",
    },
    {
      id: "product-details",
      question: "Which product details can BoSS record?",
      answer:
        "BoSS Inventory keeps item records and tracks stock levels and movement. The exact product details you need, such as brand, model, variants or accessories, should be checked against your own product list in a demo.",
    },
    {
      id: "serial-warranty",
      question: "Can BoSS track serial numbers and warranty information?",
      answer:
        "We have not confirmed serial-number tracking or warranty management as BoSS features, so we do not claim them here. If you need them, tell us when you book a demo and we will confirm what is available for your business.",
    },
    {
      id: "reports",
      question: "Which sales and financial reports are available?",
      answer:
        "Finance & Accounting includes Profit & Loss, Balance Sheet, Cash Flow and Trial Balance, along with outstanding receivables and payables and their ageing. Business Intelligence & Analytics offers dashboards and reports. Sales-specific and stock-specific report formats should be confirmed in a demo.",
    },
    {
      id: "modules",
      question: "Which BoSS modules are relevant to my business?",
      answer:
        "The modules that relate to the workflow on this page are Procurement, Warehouse Management, Inventory, Sales & CRM, POS & Retail Billing, Finance & Accounting, and Business Intelligence & Analytics. They are listed above.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "See How BoSS Fits Your Electronics Business",
  text: "Explore how the relevant BoSS capabilities can support your business processes and requirements.",
} as const;
