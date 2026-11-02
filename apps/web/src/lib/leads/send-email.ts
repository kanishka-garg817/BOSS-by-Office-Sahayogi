import "server-only";

import { env } from "@/env";

import { formatLeadText, type Lead } from "./lead";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

/** Whether email is set up for demo requests. */
export const isEmailConfigured = (): boolean => env.RESEND_API_KEY !== undefined;

/** Sends a demo request to the team's inbox, with the visitor's address as the reply-to. */
export const sendLeadEmail = async (lead: Lead): Promise<void> => {
  const { RESEND_API_KEY, LEADS_EMAIL_FROM, LEADS_EMAIL_TO } = env;
  if (!RESEND_API_KEY || !LEADS_EMAIL_FROM || !LEADS_EMAIL_TO) {
    throw new Error("Email for demo requests is not set up");
  }
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: LEADS_EMAIL_FROM,
      to: LEADS_EMAIL_TO.split(",").map((address) => address.trim()),
      reply_to: lead.email,
      subject: `New demo request: ${lead.name}, ${lead.company}`,
      text: formatLeadText(lead),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(
      `The email service refused the demo request (status ${String(response.status)})`,
    );
  }
};
