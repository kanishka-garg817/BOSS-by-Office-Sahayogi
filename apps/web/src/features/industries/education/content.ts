import {
  BookOpen,
  CalendarCheck,
  ChartColumn,
  ClipboardCheck,
  ClipboardList,
  Coins,
  FileText,
  GraduationCap,
  MessageCircle,
  ShoppingBasket,
  UserCog,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";

import admissionsPhoto from "@/assets/photos/education/admissions.jpg";
import attendancePhoto from "@/assets/photos/education/attendance.jpg";
import communicationPhoto from "@/assets/photos/education/communication.jpg";
import examsPhoto from "@/assets/photos/education/exams.jpg";
import feesPhoto from "@/assets/photos/education/fees.jpg";
import reportsPhoto from "@/assets/photos/education/reports.jpg";
import staffPhoto from "@/assets/photos/education/staff.jpg";
import studentRecordsPhoto from "@/assets/photos/education/student-records.jpg";
import type { NavItem } from "@/config/navigation";
import type { WindowContent } from "@/types/window-content";

/**
 * Everything the Education page says. Product statements here come only from what the BoSS module
 * list and module pages already state; anything institution-specific that has not been confirmed
 * (attendance, timetables, examinations, marks, report cards, parent portals, academic calendars)
 * is never presented as a BoSS feature.
 */

export const exploreModulesAction = {
  label: "Explore Modules",
  href: "/modules",
} as const satisfies NavItem;

export const heroContent = {
  eyebrow: "Education Industry",
  heading: "Bring Your Institution's Operations Together",
  text: "BoSS brings admissions, fees, staff and institution finances into one organised system.",
  photoAlt: "A teacher helping a student at a laptop in a library at an educational institution",
} as const;

type HeroWindow = { title: string; content: WindowContent };

/**
 * Illustrative examples of the kind of day-to-day admin work an institution tracks, shown as four
 * small windows around the hero photo.
 */
export const heroWindows: readonly [HeroWindow, HeroWindow, HeroWindow, HeroWindow] = [
  {
    title: "Admissions",
    content: {
      kind: "list",
      title: "Admission Enquiries",
      items: [
        "New enquiry: Grade 8",
        "Application under document review",
        "Scheduled for interview",
      ],
    },
  },
  {
    title: "Fees",
    content: {
      kind: "form",
      title: "Fee Reminder",
      fields: [
        { label: "Student", value: "Aarav Mehta" },
        { label: "Class", value: "Grade 10 - B" },
        { label: "Amount due", value: "₹18,500", flag: true },
      ],
    },
  },
  {
    title: "Staff",
    content: {
      kind: "check",
      title: "Leave Requests",
      items: [
        { text: "Priya Sharma - approved", done: true },
        { text: "Ramesh Gupta - pending", done: false },
      ],
      neutral: true,
    },
  },
  {
    title: "Communication",
    content: {
      kind: "mail",
      from: "Administrative Office",
      subject: "Fee due date reminder",
      preview: "This is a reminder that the term fee instalment is due by the end of the month.",
      time: "9:15 AM",
    },
  },
];

export type Challenge = {
  title: string;
  text: string;
  icon: LucideIcon;
  photo: StaticImageData;
  photoAlt: string;
};

export const challengesContent = {
  heading: "The Work Behind Every Well-Run Institution",
  text: "Behind every admission, class and fee receipt is administrative work that adds up across a term. Here is where that effort usually goes.",
  items: [
    {
      title: "Admission information, scattered",
      text: "Enquiry forms, documents and follow-ups are often spread across paper forms and spreadsheets.",
      icon: ClipboardList,
      photo: admissionsPhoto,
      photoAlt: "A school administrator reviewing admission documents with a visitor",
    },
    {
      title: "Student records, re-entered",
      text: "The same student details are often typed again across different registers and systems.",
      icon: Users,
      photo: studentRecordsPhoto,
      photoAlt: "An office worker reviewing a student record file at a desk",
    },
    {
      title: "Attendance, compiled by hand",
      text: "Attendance registers take time to maintain and bring together into a usable summary.",
      icon: CalendarCheck,
      photo: attendancePhoto,
      photoAlt: "A teacher addressing students in a classroom",
    },
    {
      title: "Fees, tracked manually",
      text: "Fee collection, instalments and outstanding dues are followed up without a single running record.",
      icon: Wallet,
      photo: feesPhoto,
      photoAlt: "Two colleagues going through paperwork and folders at a desk",
    },
    {
      title: "Exams, coordinated across people",
      text: "Examination schedules, marks and report cards need coordination across teachers and classes.",
      icon: FileText,
      photo: examsPhoto,
      photoAlt: "Students writing an examination at desks in a classroom",
    },
    {
      title: "Communication, across channels",
      text: "Parent and student communication happens over calls, messages and notices, rather than one place.",
      icon: MessageCircle,
      photo: communicationPhoto,
      photoAlt: "An office worker on a phone call at his desk",
    },
    {
      title: "Staff administration, by hand",
      text: "Staff records, leave and payroll take real administrative effort to keep current.",
      icon: UserCog,
      photo: staffPhoto,
      photoAlt: "Two colleagues going through documents together at a table",
    },
    {
      title: "Reports, pulled together",
      text: "Management reports are prepared by combining information from different departments.",
      icon: ChartColumn,
      photo: reportsPhoto,
      photoAlt: "Printed charts and reports laid out next to a laptop",
    },
  ] satisfies readonly Challenge[],
} as const;

export type WorkflowStep = {
  title: string;
  text: string;
  /** A short caveat for a step that works differently in schools and in colleges. */
  note?: string;
};

export type WorkflowPhaseTone = "blue" | "violet" | "amber" | "emerald";

export type WorkflowPhase = {
  title: string;
  /** One short line shown on the flow card; the steps below are for reference and schema. */
  summary: string;
  icon: LucideIcon;
  tone: WorkflowPhaseTone;
  steps: readonly WorkflowStep[];
};

export const workflowContent = {
  heading: "From Student Enrollment to Everyday Institution Management",
  text: "A typical flow for an educational institution, grouped into four phases. Not every step applies to every institution.",
} as const;

export type WorkflowArea = {
  label: string;
  icon: LucideIcon;
};

export const workflowAreasContent = {
  heading: "Everything Your Institution Needs",
  areas: [
    { label: "Admissions & Front Office", icon: GraduationCap },
    { label: "Fees & Finance", icon: Coins },
    { label: "Procurement & Supplies", icon: ShoppingBasket },
    { label: "Staff & HR", icon: Users },
    { label: "Reports & Insights", icon: ChartColumn },
  ] satisfies readonly WorkflowArea[],
} as const;

export const workflowPhases: readonly WorkflowPhase[] = [
  {
    title: "Admissions & Enrollment",
    summary: "Take enquiries, verify applications, and enrol students.",
    icon: UserPlus,
    tone: "blue",
    steps: [
      {
        title: "Admission Enquiries",
        text: "Prospective students and parents enquire about courses, fees and availability.",
      },
      {
        title: "Application & Document Verification",
        text: "Applications are reviewed and submitted documents are checked.",
      },
      {
        title: "Admission & Student Enrollment",
        text: "Confirmed students are enrolled and their admission is recorded.",
      },
    ],
  },
  {
    title: "Student & Class Records",
    summary: "Record class or course setup and keep enrolled student placements organised.",
    icon: BookOpen,
    tone: "violet",
    steps: [
      {
        title: "Institution & Academic Setup",
        text: "Departments, grades or programmes, and academic sessions are set up.",
      },
      {
        title: "Student Records & Class / Course Allocation",
        text: "Enrolled students are recorded and allocated to a class or course.",
      },
      {
        title: "Academic Calendar & Timetable",
        text: "Sessions, terms and daily schedules are planned for the academic year.",
      },
      {
        title: "Teaching, Learning & Attendance",
        text: "Day-to-day classes run, with attendance recorded for each session.",
      },
    ],
  },
  {
    title: "Term Progression",
    summary: "Keep student progression and promotion records organised as each term ends.",
    icon: ClipboardCheck,
    tone: "amber",
    steps: [
      {
        title: "Assignments & Student Progress",
        text: "Assignments are given and ongoing student progress is tracked.",
      },
      {
        title: "Examination & Assessment",
        text: "Examinations are scheduled and conducted across classes or courses.",
      },
      {
        title: "Results & Report Cards",
        text: "Marks are compiled and shared with students and parents.",
      },
      {
        title: "Student Promotion / Semester Progression",
        text: "Students move ahead to continue their studies the following term.",
        note: "Schools: promotion to the next class. Colleges: progression to the next semester.",
      },
    ],
  },
  {
    title: "Fees, Staff & Finance",
    summary: "Collect fees, manage staff, and keep institution finances in order.",
    icon: Coins,
    tone: "emerald",
    steps: [
      {
        title: "Fee Structure & Billing",
        text: "Fee structures are defined and billed to students each term.",
      },
      {
        title: "Fee Collection & Dues",
        text: "Payments are collected and outstanding dues are followed up.",
      },
      {
        title: "Staff, HR & Payroll",
        text: "Staff records, attendance, leave and payroll are maintained.",
      },
      {
        title: "Campus Services & Inventory",
        text: "Campus resources, supplies and equipment are tracked and maintained.",
      },
      {
        title: "Finance & Institutional Reporting",
        text: "Income, expenses and institutional performance are reported to management.",
      },
    ],
  },
];

export const workflowJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: workflowContent.heading,
  description: workflowContent.text,
  step: workflowPhases.map((phase, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: phase.title,
    text: phase.summary,
  })),
};

export const modulesContent = {
  heading: "The BoSS Modules Relevant to Your Institution",
  text: "Not academic work like attendance or exams. The administrative and financial side, grouped by area.",
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
    id: "admissions",
    label: "Admissions & Front Office",
    text: "Capture enquiries and keep parent and student communication on record.",
    slugs: ["sales-crm", "customer-service"],
  },
  {
    id: "finance",
    label: "Finance & Resources",
    text: "Keep fees, purchases and campus supplies organised.",
    slugs: ["finance-accounting", "procurement", "inventory"],
  },
  {
    id: "people",
    label: "People & Insights",
    text: "Look after your staff and see how the institution is doing.",
    slugs: ["people-payroll", "business-intelligence-analytics"],
  },
];

/** Education-specific descriptions for each module, by slug. */
export const moduleDescriptions: Record<string, string> = {
  "finance-accounting": "Keep fee receipts, vendor payments and institution accounts in order.",
  "sales-crm": "Track admission enquiries and follow-ups in one place.",
  procurement: "Buy stationery, lab equipment and campus supplies from your vendors.",
  inventory: "Know what stock of books, supplies and equipment you have on hand.",
  "people-payroll": "Maintain staff records and run payroll correctly each month.",
  "business-intelligence-analytics": "See institution-wide dashboards and reports in one place.",
  "customer-service": "Respond to parent and student queries and track resolutions.",
};

export const benefitsContent = {
  heading: "Spend Less Time Coordinating. More Time Supporting Learning.",
  text: "What changes for an institution once its administrative and financial work runs on one system, instead of many.",
  items: [
    "Less time spent re-entering the same information in different places.",
    "Fewer follow-ups needed just to track down a number or a record.",
    "Faster answers when a parent, auditor or management asks a question.",
    "Smoother handovers between the front office, accounts and administration.",
    "Decisions made on current information, not a spreadsheet from last month.",
    "More consistent records as the institution adds students, staff or branches.",
  ],
} as const;

export const faqContent = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "what-is-education-erp",
      question: "What is ERP software for educational institutions?",
      answer:
        "An education ERP is a centralised system that brings together the administrative and financial operations of running an institution, such as admission enquiries, student records, fees, staff and reporting, instead of managing them across separate spreadsheets and tools.",
    },
    {
      id: "what-operations",
      question: "What operations can education ERP software help manage?",
      answer:
        "Typical areas include admission enquiries, fee billing and collection, procurement, inventory of supplies, staff records and payroll, and financial and institutional reporting. Academic work such as attendance, timetables and examinations is usually handled by separate academic systems.",
    },
    {
      id: "school-administration",
      question: "How can ERP software help school administration?",
      answer:
        "It brings scattered administrative work, such as admission enquiries, documents, fee follow-ups and staff records, into one connected system, so information does not need to be tracked across separate registers and spreadsheets.",
    },
    {
      id: "staff-finance-inventory",
      question: "Can ERP software manage staff, finance, and inventory?",
      answer:
        "Yes. BoSS People & Payroll maintains staff records and runs payroll, Finance & Accounting keeps your institution's books, invoices and payments in order, and Inventory and Procurement help you track supplies and purchases.",
    },
    {
      id: "fee-expense-visibility",
      question: "How can institutions improve fee and expense visibility?",
      answer:
        "BoSS Finance & Accounting keeps fee receipts, vendor payments and institution accounts in order, and Business Intelligence & Analytics brings this information into dashboards and reports for owners and administrators.",
    },
    {
      id: "schools-colleges-universities",
      question: "Can BoSS support schools, colleges, and universities?",
      answer:
        "BoSS is built to support the administrative and financial operations common across schools, colleges and universities, such as admissions, fees, staff and reporting. Academic workflows differ between institution types, so the exact fit for your institution is best confirmed in a demo.",
    },
    {
      id: "relevant-modules",
      question: "Which BoSS modules are relevant to educational institutions?",
      answer:
        "The modules that relate to running an institution are Sales & CRM, Customer Service, Finance & Accounting, Procurement, Inventory, People & Payroll, and Business Intelligence & Analytics. They are listed above.",
    },
  ],
} as const;

export const ctaContent = {
  heading: "Bring Greater Clarity to Your Institution's Operations",
  text: "Explore how BoSS can help organise your institution's supported business operations.",
} as const;
