/**
 * Sample data for the app demo on the mobile app page. Every name and figure is made up so the
 * demo can run without a real company's information.
 */

export const demoCompany = "Demo Co HQ";

export const demoUser = {
  name: "Sneha Reddy",
  firstName: "Sneha",
  employeeId: "DC-004",
  role: "Software Engineer",
  department: "Engineering",
  location: "Head Office - New Delhi",
} as const;

export type LeaveStatus = "waiting" | "approved" | "rejected";

export type LeaveRequest = {
  id: string;
  type: string;
  month: string;
  day: string;
  length: string;
  note: string;
  status: LeaveStatus;
};

export const leaveBalances = [
  { id: "casual", name: "Casual Leave", left: 11.5, total: 12 },
  { id: "privilege", name: "Privilege Leave", left: 15, total: 15 },
  { id: "sick", name: "Sick Leave", left: 10, total: 12 },
] as const;

export const leaveRequests: readonly LeaveRequest[] = [
  {
    id: "l1",
    type: "Casual Leave",
    month: "OCT",
    day: "27",
    length: "1 day",
    note: "Family function",
    status: "waiting",
  },
  {
    id: "l2",
    type: "Casual Leave",
    month: "OCT",
    day: "21",
    length: "1 day",
    note: "Friend's engagement",
    status: "waiting",
  },
  {
    id: "l3",
    type: "Casual Leave",
    month: "SEP",
    day: "09",
    length: "0.5 days",
    note: "Half day in the morning",
    status: "approved",
  },
  {
    id: "l4",
    type: "Sick Leave",
    month: "AUG",
    day: "14",
    length: "2 days",
    note: "Fever",
    status: "approved",
  },
  {
    id: "l5",
    type: "Privilege Leave",
    month: "JUL",
    day: "03",
    length: "1 day",
    note: "Short notice",
    status: "rejected",
  },
];

export const payslips = [
  { id: "p1", month: "October 2026", net: "₹79,338.26", isLatest: true },
  { id: "p2", month: "September 2026", net: "₹79,338.26", isLatest: false },
  { id: "p3", month: "August 2026", net: "₹78,912.40", isLatest: false },
] as const;

export type DayStatus = "present" | "half" | "absent" | "leave" | "today" | "none";

const dayStatus: Partial<Record<number, DayStatus>> = {
  1: "present",
  5: "present",
  6: "present",
  7: "present",
  8: "present",
  9: "present",
  12: "half",
  13: "present",
  14: "present",
  15: "present",
  16: "present",
  19: "absent",
  21: "absent",
  22: "absent",
  23: "absent",
  24: "today",
};

/** October 2026 starts on a Thursday, so four blank cells precede the 1st (Sunday first). */
export const calendar = {
  title: "October 2026",
  leadingBlanks: 4,
  days: 31,
  status: dayStatus,
} as const;

export const business = {
  target: {
    achieved: "₹6,40,000",
    goal: "₹10,00,000",
    percent: 64,
    note: "8 days left · ₹3,60,000 to go",
  },
  tiles: [
    { id: "visits", label: "Visits today", value: "4 / 6", hint: "2 left", tone: "teal" },
    { id: "orders", label: "Orders today", value: "9", hint: "₹1.1 L booked", tone: "blue" },
    { id: "collections", label: "Collections", value: "₹1.2 L", hint: "This week", tone: "green" },
    {
      id: "outstanding",
      label: "Outstanding",
      value: "₹8.4 L",
      hint: "₹1.2 L overdue",
      tone: "amber",
    },
    { id: "enquiries", label: "New enquiries", value: "5", hint: "2 from dealers", tone: "violet" },
    { id: "followups", label: "Follow-ups due", value: "3", hint: "Call today", tone: "red" },
  ],
  visits: [
    {
      id: "v1",
      time: "10:00 AM",
      name: "Sharma Traders",
      purpose: "Order collection",
      status: "Done",
    },
    {
      id: "v2",
      time: "12:30 PM",
      name: "Patel Electronics",
      purpose: "Payment follow-up",
      status: "Next",
    },
    { id: "v3", time: "03:00 PM", name: "Gupta Stores", purpose: "New enquiry", status: "Later" },
  ],
  products: [
    { id: "fans", name: "Fans", value: "₹2.9 L of ₹4 L", percent: 72 },
    { id: "lights", name: "Lights", value: "₹1.7 L of ₹3 L", percent: 55 },
    { id: "wires", name: "Wires & cables", value: "₹0.8 L of ₹2 L", percent: 38 },
    { id: "switchgear", name: "Switchgear", value: "₹0.9 L of ₹1 L", percent: 91 },
  ],
  dealers: [
    { id: "d1", rank: 1, name: "Sharma Traders", amount: "₹1.8 L", orders: "6 orders" },
    { id: "d2", rank: 2, name: "Patel Electronics", amount: "₹1.3 L", orders: "4 orders" },
    { id: "d3", rank: 3, name: "Gupta Stores", amount: "₹0.9 L", orders: "3 orders" },
  ],
  followUps: [
    { id: "f1", title: "Collect payment: Patel Electronics", detail: "₹45,000 overdue 12 days" },
    { id: "f2", title: "Call back: Verma Enterprises", detail: "Asked for the new price list" },
    { id: "f3", title: "Send quotation: Singh Hardware", detail: "Requested yesterday" },
  ],
} as const;

export const claimCategories = ["Travel", "Food", "Stay", "Other"] as const;

export type AssistantExchange = { keywords: readonly string[]; reply: string };

export const assistantSuggestions = [
  "How many leaves do I have left?",
  "Show my latest payslip",
] as const;

/** Example answers for the demo. The assistant in the demo only knows the sample data above. */
export const assistantExchanges: readonly AssistantExchange[] = [
  {
    keywords: ["leave", "leaves"],
    reply:
      "You have 36.5 days of leave available this year: Casual 11.5, Privilege 15 and Sick 10. Two requests are still waiting for a decision.",
  },
  {
    keywords: ["payslip", "salary", "pay"],
    reply:
      "Your latest payslip is for October 2026, with a net pay of ₹79,338.26. You can download it from Payslips.",
  },
  {
    keywords: ["attendance", "check", "hours"],
    reply:
      "You are not checked in yet today. This month you have worked 97h 20m across 11 present days.",
  },
];

export const assistantFallback =
  "I can help with your leave, payslips and attendance. Try asking about one of those.";

export const securityPoints = [
  {
    id: "lock",
    title: "A lock only you can open",
    description:
      "Turn on app lock, and reopening the app asks for your fingerprint, face or phone passcode.",
  },
  {
    id: "devices",
    title: "See where you are signed in",
    description: "Check the phones you are signed in on, all in one place.",
  },
  {
    id: "legal",
    title: "Read how your information is used",
    description: "The Privacy Policy and Terms of Use are inside the app, one tap away.",
  },
] as const;

export const appFaqs = [
  {
    question: "Which phones can I use the BoSS app on?",
    answer:
      "Today the BoSS app is available for Android phones. You can download it from Google Play.",
  },
  {
    question: "Is there an iPhone app?",
    answer: "It is on its way. The iPhone app is in the works and coming soon.",
  },
  {
    question: "Can I check in from my phone?",
    answer:
      "Yes. Open Attendance and tap Check In. A live timer shows your hours, and you can see your week and month at a glance.",
  },
  {
    question: "Can I apply for leave and see my balance?",
    answer:
      "Yes. The app shows your balance for each leave type, lets you apply, and tracks every request.",
  },
  {
    question: "Can I download my payslip?",
    answer: "Yes. Open Payslips to see your monthly payslips and download the one you need.",
  },
  {
    question: "Can I make the app dark?",
    answer: "Yes. Choose Light, Dark or System in the app's settings.",
  },
] as const;

export type HomeFeature = {
  id: string;
  title: string;
  description: string;
};

/** What the app does, as shown on the home page: attendance and payroll, the things it is built for. */
export const homeFeatures: readonly HomeFeature[] = [
  {
    id: "check-in",
    title: "Check in from anywhere",
    description: "Check in and out with one tap, and watch a live timer.",
  },
  {
    id: "hours",
    title: "Hours at a glance",
    description: "See your worked hours and present days for the week and month.",
  },
  {
    id: "leave",
    title: "Leave, simply",
    description: "See your balance, apply and follow every request.",
  },
  {
    id: "payslips",
    title: "Payslips, always with you",
    description: "Open your monthly payslips whenever you need them.",
  },
  {
    id: "claims",
    title: "Claims in a few taps",
    description: "Add the details and send a claim for approval.",
  },
  { id: "assistant", title: "Ask Sahayogi", description: "Your AI assistant is one tap away." },
];
