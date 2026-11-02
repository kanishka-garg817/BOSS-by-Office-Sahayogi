import { JsonLd } from "@/components/json-ld";
import { FmcgBenefits } from "@/features/industries/food-fmcg/benefits-section";
import { FmcgChallenges } from "@/features/industries/food-fmcg/challenges-section";
import { ctaContent, faqContent, workflowJsonLd } from "@/features/industries/food-fmcg/content";
import { FmcgFaq } from "@/features/industries/food-fmcg/faq-section";
import { FmcgHelps } from "@/features/industries/food-fmcg/helps-section";
import { FmcgHero } from "@/features/industries/food-fmcg/hero-section";
import { FmcgModules } from "@/features/industries/food-fmcg/modules-section";
import { FmcgWorkflow } from "@/features/industries/food-fmcg/workflow-section";
import { ModuleCta } from "@/features/module-page/module-cta";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "FMCG Business Management Software | Food & Consumer Goods ERP",
  description:
    "Discover how BoSS powers FMCG and consumer goods businesses with high-velocity inventory, batch and expiry management, distributor sales, and trade schemes.",
  path: "/industries/food-fmcg",
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
  { name: "Food & FMCG", path: "/industries/food-fmcg" },
]);

const FmcgPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <JsonLd data={workflowJsonLd} />
    <FmcgHero />
    <FmcgChallenges />
    <FmcgWorkflow />
    <FmcgHelps />
    <FmcgModules />
    <FmcgBenefits />
    <FmcgFaq />
    <ModuleCta title={ctaContent.heading} text={ctaContent.text} />
  </>
);

export default FmcgPage;
