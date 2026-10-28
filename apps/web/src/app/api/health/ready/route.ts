import { checkDatabaseConnection } from "@boss/db";

export const dynamic = "force-dynamic";

/** Readiness probe: the process can reach PostgreSQL. */
export const GET = async () => {
  const headers = { "Cache-Control": "no-store" };
  try {
    await checkDatabaseConnection();
    return Response.json({ status: "ok" }, { headers });
  } catch (error) {
    console.error("Readiness check failed", error);
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
};
