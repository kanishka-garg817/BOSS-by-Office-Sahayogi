import { siteConfig } from "@/lib/site";

import type { LegalDocument } from "./types";

const company = `${siteConfig.legalName} (CIN ${siteConfig.cin})`;

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  intro: `These terms apply when you visit or use this ${siteConfig.name} by ${siteConfig.publisher} website. Please read them before you use it.`,
  updated: "2026-10-30",
  sections: [
    {
      id: "acceptance",
      title: "Accepting these terms",
      paragraphs: [
        `This website is run by ${company}. By using it, you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the website.`,
        "These terms cover this website only. The BoSS software and mobile app are provided under their own agreement.",
      ],
    },
    {
      id: "about-the-website",
      title: "About this website",
      paragraphs: [
        "This website gives general information about BoSS. It is not an offer or a contract. Some features and pages are still being built and are shown as coming soon. What is described here may change, and we may update or remove content at any time.",
        "Screens, dashboards, figures and names shown on this website are sample data made up to show how BoSS can look. They do not show real businesses or real results.",
      ],
    },
    {
      id: "using-the-website",
      title: "Using the website",
      paragraphs: ["You agree not to:"],
      items: [
        "use the website in a way that breaks the law or the rights of others;",
        "send us false information or use another person's details;",
        "try to damage, overload or gain unauthorised access to the website or its systems;",
        "send spam, or use bots or automated tools to submit forms; or",
        "copy or collect content from the website in bulk without our written permission.",
      ],
    },
    {
      id: "demo-requests",
      title: "Demo requests",
      paragraphs: [
        "When you send a demo request, you confirm that the details are correct and that you agree to be contacted about it. Sending a request does not create a contract, and we may decline or delay a request.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Ownership of content",
      paragraphs: [
        `The content of this website, including the text, design, graphics and the BoSS and ${siteConfig.publisher} names and logos, belongs to us or our licensors and is protected by law. You may view the website and share links to it, but you may not copy, change or reuse its content for other purposes without our written permission.`,
      ],
    },
    {
      id: "third-party-names",
      title: "Other companies' names and logos",
      paragraphs: [
        "Names and logos of other companies shown on this website belong to their owners. They are shown only to identify those companies and tools. Their use does not mean that the owners endorse BoSS or are connected with us.",
      ],
    },
    {
      id: "no-warranty",
      title: "No warranty",
      paragraphs: [
        'We try to keep the information on this website accurate and up to date, but it is provided "as is". We do not promise that it is complete or error free, or that the website will always be available or free of interruptions.',
      ],
    },
    {
      id: "liability",
      title: "Limit on our liability",
      paragraphs: [
        "To the fullest extent the law allows, we are not responsible for any loss that comes from using this website or relying on its content. Nothing in these terms limits any liability that cannot be limited by law.",
      ],
    },
    {
      id: "links",
      title: "Links to other websites",
      paragraphs: [
        "This website may link to other websites. We do not control them and are not responsible for them.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Any dispute about them is subject to the courts of competent jurisdiction in India.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may change these terms from time to time. The date at the top shows when they last changed. If you keep using the website after a change, you accept the new terms.",
      ],
    },
    {
      id: "contact",
      title: "How to contact us",
      paragraphs: [
        "If you have a question about these terms, contact us through the Contact Us page of this website or the Book a Demo form.",
      ],
    },
  ],
};
