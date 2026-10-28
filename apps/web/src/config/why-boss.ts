import {
  BarChart3,
  Check,
  ClipboardCheck,
  Factory,
  FolderOpen,
  GitBranch,
  Headset,
  IndianRupee,
  Landmark,
  ListChecks,
  Megaphone,
  Minus,
  Package,
  Plane,
  Receipt,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Wallet,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { type StaticImageData } from "next/image";

import busy from "@/assets/integrations/busy.webp";
import microsoft from "@/assets/integrations/microsoft.webp";
import tally from "@/assets/integrations/tally.webp";

/** "no" means the vendor's own pages do not list the capability, not that it can never be added. */
export type Support = "yes" | "partly" | "no";

export const supportIcons = { yes: Check, partly: Minus, no: X } as const satisfies Record<
  Support,
  LucideIcon
>;

export const featureGroups = [
  {
    id: "accounts",
    name: "Accounts and tax",
    icon: Wallet,
    features: [
      {
        id: "accounting",
        name: "Accounting",
        icon: Wallet,
        boss: "Finance & Accounting",
      },
      {
        id: "gst-invoicing",
        name: "GST invoices and e-way bills",
        icon: Receipt,
        boss: "Compliance & Legal",
      },
      {
        id: "gst-returns",
        name: "GST returns",
        icon: IndianRupee,
        boss: "Compliance & Legal",
      },
      { id: "expenses", name: "Employee expenses", icon: Plane, boss: "Travel & Expense" },
      { id: "assets", name: "Company assets", icon: Landmark, boss: "Asset Management" },
    ],
  },
  {
    id: "customers",
    name: "Sales and customers",
    icon: TrendingUp,
    features: [
      {
        id: "sales-crm",
        name: "Sales and customer follow-ups",
        icon: TrendingUp,
        boss: "Sales & CRM",
      },
      { id: "pos", name: "Billing at the counter", icon: Store, boss: "POS & Retail Billing" },
      { id: "support", name: "Customer support", icon: Headset, boss: "Customer Service" },
      {
        id: "marketing",
        name: "Marketing and online selling",
        icon: Megaphone,
        boss: "Marketing & Commerce",
      },
    ],
  },
  {
    id: "supply",
    name: "Stock and supply",
    icon: Package,
    features: [
      {
        id: "inventory",
        name: "Stock tracking",
        icon: Package,
        boss: "Inventory",
      },
      {
        id: "purchase",
        name: "Buying from suppliers",
        icon: ShoppingCart,
        boss: "Procurement",
      },
      {
        id: "warehouse",
        name: "Warehouse management",
        icon: Warehouse,
        boss: "Warehouse Management",
      },
      {
        id: "manufacturing",
        name: "Making products",
        icon: Factory,
        boss: "Manufacturing",
      },
      {
        id: "logistics",
        name: "Delivery and shipping",
        icon: Truck,
        boss: "Supply Chain & Logistics",
      },
    ],
  },
  {
    id: "people",
    name: "People and work",
    icon: Users,
    features: [
      { id: "payroll", name: "Salary and attendance", icon: Users, boss: "People & Payroll" },
      {
        id: "self-service",
        name: "Staff self-service",
        icon: UserRound,
        boss: "Self-Service Portal",
      },
      {
        id: "projects",
        name: "Tasks and projects",
        icon: ListChecks,
        boss: "Work Management",
      },
    ],
  },
  {
    id: "control",
    name: "Reports and control",
    icon: BarChart3,
    features: [
      {
        id: "documents",
        name: "Document storage",
        icon: FolderOpen,
        boss: "Document Management",
      },
      { id: "approvals", name: "Approvals", icon: ClipboardCheck },
      {
        id: "analytics",
        name: "Reports and dashboards",
        icon: BarChart3,
        boss: "Business Intelligence & Analytics",
      },
      { id: "mobile", name: "Mobile app", icon: Smartphone },
      { id: "branches", name: "Multiple branches", icon: GitBranch },
    ],
  },
] as const satisfies readonly {
  id: string;
  name: string;
  icon: LucideIcon;
  features: readonly { id: string; name: string; icon: LucideIcon; boss?: string }[];
}[];

export type FeatureGroup = (typeof featureGroups)[number];
export type FeatureId = FeatureGroup["features"][number]["id"];

export type Answer = { support: Support; note?: string };

const answer =
  (support: Support) =>
  (note?: string): Answer =>
    note === undefined ? { support } : { support, note };

const yes = answer("yes");
const partly = answer("partly");
const no = answer("no");

export type CompareLogo =
  | { kind: "image"; image: StaticImageData; isMonochrome: boolean }
  | { kind: "glyph"; path: string; viewBox: string; color: string }
  | { kind: "sap" };

/** Single-colour brand glyph (simple-icons, CC0). Marks stay with their owners. */
const odooPath =
  "M21.1002 15.7957c-1.6015 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2979 2.8998-2.8998 2.8998zm0-1.2c.9388.0006 1.7003-.7601 1.7008-1.6989.0004-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zm-6.0655 1.2c-1.6014 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2999 2.8998-2.8998 2.8998zm0-1.2c.9389.0006 1.7003-.7601 1.7008-1.6989.0005-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zM11.865 12.858c0 1.6199-1.2979 2.9378-2.8977 2.9378s-2.8998-1.314-2.8998-2.9358 1.1799-2.8597 2.8998-2.8597c.6359 0 1.2239.134 1.6998.484v-1.68a.6.6 0 0 1 1.2 0v4.0537h-.002zm-2.8977 1.7399c.9388.0005 1.7002-.7602 1.7007-1.699.0005-.9388-.7602-1.7003-1.699-1.7007h-.0017c-.9389.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699zm-6.0675 1.1979C1.2983 15.7957 0 14.4974 0 12.8959s1.2983-2.8997 2.8998-2.8997 2.8997 1.2982 2.8997 2.8997c0 1.5999-1.2999 2.8998-2.8997 2.8998zm0-1.2c.9388.0006 1.7002-.7601 1.7007-1.699.0005-.9387-.7602-1.7002-1.699-1.7006h-.0017c-.9388.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699z";

export type Competitor = {
  id: string;
  name: string;
  tagline: string;
  logo: CompareLogo;
  coverage: Record<FeatureId, Answer>;
};

/**
 * Researched from each vendor's own pages where they could be read (TallyPrime, BUSY, Odoo and
 * Business Central), and from SAP help pages and partner listings for SAP Business One. "No"
 * means the capability is not listed, "partly" means it is limited, needs an add-on, or is only
 * partly described. Fixed assets for Business Central and SAP Business One come from general
 * product knowledge. Re-check every mark with the vendor before launch.
 */
export const competitors: readonly Competitor[] = [
  {
    id: "tally",
    name: "TallyPrime",
    tagline: "Accounting software",
    logo: { kind: "image", image: tally, isMonochrome: true },
    coverage: {
      accounting: yes("Vouchers, bank statement import, multi-currency"),
      "gst-invoicing": yes("GST invoices, e-invoice and e-way bill"),
      "gst-returns": yes("GSTR-1 and 3B, location-wise"),
      expenses: no(),
      assets: no(),
      "sales-crm": partly("Sales orders and invoices, no CRM listed"),
      pos: no(),
      support: no(),
      marketing: no(),
      inventory: yes("Godowns, batches and expiry dates"),
      purchase: yes("Order-based purchase cycle"),
      warehouse: partly("Godowns with racks and bins"),
      manufacturing: yes("Bill of materials and job work"),
      logistics: no(),
      payroll: yes("Pay slips, attendance, PF and ESI reports"),
      "self-service": no(),
      projects: no(),
      documents: no(),
      approvals: partly("User roles and security levels"),
      analytics: partly("Standard reports"),
      mobile: no("Shares invoices on WhatsApp, no app listed"),
      branches: yes("Multiple GSTINs, branch-wise reports"),
    },
  },
  {
    id: "busy",
    name: "BUSY",
    tagline: "Accounting software for small businesses",
    logo: { kind: "image", image: busy, isMonochrome: true },
    coverage: {
      accounting: yes("Multi-currency, sub-ledgers, budgets"),
      "gst-invoicing": partly("E-way bill reports, e-invoicing not described"),
      "gst-returns": yes("GSTR-1, 3B, 2A/2B reconciliation"),
      expenses: no(),
      assets: no(),
      "sales-crm": partly("Call management, no CRM listed"),
      pos: partly("Barcode billing, no POS listed"),
      support: no(),
      marketing: no(),
      inventory: yes("Batch expiry, serial numbers, variants"),
      purchase: yes("Orders and indent management"),
      warehouse: no(),
      manufacturing: yes("Multi-level BOM, production planning, job work"),
      logistics: no(),
      payroll: partly("Listed, with no detail"),
      "self-service": no(),
      projects: no(),
      documents: partly("Uploads to Google Drive"),
      approvals: yes("Voucher and master approval"),
      analytics: yes("GST dashboards, 100+ reports"),
      mobile: yes("BUSY Mobile for reports and approvals"),
      branches: yes("Head and branch offices with data merging"),
    },
  },
  {
    id: "odoo",
    name: "Odoo",
    tagline: "Business apps you add one by one",
    logo: { kind: "glyph", path: odooPath, viewBox: "0 8.5 24 8.5", color: "#9A6A8C" },
    coverage: {
      accounting: yes("Accounting and invoicing apps"),
      "gst-invoicing": yes("E-invoice and e-way bill through a GST partner"),
      "gst-returns": yes("GSTR-1, GSTR-2B and GSTR-3"),
      expenses: yes("Expenses app"),
      assets: partly("Equipment tracking in Maintenance"),
      "sales-crm": yes("CRM and Sales apps"),
      pos: yes("POS Shop and POS Restaurant"),
      support: yes("Helpdesk and Live Chat"),
      marketing: yes("Email, SMS and WhatsApp marketing, eCommerce"),
      inventory: yes("Inventory app"),
      purchase: yes("Purchase app"),
      warehouse: yes("Inventory app"),
      manufacturing: yes("Manufacturing, PLM and Quality"),
      logistics: partly(),
      payroll: partly("Payroll app, India not in its localization list"),
      "self-service": partly("Employees and Time Off apps"),
      projects: yes("Project and Timesheets"),
      documents: yes("Documents and Knowledge"),
      approvals: partly("Not listed on its app page"),
      analytics: yes("Spreadsheet and reporting"),
      mobile: partly("Mobile experience, no dedicated app listed"),
      branches: partly("Multi-company not described"),
    },
  },
  {
    id: "dynamics",
    name: "Dynamics 365",
    tagline: "Business software from Microsoft",
    logo: { kind: "image", image: microsoft, isMonochrome: false },
    coverage: {
      accounting: yes("Financials, multi-currency, consolidation"),
      "gst-invoicing": partly("Exports e-invoice file, records e-way bill number"),
      "gst-returns": partly("TDS and e-TDS reports, GST returns not listed"),
      expenses: no(),
      assets: yes(),
      "sales-crm": partly("Quotes and orders, CRM through Dynamics 365 Sales"),
      pos: partly("Retail through connected apps"),
      support: partly("Through Dynamics 365 Customer Service"),
      marketing: partly("E-commerce connector"),
      inventory: yes("Forecasting and replenishment"),
      purchase: yes("Vendor management and purchasing"),
      warehouse: yes("Barcode pick and put-away"),
      manufacturing: yes("Bills of materials and production orders"),
      logistics: no(),
      payroll: no("Connects to payroll systems"),
      "self-service": no(),
      projects: yes("Timesheets and job costing"),
      documents: no(),
      approvals: yes("Workflow templates through Power Automate"),
      analytics: yes("Power BI dashboards"),
      mobile: yes("Tablet and mobile apps"),
      branches: partly("Consolidation and intercompany"),
    },
  },
  {
    id: "sap",
    name: "SAP Business One",
    tagline: "Business software from SAP",
    logo: { kind: "sap" },
    coverage: {
      accounting: yes("Real-time general ledger"),
      "gst-invoicing": partly("E-invoice file import, IRN often through add-ons"),
      "gst-returns": partly("Often through partner add-ons"),
      expenses: no(),
      assets: yes(),
      "sales-crm": yes("Opportunities, quotations and orders"),
      pos: no(),
      support: no(),
      marketing: no(),
      inventory: yes("Stock by warehouse"),
      purchase: yes("Order-to-pay cycle"),
      warehouse: partly("Stock tracked by warehouse"),
      manufacturing: yes("Production and MRP"),
      logistics: no(),
      payroll: partly("Through a payroll add-on"),
      "self-service": no(),
      projects: no(),
      documents: no(),
      approvals: yes("Approval procedures for discounts and credit limits"),
      analytics: yes("Built-in reporting"),
      mobile: yes("iOS and Android apps"),
      branches: partly("Branch filtering, partner-described"),
    },
  },
];

export type FeatureRow = {
  id: FeatureId;
  name: string;
  icon: LucideIcon;
  boss?: string;
};

export const allFeatures: readonly FeatureRow[] = featureGroups.flatMap(
  (group): readonly FeatureRow[] => group.features,
);

export const getCompetitor = (id: string): Competitor | undefined =>
  competitors.find((competitor) => competitor.id === id);

/**
 * How the other tools do as a group on one feature: "yes" only when every tool compared offers it
 * fully, "no" when none lists it, "partly" otherwise.
 */
export const othersSupport = (featureId: FeatureId): Support => {
  const supports = competitors.map((competitor) => competitor.coverage[featureId].support);
  if (supports.every((support) => support === "yes")) return "yes";
  if (supports.every((support) => support === "no")) return "no";
  return "partly";
};
