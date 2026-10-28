import {
  ArrowLeftRight,
  BadgeCheck,
  BadgePercent,
  Bell,
  BellRing,
  BookOpen,
  Boxes,
  CalendarCheck,
  CalendarDays,
  ChartPie,
  ClipboardList,
  Clock,
  Contact,
  Factory,
  FilePen,
  Fingerprint,
  FolderKanban,
  FolderOpen,
  Hammer,
  Handshake,
  Headset,
  Landmark,
  LayoutDashboard,
  ListTree,
  Megaphone,
  PackageCheck,
  PackageOpen,
  PhoneCall,
  PiggyBank,
  Plug,
  Receipt,
  ReceiptIndianRupee,
  Route,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Signature,
  SquareCheckBig,
  Store,
  TriangleAlert,
  Truck,
  UserPlus,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { modules, type ModuleTone } from "@/config/modules";

export type Capability = {
  label: string;
  icon: LucideIcon;
  /** The module it belongs to, by slug. Shared features across BoSS have none. */
  module?: string;
};

/**
 * Everyday work done in BoSS, one tile each. Only features of the existing modules are listed;
 * add or remove tiles here and the grid adjusts.
 */
export const capabilities: readonly Capability[] = [
  {
    label: "Leads",
    icon: UserPlus,
    module: "sales-crm",
  },
  {
    label: "Quotations",
    icon: FilePen,
    module: "sales-crm",
  },
  {
    label: "Sales orders",
    icon: ShoppingCart,
    module: "sales-crm",
  },
  {
    label: "Follow-ups",
    icon: PhoneCall,
    module: "sales-crm",
  },
  {
    label: "Invoices",
    icon: Receipt,
    module: "finance-accounting",
  },
  {
    label: "Payment reminders",
    icon: BellRing,
    module: "finance-accounting",
  },
  {
    label: "Accounts & ledgers",
    icon: BookOpen,
    module: "finance-accounting",
  },
  {
    label: "Bank reconciliation",
    icon: Landmark,
    module: "finance-accounting",
  },
  {
    label: "Contracts",
    icon: Signature,
    module: "compliance-legal",
  },
  {
    label: "Purchase orders",
    icon: ClipboardList,
    module: "procurement",
  },
  {
    label: "Vendors",
    icon: Handshake,
    module: "procurement",
  },
  {
    label: "Stock levels",
    icon: Boxes,
    module: "inventory",
  },
  {
    label: "Low-stock alerts",
    icon: TriangleAlert,
    module: "inventory",
  },
  {
    label: "Picking & packing",
    icon: PackageCheck,
    module: "warehouse-management",
  },
  {
    label: "Shipment tracking",
    icon: Truck,
    module: "supply-chain-logistics",
  },
  {
    label: "Production planning",
    icon: Factory,
    module: "manufacturing",
  },
  {
    label: "Bill of materials",
    icon: ListTree,
    module: "manufacturing",
  },
  {
    label: "Attendance",
    icon: Fingerprint,
    module: "people-payroll",
  },
  {
    label: "Payroll & payslips",
    icon: Wallet,
    module: "people-payroll",
  },
  {
    label: "Leave requests",
    icon: CalendarCheck,
    module: "self-service-portal",
  },
  {
    label: "Expense claims",
    icon: ReceiptIndianRupee,
    module: "travel-expense",
  },
  {
    label: "Tasks",
    icon: SquareCheckBig,
    module: "work-management",
  },
  {
    label: "Approvals",
    icon: BadgeCheck,
    module: "work-management",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    module: "work-management",
  },
  {
    label: "Support tickets",
    icon: Headset,
    module: "customer-service",
  },
  {
    label: "Campaigns",
    icon: Megaphone,
    module: "marketing-commerce",
  },
  {
    label: "Online orders",
    icon: ShoppingBag,
    module: "marketing-commerce",
  },
  {
    label: "Point of sale",
    icon: Store,
    module: "pos-retail-billing",
  },
  {
    label: "Assets & maintenance",
    icon: Wrench,
    module: "asset-management",
  },
  {
    label: "Documents",
    icon: FolderOpen,
    module: "document-management",
  },
  {
    label: "Reports",
    icon: ChartPie,
    module: "business-intelligence-analytics",
  },
  {
    label: "Customers",
    icon: Contact,
    module: "sales-crm",
  },
  {
    label: "Offers & discounts",
    icon: BadgePercent,
    module: "marketing-commerce",
  },
  {
    label: "Budgets",
    icon: PiggyBank,
    module: "finance-accounting",
  },
  {
    label: "Goods receipts",
    icon: PackageOpen,
    module: "procurement",
  },
  {
    label: "Stock transfers",
    icon: ArrowLeftRight,
    module: "inventory",
  },
  {
    label: "Route planning",
    icon: Route,
    module: "supply-chain-logistics",
  },
  {
    label: "Work orders",
    icon: Hammer,
    module: "manufacturing",
  },
  {
    label: "Timesheets",
    icon: Clock,
    module: "people-payroll",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    module: "work-management",
  },
  {
    label: "Dashboards",
    icon: LayoutDashboard,
    module: "business-intelligence-analytics",
  },
  {
    label: "Integrations",
    icon: Plug,
  },
  {
    label: "Roles & permissions",
    icon: ShieldCheck,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
];

const SHARED_TONE: ModuleTone = "blue";

/** The colour of the module a capability belongs to, so tiles match the Modules menu. */
export const toneOf = (capability: Capability): ModuleTone =>
  modules.find((item) => item.slug === capability.module)?.tone ?? SHARED_TONE;
