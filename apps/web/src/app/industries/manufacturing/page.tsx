import { JsonLd } from "@/components/json-ld";
import {
  ctaContent,
  faqContent,
  workflowJsonLd,
} from "@/features/industries/manufacturing/content";
import { ManufacturingBenefits } from "@/features/industries/manufacturing/benefits-section";
import { ManufacturingChallenges } from "@/features/industries/manufacturing/challenges-section";
import { ManufacturingFaq } from "@/features/industries/manufacturing/faq-section";
import { ManufacturingHero } from "@/features/industries/manufacturing/hero-section";
import { ManufacturingModules } from "@/features/industries/manufacturing/modules-section";
import { ManufacturingWorkflow } from "@/features/industries/manufacturing/workflow-section";
import { ModuleCta } from "@/features/module-page/module-cta";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Manufacturing Business Management Software",
  description:
    "See how BoSS helps manufacturing businesses manage purchasing, inventory, production records, sales, dispatch, accounts and reports.",
  path: "/industries/manufacturing",
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
  { name: "Manufacturing", path: "/industries/manufacturing" },
]);

const ManufacturingPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <JsonLd data={workflowJsonLd} />
    <ManufacturingHero />
    <ManufacturingChallenges />
    <ManufacturingWorkflow />
    <ManufacturingModules />
    <ManufacturingBenefits />
    <ManufacturingFaq />
    <ModuleCta title={ctaContent.heading} text={ctaContent.text} />
  </>
);

export default ManufacturingPage;
