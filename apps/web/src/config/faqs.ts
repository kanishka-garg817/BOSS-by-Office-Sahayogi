import { moduleGroups, modules } from "@/config/modules";

export type Faq = { id: string; question: string; answer: string };

const groupNames = moduleGroups.map((group) => group.name).join(", ");

/**
 * The few questions people ask first, for the home page. Every answer restates what the rest of
 * the site already says, so the two never disagree.
 */
export const homeFaqs: readonly Faq[] = [
  {
    id: "what-is-boss",
    question: "What is BoSS?",
    answer:
      "BoSS stands for Business Operations & System Suite. It is made by Office Sahayogi and connects accounting, sales, stock, people and more in one easy place, so your whole business works as one.",
  },
  {
    id: "only-accounting",
    question: "Is BoSS only accounting software?",
    answer: `No. BoSS has ${String(modules.length)} modules, grouped into four families: ${groupNames}. Accounting is one of them.`,
  },
  {
    id: "start-small",
    question: "Do I have to start with every module?",
    answer:
      "No. Start with the modules you need now and add more later. Everything you add works with what you already have, so you do not need to switch software as you grow.",
  },
  {
    id: "integrations",
    question: "Does BoSS work with the tools we already use?",
    answer:
      "BoSS offers integrations with tools such as Tally, Busy, Marg, Gmail, WhatsApp, Shopify, Razorpay and several banks, and there is a custom API for others. Use the integrations section on this page to see them.",
  },
  {
    id: "mobile-app",
    question: "Is there a mobile app?",
    answer:
      "Yes. The BoSS app is available for Android phones on Google Play, where you can check in, apply for leave, see your payslips and raise claims. The iPhone app is on its way.",
  },
];
