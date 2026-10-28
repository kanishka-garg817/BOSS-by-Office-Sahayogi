import { Plus, X } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { homeFaqs } from "@/config/faqs";
import { bookDemoAction } from "@/config/navigation";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * The questions people ask first. The heading and a card to book a demo are on the left, and the
 * questions on the right, with the first one, "What is BoSS?", open from the start.
 */
export const FaqSection = () => (
  <section id="faq" aria-labelledby="faq-heading" className="relative scroll-mt-20 py-16 sm:py-24">
    <JsonLd data={faqJsonLd} />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_oklab,var(--color-brand-blue)_14%,transparent),transparent_65%)]"
    />
    <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
      <div className="reveal-on-scroll">
        <p className="flex items-center gap-2 text-base font-semibold text-ink">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-blue" />
          FAQs
        </p>
        <h2
          id="faq-heading"
          className="mt-4 max-w-sm text-4xl leading-tight font-semibold tracking-tight text-balance text-ink lg:text-5xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-8 rounded-3xl bg-surface p-7 shadow-xl ring-1 shadow-brand-navy/5 ring-ink/5">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-tint">
            <svg viewBox="0 0 48 48" aria-hidden="true" className="size-11" strokeWidth="1.5">
              <rect
                x="6"
                y="9"
                width="36"
                height="33"
                rx="7"
                className="fill-white stroke-slate-300"
              />
              <path
                d="M6 16 a7 7 0 0 1 7 -7 H35 a7 7 0 0 1 7 7 V20 H6 Z"
                className="fill-brand-blue"
              />
              <rect x="14" y="4" width="4" height="9" rx="2" className="fill-brand-navy" />
              <rect x="30" y="4" width="4" height="9" rx="2" className="fill-brand-navy" />
              {[16, 24, 32].map((x) => (
                <g key={x}>
                  <rect x={x - 2} y="26" width="5" height="4" rx="1.5" className="fill-slate-200" />
                  <rect x={x - 2} y="34" width="5" height="4" rx="1.5" className="fill-slate-200" />
                </g>
              ))}
              <circle cx="35" cy="34" r="9" className="fill-emerald-500" />
              <path
                d="M30.5 34 L34 37.5 L40 30.5"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Book a demo</h3>
          <p className="mt-2 text-sm text-pretty text-ink/70">
            If you have any questions, just book a demo and we will walk you through BoSS for your
            business.
          </p>
          <a
            href={bookDemoAction.href}
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-brand-blue px-6 text-base font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            {bookDemoAction.label}
          </a>
        </div>
      </div>

      <div className="space-y-3.5">
        {homeFaqs.map((faq, index) => (
          <details
            key={faq.id}
            open={index === 0}
            className="group reveal-on-scroll rounded-2xl bg-surface px-6 py-4 shadow-lg ring-1 shadow-brand-navy/5 ring-ink/5 transition hover:ring-brand-blue/30"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span aria-hidden="true" className="shrink-0 text-ink">
                <Plus className="size-5 group-open:hidden" />
                <X className="hidden size-5 group-open:block" />
              </span>
            </summary>
            <p className="mt-2 mb-1 max-w-2xl text-sm leading-relaxed text-pretty text-ink/60">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
