import "server-only";

import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .refine((value) => !value.endsWith("/"), "must not end with a trailing slash"),
  /** Google Play listing of the BoSS Android app. Unset until the app is published. */
  NEXT_PUBLIC_PLAY_STORE_URL: z.url().optional(),

  /** Email for demo requests, sent through Resend. Set all three or none. */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** The sender, e.g. "BoSS <demo@your-domain>". The domain must be verified in Resend. */
  LEADS_EMAIL_FROM: z.string().min(1).optional(),
  /** Who receives demo requests: one address, or several separated by commas. */
  LEADS_EMAIL_TO: z.string().min(1).optional(),

  /** WhatsApp for demo requests, through the WhatsApp Business Cloud API. Set the first four or none. */
  WHATSAPP_ACCESS_TOKEN: z.string().min(1).optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().min(1).optional(),
  /** The number that receives demo requests, with country code and digits only, e.g. 919876543210. */
  WHATSAPP_RECIPIENT: z
    .string()
    .regex(/^\d{8,15}$/, "must be digits only, with the country code")
    .optional(),
  /** The approved message template with five body variables (see `.env.example`). */
  WHATSAPP_TEMPLATE_NAME: z.string().min(1).optional(),
  WHATSAPP_TEMPLATE_LANGUAGE: z.string().min(1).default("en"),
});

const hasAllOrNone = (values: readonly unknown[]): boolean =>
  values.every((value) => value !== undefined) || values.every((value) => value === undefined);

const checkedSchema = envSchema
  .refine(
    (value) => hasAllOrNone([value.RESEND_API_KEY, value.LEADS_EMAIL_FROM, value.LEADS_EMAIL_TO]),
    "RESEND_API_KEY, LEADS_EMAIL_FROM and LEADS_EMAIL_TO must be set together",
  )
  .refine(
    (value) =>
      hasAllOrNone([
        value.WHATSAPP_ACCESS_TOKEN,
        value.WHATSAPP_PHONE_NUMBER_ID,
        value.WHATSAPP_RECIPIENT,
        value.WHATSAPP_TEMPLATE_NAME,
      ]),
    "The WHATSAPP_ values (token, phone number id, recipient and template name) must be set together",
  );

const parsed = checkedSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${z.prettifyError(parsed.error)}`);
}

/** Validated server environment. Import only from server code. */
export const env = parsed.data;
export const isProduction = env.APP_ENV === "production";
