import { Plus, X } from "lucide-react";

import { faqContent } from "./content";

export const RetailElectronicsFaq = () => (
  <section aria-labelledby="industry-faq-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2
        id="industry-faq-heading"
        className="text-center text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
      >
        {faqContent.heading}
      </h2>

      <div className="mt-10 space-y-3">
        {faqContent.items.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-2xl border border-ink/10 bg-surface px-6 py-4 transition hover:border-brand-blue/30"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:text-lg [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span aria-hidden="true" className="shrink-0 text-ink">
                <Plus className="size-5 group-open:hidden" />
                <X className="hidden size-5 group-open:block" />
              </span>
            </summary>
            <p className="mt-2 mb-1 text-sm leading-relaxed text-pretty text-ink/70 sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
