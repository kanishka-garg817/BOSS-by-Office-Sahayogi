import { z } from "zod";

const dbEnvSchema = z.object({
  DATABASE_URL: z
    .url({ protocol: /^postgres(ql)?$/ })
    .describe("PostgreSQL connection string, e.g. postgresql://user:password@host:5432/db"),
});

/** Validated lazily so importing this package never throws at build time. */
export const getDbEnv = () => {
  const parsed = dbEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid database environment: ${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
};
