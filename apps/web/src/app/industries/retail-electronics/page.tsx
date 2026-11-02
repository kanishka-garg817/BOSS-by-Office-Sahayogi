import { JsonLd } from "@/components/json-ld";
import { RetailElectronicsBenefits } from "@/features/industries/retail-electronics/benefits-section";
import { RetailElectronicsChallenges } from "@/features/industries/retail-electronics/challenges-section";
import { RetailElectronicsComparison } from "@/features/industries/retail-electronics/comparison-section";
import { ctaContent, faqContent } from "@/features/industries/retail-electronics/content";
import { RetailElectronicsFaq } from "@/features/industries/retail-electronics/faq-section";
import { RetailElectronicsHelps } from "@/features/industries/retail-electronics/helps-section";
import { RetailElectronicsHero } from "@/features/industries/retail-electronics/hero-section";
import { RetailElectronicsModules } from "@/features/industries/retail-electronics/modules-section";
import { RetailElectronicsWorkflow } from "@/features/industries/retail-electronics/workflow-section";
import { ModuleCta } from "@/features/module-page/module-cta";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Retail & Electronics Business Management Software",
  description:
    "How BoSS can support an electronics business, from purchasing and stock to sales, billing, finance and reports.",
  path: "/industries/retail-electronics",
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
  { name: "Retail & Electronics", path: "/industries/retail-electronics" },
]);

const RetailElectronicsPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <RetailElectronicsHero />
    <RetailElectronicsChallenges />
    <RetailElectronicsWorkflow />
    <RetailElectronicsHelps />
    <RetailElectronicsComparison />
    <RetailElectronicsBenefits />
    <RetailElectronicsModules />
    <RetailElectronicsFaq />
    <ModuleCta title={ctaContent.heading} text={ctaContent.text} />
  </>
);

export default RetailElectronicsPage;
