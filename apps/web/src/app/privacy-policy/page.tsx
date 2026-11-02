import { JsonLd } from "@/components/json-ld";
import { privacyPolicy } from "@/config/legal/privacy-policy";
import { LegalPage } from "@/features/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How BoSS by Office Sahayogi collects, uses and protects the information you share on this website, including what you send through the Book a Demo form.",
  path: "/privacy-policy",
});

const breadcrumbs = breadcrumbStructuredData([{ name: "Privacy Policy", path: "/privacy-policy" }]);

const PrivacyPolicyPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <LegalPage document={privacyPolicy} />
  </>
);

export default PrivacyPolicyPage;
