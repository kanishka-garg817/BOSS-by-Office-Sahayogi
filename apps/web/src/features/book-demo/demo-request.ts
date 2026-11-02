import { z } from "zod";

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 120;
const COMPANY_MAX_LENGTH = 120;
const MESSAGE_MAX_LENGTH = 1000;

/** A phone number: digits with an optional leading +, and spaces, dashes or brackets between. */
const PHONE_PATTERN = /^\+?[\d\s\-()]{7,20}$/;

/** What the Book a Demo form sends. This runs on the server; the form only hints. */
export const demoRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, "Enter your full name.")
    .max(NAME_MAX_LENGTH, "That name is too long."),
  email: z
    .email("Enter a valid email address.")
    .max(EMAIL_MAX_LENGTH, "That email address is too long."),
  phone: z.string().trim().regex(PHONE_PATTERN, "Enter a valid phone number."),
  company: z
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, "Enter your company name.")
    .max(COMPANY_MAX_LENGTH, "That company name is too long."),
  companySize: z.union([z.enum(COMPANY_SIZES), z.literal("")]),
  message: z.string().trim().max(MESSAGE_MAX_LENGTH, "Please keep your message shorter."),
  consent: z.literal("on", { error: "Please agree so that we can contact you." }),
  /** A hidden field that people leave empty and simple bots fill in. */
  website: z.string().max(0),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

export type DemoRequestField = keyof Omit<DemoRequest, "website">;

export type DemoRequestState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<DemoRequestField, string>>;
      /** What the visitor typed, so a failed send does not clear the form. */
      values: Partial<Record<DemoRequestField, string>>;
    };

export const MESSAGE_LIMIT = MESSAGE_MAX_LENGTH;
