import { ModuleWorkflowsSection } from "@/features/modules/module-workflows-section";
import { ModulesGridSection } from "@/features/modules/modules-grid-section";
import { ModulesHero } from "@/features/modules/modules-hero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Modules",
  description:
    "Explore every module in BoSS, the Business Operations & System Suite, from financial accounting and payroll to sales CRM, inventory, supply chain, document management and legal.",
  path: "/modules",
});

const ModulesPage = () => (
  <>
    <ModulesHero />
    <ModuleWorkflowsSection />
    <ModulesGridSection />
  </>
);

export default ModulesPage;
