import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getDbEnv } from "./env";
import * as schema from "./schema";

const createDb = () => {
  const pool = new Pool({ connectionString: getDbEnv().DATABASE_URL, max: 10 });
  return drizzle({ client: pool, schema });
};

export type Database = ReturnType<typeof createDb>;

// Reused across hot reloads in development so connections are not leaked.
const globalForDb = globalThis as typeof globalThis & { __bossDb?: Database };

/** Returns the shared Drizzle client, creating the connection pool on first use. */
export const getDb = (): Database => {
  globalForDb.__bossDb ??= createDb();
  return globalForDb.__bossDb;
};
