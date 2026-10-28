import { JsonLd } from "@/components/json-ld";
import { CapabilitiesSection } from "@/features/home/capabilities-section";
import { FaqSection } from "@/features/home/faq-section";
import { HeroSection } from "@/features/home/hero-section";
import { IntegrationsSection } from "@/features/home/integrations-section";
import { MobileAppSection } from "@/features/home/mobile-app-section";
import { ProblemSection } from "@/features/home/problem-section";
import { SolutionsShowcase } from "@/features/home/solutions-showcase";
import { WhyBossSection } from "@/features/home/why-boss-section";
import { playStoreHref } from "@/lib/play-store";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Business Operations & System Suite",
  description:
    "BoSS, short for Business Operations & System Suite, is made by Office Sahayogi. It connects accounting, sales, stock, people and more in one easy place, so your whole business works as one. Start with one module, or connect several.",
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
      brand: { "@type": "Brand", name: siteConfig.name },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: `${siteConfig.name} by ${siteConfig.publisher}`,
      url: absoluteUrl("/"),
      inLanguage: siteConfig.locale,
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

const HomePage = () => (
  <>
    <JsonLd data={structuredData} />
    <HeroSection />
    <ProblemSection />
    <SolutionsShowcase />
    <CapabilitiesSection />
    <IntegrationsSection />
    <MobileAppSection playStoreHref={playStoreHref} />
    <WhyBossSection />
    <FaqSection />
  </>
);

export default HomePage;
