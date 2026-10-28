import { MobileAppFaq } from "@/features/mobile-app/mobile-app-faq";
import { MobileAppHero } from "@/features/mobile-app/mobile-app-hero";
import { MobileAppPrivacy } from "@/features/mobile-app/mobile-app-privacy";
import { playStoreHref } from "@/lib/play-store";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mobile App",
  description:
    "The BoSS mobile app runs on Android phones. Check in, apply for leave, see your payslips, raise claims and ask Sahayogi, all from your phone.",
  path: "/mobile-app",
});

const MobileAppPage = () => (
  <>
    <MobileAppHero playStoreHref={playStoreHref} />
    <MobileAppPrivacy />
    <MobileAppFaq />
  </>
);

export default MobileAppPage;
