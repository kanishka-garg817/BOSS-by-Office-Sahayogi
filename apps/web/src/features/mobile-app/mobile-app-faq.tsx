import { ChevronDown } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { appFaqs } from "@/config/mobile-app";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: appFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const MobileAppFaq = () => (
  <section aria-labelledby="app-faq-heading" className="relative pt-14 pb-20 sm:pt-20 sm:pb-28">
    <JsonLd data={faqJsonLd} />
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="reveal-on-scroll text-center">
        <Eyebrow>Questions</Eyebrow>
        <h2
          id="app-faq-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          Questions about the app
        </h2>
      </div>
      <div className="mt-10 space-y-3">
        {appFaqs.map((faq) => (
          <details
            key={faq.question}
            className="group reveal-on-scroll rounded-2xl border border-ink/10 bg-surface px-5 py-4 open:border-brand-blue/40 open:shadow-lg open:shadow-brand-blue/10"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-brand-blue transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-sm text-pretty text-ink/70">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
