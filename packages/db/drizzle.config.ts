import { defineConfig } from "drizzle-kit";

// Single root `.env` shared with the web app. Real environment variables take precedence,
// and a missing file is fine (CI and production inject variables directly).
try {
  process.loadEnvFile(new URL("../../.env", import.meta.url));
} catch {
  // no .env file; rely on the process environment
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and configure it.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
