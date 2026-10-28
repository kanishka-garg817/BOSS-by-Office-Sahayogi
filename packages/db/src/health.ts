import "server-only";

import { sql } from "drizzle-orm";

import { getDb } from "./client";

/** Resolves if PostgreSQL answers a trivial query; rejects otherwise. */
export const checkDatabaseConnection = async (): Promise<void> => {
  await getDb().execute(sql`select 1`);
};
