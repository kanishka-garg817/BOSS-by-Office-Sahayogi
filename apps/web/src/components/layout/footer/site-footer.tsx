import Image from "next/image";
import Link from "next/link";

import markImage from "@/assets/brand/boss-mark.png";
import { LiftAssistantMarker } from "@/components/layout/lift-assistant-marker";
import { siteConfig } from "@/lib/site";

import { FooterSocial } from "./footer-social";
import { footerColumns, legalLinks, type FooterLink } from "./footer-links";

const linkClass =
  "inline-flex min-h-8 items-center rounded-md text-sm text-light-ink/70 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const legalLinkClass =
  "rounded-md transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const FooterAnchor = ({ link, className }: { link: FooterLink; className?: string }) => {
  if ("isPlanned" in link) {
    return (
      <a href={link.href} className={className ?? linkClass}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className ?? linkClass}>
      {link.label}
    </Link>
  );
};

/** The soft blue waves in the bottom-left corner of the footer. */
const FooterWaves = () => (
  <>
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 -z-10 h-80 w-3/4 text-brand-blue"
    >
      <path
        d="M0 120 C 180 200, 300 330, 520 350 C 700 366, 860 320, 1200 420 L0 420 Z"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path
        d="M0 250 C 160 270, 260 360, 460 372 C 640 382, 800 350, 1000 420 L0 420 Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  </>
);

export const SiteFooter = () => (
  <footer className="relative isolate overflow-hidden border-t border-light-ink/10 bg-footer text-light-ink">
    <FooterWaves />

    <div className="mx-auto max-w-screen-2xl px-4 pt-20 sm:px-6 lg:px-12">
      <div className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-0">
          <div className="lg:pr-10">
            <Link
              href="/"
              aria-label={`${siteConfig.name} by ${siteConfig.publisher} — home`}
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              <Image src={markImage} alt="" className="h-12 w-auto" sizes="48px" />
              <span className="text-3xl leading-none font-extrabold">BoSS</span>
            </Link>
            <p className="mt-6 max-w-sm text-lg font-semibold text-balance">
              Business Operations &amp; System Suite
            </p>
            <p className="mt-2 max-w-sm text-sm text-pretty text-light-ink/70">
              Sales, finance, inventory, people and operations — all in one place, so you can run
              and grow your business with ease.
            </p>
            <FooterSocial />
          </div>

          <nav
            aria-label="Footer"
            className="relative grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[1fr_1.8fr_1.6fr_1fr]"
          >
            {footerColumns.map((column) => (
              <div key={column.heading} className="lg:pl-8">
                <h2 className="text-sm font-bold tracking-widest text-light-ink uppercase">
                  {column.headingHref ? (
                    <Link href={column.headingHref} className={legalLinkClass}>
                      {column.heading}
                    </Link>
                  ) : (
                    column.heading
                  )}
                </h2>
                <ul className="mt-5 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
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
          className="pointer-events-none mt-6 mb-6 hidden text-center text-[6rem] leading-none font-semibold tracking-tight whitespace-nowrap text-brand-blue/10 select-none lg:block xl:text-[8rem]"
        >
          Business Simplified
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-2 border-t border-light-ink/10 py-6 text-xs text-light-ink/70 sm:flex-row">
        <LiftAssistantMarker />
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName} (CIN {siteConfig.cin}) · Built in
          India
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {legalLinks.map((link, index) => (
            <li key={link.label} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true" className="h-3 w-px bg-light-ink/20" /> : null}
              <FooterAnchor link={link} className={legalLinkClass} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
