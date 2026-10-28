import { FinancePage } from "@/features/module-page/finance/finance-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Finance & Accounting",
  description:
    "BoSS Finance & Accounting brings accounting, invoicing, receivables and payables, banking, GST and financial reports together in one connected platform.",
  path: "/modules/finance-accounting",
});

const FinanceAccountingPage = () => <FinancePage />;

export default FinanceAccountingPage;
