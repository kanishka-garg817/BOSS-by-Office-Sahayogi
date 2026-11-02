/** What a step of the work sits in, so it can be shown with a matching icon. */
export type ToolKind = "excel" | "whatsapp" | "email" | "document" | "notebook" | "record";

/** One place the work passes through by hand, with example data from it. */
export type ProblemStep = {
  /** The tool or paper the work sits in, named the way people say it. */
  title: string;
  /** The main line of example data from that tool. */
  line: string;
  /** Two more lines of example data. */
  details: readonly [string, string];
  kind: ToolKind;
};

export type ProblemId = "sales" | "stock" | "payroll" | "accounts" | "approvals" | "reports";

export type Problem = {
  id: ProblemId;
  /** The part of the business the problem is in. */
  area: string;
  title: string;
  description: string;
  /** Five places the work is done by hand, named the way people say it. */
  steps: readonly [ProblemStep, ProblemStep, ProblemStep, ProblemStep, ProblemStep];
};

export const problems: readonly Problem[] = [
  {
    id: "sales",
    area: "Sales",
    title: "Orders handled by hand",
    description: "Every order is typed again into sheets, chats and invoices.",
    steps: [
      {
        title: "Excel",
        line: "Order #1042",
        details: ["Mehta & Co · 200", "Ravi Tex. · 50"],
        kind: "excel",
      },
      {
        title: "WhatsApp",
        line: "Please send 200 pcs",
        details: ["Sure, noted", "Deliver by the 15th"],
        kind: "whatsapp",
      },
      {
        title: "Email",
        line: "Quote request",
        details: ["From: Shah Traders", "Need rates for 80 pcs."],
        kind: "email",
      },
      {
        title: "Invoice",
        line: "Typed again",
        details: ["Mehta & Co · 200 pcs", "Total ₹2,04,000"],
        kind: "document",
      },
      {
        title: "Notebook",
        line: "Call Ravi back",
        details: ["Send samples to Shah", "Check payment #1040"],
        kind: "notebook",
      },
    ],
  },
  {
    id: "stock",
    area: "Inventory",
    title: "Stock counted by hand",
    description: "The sheet says one thing, the shelf says another, and someone has to count.",
    steps: [
      {
        title: "Stock sheet",
        line: "Item A · 120 units",
        details: ["Item B · 12 units", "Item C · 45 units"],
        kind: "excel",
      },
      {
        title: "Warehouse",
        line: "Shelf has 95 units",
        details: ["Item A · counted Mon", "Sheet says 120"],
        kind: "record",
      },
      {
        title: "Email",
        line: "Need 40 more units",
        details: ["From: Anil (Stores)", "Stock is short, please buy."],
        kind: "email",
      },
      {
        title: "Suppliers",
        line: "Patel · ₹1,700",
        details: ["Shah Cartons · ₹1,750", "Mehta Pack · ₹1,690"],
        kind: "excel",
      },
      {
        title: "Purchase order",
        line: "Typed by hand",
        details: ["Patel Packaging · 50", "Total ₹85,000"],
        kind: "document",
      },
    ],
  },
  {
    id: "payroll",
    area: "People & Payroll",
    title: "Payroll done by hand",
    description: "From the first resume to the last payslip, people copy details across.",
    steps: [
      {
        title: "Email",
        line: "Resume received",
        details: ["From: Neha Verma", "Applying for Accounts."],
        kind: "email",
      },
      {
        title: "Documents",
        line: "Bank details missing",
        details: ["ID proof · received", "Offer letter · unsigned"],
        kind: "record",
      },
      {
        title: "Attendance",
        line: "Ravi · 22 days",
        details: ["Meena · 25 days", "Neha · 24 days"],
        kind: "excel",
      },
      {
        title: "Salary sheet",
        line: "₹26,400",
        details: ["Meena · ₹30,000", "Neha · ₹28,800"],
        kind: "excel",
      },
      {
        title: "WhatsApp",
        line: "Sent one by one",
        details: ["Ravi: March payslip", "Meena: March payslip"],
        kind: "whatsapp",
      },
    ],
  },
  {
    id: "accounts",
    area: "Finance",
    title: "Accounts matched by hand",
    description: "Invoices, payments and pending amounts are matched one at a time.",
    steps: [
      {
        title: "Bank alert",
        line: "Credit ₹1,20,000",
        details: ["Ref NEFT 88231", "Mehta & Co"],
        kind: "email",
      },
      {
        title: "Invoice",
        line: "Amount ₹2,04,000",
        details: ["Mehta & Co · #1042", "Sent 12 Mar"],
        kind: "document",
      },
      {
        title: "Payments sheet",
        line: "Pending ₹1,20,000",
        details: ["Ravi Tex. · ₹65,000", "Shah · ₹0"],
        kind: "excel",
      },
      {
        title: "Accounts",
        line: "Updated 3 days ago",
        details: ["Receipts · ₹1,20,000", "Sales · ₹2,40,000"],
        kind: "record",
      },
      {
        title: "Report",
        line: "Ready on the 5th",
        details: ["Total sales ₹4,15,000", "Pending ₹1,85,000"],
        kind: "document",
      },
    ],
  },
  {
    id: "approvals",
    area: "Approvals",
    title: "Approvals chased by hand",
    description: "Requests move between emails, chats and folders before anyone signs off.",
    steps: [
      {
        title: "Email",
        line: "Approval needed",
        details: ["From: Anil", "Please approve 50 cartons."],
        kind: "email",
      },
      {
        title: "WhatsApp",
        line: "Seen my email?",
        details: ["Mr. Gupta: Will see", "Please reply today"],
        kind: "whatsapp",
      },
      {
        title: "Folders",
        line: "Copies in 3 places",
        details: ["Desktop · bill #88", "Email · bill #88"],
        kind: "record",
      },
      {
        title: "Contracts",
        line: "Renewal not tracked",
        details: ["Shop lease · due soon", "Insurance · due soon"],
        kind: "document",
      },
      {
        title: "Team",
        line: "Chasing for a reply",
        details: ["Asked Mon · no reply", "Asked Wed · no reply"],
        kind: "record",
      },
    ],
  },
  {
    id: "reports",
    area: "Reports",
    title: "Reports put together by hand",
    description: "Decisions get made on last month's numbers, put together by hand.",
    steps: [
      {
        title: "Monthly report",
        line: "Ready on the 5th",
        details: ["Total sales ₹4,15,000", "Stock · 20 days old"],
        kind: "document",
      },
      {
        title: "Sales sheet",
        line: "₹4,15,000",
        details: ["Feb · ₹3,80,000", "Jan · ₹3,50,000"],
        kind: "excel",
      },
      {
        title: "Stock sheet",
        line: "20 days old",
        details: ["Item A · 120", "Item B · 12"],
        kind: "excel",
      },
      {
        title: "Accounts",
        line: "Updated 3 days ago",
        details: ["Receipts · ₹1,20,000", "Sales · ₹2,40,000"],
        kind: "record",
      },
      {
        title: "Salary sheet",
        line: "Copied by hand",
        details: ["Ravi · ₹26,400", "Meena · ₹30,000"],
        kind: "excel",
      },
    ],
  },
];
