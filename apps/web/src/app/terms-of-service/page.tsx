import { JsonLd } from "@/components/json-ld";
import { termsOfService } from "@/config/legal/terms-of-service";
import { LegalPage } from "@/features/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using the BoSS by Office Sahayogi website, including demo requests, ownership of content, sample data and third-party names.",
  path: "/terms-of-service",
});

const breadcrumbs = breadcrumbStructuredData([
  { name: "Terms of Service", path: "/terms-of-service" },
]);

const TermsOfServicePage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <LegalPage document={termsOfService} />
  </>
);

export default TermsOfServicePage;
