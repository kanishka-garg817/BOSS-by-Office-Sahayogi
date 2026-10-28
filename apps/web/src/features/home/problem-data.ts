import {
  ClipboardCheck,
  IndianRupee,
  Package,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { WindowContent } from "@/types/window-content";

export type FlowNode = {
  /** Window title, e.g. "WhatsApp" or "Excel". */
  title: string;
  /** How the information got here by hand. */
  handoff: string;
  content: WindowContent;
};

export type ProblemFlow = {
  id: string;
  label: string;
  icon: LucideIcon;
  nodes: readonly [FlowNode, FlowNode, FlowNode, FlowNode, FlowNode];
  results: readonly [string, string, string];
};

export const problemFlows: readonly [ProblemFlow, ...ProblemFlow[]] = [
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    nodes: [
      {
        title: "Leads",
        handoff: "Where it starts",
        content: {
          kind: "list",
          title: "New leads this week",
          items: [
            "Mehta & Co — asked for a quote",
            "Ravi Textiles — call back Friday",
            "Shah Traders — visited our stall",
          ],
        },
      },
      {
        title: "WhatsApp",
        handoff: "Copied from notes",
        content: {
          kind: "chat",
          contact: "Mehta & Co",
          messages: [
            { side: "in", text: "Hi, please send the quote for 200 pcs", time: "10:42" },
            { side: "out", text: "Sure, will send it today", time: "10:45" },
            { side: "in", text: "Also need delivery by the 15th", time: "10:51" },
          ],
        },
      },
      {
        title: "Customer data",
        handoff: "Typed in manually",
        content: {
          kind: "form",
          title: "Customer details",
          fields: [
            { label: "Name", value: "Mehta & Co" },
            { label: "Phone", value: "98765 43210" },
            { label: "City", value: "Surat" },
            { label: "Last contact", value: "Not updated", flag: true },
          ],
        },
      },
      {
        title: "Excel",
        handoff: "Copied again",
        content: {
          kind: "sheet",
          file: "Leads.xlsx",
          columns: ["Customer", "Qty", "Status", "Owner"],
          rows: [
            ["Mehta & Co", "200", "Quote sent", "Priya"],
            ["Ravi Textiles", "—", "", "Amit"],
            ["Shah Traders", "50", "Call back", ""],
          ],
          flag: [1, 2],
        },
      },
      {
        title: "Follow-up",
        handoff: "Remembered by someone",
        content: {
          kind: "check",
          title: "Follow-ups",
          items: [
            { text: "Send quote to Mehta & Co", done: true },
            { text: "Call Ravi Textiles (overdue)", done: false },
            { text: "Reply to Shah Traders (no owner)", done: false },
          ],
        },
      },
    ],
    results: ["Leads going cold", "Follow-ups getting missed", "Hours spent updating sheets"],
  },
  {
    id: "finance",
    label: "Finance",
    icon: IndianRupee,
    nodes: [
      {
        title: "Sales",
        handoff: "Where it starts",
        content: {
          kind: "list",
          title: "Sales this month",
          items: [
            "Mehta & Co — ₹2,40,000",
            "Sharma Traders — ₹1,10,000",
            "Ravi Textiles — ₹65,000",
          ],
        },
      },
      {
        title: "Invoices",
        handoff: "Typed again by hand",
        content: {
          kind: "form",
          title: "Invoice #1042",
          fields: [
            { label: "Customer", value: "Mehta & Co" },
            { label: "Amount", value: "₹2,04,000", flag: true },
            { label: "Date", value: "12 Mar" },
            { label: "Status", value: "Sent" },
          ],
        },
      },
      {
        title: "Payments",
        handoff: "Checked from bank alerts",
        content: {
          kind: "mail",
          from: "Bank alerts",
          subject: "Credit of ₹1,20,000 received",
          preview: "Ref NEFT 88231 · Mehta & Co · Balance updated. This is an automated message.",
          time: "Yesterday",
        },
      },
      {
        title: "Spreadsheets",
        handoff: "Entered in a sheet",
        content: {
          kind: "sheet",
          file: "Payments.xlsx",
          columns: ["Customer", "Invoice", "Received", "Pending"],
          rows: [
            ["Mehta & Co", "2,40,000", "1,20,000", "1,20,000"],
            ["Sharma Traders", "1,10,000", "1,10,000", "0"],
            ["Ravi Textiles", "65,000", "0", "65,000"],
          ],
          flag: [0, 1],
        },
      },
      {
        title: "Reports",
        handoff: "Compiled manually",
        content: {
          kind: "form",
          title: "Monthly report",
          fields: [
            { label: "Total sales", value: "₹4,15,000" },
            { label: "Received", value: "₹2,30,000" },
            { label: "Pending", value: "₹1,85,000" },
            { label: "Ready on", value: "5th of next month", flag: true },
          ],
        },
      },
    ],
    results: [
      "Reports that arrive late",
      "Payments that get delayed",
      "Hours spent re-typing figures",
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    nodes: [
      {
        title: "Stock information",
        handoff: "Where it starts",
        content: {
          kind: "list",
          title: "Stock notes",
          items: [
            "Item A — 120 units (counted Monday)",
            "Item B — 45 units",
            "Item C — ask the warehouse",
          ],
        },
      },
      {
        title: "Excel",
        handoff: "Typed into a sheet",
        content: {
          kind: "sheet",
          file: "Stock.xlsx",
          columns: ["Item", "In stock", "Reorder", "Updated"],
          rows: [
            ["Item A", "120", "50", "Mon"],
            ["Item B", "45", "60", "Mon"],
            ["Item C", "—", "30", "—"],
          ],
          flag: [1, 1],
        },
      },
      {
        title: "Warehouse",
        handoff: "Written in a register",
        content: {
          kind: "form",
          title: "Warehouse register",
          fields: [
            { label: "Item A", value: "95 units", flag: true },
            { label: "Item B", value: "40 units" },
            { label: "Last entry", value: "Friday" },
          ],
        },
      },
      {
        title: "Sales order",
        handoff: "Raised separately",
        content: {
          kind: "form",
          title: "Order #1042",
          fields: [
            { label: "Customer", value: "Sharma Traders" },
            { label: "Item A", value: "40 units" },
            { label: "Status", value: "Confirmed" },
          ],
        },
      },
      {
        title: "Manual checking",
        handoff: "Checked by hand",
        content: {
          kind: "check",
          title: "To check today",
          items: [
            { text: "Item A: sheet says 120, register says 95", done: false },
            { text: "Call warehouse about Item C", done: false },
            { text: "Update the sheet after counting", done: false },
          ],
        },
      },
    ],
    results: ["Running out of stock", "Too much unsold stock", "Hours spent counting by hand"],
  },
  {
    id: "approvals",
    label: "Operations & Approvals",
    icon: ClipboardCheck,
    nodes: [
      {
        title: "Request",
        handoff: "Where it starts",
        content: {
          kind: "form",
          title: "Purchase request",
          fields: [
            { label: "Item", value: "50 cartons" },
            { label: "Amount", value: "₹85,000" },
            { label: "Raised by", value: "Anil" },
            { label: "Needs", value: "Manager approval" },
          ],
        },
      },
      {
        title: "WhatsApp / Email",
        handoff: "Sent by email",
        content: {
          kind: "mail",
          from: "Anil",
          subject: "Approval needed: 50 cartons",
          preview: "Hi sir, please approve the purchase when you get a moment. Quote attached.",
          time: "Mon 10:15",
        },
      },
      {
        title: "Manager",
        handoff: "Waits for the manager",
        content: {
          kind: "list",
          title: "Mr. Gupta — pending",
          items: ["Leave requests (5)", "Salary advances (3)", "Purchase: 50 cartons"],
        },
      },
      {
        title: "Follow-up",
        handoff: "Chased on chat",
        content: {
          kind: "chat",
          contact: "Mr. Gupta",
          messages: [
            { side: "out", text: "Sir, did you see my email?", time: "Tue 11:02" },
            { side: "out", text: "Following up on the purchase request", time: "Wed 09:40" },
          ],
        },
      },
      {
        title: "Approval",
        handoff: "Still not confirmed",
        content: {
          kind: "check",
          title: "Approval status",
          items: [
            { text: "Request raised", done: true },
            { text: "Manager approved", done: false },
            { text: "Order placed", done: false },
          ],
        },
      },
    ],
    results: ["Approvals that take days", "Requests that get lost", "Chasing people for sign-offs"],
  },
  {
    id: "people",
    label: "People & Payroll",
    icon: Users,
    nodes: [
      {
        title: "Attendance",
        handoff: "Where it starts",
        content: {
          kind: "sheet",
          file: "Attendance.xlsx",
          columns: ["Name", "Present", "Leave", "Late"],
          rows: [
            ["Ravi", "24", "2", "3"],
            ["Meena", "26", "0", "1"],
            ["Sanjay", "22", "4", "0"],
          ],
        },
      },
      {
        title: "Leave",
        handoff: "Collected on chat",
        content: {
          kind: "chat",
          contact: "Ravi",
          messages: [
            { side: "in", text: "Sir, I need leave on the 18th and 19th", time: "09:12" },
            { side: "out", text: "Okay, approved", time: "09:30" },
            { side: "in", text: "Thank you sir", time: "09:31" },
          ],
        },
      },
      {
        title: "Payroll",
        handoff: "Copied into the salary sheet",
        content: {
          kind: "sheet",
          file: "Salary.xlsx",
          columns: ["Name", "Days paid", "Salary", "Slip"],
          rows: [
            ["Ravi", "22", "₹26,400", "Sent"],
            ["Meena", "26", "₹31,200", "Sent"],
            ["Sanjay", "22", "₹26,400", "Pending"],
          ],
          flag: [0, 1],
        },
      },
      {
        title: "Documents",
        handoff: "Filed separately",
        content: {
          kind: "list",
          title: "Employee files",
          items: [
            "Offer letters — shared folder",
            "ID proofs — email attachments",
            "Salary slips — typed one by one",
          ],
        },
      },
      {
        title: "Different tools",
        handoff: "Cross-checked by hand",
        content: {
          kind: "check",
          title: "Month-end checklist",
          items: [
            { text: "Match attendance with salary", done: false },
            { text: "Collect leave messages", done: false },
            { text: "Send salary slips", done: false },
          ],
        },
      },
    ],
    results: ["Salary mistakes", "Documents that go missing", "Hours spent cross-checking"],
  },
];
