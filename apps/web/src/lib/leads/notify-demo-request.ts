import "server-only";

import { isProduction } from "@/env";

import { formatLeadText, type Lead } from "./lead";
import { isEmailConfigured, sendLeadEmail } from "./send-email";
import { isWhatsAppConfigured, sendLeadWhatsApp } from "./send-whatsapp";

/**
 * Passes a demo request to the team by email and WhatsApp, whichever are set up. It succeeds when
 * at least one gets through. When none is set up it only logs the request outside production, so
 * the form can be tried; in production it throws, so a visitor is never told "sent" for nothing.
 */
export const notifyDemoRequest = async (lead: Lead): Promise<void> => {
  const channels = [
    isEmailConfigured() ? { name: "email", send: sendLeadEmail } : null,
    isWhatsAppConfigured() ? { name: "WhatsApp", send: sendLeadWhatsApp } : null,
  ].filter((channel) => channel !== null);

  if (channels.length === 0) {
    if (isProduction) {
      throw new Error("Neither email nor WhatsApp is set up for demo requests");
    }
    console.warn(
      `Demo request (no channel set up, so it was only logged):\n${formatLeadText(lead)}`,
    );
    return;
  }

  const results = await Promise.allSettled(channels.map((channel) => channel.send(lead)));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Could not send a demo request by ${channels[index]?.name ?? "a channel"}`,
        result.reason,
      );
    }
  });
  if (results.every((result) => result.status === "rejected")) {
    throw new Error("The demo request could not be sent by any channel");
  }
};
