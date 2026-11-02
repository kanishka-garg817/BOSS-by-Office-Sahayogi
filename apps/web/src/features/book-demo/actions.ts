"use server";

import { headers } from "next/headers";

import { notifyDemoRequest } from "@/lib/leads/notify-demo-request";
import { createRateLimiter } from "@/lib/rate-limit";

import { demoRequestSchema, type DemoRequestField, type DemoRequestState } from "./demo-request";

const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_VISITOR = 5;
const MAX_REQUESTS_PER_EMAIL = 3;

const isVisitorLimited = createRateLimiter({
  max: MAX_REQUESTS_PER_VISITOR,
  windowMs: ONE_HOUR_MS,
});
const isEmailLimited = createRateLimiter({ max: MAX_REQUESTS_PER_EMAIL, windowMs: ONE_HOUR_MS });

const FORM_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "companySize",
  "message",
  "consent",
  "website",
] as const;

type FormField = (typeof FORM_FIELDS)[number];

const isDemoRequestField = (field: unknown): field is DemoRequestField =>
  typeof field === "string" && FORM_FIELDS.some((name) => name === field && name !== "website");

const SEND_FAILED_MESSAGE =
  "We could not send your request just now. Please try again in a few minutes.";
const TOO_MANY_MESSAGE = "You have sent several requests already. Please try again later.";

const readField = (formData: FormData, field: FormField): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
};

const readFormValues = (formData: FormData): Record<FormField, string> => ({
  name: readField(formData, "name"),
  email: readField(formData, "email"),
  phone: readField(formData, "phone"),
  company: readField(formData, "company"),
  companySize: readField(formData, "companySize"),
  message: readField(formData, "message"),
  consent: readField(formData, "consent"),
  website: readField(formData, "website"),
});

const visitorKey = async (): Promise<string> => {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded ?? requestHeaders.get("x-real-ip") ?? "unknown";
};

/** Receives the Book a Demo form and passes it to the team. */
export const submitDemoRequest = async (
  _previous: DemoRequestState,
  formData: FormData,
): Promise<DemoRequestState> => {
  const values = readFormValues(formData);
  const parsed = demoRequestSchema.safeParse(values);

  if (!parsed.success) {
    // A filled hidden field means a bot; it is told it worked so it learns nothing.
    if (values.website) return { status: "success" };
    const fieldErrors: Partial<Record<DemoRequestField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (isDemoRequestField(field)) fieldErrors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const { name, email, phone, company, companySize, message } = parsed.data;
  if (isVisitorLimited(await visitorKey()) || isEmailLimited(email.toLowerCase())) {
    return { status: "error", message: TOO_MANY_MESSAGE, fieldErrors: {}, values };
  }

  try {
    await notifyDemoRequest({
      name,
      email,
      phone,
      company,
      companySize,
      message,
      submittedAt: new Date(),
    });
  } catch (error) {
    console.error("A demo request could not be passed on", error);
    return { status: "error", message: SEND_FAILED_MESSAGE, fieldErrors: {}, values };
  }
  return { status: "success" };
};
