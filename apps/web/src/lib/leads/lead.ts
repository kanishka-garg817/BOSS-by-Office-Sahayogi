import "server-only";

import type { DemoRequest } from "@/features/book-demo/demo-request";

export type Lead = Omit<DemoRequest, "consent" | "website"> & {
  submittedAt: Date;
};

const NOT_GIVEN = "Not given";

/** The lead as plain text, for the email body. */
export const formatLeadText = (lead: Lead): string =>
  [
    "New BoSS demo request",
    "",
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Company size: ${lead.companySize || NOT_GIVEN}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Message: ${lead.message || NOT_GIVEN}`,
    "",
    `Sent on ${lead.submittedAt.toISOString()} from the Book a Demo page.`,
  ].join("\n");

/** WhatsApp template variables cannot hold line breaks, tabs or long runs of spaces. */
export const toTemplateValue = (value: string): string => {
  const flattened = value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
  return flattened.length > 0 ? flattened : NOT_GIVEN;
};
