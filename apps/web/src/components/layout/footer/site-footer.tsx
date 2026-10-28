import Image from "next/image";
import Link from "next/link";

import markImage from "@/assets/brand/boss-mark.png";
import { siteConfig } from "@/lib/site";

import { FooterSocial } from "./footer-social";
import { FooterFloatingIcons } from "./footer-floating-icons";
import { footerColumns, type FooterLink } from "./footer-links";

const linkClass =
  "inline-flex min-h-8 items-center rounded-md text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const FooterAnchor = ({ link }: { link: FooterLink }) => {
  if ("solutionSlug" in link) {
    return (
      <Link href={`/solutions/${link.solutionSlug}`} className={linkClass}>
        {link.label}
      </Link>
    );
  }
  if ("isPlanned" in link) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
};

const linkKey = (link: FooterLink): string =>
  "solutionSlug" in link ? link.solutionSlug : link.href;

export const SiteFooter = () => (
  <footer className="relative isolate overflow-hidden bg-linear-to-br from-brand-blue via-brand-blue to-brand-navy text-white">
    <FooterFloatingIcons />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-white/10 blur-3xl"
    />

    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <Link
            href="/"
            aria-label={`${siteConfig.name} by ${siteConfig.publisher} — home`}
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-white shadow-lg">
              <Image src={markImage} alt="" className="h-7 w-auto" sizes="28px" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-extrabold">BOSS</span>
              <span className="mt-0.5 text-xs font-medium text-white/80">by Office Sahayogi</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-base font-semibold text-balance">
            Business Operations &amp; System Suite
          </p>
          <p className="mt-2 max-w-sm text-sm text-pretty text-white/75">
            Sales, accounts, stock and people, connected in one place and easy for everyone on your
            team.
          </p>
          <FooterSocial />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_1.8fr_1fr]">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-bold tracking-widest text-white uppercase">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={linkKey(link)}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p
        aria-hidden="true"
        className="mt-12 -mb-4 text-center text-[22vw] leading-none font-extrabold tracking-tight text-white/10 select-none lg:text-[14rem]"
      >
        BOSS
      </p>

      <div className="relative flex flex-col items-center justify-between gap-2 border-t border-white/15 py-6 text-xs text-white/70 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.publisher}. All rights reserved.
        </p>
        <p>BoSS is a product of {siteConfig.publisher}.</p>
      </div>
    </div>
  </footer>
);
