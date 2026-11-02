import {
  BarChart3,
  Box,
  Boxes,
  ChartArea,
  ChartColumn,
  ChartNoAxesCombined,
  ClipboardList,
  Settings,
  ShoppingCart,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/navigation";

/**
 * Everything the Manufacturing page says. Statements about BoSS come only from what the module
 * list, the capabilities list and the Finance module page already state. Anything else a
 * manufacturer may need is worded as something to confirm in a demo, never as a BoSS feature.
 */

export const exploreBossModulesAction = {
  label: "Explore BoSS Modules",
  href: "/modules",
} as const satisfies NavItem;

export const heroContent = {
  eyebrow: "Solutions for Manufacturing",
  heading: "Run Your Manufacturing Business with Better Control",
  text: "Bring greater clarity to the everyday operations behind your manufacturing business, from purchasing and inventory to production records, sales, billing, and financial visibility.",
  photoAlt: "Two workers moving a metal part with a chain hoist on a factory floor",
} as const;

export type Challenge = { title: string; text: string; icon: LucideIcon };

export const challengesContent = {
  heading: "Manufacturing Takes More Than Production",
  text: "Manufacturing businesses coordinate suppliers, materials, inventory, customer orders, dispatch, and finances. When information is scattered across disconnected tools or manual records, it becomes harder to see what is available, what needs attention, and how the business is performing.",
  note: "These are general manufacturing challenges. Not every manufacturer experiences all of them.",
  items: [
    {
      title: "Inventory Visibility",
      text: "Understanding which materials and finished products are available can be difficult when stock information is scattered.",
      icon: Boxes,
    },
    {
      title: "Purchasing Coordination",
      text: "Purchasing decisions become harder when supplier information and stock availability are difficult to review together.",
      icon: ClipboardList,
    },
    {
      title: "Order and Dispatch Coordination",
      text: "Keeping customer orders, available stock, invoicing, and dispatch aligned can involve repeated work.",
      icon: Truck,
    },
    {
      title: "Financial Visibility",
      text: "Business owners need a clearer view of sales, expenses, receivables, payables, and overall performance.",
      icon: ChartColumn,
    },
  ] satisfies readonly Challenge[],
} as const;

export type WorkflowStage = {
  stage: string;
  title: string;
  text: string;
  icon: LucideIcon;
  module: string;
  moduleIcon: LucideIcon;
};

export const workflowContent = {
  eyebrow: "Manufacturing Process Flow",
  heading: "Understand the Flow Behind Your Manufacturing Business",
  subtitle:
    "From buying raw materials to tracking performance, see how your manufacturing operations work together in BoSS.",
  note: "This is a general manufacturing workflow showing how different stages of production and business operations connect in BoSS.",
  stages: [
    {
      stage: "STAGE 01",
      title: "Purchase Materials",
      text: "Order raw materials and components from suppliers.",
      icon: ShoppingCart,
      module: "BoSS Procurement",
      moduleIcon: ShoppingCart,
    },
    {
      stage: "STAGE 02",
      title: "Manage Inventory",
      text: "Receive materials and track available stock.",
      icon: Box,
      module: "BoSS Inventory & Warehouse",
      moduleIcon: Box,
    },
    {
      stage: "STAGE 03",
      title: "Manufacture Products",
      text: "Turn raw materials into finished products.",
      icon: ChartArea,
      module: "BoSS Manufacturing",
      moduleIcon: Settings,
    },
    {
      stage: "STAGE 04",
      title: "Store Finished Goods",
      text: "Keep finished products organized and ready.",
      icon: Warehouse,
      module: "BoSS Inventory & Warehouse",
      moduleIcon: Box,
    },
    {
      stage: "STAGE 05",
      title: "Manage Sales & Dispatch",
      text: "Process customer orders and deliver products.",
      icon: Truck,
      module: "BoSS Sales & Supply Chain",
      moduleIcon: Truck,
    },
    {
      stage: "STAGE 06",
      title: "Track Business Performance",
      text: "Review sales, stock and financial performance.",
      icon: ChartNoAxesCombined,
      module: "BoSS Finance & Analytics",
      moduleIcon: BarChart3,
    },
  ] satisfies readonly WorkflowStage[],
} as const;

export const workflowJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: workflowContent.heading,
  description: workflowContent.subtitle,
  step: workflowContent.stages.map((stage, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: `${stage.stage}: ${stage.title}`,
    text: stage.text,
    itemListElement: {
      "@type": "HowToDirection",
      text: `${stage.text} Powered by ${stage.module}.`,
    },
  })),
};

export type BenefitItem = {
  title: string;
  text: string;
  points: readonly string[];
};

export const benefitsContent = {
  heading: "Run Your Manufacturing Operations with Better Control",
  text: "Connecting inventory, purchasing, shop-floor production, and customer orders gives your team the real-time clarity needed to reduce downtime, cut waste, and fulfill orders predictably.",
  photoAlt:
    "A factory engineer reviewing production and stock records on a digital tablet in an industrial facility",
  items: [
    {
      title: "Know What You Have",
      text: "Maintain complete, real-time visibility over raw materials, components, and finished goods across all warehouses and shop-floor stores.",
      points: [
        "Prevent production halts caused by unexpected material shortages",
        "Track item movements accurately from gate receipt through production to dispatch",
        "Avoid over-purchasing and free up critical working capital",
      ],
    },
    {
      title: "Coordinate Purchasing and Production",
      text: "Align supplier purchase orders and delivery timelines directly with your shop-floor production schedules and customer deadlines.",
      points: [
        "Standardize purchase requests and manager approvals with full vendor history",
        "Verify incoming shipments against purchase orders to avoid billing discrepancies",
        "Eliminate repeated data entry between purchasing, stock, and production",
      ],
    },
    {
      title: "Manage Orders More Smoothly",
      text: "Connect customer sales orders with live inventory and dispatch schedules for dependable, on-time fulfillment without miscommunication.",
      points: [
        "Track customer orders end-to-end from confirmation to delivery",
        "Generate accurate shipping notes, gate passes, and customer invoices promptly",
        "Deliver reliably on customer commitments to protect and grow client relationships",
      ],
    },
    {
      title: "Review Business Performance",
      text: "Access clear, unified operational and financial figures to make confident business decisions without chasing disconnected spreadsheets.",
      points: [
        "Monitor production costs, material consumption, and scrap trends accurately",
        "Track sales margins, supplier payables, and customer receivables in one place",
        "Gain instant operational clarity through centralized reports and dashboards",
      ],
    },
  ] satisfies readonly BenefitItem[],
} as const;

export const modulesContent = {
  heading: "Explore the BoSS Modules Relevant to Manufacturing",
  text: "These are the existing BoSS modules that relate to the workflow above.",
  /** By slug, in workflow order. */
  slugs: [
    "procurement",
    "inventory",
    "manufacturing",
    "warehouse-management",
    "supply-chain-logistics",
    "sales-crm",
    "finance-accounting",
    "business-intelligence-analytics",
  ],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "suitable",
      question: "Is BoSS suitable for small and medium-sized manufacturing businesses?",
      answer:
        "BoSS lets a business start with the modules it needs and add more later. Whether it suits your size and way of working depends on your requirements, so the best way to check is a demo using your own processes.",
    },
    {
      id: "operations",
      question: "How can BoSS help manufacturers manage their day-to-day operations?",
      answer:
        "BoSS has modules for purchasing, inventory, warehouse work, sales, dispatch, accounts and reports, and a Manufacturing module for production records. They can be used together so that stock, orders and financial information can be reviewed in one system.",
    },
    {
      id: "inventory-purchasing",
      question: "Can BoSS help with inventory and purchasing?",
      answer:
        "Yes. Inventory covers items, stock levels, stock movement, stock transfers and low-stock alerts. Procurement covers suppliers, purchase orders, approvals and goods receipts.",
    },
    {
      id: "modules",
      question: "Which BoSS modules are relevant to manufacturing?",
      answer:
        "The modules that relate to the workflow on this page are Procurement, Inventory, Manufacturing, Warehouse Management, Supply Chain & Logistics, Sales & CRM, Finance & Accounting, and Business Intelligence & Analytics. They are listed above.",
    },
    {
      id: "production-bom",
      question: "Does BoSS support production planning and bills of materials?",
      answer:
        "BoSS has a Manufacturing module, and production plans, materials, output, bill of materials and work orders are named among its capabilities. We have not confirmed work-in-progress tracking, scrap tracking, job work, quality control or production costing as BoSS features, so we do not claim them. If you need them, ask in a demo and we will confirm what is available.",
    },
    {
      id: "fit",
      question: "How can I see whether BoSS fits my business?",
      answer:
        "Book a demo and bring a short list of how your business works today: how you buy, store, make, sell and bill. We can then walk through the modules that relate to those steps and confirm what each one covers.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "Find the Right Fit for Your Manufacturing Business",
  text: "See how BoSS fits your business operations and explore the modules that are relevant to your team.",
} as const;
