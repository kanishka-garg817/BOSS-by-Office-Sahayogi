import {
  Activity,
  Database,
  Network,
  Sprout,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { WindowContent } from "@/types/window-content";

export type SolutionVisual = { title: string; content: WindowContent };

/**
 * One way BoSS helps a business. BoSS is presented as a single connected system, so these are
 * outcomes of running on it, not areas or modules.
 */
export type Solution = {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** One line for cards and lists. */
  tagline: string;
  /** A short paragraph for the page intro and the meta description. */
  summary: string;
  /** Situations the business owner will recognise today. */
  challenges: readonly string[];
  /** The same situation before and after BoSS. */
  solves: readonly { problem: string; outcome: string }[];
  benefits: readonly { title: string; text: string }[];
  /** Two example screens shown beside the intro. All names and numbers are made up. */
  visuals: readonly [SolutionVisual, SolutionVisual];
};

export const solutions: readonly [Solution, ...Solution[]] = [
  {
    slug: "one-connected-system",
    name: "All your teams in one system",
    icon: Network,
    tagline:
      "Sales, accounts, warehouse and HR work in one place, so nobody re-types or asks for the same details.",
    summary:
      "Most growing businesses run on Excel sheets, WhatsApp groups and a separate accounting package that never quite agree. BoSS puts every team on one system, so an order entered by sales is already there for accounts, the warehouse and dispatch.",
    challenges: [
      "Each team keeps its own Excel sheet",
      "Order details are copied into accounts by hand",
      "Staff call or message to ask for information that already exists",
    ],
    solves: [
      {
        problem: "Sales, accounts and stock are kept in separate files and apps.",
        outcome:
          "Every team works in the same system, so the details are there for whoever needs them.",
      },
      {
        problem:
          "An order is typed in by sales, then again by accounts and again by the warehouse.",
        outcome:
          "An order is entered once, and accounts, the warehouse and dispatch pick it up from there.",
      },
      {
        problem: "Customer details are different in every file.",
        outcome: "Each customer, product and supplier has one record that everyone uses.",
      },
      {
        problem: "A new staff member has to learn five different tools.",
        outcome: "There is one system to learn, with each person seeing their own part of it.",
      },
    ],
    benefits: [
      { title: "No double entry", text: "Type an order once and every team sees it." },
      { title: "Fewer mistakes", text: "No copying between sheets means fewer wrong figures." },
      { title: "Less to manage", text: "One system instead of a pile of files and apps." },
    ],
    visuals: [
      {
        title: "Sales · Order",
        content: {
          kind: "form",
          title: "Order SO-1028",
          fields: [
            { label: "Customer", value: "ABC Electronics" },
            { label: "Order value", value: "₹1,25,000" },
            { label: "Status", value: "Confirmed" },
          ],
        },
      },
      {
        title: "Finance · Invoice",
        content: {
          kind: "form",
          title: "Invoice INV-1028",
          fields: [
            { label: "Customer", value: "ABC Electronics" },
            { label: "Amount", value: "₹1,25,000" },
            { label: "Created from", value: "Order SO-1028" },
          ],
        },
      },
    ],
  },
  {
    slug: "automatic-workflows",
    name: "Routine work runs on its own",
    icon: Workflow,
    tagline:
      "Work is handed from one team to the next automatically, so nothing waits for a phone call or a reminder.",
    summary:
      "A lot of time goes into passing work along: telling the warehouse an order is confirmed, reminding accounts to raise an invoice, chasing someone for an approval. BoSS moves each job to the next person as soon as the last step is done.",
    challenges: [
      "Orders wait until someone remembers to pass them on",
      "Approvals sit in someone’s inbox for days",
      "Nobody knows which stage a job has reached",
    ],
    solves: [
      {
        problem:
          "A confirmed order has to be passed to the warehouse and accounts by phone or message.",
        outcome:
          "Stock is reserved, packing starts and the invoice is prepared as soon as the order is confirmed.",
      },
      {
        problem: "Purchase approvals wait until the owner is back in the office.",
        outcome: "The approver gets a notification straight away and can approve from their phone.",
      },
      {
        problem: "Purchase requests, orders and supplier bills are matched up by hand.",
        outcome:
          "Each purchase moves from request to payment, with every step linked to the one before.",
      },
      {
        problem: "You have to call around to find out where a job is.",
        outcome: "Every job shows its stage and who it is waiting on.",
      },
    ],
    benefits: [
      { title: "Faster turnaround", text: "Work moves on without waiting for reminders." },
      { title: "Nothing slips", text: "Every step has an owner and a status." },
      { title: "Less chasing", text: "No more calls asking “where is this?”" },
    ],
    visuals: [
      {
        title: "Order SO-1028 · Progress",
        content: {
          kind: "check",
          title: "What has happened",
          neutral: true,
          items: [
            { text: "Order confirmed", done: true },
            { text: "Stock reserved", done: true },
            { text: "Packed and dispatched", done: true },
            { text: "Invoice created", done: false },
          ],
        },
      },
      {
        title: "Approval · Purchase",
        content: {
          kind: "mail",
          from: "BoSS notification",
          subject: "Approval needed: 500 cartons",
          preview: "Anil has asked to buy packaging cartons for ₹58,000. Review and approve.",
          time: "10:15",
        },
      },
    ],
  },
  {
    slug: "one-source-of-truth",
    name: "All your business data in one place",
    icon: Database,
    tagline:
      "Every customer, order, product and bill is kept in one place, not spread across Excel files and WhatsApp chats.",
    summary:
      "When records live in different files, every report starts with copying and checking numbers. BoSS keeps all of your business data in one place, so sales, accounts and stock always show the same figures.",
    challenges: [
      "Sales, accounts and stock each quote a different number",
      "Old copies of files keep going around",
      "Month-end means days of matching figures",
    ],
    solves: [
      {
        problem: "Reports are put together by hand from several sheets.",
        outcome:
          "Reports come straight from the records, so they are up to date when you open them.",
      },
      {
        problem: "Sales, accounts and the warehouse each have a different stock figure.",
        outcome: "Every team reads the same figure from the same record.",
      },
      {
        problem: "Old versions of files are emailed and forwarded around.",
        outcome: "There is one record, so there are no old copies to mix up.",
      },
      {
        problem: "Mistakes only come to light when the month is closed.",
        outcome: "Figures are always current, so problems show up early.",
      },
    ],
    benefits: [
      { title: "Figures you can trust", text: "The same answer, whoever you ask." },
      { title: "Faster reports", text: "Nobody builds a report from scratch." },
      { title: "Calmer month-ends", text: "Your books stay up to date all month." },
    ],
    visuals: [
      {
        title: "Finance · This month",
        content: {
          kind: "form",
          title: "Cash position",
          fields: [
            { label: "Received", value: "₹8,40,000" },
            { label: "Pending", value: "₹2,05,000" },
            { label: "Overdue", value: "₹65,000" },
          ],
        },
      },
      {
        title: "Inventory · LED TV 43″",
        content: {
          kind: "form",
          title: "Stock",
          fields: [
            { label: "Available", value: "125" },
            { label: "Reserved", value: "10" },
            { label: "Reorder level", value: "50" },
          ],
        },
      },
    ],
  },
  {
    slug: "real-time-visibility",
    name: "Know your numbers, live",
    icon: Activity,
    tagline:
      "See today’s sales, stock, cash and pending payments on one screen, without waiting for someone to send a report.",
    summary:
      "Owners usually find out how the business is doing at the end of the month, from reports someone has to prepare. With BoSS, sales, stock, cash and pending work are on your dashboard as they happen, on your laptop or phone.",
    challenges: [
      "You have to call someone to know today’s sales",
      "Low stock is noticed only when an order can’t be filled",
      "Overdue payments are spotted too late",
    ],
    solves: [
      {
        problem: "To know how sales are going, you have to ask someone.",
        outcome: "Open the dashboard any time and see sales, stock and cash as they stand.",
      },
      {
        problem: "Low stock and late payments are noticed after the damage is done.",
        outcome: "Items that need attention are flagged early, while there is still time to act.",
      },
      {
        problem: "Everyone gets the same long report, whatever their job.",
        outcome: "Each person sees the figures that matter for their role.",
      },
      {
        problem: "Decisions wait while numbers are put together.",
        outcome: "The numbers are already there, so you can decide sooner.",
      },
    ],
    benefits: [
      { title: "A live picture", text: "See what is happening across the business right now." },
      { title: "Early warnings", text: "Spot problems while they are still small." },
      { title: "Quicker decisions", text: "Act on today’s figures, not last month’s." },
    ],
    visuals: [
      {
        title: "Dashboard · Today",
        content: {
          kind: "form",
          title: "Business today",
          fields: [
            { label: "Sales", value: "₹3,20,000" },
            { label: "Orders", value: "18" },
            { label: "Cash in bank", value: "₹12,94,000" },
          ],
        },
      },
      {
        title: "Dashboard · Needs attention",
        content: {
          kind: "list",
          title: "Needs attention",
          items: [
            "LED TV 43″ is close to its reorder level",
            "3 invoices are overdue",
            "2 approvals are waiting",
          ],
        },
      },
    ],
  },
  {
    slug: "everyone-on-the-same-page",
    name: "The right access for every person",
    icon: Users,
    tagline:
      "Owners, managers and staff work in the same system, each seeing only what their role needs, with every change recorded.",
    summary:
      "Sharing one system is only useful if people see the right things. In BoSS each person has a login with access to what their role needs, staff can look up their own details, and every approval and change is recorded with a name and time.",
    challenges: [
      "Everyone can see everything, or nothing",
      "Staff ask HR or accounts for payslips and leave balances",
      "Nobody can tell who approved or changed something",
    ],
    solves: [
      {
        problem: "Sensitive figures are visible to people who don’t need them.",
        outcome: "Each person can open only what their role needs.",
      },
      {
        problem: "Staff have to ask HR or accounts for payslips and leave balances.",
        outcome: "Employees look up their own details and apply for leave themselves.",
      },
      {
        problem: "It is hard to tell who approved or changed something.",
        outcome: "Every action is recorded, so you can see who did what and when.",
      },
      {
        problem: "The owner only knows what people choose to report.",
        outcome: "The owner sees the live picture without waiting for updates.",
      },
    ],
    benefits: [
      { title: "Less back-and-forth", text: "People find answers without interrupting others." },
      { title: "Clear accountability", text: "A record of who did what, and when." },
      { title: "Data stays protected", text: "Each person sees only what they should." },
    ],
    visuals: [
      {
        title: "Self-service · Leave",
        content: {
          kind: "form",
          title: "Leave request",
          fields: [
            { label: "Employee", value: "Neha Verma" },
            { label: "Dates", value: "18–19 March" },
            { label: "Balance after", value: "10 days" },
            { label: "Status", value: "Approved" },
          ],
        },
      },
      {
        title: "Activity · Record",
        content: {
          kind: "list",
          title: "Recent activity",
          items: [
            "Rohit confirmed order SO-1028",
            "Mr. Gupta approved request PR-2041",
            "Finance recorded payment INV-1028",
          ],
        },
      },
    ],
  },
  {
    slug: "grows-with-your-business",
    name: "Software that grows with you",
    icon: Sprout,
    tagline:
      "Start with the modules you need today and add more as you open branches, hire people or launch products.",
    summary:
      "Most businesses outgrow their first tools and end up switching software, moving data and retraining staff. With BoSS you start with the modules you need now and add more later, and everything you add works with what you already have.",
    challenges: [
      "Spreadsheets and basic apps can’t keep up with more orders",
      "Every new need means buying another tool",
      "Changing software later means moving all your data",
    ],
    solves: [
      {
        problem: "Spreadsheets and basic apps can’t keep up as orders grow.",
        outcome: "BoSS handles more orders, people and products without a change of system.",
      },
      {
        problem: "Every new need means buying and learning another tool.",
        outcome: "Add the next module to BoSS and it works with what you already use.",
      },
      {
        problem: "A new branch or team starts with its own separate records.",
        outcome: "New branches and teams work in the same system, in the same way.",
      },
      {
        problem: "Switching systems later means starting over.",
        outcome: "Start with what you need now and build on it, with nothing to move.",
      },
    ],
    benefits: [
      { title: "Start small", text: "Begin with the modules that matter most today." },
      { title: "Add as you grow", text: "Bring in more of your business when you are ready." },
      { title: "No starting over", text: "Everything you add works with what you already have." },
    ],
    visuals: [
      {
        title: "BoSS · Your setup",
        content: {
          kind: "list",
          title: "In use today",
          items: ["Sales & CRM", "Inventory", "Finance & Accounting"],
        },
      },
      {
        title: "BoSS · Next",
        content: {
          kind: "check",
          title: "Add when you’re ready",
          neutral: true,
          items: [
            { text: "People & Payroll", done: false },
            { text: "Procurement", done: false },
            { text: "Business Intelligence", done: false },
          ],
        },
      },
    ],
  },
];

export const getSolution = (slug: string): Solution | undefined =>
  solutions.find((solution) => solution.slug === slug);
