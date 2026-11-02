import { JsonLd } from "@/components/json-ld";
import { FinancePage } from "@/features/module-page/finance/finance-page";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Finance & Accounting Software for Businesses",
  description:
    "BoSS Finance & Accounting brings accounting, invoicing, receivables and payables, banking, GST and financial reports together in one connected platform.",
  path: "/modules/finance-accounting",
});

const breadcrumbs = breadcrumbStructuredData([
  { name: "Modules", path: "/modules" },
  { name: "Finance & Accounting", path: "/modules/finance-accounting" },
]);

const FinanceAccountingPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <FinancePage />
  </>
);

export default FinanceAccountingPage;
