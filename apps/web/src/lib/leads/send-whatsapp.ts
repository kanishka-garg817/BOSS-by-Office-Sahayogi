import "server-only";

import { env } from "@/env";

import { toTemplateValue, type Lead } from "./lead";

const GRAPH_API_VERSION = "v21.0";
const REQUEST_TIMEOUT_MS = 10_000;

/** Whether WhatsApp is set up for demo requests. */
export const isWhatsAppConfigured = (): boolean => env.WHATSAPP_ACCESS_TOKEN !== undefined;

/**
 * Sends a demo request to the team's WhatsApp number with an approved message template. The five
 * template variables are the name, company, phone, email and message, in that order.
 */
export const sendLeadWhatsApp = async (lead: Lead): Promise<void> => {
  const {
    WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_RECIPIENT,
    WHATSAPP_TEMPLATE_NAME,
    WHATSAPP_TEMPLATE_LANGUAGE,
  } = env;
  if (
    !WHATSAPP_ACCESS_TOKEN ||
    !WHATSAPP_PHONE_NUMBER_ID ||
    !WHATSAPP_RECIPIENT ||
    !WHATSAPP_TEMPLATE_NAME
  ) {
    throw new Error("WhatsApp for demo requests is not set up");
  }
  const variables = [lead.name, lead.company, lead.phone, lead.email, lead.message].map(
    toTemplateValue,
  );
  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: WHATSAPP_RECIPIENT,
        type: "template",
        template: {
          name: WHATSAPP_TEMPLATE_NAME,
          language: { code: WHATSAPP_TEMPLATE_LANGUAGE },
          components: [
            { type: "body", parameters: variables.map((text) => ({ type: "text", text })) },
          ],
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );
  if (!response.ok) {
    throw new Error(`WhatsApp refused the demo request (status ${String(response.status)})`);
  }
};
