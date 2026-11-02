import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

const MARK_FILE = path.join(process.cwd(), "src", "assets", "brand", "boss-mark.png");

/** The BoSS mark as a data URL, so generated images (icons, share previews) can draw it. */
export const readBrandMarkDataUrl = async (): Promise<string> => {
  const file = await readFile(MARK_FILE);
  return `data:image/png;base64,${file.toString("base64")}`;
};

/** The mark's own width to height ratio (189 by 256 pixels). */
export const BRAND_MARK_RATIO = 189 / 256;
