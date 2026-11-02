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
import { homeStructuredData } from "@/lib/structured-data";

const HOME_TITLE = "BoSS | All-in-One Business Management Software";
const HOME_DESCRIPTION =
  "BoSS by Office Sahayogi connects accounting, sales, stock and payroll in one business management system. Start with one module and add more as you grow.";

export const metadata = createPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  hasFullTitle: true,
});

const structuredData = homeStructuredData({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  playStoreUrl: playStoreHref,
});

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
