export const dynamic = "force-dynamic";

/** Liveness probe: the process is up and serving requests. */
export const GET = () =>
  Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
