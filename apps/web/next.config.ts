import type { NextConfig } from "next";

// Single root `.env` shared with the db package. Variables already present in the process
// environment (CI, staging, production) always win; a missing file is fine.
try {
  process.loadEnvFile(new URL("../../.env", import.meta.url));
} catch {
  // no .env file; rely on the process environment
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  // Workspace packages are shipped as TypeScript source.
  transpilePackages: ["@boss/db"],
  // `pg` uses Node internals and must not be bundled.
  serverExternalPackages: ["pg"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Quality levels `next/image` may request; 95 keeps the dashboard screenshot sharp.
    qualities: [75, 95],
  },
  headers: () => Promise.resolve([{ source: "/:path*", headers: securityHeaders }]),
};

export default nextConfig;
