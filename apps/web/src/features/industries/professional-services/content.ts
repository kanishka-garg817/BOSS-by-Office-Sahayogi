import {
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  FileText,
  Receipt,
  ScrollText,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/navigation";
import type { WindowContent } from "@/types/window-content";

/**
 * Everything the Professional Services page says. Product statements here come only from what the
 * BoSS module list and module pages already state; anything firm-specific that has not been
 * confirmed (time tracking, billable hours, timesheets, utilisation rates) is never presented as a
 * BoSS feature.
 */

export const exploreModulesAction = {
  label: "Explore Modules",
  href: "/modules",
} as const satisfies NavItem;

export const heroContent = {
  eyebrow: "Professional Services",
  heading: "Run Every Client Engagement From One System",
  text: "BoSS brings client records, engagements, invoicing and staff into one connected system for consulting, legal, accounting and agency work.",
} as const;

type HeroWindow = { title: string; content: WindowContent };

/** Illustrative examples of day-to-day firm work, shown as a stacked set of windows in the hero. */
export const heroWindows: readonly [HeroWindow, HeroWindow, HeroWindow] = [
  {
    title: "Active Engagements",
    content: {
      kind: "list",
      title: "Active Engagements",
      items: ["Acme Corp — Statutory Audit", "Nimbus Legal — Retainer", "Delta Co — Due Diligence"],
    },
  },
  {
    title: "Work Tracker",
    content: {
      kind: "sheet",
      file: "Engagements.xlsx",
      columns: ["Task", "Client", "Status"],
      rows: [
        ["Tax Filing", "Acme Corp", "In Review"],
        ["Contract Draft", "Nimbus Legal", "Sent"],
      ],
      flag: [0, 2],
    },
  },
  {
    title: "Invoice",
    content: {
      kind: "form",
      title: "Invoice INV-1042",
      fields: [
        { label: "Client", value: "Acme Corp" },
        { label: "Due date", value: "28 Nov" },
        { label: "Amount due", value: "₹85,000", flag: true },
      ],
    },
  },
];

export type Challenge = {
  title: string;
  text: string;
};

export const challengesContent = {
  heading: "The Admin Work Behind Every Client Engagement",
  text: "Delivering the work is only part of running a firm. Here is where the administrative effort usually goes.",
  items: [
    {
      title: "Client information, scattered",
      text: "Enquiries, proposals and client details are often spread across email, calls and personal notes.",
    },
    {
      title: "Engagements, tracked loosely",
      text: "What stage each engagement is at often lives in chat threads and individual memory, not one shared record.",
    },
    {
      title: "Invoicing, delayed",
      text: "Invoices go out late because billing details need to be pulled together manually before they can be raised.",
    },
    {
      title: "Contracts and deadlines, easy to miss",
      text: "Engagement letters, contracts and compliance dates are tracked across personal calendars and reminders.",
    },
    {
      title: "Staff records, kept apart",
      text: "Staff details and payroll are often maintained separately from the engagements that staff are actually working on.",
    },
    {
      title: "Firm performance, hard to see",
      text: "A clear view of the firm's numbers means combining figures from accounts, billing and staff records each time.",
    },
  ] satisfies readonly Challenge[],
} as const;

export type WorkflowStage = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const workflowContent = {
  heading: "From First Enquiry to Firm Reporting",
  text: "A typical flow for a professional services firm. Not every stage applies to every engagement.",
} as const;

export const workflowStages: readonly WorkflowStage[] = [
  {
    title: "Lead & Proposal",
    text: "A prospective client enquires and a proposal is shared.",
    icon: TrendingUp,
  },
  {
    title: "Engagement Setup",
    text: "The engagement is confirmed and assigned to the team.",
    icon: ClipboardList,
  },
  {
    title: "Delivery & Work Tracking",
    text: "Work progresses and tasks are tracked until each deliverable is complete.",
    icon: ClipboardCheck,
  },
  {
    title: "Billing & Invoicing",
    text: "Clients are invoiced and payments are tracked to closure.",
    icon: Receipt,
  },
  {
    title: "Reporting & Review",
    text: "Engagement and firm performance are reviewed using current information.",
    icon: FileSearch,
  },
];

export const workflowJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: workflowContent.heading,
  description: workflowContent.text,
  step: workflowStages.map((stage, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: stage.title,
    text: stage.text,
  })),
};

export const modulesContent = {
  heading: "The BoSS Modules Relevant to Your Firm",
  text: "Not billable-hour tracking. The client, billing and staff side of running a firm, grouped by area.",
} as const;

export type ModuleCategory = {
  id: string;
  label: string;
  text: string;
  /** Module slugs in this category, as listed in config/modules.ts. */
  slugs: readonly string[];
};

export const moduleCategories: readonly ModuleCategory[] = [
  {
    id: "engagements",
    label: "Clients & Engagements",
    text: "Track enquiries, proposals and client work from one place.",
    slugs: ["sales-crm", "work-management", "customer-service"],
  },
  {
    id: "billing",
    label: "Billing & Compliance",
    text: "Keep invoices, contracts and compliance deadlines in order.",
    slugs: ["finance-accounting", "compliance-legal", "document-management"],
  },
  {
    id: "people",
    label: "People & Insights",
    text: "Look after your staff and see how the firm is doing.",
    slugs: ["people-payroll", "travel-expense", "business-intelligence-analytics"],
  },
];

/** Professional-services-specific descriptions for each module, by slug. */
export const moduleDescriptions: Record<string, string> = {
  "sales-crm": "Track client enquiries and proposals in one place.",
  "work-management": "Plan engagement tasks and keep delivery on schedule.",
  "customer-service": "Respond to client queries and track resolutions.",
  "finance-accounting": "Keep client invoices, vendor bills and firm accounts in order.",
  "compliance-legal": "Stay on top of contracts and compliance deadlines.",
  "document-management": "Keep engagement letters and deliverables safe and easy to find.",
  "people-payroll": "Maintain staff records and run payroll correctly each month.",
  "travel-expense": "Handle client-site travel requests and expense claims.",
  "business-intelligence-analytics": "See firm-wide dashboards and reports in one place.",
};

export type Benefit = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const benefitsContent = {
  heading: "Spend Less Time Coordinating. More Time on Client Work.",
  text: "What changes for a firm once client, billing and staff work run on one system, instead of many.",
  items: [
    {
      title: "One client record",
      text: "Every enquiry, engagement and invoice linked to the same client, not scattered across tools.",
      icon: Users,
    },
    {
      title: "Faster billing",
      text: "Invoices raised from the same system that tracks the engagement, not pieced together afterward.",
      icon: Receipt,
    },
    {
      title: "Fewer missed deadlines",
      text: "Contract and compliance dates tracked in one place instead of personal reminders.",
      icon: ScrollText,
    },
    {
      title: "A clearer firm view",
      text: "Partners and managers see engagement and financial status without waiting on a report.",
      icon: FileText,
    },
  ] satisfies readonly Benefit[],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "what-is-professional-services-erp",
      question: "What is ERP software for professional services firms?",
      answer:
        "It is a centralised system that brings together the administrative and financial side of running a firm, such as client enquiries, engagements, invoicing, staff and reporting, instead of managing them across separate spreadsheets and tools.",
    },
    {
      id: "what-operations",
      question: "What operations can it help manage?",
      answer:
        "Typical areas include client enquiries and proposals, engagement and task tracking, client invoicing, contracts and compliance deadlines, staff records and payroll, and firm-wide reporting.",
    },
    {
      id: "time-tracking",
      question: "Does BoSS track billable hours or timesheets?",
      answer:
        "We have not confirmed dedicated time-tracking or billable-hours functionality as a BoSS feature, so we do not claim it here. If this is important to your firm, tell us when you book a demo and we will confirm what is available.",
    },
    {
      id: "client-engagements",
      question: "Can BoSS track clients and engagements together?",
      answer:
        "Yes. BoSS Sales & CRM tracks client enquiries and proposals, and Work Management helps plan engagement tasks and keep delivery on schedule.",
    },
    {
      id: "billing-compliance",
      question: "Can BoSS help with invoicing and compliance deadlines?",
      answer:
        "BoSS Finance & Accounting keeps client invoices and firm accounts in order, Compliance & Legal helps track contracts and compliance deadlines, and Document Management keeps engagement letters and deliverables organised.",
    },
    {
      id: "firm-types",
      question: "Can BoSS support consulting, legal, accounting and agency firms?",
      answer:
        "BoSS is built to support the administrative and financial operations common across professional services firms, such as client management, billing, staff and reporting. The exact fit for your firm's workflow is best confirmed in a demo.",
    },
    {
      id: "relevant-modules",
      question: "Which BoSS modules are relevant to professional services firms?",
      answer:
        "The modules that relate to running a firm are Sales & CRM, Work Management, Customer Service, Finance & Accounting, Compliance & Legal, Document Management, People & Payroll, Travel & Expense, and Business Intelligence & Analytics. They are listed above.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "See How BoSS Fits Your Firm",
  text: "Explore how the relevant BoSS capabilities can support your client, billing and staff operations. Book a demo to confirm the details for your firm.",
} as const;
