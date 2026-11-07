import { JsonLd } from "@/components/json-ld";
import { EducationBenefits } from "@/features/industries/education/benefits-section";
import { EducationChallenges } from "@/features/industries/education/challenges-section";
import { faqContent, workflowJsonLd } from "@/features/industries/education/content";
import { EducationCta } from "@/features/industries/education/cta-section";
import { EducationFaq } from "@/features/industries/education/faq-section";
import { EducationHero } from "@/features/industries/education/hero-section";
import { EducationModules } from "@/features/industries/education/modules-section";
import { EducationWorkflow } from "@/features/industries/education/workflow-section";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Education Institution Management Software",
  description:
    "See how BoSS helps educational institutions organise admissions, staff, fees, and everyday administrative operations in one connected system.",
  path: "/industries/education",
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
  { name: "Education", path: "/industries/education" },
]);

const EducationPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <JsonLd data={faqJsonLd} />
    <JsonLd data={workflowJsonLd} />
    <EducationHero />
    <EducationChallenges />
    <EducationWorkflow />
    <EducationModules />
    <EducationBenefits />
    <EducationFaq />
    <EducationCta />
  </>
);

export default EducationPage;
