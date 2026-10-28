import {
  BookOpen,
  ChartColumn,
  ClipboardList,
  FileText,
  Landmark,
  Package,
  Receipt,
  Repeat,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type TabletMenuItem = { id: string; label: string; icon: LucideIcon };

/**
 * The options that open beside the module bar in the tablet demo. They are sample entries that
 * show how a module's own menu opens; they are not a full list of screens.
 */
export const tabletMenus: Record<string, readonly TabletMenuItem[]> = {
  "finance-accounting": [
    { id: "ledgers", label: "Accounts & ledgers", icon: BookOpen },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "payments", label: "Payments", icon: Wallet },
    { id: "bank", label: "Bank", icon: Landmark },
    { id: "reports", label: "Reports", icon: ChartColumn },
  ],
  "sales-crm": [
    { id: "quotations", label: "Quotations", icon: FileText },
    { id: "orders", label: "Sales orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "returns", label: "Returns", icon: Repeat },
  ],
  procurement: [
    { id: "purchase-orders", label: "Purchase orders", icon: ClipboardList },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "bills", label: "Bills", icon: Receipt },
  ],
  inventory: [
    { id: "stock", label: "Stock levels", icon: Package },
    { id: "transfers", label: "Stock transfers", icon: Truck },
    { id: "reports", label: "Reports", icon: ChartColumn },
  ],
};
