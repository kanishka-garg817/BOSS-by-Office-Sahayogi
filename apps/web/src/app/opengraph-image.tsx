import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} by ${siteConfig.publisher}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview shown when a page of the site is shared on WhatsApp, LinkedIn, X and similar. */
const OpenGraphImage = () => {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#ffffff",
        background: "linear-gradient(135deg, #0066ff 0%, #001f4d 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1 }}>{siteConfig.name}</div>
          <div
            style={{ fontSize: 28, marginTop: 8, opacity: 0.85 }}
          >{`by ${siteConfig.publisher}`}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>
          Your whole business, working as one.
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.85 }}>
          Accounting, sales, stock and payroll in one connected system.
        </div>
      </div>
    </div>,
    size,
  );
};

export default OpenGraphImage;
