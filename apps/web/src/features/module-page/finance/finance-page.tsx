import { financeSubnav } from "@/config/module-pages/finance-accounting";

import { ModuleCta } from "../module-cta";
import { ModuleSubnav } from "../module-subnav";
import { FinanceFeatureMenu } from "./feature-menu";
import { CapabilitiesSection } from "./capabilities-section";
import { FinanceHero } from "./hero-section";

import { ReportsSection } from "./product-sections";

/** The Finance & Accounting module's main page: the dashboard, what it covers and its reports. */
export const FinancePage = () => (
  <>
    <ModuleSubnav
      moduleName="Finance & Accounting"
      items={financeSubnav}
      featurePanel={<FinanceFeatureMenu />}
    />
    <div id="overview" className="scroll-mt-40 lg:scroll-mt-32">
      <FinanceHero />
      <CapabilitiesSection />
    </div>
    <ReportsSection />
    <ModuleCta
      title="Simplify Finance. Run Your Business Better."
      text="Bring accounting, invoicing, compliance and financial visibility together with BoSS."
    />
  </>
);
