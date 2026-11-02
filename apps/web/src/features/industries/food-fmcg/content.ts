import {
  Box,
  Boxes,
  CalendarClock,
  Factory,
  FileText,
  Percent,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/navigation";

export const exploreModulesAction = {
  label: "Explore Modules",
  href: "/modules",
} as const satisfies NavItem;

export const heroContent = {
  eyebrow: "FMCG Industry",
  heading: "Manage Your FMCG Distribution, Inventory, and Sales with Complete Control",
  text: "From high-velocity SKU tracking and batch expiry management to distributor order fulfillment and trade schemes, BoSS brings real-time clarity across your entire consumer goods supply chain.",
  photoAlt: "Supermarket retail aisle stocked with packaged food and consumer goods on display",
} as const;

export type Challenge = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const challengesContent = {
  heading: "Everyday Challenges in Running an FMCG Business",
  text: "FMCG companies operate under high transaction volumes, narrow margins, and short turnaround times. Managing operations across fragmented tools or manual records creates costly friction.",
  note: "These are common FMCG challenges across packaged foods, beverages, and personal care distribution networks.",
  items: [
    {
      title: "High SKU & Packaging Complexity",
      text: "Handling hundreds of product variants, packaging hierarchies (units, inner packs, master cartons), and barcode standards across multiple brands and pack sizes.",
      icon: Boxes,
    },
    {
      title: "Expiry Dates & Batch Spoilage",
      text: "Risk of stock spoilage, near-expiry discounts, and unsellable goods when batches and lots are not managed with strict First-Expiry-First-Out (FEFO) rules.",
      icon: CalendarClock,
    },
    {
      title: "Multi-Warehouse Stock Blind Spots",
      text: "Lacking real-time visibility into inventory across central warehouses, regional carrying & forwarding (CFA) depots, and distributor points.",
      icon: Warehouse,
    },
    {
      title: "Distributor Order & Scheme Bottlenecks",
      text: "Manual friction during daily order intake, complex trade promotion calculations, volume discounts, and distributor margin reconciliations.",
      icon: Percent,
    },
    {
      title: "Dispatch Delays & Vehicle Coordination",
      text: "Struggling to assemble pick lists, vehicle loading sheets, route delivery notes, and e-way bills quickly enough to meet distributor delivery windows.",
      icon: Truck,
    },
    {
      title: "Credit Control & Payment Disputes",
      text: "Tracking distributor credit days, outstanding dues, damage write-offs, and return claims without unified financial ledgers.",
      icon: RefreshCw,
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
  isOptional?: boolean;
};

export const workflowContent = {
  eyebrow: "FMCG Operating Flow",
  heading: "Understand the Flow Behind Your FMCG Business",
  subtitle:
    "From supplier procurement to distributor delivery, see how high-velocity consumer goods operations connect in BoSS.",
  note: "This is an end-to-end FMCG workflow. Pure distribution and wholesale businesses skip production and start directly from procurement and stock allocation.",
  stages: [
    {
      stage: "STAGE 01",
      title: "Setup Products & SKUs",
      text: "Define master catalog items, packaging tiers (piece, box, carton), barcodes, and brand variants.",
      icon: Box,
      module: "BoSS Inventory & Catalog",
      moduleIcon: Box,
    },
    {
      stage: "STAGE 02",
      title: "Demand & Stock Planning",
      text: "Forecast regional replenishment needs using historical sales velocity and minimum buffer levels.",
      icon: TrendingUp,
      module: "BoSS Supply Chain & Analytics",
      moduleIcon: TrendingUp,
    },
    {
      stage: "STAGE 03",
      title: "Procure Raw Stock / Goods",
      text: "Issue purchase orders for ingredients, packaging materials, or finished trading stock to vendors.",
      icon: ShoppingCart,
      module: "BoSS Procurement",
      moduleIcon: ShoppingCart,
    },
    {
      stage: "STAGE 04",
      title: "Produce & Package (Optional)",
      text: "Execute shop-floor batch runs, formulation recipes, and packaging line work for manufactured goods.",
      icon: Factory,
      module: "BoSS Manufacturing",
      moduleIcon: Factory,
      isOptional: true,
    },
    {
      stage: "STAGE 05",
      title: "Store with Batch & FEFO",
      text: "Organize inventory across warehouse bins with automated First-Expiry-First-Out rotation.",
      icon: Warehouse,
      module: "BoSS Warehouse Management",
      moduleIcon: Warehouse,
    },
    {
      stage: "STAGE 06",
      title: "Distributor Order Booking",
      text: "Capture distributor orders with automatic validation of credit limits, trade schemes, and discounts.",
      icon: ShoppingBag,
      module: "BoSS Sales & CRM",
      moduleIcon: ShoppingBag,
    },
    {
      stage: "STAGE 07",
      title: "Pick, Dispatch & Logistics",
      text: "Generate warehouse pick lists, consolidated vehicle loading sheets, and route delivery challans.",
      icon: Truck,
      module: "BoSS Supply Chain & Logistics",
      moduleIcon: Truck,
    },
    {
      stage: "STAGE 08",
      title: "Invoicing & Collections",
      text: "Generate GST invoices, track distributor payment cycles, reconcile schemes, and record returns.",
      icon: FileText,
      module: "BoSS Finance & Accounting",
      moduleIcon: FileText,
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
      text: `${stage.text} Managed through ${stage.module}.`,
    },
  })),
};

export type HelpItem = {
  title: string;
  text: string;
  points: readonly string[];
};

export const helpsContent = {
  heading: "How BoSS Supports Your FMCG Operations",
  text: "Connecting inventory, distribution channels, sales, and accounts gives your business the speed and precision required to fulfill high-velocity consumer demand.",
  photoAlt: "Warehouse team scanning packaged cartons and verifying dispatch sheets",
  items: [
    {
      title: "High-Velocity Inventory & Batch Control",
      text: "Maintain complete, live visibility over every SKU, batch code, and expiration date across all company depots, CFAs, and distributor stores.",
      points: [
        "Multi-level packaging units (Pieces, Inners, Master Cartons) with barcode support",
        "Automated FEFO (First-Expiry-First-Out) picking rules to eliminate unsellable expired goods",
        "Multi-warehouse stock visibility with automated low-stock and reorder triggers",
      ],
    },
    {
      title: "Streamlined Distributor & Retailer Sales",
      text: "Accelerate order intake while ensuring trade schemes, promotional pricing, and distributor credit limits are enforced automatically.",
      points: [
        "Rapid distributor order booking with real-time stock allocation",
        "Automated trade schemes: quantity discounts, volume slabs, and promotional margins",
        "Enforced distributor credit terms and outstanding balance checks before dispatch",
      ],
    },
    {
      title: "Smooth Warehouse Dispatch & Logistics",
      text: "Coordinate dispatches from central mother hubs to regional distributors with organized warehouse workflows and delivery notes.",
      points: [
        "Consolidated warehouse picking lists and vehicle load management",
        "Delivery challans, gate passes, and trip sheets for transport coordination",
        "Structured handling of sales returns, transit breakage, and seasonal replacements",
      ],
    },
    {
      title: "Financial Control, Ledgers & Insights",
      text: "Eliminate reconciliation delays between sales and accounts with unified invoicing, distributor ledgers, and live performance metrics.",
      points: [
        "Instant GST-compliant invoicing with automated ledger postings",
        "Clear tracking of distributor aging, payment receipts, and scheme credit notes",
        "Real-time dashboards for brand-wise sales, fill rates, and inventory turn velocity",
      ],
    },
  ] satisfies readonly HelpItem[],
} as const;

export type ModuleCard = {
  slug: string;
  name: string;
  description: string;
};

export const modulesContent = {
  heading: "Explore BoSS Modules Relevant to FMCG",
  text: "These core BoSS modules work together as a single unified system to power your consumer goods operations.",
  slugs: [
    "inventory",
    "procurement",
    "warehouse-management",
    "manufacturing",
    "sales-crm",
    "supply-chain-logistics",
    "finance-accounting",
    "business-intelligence-analytics",
  ],
  customDescriptions: {
    inventory:
      "Track fast-moving SKUs, multi-tier packaging, batch codes, and expiry dates across central and regional hubs with automated reorder triggers.",
    procurement:
      "Streamline purchase orders for raw ingredients, packaging materials, or finished trading items with vendor delivery tracking.",
    "warehouse-management":
      "Organize multi-depot stock with bin locations, automated FEFO pick lists, vehicle load planning, and fast dispatch gates.",
    manufacturing:
      "Manage recipe formulations, batch processing, work orders, and packaging line output for food, beverage, and personal care products.",
    "sales-crm":
      "Capture primary distributor orders, manage retailer accounts, enforce credit limits, and automate complex trade discount schemes.",
    "supply-chain-logistics":
      "Coordinate stock transfers between mother plants, carrying & forwarding (CFA) depots, and city distributors with transit tracking.",
    "finance-accounting":
      "Generate GST e-invoices, manage distributor ledgers, settle scheme credit notes, and maintain real-time cash flow visibility.",
    "business-intelligence-analytics":
      "Monitor brand-wise sales velocity, distributor fill rates, stock turnover ratios, and channel profitability from unified dashboards.",
  } as Record<string, string>,
} as const;

export const benefitsContent = {
  heading: "Transform Your FMCG Supply Chain with Measurable Clarity",
  text: "Eliminate operational blind spots and build a resilient, responsive distribution network that keeps retail shelves continuously stocked.",
  items: [
    {
      title: "Zero Guesswork on Stock & Expiry",
      text: "Eliminate dead stock, expired product write-offs, and sudden stockouts with automated batch tracking and strict FEFO dispatch across all locations.",
      points: [
        "Significantly reduce inventory holding costs and expired product write-offs",
        "Prevent lost sales from stockouts during festive surges and seasonal demand peaks",
        "Ensure distributor networks and retail shelves consistently receive fresh stock",
      ],
    },
    {
      title: "Faster Order-to-Dispatch Turnaround",
      text: "Shorten the cycle from distributor order placement to warehouse gate dispatch with instant credit verification and automated stock allocation.",
      points: [
        "Achieve same-day order processing with live inventory checks",
        "Eliminate order booking errors, missing items, and invoice dispute delays",
        "Provide distributor partners with dependable, transparent delivery commitments",
      ],
    },
    {
      title: "Frictionless Trade Scheme Execution",
      text: "Apply promotional pricing, buy-X-get-Y schemes, and distributor margins automatically without manual calculations or billing errors.",
      points: [
        "Transparent discount calculations that prevent disputed invoices and deduction delays",
        "Accurate visibility into promotional scheme ROI and distributor claims",
        "Prompt credit note settlements for returns and approved marketing claims",
      ],
    },
    {
      title: "Real-Time Financial & Sales Control",
      text: "Make proactive growth and procurement decisions backed by live figures on distributor dues, sales velocity, and product margins.",
      points: [
        "Full visibility into distributor payment aging and collection timelines",
        "Real-time gross margin insights across brands, pack variants, and sales zones",
        "One-click access to consolidated P&L, balance sheet, and working capital reports",
      ],
    },
  ] satisfies readonly HelpItem[],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "what-is-fmcg-erp",
      question: "What is ERP software for FMCG businesses?",
      answer:
        "An FMCG ERP is a centralized business management platform designed for the fast-paced nature of consumer goods. It connects product cataloging, multi-warehouse inventory, procurement, production (if manufactured in-house), distributor sales orders, trade schemes, logistics dispatch, and financial accounting into one unified system.",
    },
    {
      id: "batch-expiry-tracking",
      question: "How does BoSS help manage batch numbers and product expiry?",
      answer:
        "BoSS tracks inventory with unique batch and lot codes alongside manufacturing and expiration dates. During sales order fulfillment, the system supports First-Expiry-First-Out (FEFO) picking, ensuring that older batches are dispatched first. Automated alerts notify your team well before items approach their expiration threshold.",
    },
    {
      id: "manufacturers-vs-distributors",
      question: "Can both FMCG manufacturers and FMCG distributors use BoSS?",
      answer:
        "Yes. BoSS is modular. FMCG manufacturers use production, bill of materials (BOM), raw material procurement, and packaging line modules alongside distribution. Pure distributors, super stockists, and trading companies use inventory, sales order processing, pricing schemes, warehouse dispatch, and accounts without needing manufacturing modules.",
    },
    {
      id: "trade-schemes-pricing",
      question: "Can BoSS handle complex FMCG trade schemes and distributor discounts?",
      answer:
        "BoSS allows businesses to configure pricing rules, volume discounts, promotional schemes, and distributor margins. When sales orders are placed, the system automatically applies the appropriate discount or free-good rule and reflects it accurately on the invoice, eliminating billing disputes.",
    },
    {
      id: "credit-limits-collections",
      question: "How does BoSS track distributor credit limits and outstanding payments?",
      answer:
        "BoSS maintains complete distributor ledgers with customizable credit limits and credit day periods. When an order exceeds a distributor's authorized credit balance or has overdue invoices, the system can flag the order for management approval before dispatch, keeping working capital protected.",
    },
    {
      id: "fmcg-modules",
      question: "Which BoSS modules are most relevant to an FMCG business?",
      answer:
        "The primary modules for FMCG businesses are Inventory Management, Warehouse Management, Sales & CRM, Procurement, Supply Chain & Logistics, and Finance & Accounting. Businesses that manufacture their own food or personal care goods also utilize the Manufacturing module.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "Power Your FMCG Business with BoSS",
  text: "See how BoSS connects your inventory, distributor orders, logistics, and accounts in one unified system. Book a personalized demo tailored to your products and distribution workflow.",
} as const;
