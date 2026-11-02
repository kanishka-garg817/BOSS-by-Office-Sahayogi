import { ImageResponse } from "next/og";

import { readBrandMarkDataUrl } from "@/lib/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const AppleIcon = async () => {
  const mark = await readBrandMarkDataUrl();
  return new ImageResponse(
    <div
      style={{ display: "flex", width: "100%", height: "100%", padding: 28, background: "#ffffff" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${mark})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </div>,
    size,
  );
};

export default AppleIcon;
