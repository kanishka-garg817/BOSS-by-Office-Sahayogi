import "server-only";

import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .refine((value) => !value.endsWith("/"), "must not end with a trailing slash"),
  /** Google Play listing of the BoSS Android app. Unset until the app is published. */
  NEXT_PUBLIC_PLAY_STORE_URL: z.url().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${z.prettifyError(parsed.error)}`);
}

/** Validated server environment. Import only from server code. */
export const env = parsed.data;
export const isProduction = env.APP_ENV === "production";
