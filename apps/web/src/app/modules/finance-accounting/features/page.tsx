import { JsonLd } from "@/components/json-ld";
import { FinanceFeaturesPage } from "@/features/module-page/finance/features-page";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Finance & Accounting Features",
  description:
    "The main features of BoSS Finance & Accounting: accounting, invoicing and billing, receivables and payables, banking, GST and compliance, and financial reports.",
  path: "/modules/finance-accounting/features",
});

const breadcrumbs = breadcrumbStructuredData([
  { name: "Modules", path: "/modules" },
  { name: "Finance & Accounting", path: "/modules/finance-accounting" },
  { name: "Features", path: "/modules/finance-accounting/features" },
]);

const FinanceAccountingFeaturesPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <FinanceFeaturesPage />
  </>
);

export default FinanceAccountingFeaturesPage;
