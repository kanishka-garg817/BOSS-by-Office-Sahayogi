import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { AssistantMascot } from "@/components/layout/assistant-mascot";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isProduction } from "@/env";
import { siteConfig } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  applicationName: siteConfig.name,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang={siteConfig.locale} className={inter.variable} suppressHydrationWarning>
    <body className="bg-canvas font-sans text-ink antialiased">
      <Script id="theme-init" strategy="beforeInteractive">
        {THEME_INIT_SCRIPT}
      </Script>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-brand-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="relative isolate overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <AssistantMascot />
    </body>
  </html>
);

export default RootLayout;
