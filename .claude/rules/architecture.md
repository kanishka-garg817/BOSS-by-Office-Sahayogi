# Architecture

## Layout

- `apps/web` — the Next.js (App Router) app: UI, routes, route handlers, server actions.
- `packages/db` — all PostgreSQL access (Drizzle ORM, schema, migrations). Server-only.
- `packages/config` — shared tsconfig bases and ESLint configs. No runtime code.

## Rules

- Dependency direction: `apps/*` → `packages/*`. Packages never import from apps. Packages do not import each other unless it is a real, one-way dependency.
- Create a new package only when code is shared by 2+ workspaces or needs a hard boundary (e.g. a validation or auth package once it is needed). Otherwise keep code in `apps/web`.
- Import another package only through its `exports` entry (`@boss/db`), never deep paths.
- Database access happens only through `@boss/db`, only from server code (Server Components, route handlers, server actions). UI components never query the database directly; pass data down as props.
- Server Components by default. Add `"use client"` only for interactivity or browser APIs, as deep in the tree as possible.
- Validate every external input (request bodies, params, form data, env) with zod at the boundary. Derive types from schemas (`z.infer`); do not duplicate them.
- Feature code is grouped by domain inside `apps/web/src` (e.g. `src/features/<name>`), with shared primitives in `src/components` and `src/lib`. Route files in `src/app` stay thin.
- Environment variables: read only through validated modules (`apps/web/src/env.ts`, `packages/db/src/env.ts`). Never use `process.env` elsewhere.
- Environments are `development`, `staging`, `production`, selected by `APP_ENV`. Behavior differences go through `APP_ENV`, not `NODE_ENV` guesses.
