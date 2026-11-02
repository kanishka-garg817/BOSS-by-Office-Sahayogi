import { ImageResponse } from "next/og";

import { readBrandMarkDataUrl } from "@/lib/brand-image";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const Icon = async () => {
  const mark = await readBrandMarkDataUrl();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${mark})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />,
    size,
  );
};

export default Icon;
