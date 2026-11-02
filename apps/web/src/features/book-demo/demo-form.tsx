"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { submitDemoRequest } from "./actions";
import {
  COMPANY_SIZES,
  MESSAGE_LIMIT,
  type DemoRequestField,
  type DemoRequestState,
} from "./demo-request";

const INITIAL_STATE: DemoRequestState = { status: "idle" };

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-ink/20 bg-surface px-4 text-base text-ink placeholder:text-ink/50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-blue aria-invalid:border-red-600";

type FieldProps = {
  field: DemoRequestField;
  label: string;
  state: DemoRequestState;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    isInvalid: boolean;
    defaultValue: string;
  }) => React.ReactNode;
  hint?: string;
};

/** One form field: its label, the control, and the error or hint underneath. */
const Field = ({ field, label, state, children, hint }: FieldProps) => {
  const id = useId();
  const error = state.status === "error" ? state.fieldErrors[field] : undefined;
  const defaultValue = state.status === "error" ? (state.values[field] ?? "") : "";
  const messageId = `${id}-message`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children({
        id,
        describedBy: error || hint ? messageId : undefined,
        isInvalid: Boolean(error),
        defaultValue,
      })}
      {error ? (
        <p id={messageId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-sm text-ink/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-blue px-7 text-base font-semibold text-white transition-colors hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending…" : "Book my demo"}
    </button>
  );
};

const SuccessMessage = () => (
  <div role="status" className="flex flex-col items-center py-10 text-center">
    <span
      aria-hidden="true"
      className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
    >
      <CircleCheck className="size-8" />
    </span>
    <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
      Thank you. We have your request.
    </h2>
    <p className="mt-3 max-w-sm text-base text-pretty text-ink/70">
      Our team will contact you soon to set up your demo of BoSS.
    </p>
    <Link
      href="/"
      className="mt-6 inline-flex min-h-11 items-center text-base font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
    >
      Back to home
    </Link>
  </div>
);

export const DemoForm = () => {
  const [state, formAction] = useActionState(submitDemoRequest, INITIAL_STATE);
  const consentId = useId();
  const consentError = state.status === "error" ? state.fieldErrors.consent : undefined;

  if (state.status === "success") return <SuccessMessage />;

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field field="name" label="Full name" state={state}>
          {({ id, describedBy, isInvalid, defaultValue }) => (
            <input
              id={id}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              defaultValue={defaultValue}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
        <Field field="company" label="Company name" state={state}>
          {({ id, describedBy, isInvalid, defaultValue }) => (
            <input
              id={id}
              name="company"
              type="text"
              autoComplete="organization"
              required
              maxLength={120}
              defaultValue={defaultValue}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field field="email" label="Work email" state={state}>
          {({ id, describedBy, isInvalid, defaultValue }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={120}
              defaultValue={defaultValue}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
        <Field field="phone" label="Phone or WhatsApp number" state={state}>
          {({ id, describedBy, isInvalid, defaultValue }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={20}
              defaultValue={defaultValue}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <Field field="companySize" label="Number of employees (optional)" state={state}>
        {({ id, describedBy, isInvalid, defaultValue }) => (
          <select
            id={id}
            name="companySize"
            defaultValue={defaultValue}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
            className={inputClass}
          >
            <option value="">Select</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        field="message"
        label="What would you like to see? (optional)"
        state={state}
        hint="For example: stock, billing, payroll, or how your teams work today."
      >
        {({ id, describedBy, isInvalid, defaultValue }) => (
          <textarea
            id={id}
            name="message"
            rows={4}
            maxLength={MESSAGE_LIMIT}
            defaultValue={defaultValue}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
            className={`${inputClass} py-3`}
          />
        )}
      </Field>

      {/* Hidden from people and screen readers; simple bots fill it in and give themselves away. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={consentId}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(consentError)}
            aria-describedby={consentError ? `${consentId}-message` : undefined}
            defaultChecked={false}
            className="mt-1 size-5 shrink-0 rounded border-ink/30 accent-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          />
          <label htmlFor={consentId} className="text-sm text-pretty text-ink/80">
            I agree that BoSS may contact me about this request, as described in the{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-brand-blue underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {consentError ? (
          <p id={`${consentId}-message`} className="mt-1.5 text-sm font-medium text-red-700">
            {consentError}
          </p>
        ) : null}
      </div>

      <SubmitButton />
    </form>
  );
};
