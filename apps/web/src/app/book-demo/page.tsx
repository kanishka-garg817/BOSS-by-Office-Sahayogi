import { ArrowLeft, CheckCircle2, Lock, Mail } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Eyebrow } from "@boss/ui";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Book a Demo — BoSS (Invite-Only)",
  description:
    "BoSS is currently invite-only. If you would like to explore BoSS or request early access, please email us at info@sahayogi.in.",
  path: "/book-demo",
});

const breadcrumbs = breadcrumbStructuredData([{ name: "Book a Demo", path: "/book-demo" }]);

const BookDemoPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <section aria-labelledby="invite-only-heading" className="relative min-h-[75vh] py-16 sm:py-24">
      <SectionBackdrop tone="hero" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-surface/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <Lock className="size-4 text-brand-navy" aria-hidden="true" />
          <Eyebrow className="text-xs font-semibold tracking-wider text-brand-navy uppercase">
            Invite Only Access
          </Eyebrow>
        </div>

        {/* Heading */}
        <h1
          id="invite-only-heading"
          className="mt-6 text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          We are currently invite-only
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-ink/75 sm:text-lg">
          BoSS is being rolled out selectively to ensure every partner gets dedicated onboarding and
          a seamless experience.
        </p>

        {/* Contact / Email Card */}
        <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-ink/10 bg-surface/90 p-8 shadow-xl shadow-brand-navy/5 backdrop-blur-sm sm:p-10">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-navy">
            <Mail className="size-7" aria-hidden="true" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-ink">Want to get in touch?</h2>
          <p className="mt-2 text-sm text-pretty text-ink/70">
            For early access, demo requests, or inquiries, write to our team directly:
          </p>

          <div className="mt-6">
            <a
              href="mailto:info@sahayogi.in"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-brand-navy hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Mail className="size-5" aria-hidden="true" />
              <span>Email us: info@sahayogi.in</span>
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink/60">
            <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
            <span>We usually reply within 24 hours</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-brand-blue"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default BookDemoPage;
