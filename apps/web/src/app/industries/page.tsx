import { JsonLd } from "@/components/json-ld";
import { IndustryDirectory } from "@/features/industries/directory/industry-directory";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Industries: Retail, Manufacturing & More",
  description:
    "See how BoSS supports businesses across industries with connected business management, from retail and manufacturing to other key sectors.",
  path: "/industries",
});

const breadcrumbs = breadcrumbStructuredData([{ name: "Industries", path: "/industries" }]);

const IndustriesPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <IndustryDirectory />
  </>
);

export default IndustriesPage;
