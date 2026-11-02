import { JsonLd } from "@/components/json-ld";
import { MobileAppFaq } from "@/features/mobile-app/mobile-app-faq";
import { MobileAppHero } from "@/features/mobile-app/mobile-app-hero";
import { MobileAppPrivacy } from "@/features/mobile-app/mobile-app-privacy";
import { playStoreHref } from "@/lib/play-store";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Mobile App: Attendance, Leave, Payslips & Claims",
  description:
    "The BoSS mobile app runs on Android phones. Check in, apply for leave, see payslips, raise claims and ask Sahayogi from your phone.",
  path: "/mobile-app",
});

const breadcrumbs = breadcrumbStructuredData([{ name: "Mobile App", path: "/mobile-app" }]);

const MobileAppPage = () => (
  <>
    <JsonLd data={breadcrumbs} />
    <MobileAppHero playStoreHref={playStoreHref} />
    <MobileAppPrivacy />
    <MobileAppFaq />
  </>
);

export default MobileAppPage;
