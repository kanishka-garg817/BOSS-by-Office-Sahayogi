import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const { light: lightThemeColor } = siteConfig.themeColor;

const manifest = (): MetadataRoute.Manifest => ({
  name: `${siteConfig.name} by ${siteConfig.publisher}`,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: "/",
  display: "browser",
  background_color: lightThemeColor,
  theme_color: lightThemeColor,
  lang: siteConfig.locale,
  icons: [
    { src: "/icon", sizes: "64x64", type: "image/png" },
    { src: "/apple-icon", sizes: "180x180", type: "image/png" },
  ],
});

export default manifest;
