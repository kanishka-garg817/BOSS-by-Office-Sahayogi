import Image from "next/image";
import Link from "next/link";

import markImage from "@/assets/brand/boss-mark.png";
import { siteConfig } from "@/lib/site";

/** The logo mark with "BoSS" beside it, centred on the same line. Links to the home page. */
export const BrandLogo = () => (
  <Link
    href="/"
    aria-label={`${siteConfig.name} by ${siteConfig.publisher} — home`}
    className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
  >
    <Image src={markImage} alt="" priority className="h-8 w-auto lg:h-9" sizes="36px" />
    <span className="text-xl leading-none font-extrabold text-ink lg:text-2xl">BoSS</span>
  </Link>
);
