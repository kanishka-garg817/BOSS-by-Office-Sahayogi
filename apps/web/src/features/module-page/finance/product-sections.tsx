import { ProductSection } from "../product-section";
import { ReportsDemo } from "./reports-demo";

export const ReportsSection = () => (
  <ProductSection
    id="reports"
    eyebrow="Financial Reports"
    title="Turn Financial Data Into Business Insights"
    text="Each report answers one question about your business. Pick one, then follow any number down to the entry behind it."
  >
    <ReportsDemo />
  </ProductSection>
);
