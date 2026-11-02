import { JsonLd } from "@/components/json-ld";
import { ModuleWorkflowsSection } from "@/features/modules/module-workflows-section";
import { ModulesGridSection } from "@/features/modules/modules-grid-section";
import { ModulesHero } from "@/features/modules/modules-hero";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Modules for Accounting, Sales, Stock & Payroll",
  description:
    "Explore every BoSS module, from financial accounting and payroll to sales CRM, inventory, supply chain, document management and legal.",
  path: "/modules",
});

const breadcrumbs = breadcrumbStructuredData([{ name: "Modules", path: "/modules" }]);

const ModulesPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <ModulesHero />
    <ModuleWorkflowsSection />
    <ModulesGridSection />
  </>
);

export default ModulesPage;
