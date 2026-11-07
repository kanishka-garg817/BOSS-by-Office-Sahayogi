import { JsonLd } from "@/components/json-ld";
import { ProfessionalServicesBenefits } from "@/features/industries/professional-services/benefits-section";
import { ProfessionalServicesChallenges } from "@/features/industries/professional-services/challenges-section";
import {
  ctaContent,
  faqContent,
  workflowJsonLd,
} from "@/features/industries/professional-services/content";
import { ProfessionalServicesFaq } from "@/features/industries/professional-services/faq-section";
import { ProfessionalServicesHero } from "@/features/industries/professional-services/hero-section";
import { ProfessionalServicesModules } from "@/features/industries/professional-services/modules-section";
import { ProfessionalServicesWorkflow } from "@/features/industries/professional-services/workflow-section";
import { ModuleCta } from "@/features/module-page/module-cta";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Professional Services Firm Management Software",
  description:
    "See how BoSS helps consulting, legal, accounting and agency firms manage clients, engagements, invoicing, staff and reporting in one connected system.",
  path: "/industries/professional-services",
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
  { name: "Professional Services", path: "/industries/professional-services" },
]);

const ProfessionalServicesPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <JsonLd data={workflowJsonLd} />
    <ProfessionalServicesHero />
    <ProfessionalServicesChallenges />
    <ProfessionalServicesWorkflow />
    <ProfessionalServicesModules />
    <ProfessionalServicesBenefits />
    <ProfessionalServicesFaq />
    <ModuleCta title={ctaContent.heading} text={ctaContent.text} />
  </>
);

export default ProfessionalServicesPage;
