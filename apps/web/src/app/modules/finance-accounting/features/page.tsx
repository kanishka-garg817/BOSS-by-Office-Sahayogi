import { FinanceFeaturesPage } from "@/features/module-page/finance/features-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Finance & Accounting Features",
  description:
    "The main features of BoSS Finance & Accounting: accounting, invoicing and billing, receivables and payables, banking, GST and compliance, and financial reports.",
  path: "/modules/finance-accounting/features",
});

const FinanceAccountingFeaturesPage = () => <FinanceFeaturesPage />;

export default FinanceAccountingFeaturesPage;
