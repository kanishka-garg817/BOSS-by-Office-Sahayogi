import Image from "next/image";
import Link from "next/link";

import markImage from "@/assets/brand/boss-mark.png";
import { siteConfig } from "@/lib/site";

/** Logo mark with the "BOSS / by Office Sahayogi" wordmark. Links to the home page. */
export const BrandLogo = () => (
  <Link
    href="/"
    aria-label={`${siteConfig.name} by ${siteConfig.publisher} — home`}
    className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
  >
    <Image src={markImage} alt="" priority className="h-9 w-auto lg:h-10" sizes="32px" />
    <span className="flex flex-col leading-none">
      <span className="text-lg font-extrabold text-ink lg:text-xl">BOSS</span>
      <span className="-mt-0.5 text-xs font-medium whitespace-nowrap text-ink/80">
        by Office Sahayogi
      </span>
    </span>
  </Link>
);
