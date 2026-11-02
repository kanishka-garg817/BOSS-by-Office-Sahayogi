import { siteConfig } from "@/lib/site";

import type { LegalDocument } from "./types";

const company = `${siteConfig.legalName} (CIN ${siteConfig.cin})`;

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  intro: `This policy explains what information ${siteConfig.name} by ${siteConfig.publisher} collects through this website, how it is used, and the choices you have.`,
  updated: "2026-10-30",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `This website is run by ${company}, which we refer to as "we", "us" and "our". ${siteConfig.name} is our business management software, and ${siteConfig.publisher} is the brand it is offered under.`,
        "This policy covers this website only. If you use the BoSS software or mobile app, how your business data is handled is set out in the agreement for that service.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: ["We collect only the information below."],
      items: [
        "Details you give us. When you use the Book a Demo form, we receive your name, company name, work email, phone or WhatsApp number, the size of your company if you choose to tell us, and the message you write.",
        "Technical information. Like most websites, our hosting provider may keep standard server logs, such as your IP address, browser type, the pages you open and the time. These are used to run and protect the website.",
        "Your choices in the browser. If you switch between light and dark mode, that choice is saved in your own browser so that the site remembers it. It is not sent to us.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and tracking",
      paragraphs: [
        "At the time of writing, this website does not use advertising cookies or analytics tools that track you across websites. If we add them, we will update this policy first and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      items: [
        "To respond to your demo request and contact you about it.",
        "To understand what your business needs, so that the demo is useful to you.",
        "To keep the website secure and working, and to prevent misuse such as spam.",
        "To meet legal duties and to keep reasonable business records.",
      ],
      paragraphs: ["We do not sell your personal information."],
    },
    {
      id: "how-we-share-it",
      title: "Who we share it with",
      paragraphs: [
        "When you send a demo request, it is passed to our team by email and by WhatsApp message. To do this, and to run the website, we use service providers, such as email and messaging services and our hosting provider. They may process your information on our behalf, and only for these purposes.",
        "We may also share information if the law or a court or authority requires it, or to protect our rights, our users or the security of the website.",
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      paragraphs: [
        "We keep your demo request for as long as we need it to deal with your request and follow up, and for a reasonable period afterwards for our business records. After that we delete it or make it anonymous.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Under the laws that apply in India, including the Digital Personal Data Protection Act, 2023, you can:",
      ],
      items: [
        "ask what personal information of yours we hold, and ask us to correct it;",
        "ask us to delete your personal information;",
        "withdraw your consent to us contacting you, at any time; and",
        "make a complaint to us about how your information is handled.",
      ],
    },
    {
      id: "security",
      title: "Keeping your information safe",
      paragraphs: [
        "We use reasonable safeguards to protect the information you send us, including encrypted connections to this website. No method of sending or storing information is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "This website is meant for businesses and is not aimed at children. We do not knowingly collect information from anyone under 18.",
      ],
    },
    {
      id: "other-websites",
      title: "Links to other websites",
      paragraphs: [
        "This website may link to other websites, such as app stores. We are not responsible for their content or how they handle your information, so please read their policies.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The date at the top shows when it last changed. If we make an important change, we will say so on this website.",
      ],
    },
    {
      id: "contact",
      title: "How to contact us",
      paragraphs: [
        "To use any of your rights, or to ask a question about this policy, contact us through the Contact Us page of this website or the Book a Demo form, and mention that your message is about privacy.",
      ],
    },
  ],
};
