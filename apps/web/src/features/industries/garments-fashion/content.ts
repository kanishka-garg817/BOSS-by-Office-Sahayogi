import {
  ClipboardCheck,
  FileText,
  Package,
  PenTool,
  Scissors,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/navigation";

/**
 * Everything the Garments & Fashion page says. Product statements here come only from what the
 * BoSS module list and module pages already state; anything industry-specific that has not been
 * confirmed is worded as something to confirm in a demo, matching the other industry pages.
 */

export const exploreModulesAction = {
  label: "Explore Modules",
  href: "/modules",
} as const satisfies NavItem;

export const heroContent = {
  eyebrow: "Garments & Fashion",
  heading: "Bring Order to Your Garments Business",
  text: "From styles, colours and sizes to job-work and multi-channel sales, BoSS brings it all into one connected system.",
  photoAlt: "Clothes hanging on racks inside a bright fashion store",
} as const;

export type Challenge = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const challengesContent = {
  heading: "Everyday Challenges in Running This Business",
  text: "Every style brings its own colour and size variants, production split across job-work units, and sales across multiple channels.",
  note: "These are common challenges across garment manufacturing, wholesale and fashion retail businesses. Which of these apply to you depends on how your business is set up.",
  items: [
    {
      title: "Style, Colour & Size Complexity",
      text: "A single style can turn into dozens of stock-keeping combinations once every colour and size is counted, making manual stock records hard to keep accurate.",
      icon: Scissors,
    },
    {
      title: "Job-Work & Outside Production",
      text: "Fabric, trims or part-finished pieces sent to outside cutting, stitching or embroidery units need to be tracked until the finished goods come back.",
      icon: Package,
    },
    {
      title: "Seasonal & Collection-Based Stock",
      text: "Collections are planned around seasons, so unsold stock from an earlier season can sit unused and tie up working capital.",
      icon: FileText,
    },
    {
      title: "Selling Across Multiple Channels",
      text: "Wholesale orders, your own retail counters and online sales often end up on separate records, making it hard to see one true stock position.",
      icon: ShoppingBag,
    },
    {
      title: "Higher Return Volumes",
      text: "Clothing and fashion items see more returns and exchanges than many other retail categories, which adds extra stock and billing adjustments to track.",
      icon: ClipboardCheck,
    },
    {
      title: "Scattered Costing & Payments",
      text: "Fabric and trim purchase costs, payments to job-work vendors, and your own team's wages are often tracked in separate registers and spreadsheets.",
      icon: PenTool,
    },
  ] satisfies readonly Challenge[],
} as const;

export type WorkflowStep = {
  title: string;
  text: string;
  icon: LucideIcon;
  /** The BoSS module(s) this step relates to, named as on the modules page. */
  modules: readonly string[];
};

export const workflowContent = {
  heading: "From Design to Delivery",
  subtitle: "A typical flow for this kind of business, from design to final sale.",
} as const;

export const workflowSteps: readonly WorkflowStep[] = [
  {
    title: "Design & Costing",
    text: "A style is planned and costed before production begins.",
    icon: PenTool,
    modules: ["Work Management"],
  },
  {
    title: "Fabric & Trim Procurement",
    text: "Fabric, trims and accessories are ordered from suppliers.",
    icon: Package,
    modules: ["Procurement"],
  },
  {
    title: "Cutting & Stitching",
    text: "Production runs in-house or with outside job-work units.",
    icon: Scissors,
    modules: ["Manufacturing"],
  },
  {
    title: "Quality Check & Finishing",
    text: "Finished pieces are checked before they are packed.",
    icon: ClipboardCheck,
    modules: ["Manufacturing", "Work Management"],
  },
  {
    title: "Warehouse & Stock",
    text: "Finished goods are received, stored and tracked by style, colour and size.",
    icon: Package,
    modules: ["Inventory", "Warehouse Management"],
  },
  {
    title: "Wholesale, Retail & Online Sales",
    text: "Stock is sold through wholesale orders, retail counters and online channels.",
    icon: ShoppingBag,
    modules: ["Sales & CRM", "POS & Retail Billing", "Marketing & Commerce"],
  },
  {
    title: "Invoicing & Accounts",
    text: "Sales, purchases and job-work payments are recorded in your books.",
    icon: FileText,
    modules: ["Finance & Accounting"],
  },
];

export const workflowJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: workflowContent.heading,
  description: workflowContent.subtitle,
  step: workflowSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.text,
    itemListElement: {
      "@type": "HowToDirection",
      text: `${step.text} Managed through ${step.modules.join(", ")}.`,
    },
  })),
};

export type HelpTopic = {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
  /** Capabilities the module pages and the module list name for this need. */
  points: readonly string[];
  /** Modules this need relates to, by slug. */
  moduleSlugs: readonly string[];
};

export const helpsContent = {
  heading: "Bring Your Garments Business Together with BoSS",
  text: "Each need below relates to one or more BoSS modules. The points listed are capabilities named for those modules.",
} as const;

export const helpTopics: readonly HelpTopic[] = [
  {
    id: "production",
    title: "Production & Job-Work Tracking",
    text: "BoSS Manufacturing is for planning and tracking what you make, and Work Management helps keep tasks moving, whether production happens on your own floor or with outside job-work units.",
    icon: Scissors,
    points: ["Production plans", "Materials", "Output", "Tasks and deadlines"],
    moduleSlugs: ["manufacturing", "work-management"],
  },
  {
    id: "inventory",
    title: "Stock Across Styles, Colours & Sizes",
    text: "BoSS Inventory helps you know what stock you have, and Warehouse Management helps you organise storage and handle goods, across every colour and size of a style.",
    icon: Package,
    points: [
      "Items and stock levels",
      "Stock movement and stock transfers",
      "Low-stock alerts",
      "Storage locations, receiving and dispatch",
    ],
    moduleSlugs: ["inventory", "warehouse-management"],
  },
  {
    id: "sales",
    title: "Selling Wholesale, In-Store & Online",
    text: "BoSS Sales & CRM manages customers and orders, POS & Retail Billing is for billing at the counter, and Marketing & Commerce is for reaching customers and selling online.",
    icon: ShoppingBag,
    points: [
      "Customers, enquiries and orders",
      "Counter billing and receipts",
      "Online store and offers",
      "Payments",
    ],
    moduleSlugs: ["sales-crm", "pos-retail-billing", "marketing-commerce"],
  },
  {
    id: "finance",
    title: "Payments, Payroll & Reports",
    text: "BoSS Finance & Accounting keeps your books, invoices and payments in order, People & Payroll helps you pay your team correctly, and Business Intelligence & Analytics shows how your business is doing in one place.",
    icon: FileText,
    points: [
      "Customer invoices and job-work vendor bills",
      "Employee attendance, leave and payroll",
      "Profit & Loss, Balance Sheet, Cash Flow and Trial Balance",
      "Dashboards, reports and trends",
    ],
    moduleSlugs: ["finance-accounting", "people-payroll", "business-intelligence-analytics"],
  },
];

export const modulesContent = {
  heading: "Explore the BoSS Capabilities Relevant to Your Business",
  /** The modules that match the workflow above, by slug. */
  slugs: [
    "work-management",
    "procurement",
    "manufacturing",
    "inventory",
    "warehouse-management",
    "sales-crm",
    "pos-retail-billing",
    "marketing-commerce",
    "people-payroll",
    "finance-accounting",
    "business-intelligence-analytics",
  ],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "style-colour-size",
      question: "Can BoSS track stock by style, colour and size?",
      answer:
        "BoSS Inventory keeps item records and tracks stock levels and movement. How you would set up styles, colours and sizes as items or variants should be confirmed against your own product list in a demo.",
    },
    {
      id: "job-work",
      question: "Can BoSS track material sent to outside job-work units?",
      answer:
        "BoSS Manufacturing is for planning and tracking what you make, and Work Management helps keep tasks moving. Whether your specific job-work process, such as material sent out and finished goods received back, is covered should be confirmed in a demo.",
    },
    {
      id: "multi-channel",
      question: "Can BoSS handle wholesale, retail and online sales together?",
      answer:
        "Yes. BoSS Sales & CRM manages customers, enquiries and orders, POS & Retail Billing covers billing at the counter, and Marketing & Commerce is for reaching customers and selling online. You can start with the channels you need and add more later.",
    },
    {
      id: "returns",
      question: "Does BoSS handle returns and exchanges?",
      answer:
        "We have not confirmed a dedicated returns or exchange workflow as a BoSS feature, so we do not claim it here. If returns are a significant part of your business, tell us when you book a demo and we will confirm what is available.",
    },
    {
      id: "payroll",
      question: "Can BoSS pay job-work vendors and piece-rate workers?",
      answer:
        "BoSS Finance & Accounting handles supplier and vendor bills, and People & Payroll helps you pay your team. Whether piece-rate or job-work-specific pay structures are supported should be confirmed in a demo.",
    },
    {
      id: "modules",
      question: "Which BoSS modules are relevant to a garments business?",
      answer:
        "The modules that relate to the workflow on this page are Work Management, Procurement, Manufacturing, Inventory, Warehouse Management, Sales & CRM, POS & Retail Billing, Marketing & Commerce, People & Payroll, Finance & Accounting, and Business Intelligence & Analytics. They are listed above.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "See How BoSS Fits Your Garments & Fashion Business",
  text: "Explore how the relevant BoSS capabilities can support your production, stock and sales processes. Book a demo to confirm the details for your business.",
} as const;
