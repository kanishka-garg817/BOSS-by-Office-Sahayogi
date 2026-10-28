import {
  Box,
  Building2,
  ChartColumn,
  CircleUser,
  ClipboardList,
  Factory,
  FileText,
  Headset,
  IndianRupee,
  Megaphone,
  Package,
  Plane,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Store,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type ModuleTone =
  "green" | "blue" | "pink" | "orange" | "purple" | "teal" | "red" | "indigo" | "amber" | "sky";

export type ModuleGroupId = "business-finance" | "operations" | "people" | "control";

export type ModuleGroup = {
  id: ModuleGroupId;
  name: string;
  icon: LucideIcon;
};

/** The four families the modules are organised in. */
export const moduleGroups: readonly ModuleGroup[] = [
  { id: "business-finance", name: "Business & Finance", icon: Wallet },
  { id: "operations", name: "Operations & Supply Chain", icon: Box },
  { id: "people", name: "People & Workplace", icon: Users },
  { id: "control", name: "Control & Intelligence", icon: ShieldCheck },
];

export type BossModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: ModuleTone;
  group: ModuleGroupId;
};

/** Every BOSS module, in display order: grouped by family. */
export const modules: readonly BossModule[] = [
  {
    slug: "finance-accounting",
    name: "Finance & Accounting",
    icon: IndianRupee,
    tone: "green",
    group: "business-finance",
  },
  {
    slug: "sales-crm",
    name: "Sales & CRM",
    icon: TrendingUp,
    tone: "pink",
    group: "business-finance",
  },
  {
    slug: "procurement",
    name: "Procurement",
    icon: ShoppingBasket,
    tone: "orange",
    group: "business-finance",
  },
  {
    slug: "inventory",
    name: "Inventory",
    icon: Package,
    tone: "purple",
    group: "business-finance",
  },
  {
    slug: "pos-retail-billing",
    name: "POS & Retail Billing",
    icon: Store,
    tone: "orange",
    group: "business-finance",
  },
  {
    slug: "marketing-commerce",
    name: "Marketing & Commerce",
    icon: Megaphone,
    tone: "pink",
    group: "business-finance",
  },
  {
    slug: "warehouse-management",
    name: "Warehouse Management",
    icon: Warehouse,
    tone: "teal",
    group: "operations",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    tone: "amber",
    group: "operations",
  },
  {
    slug: "supply-chain-logistics",
    name: "Supply Chain & Logistics",
    icon: Truck,
    tone: "sky",
    group: "operations",
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    icon: Building2,
    tone: "amber",
    group: "operations",
  },
  { slug: "people-payroll", name: "People & Payroll", icon: Users, tone: "blue", group: "people" },
  {
    slug: "work-management",
    name: "Work Management",
    icon: ClipboardList,
    tone: "blue",
    group: "people",
  },
  {
    slug: "travel-expense",
    name: "Travel & Expense",
    icon: Plane,
    tone: "purple",
    group: "people",
  },
  {
    slug: "self-service-portal",
    name: "Self-Service Portal",
    icon: CircleUser,
    tone: "indigo",
    group: "people",
  },
  {
    slug: "compliance-legal",
    name: "Compliance & Legal",
    icon: Scale,
    tone: "red",
    group: "control",
  },
  {
    slug: "document-management",
    name: "Document Management",
    icon: FileText,
    tone: "sky",
    group: "control",
  },
  {
    slug: "business-intelligence-analytics",
    name: "Business Intelligence & Analytics",
    icon: ChartColumn,
    tone: "indigo",
    group: "control",
  },
  {
    slug: "customer-service",
    name: "Customer Service",
    icon: Headset,
    tone: "teal",
    group: "control",
  },
];

/** How many modules the navigation dropdown lists before "View all modules". */
const FEATURED_MODULE_COUNT = 10;

export const featuredModules = modules.slice(0, FEATURED_MODULE_COUNT);
