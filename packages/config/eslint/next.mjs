import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";

import { baseConfig } from "./base.mjs";

/** Base rules plus Next.js, React, React Hooks and jsx-a11y (Core Web Vitals preset). */
export const nextConfig = [
  ...nextCoreWebVitals,
  ...baseConfig,
  { languageOptions: { globals: { ...globals.browser } } },
];
