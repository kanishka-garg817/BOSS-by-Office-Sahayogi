import { JsonLd } from "@/components/json-ld";
import { GarmentsChallenges } from "@/features/industries/garments-fashion/challenges-section";
import {
  ctaContent,
  faqContent,
  workflowJsonLd,
} from "@/features/industries/garments-fashion/content";
import { GarmentsFaq } from "@/features/industries/garments-fashion/faq-section";
import { GarmentsHelps } from "@/features/industries/garments-fashion/helps-section";
import { GarmentsHero } from "@/features/industries/garments-fashion/hero-section";
import { GarmentsModules } from "@/features/industries/garments-fashion/modules-section";
import { GarmentsWorkflow } from "@/features/industries/garments-fashion/workflow-section";
import { ModuleCta } from "@/features/module-page/module-cta";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Garments & Fashion Business Management Software",
  description:
    "See how BoSS helps garments and fashion businesses manage production, job-work, stock by style, colour and size, and sales across every channel.",
  path: "/industries/garments-fashion",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqContent.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbs = breadcrumbStructuredData([
  { name: "Industries", path: "/industries" },
  { name: "Garments & Fashion", path: "/industries/garments-fashion" },
]);

const GarmentsFashionPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <JsonLd data={workflowJsonLd} />
    <GarmentsHero />
    <GarmentsChallenges />
    <GarmentsWorkflow />
    <GarmentsHelps />
    <GarmentsModules />
    <GarmentsFaq />
    <ModuleCta title={ctaContent.heading} text={ctaContent.text} />
  </>
);

export default GarmentsFashionPage;
