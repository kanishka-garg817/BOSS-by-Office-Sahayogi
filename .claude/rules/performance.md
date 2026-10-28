# Performance

- Default to Server Components; ship as little client JavaScript as possible. Keep `"use client"` boundaries small and leaf-level.
- Fetch data on the server, in parallel (`Promise.all`) where independent; avoid request waterfalls. Use caching/revalidation deliberately (`"use cache"`/`revalidate` as the Next.js version provides), never by accident.
- Use `next/image` and `next/font`; size media explicitly to prevent layout shift; lazy-load below-the-fold media.
- Split heavy, rarely-used client code with dynamic imports. Check bundle impact before adding any client-side dependency.
- No new dependency for something the platform, React or Next.js already does.
- Database: select only needed columns, index columns used in filters/joins, paginate lists, avoid N+1 queries, reuse the shared pool from `getDb()`.
- Avoid unnecessary re-renders: stable props, derive state instead of syncing it, no state for values computable during render.
- Run `pnpm build` and review the route output before finishing work that adds routes or client code.
