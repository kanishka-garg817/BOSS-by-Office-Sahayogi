import { CalendarCheck, type LucideIcon, Wallet } from "lucide-react";

type Step = {
  name: string;
  description: string;
  /** The three kinds of information this step deals with, drawn as a small preview. */
  preview: readonly [string, string, string];
} & ({ moduleSlug: string } | { icon: LucideIcon });

export type Workflow = {
  id: string;
  label: string;
  steps: readonly Step[];
};

/** Examples of how modules can be used together. Steps without a module are stages of the process. */
export const workflows: readonly Workflow[] = [
  {
    id: "sell",
    label: "Sell to Customer",
    steps: [
      {
        name: "Sales & CRM",
        moduleSlug: "sales-crm",
        description: "Create and manage the customer order.",
        preview: ["Customer", "Order", "Amount"],
      },
      {
        name: "Inventory",
        moduleSlug: "inventory",
        description: "Check and update product availability.",
        preview: ["Product", "Available stock", "Reserved"],
      },
      {
        name: "Finance & Accounting",
        moduleSlug: "finance-accounting",
        description: "Manage the invoice and payment record.",
        preview: ["Invoice", "Amount", "Payment"],
      },
      {
        name: "Business Intelligence",
        moduleSlug: "business-intelligence-analytics",
        description: "Turn the transaction into useful business insight.",
        preview: ["Revenue", "Orders", "Performance"],
      },
    ],
  },
  {
    id: "purchase",
    label: "Purchase & Stock",
    steps: [
      {
        name: "Procurement",
        moduleSlug: "procurement",
        description: "Manage the purchase from supplier.",
        preview: ["Supplier", "Purchase", "Amount"],
      },
      {
        name: "Warehouse Management",
        moduleSlug: "warehouse-management",
        description: "Receive and organize incoming stock.",
        preview: ["Item", "Received", "Location"],
      },
      {
        name: "Inventory",
        moduleSlug: "inventory",
        description: "Update stock levels and availability.",
        preview: ["Product", "Available stock", "Reserved"],
      },
      {
        name: "Finance & Accounting",
        moduleSlug: "finance-accounting",
        description: "Keep the related financial records organized.",
        preview: ["Bill", "Amount", "Status"],
      },
    ],
  },
  {
    id: "employees",
    label: "Manage Employees",
    steps: [
      {
        name: "People & Payroll",
        moduleSlug: "people-payroll",
        description: "Manage employee information.",
        preview: ["Employee", "Role", "Department"],
      },
      {
        name: "Attendance",
        icon: CalendarCheck,
        description: "Track employee attendance and work records.",
        preview: ["Employee", "Days present", "Leave"],
      },
      {
        name: "Payroll",
        icon: Wallet,
        description: "Process employee payroll.",
        preview: ["Employee", "Pay period", "Net pay"],
      },
      {
        name: "Finance & Accounting",
        moduleSlug: "finance-accounting",
        description: "Keep payroll-related financial records connected.",
        preview: ["Expense", "Amount", "Period"],
      },
    ],
  },
  {
    id: "support",
    label: "Support Customers",
    steps: [
      {
        name: "Customer Service",
        moduleSlug: "customer-service",
        description: "Manage customer requests and interactions.",
        preview: ["Customer", "Request", "Status"],
      },
      {
        name: "Sales & CRM",
        moduleSlug: "sales-crm",
        description: "Keep customer and sales information connected.",
        preview: ["Customer", "Enquiry", "Order"],
      },
      {
        name: "Business Intelligence",
        moduleSlug: "business-intelligence-analytics",
        description: "Understand customer activity and business performance.",
        preview: ["Customers", "Requests", "Activity"],
      },
    ],
  },
];
