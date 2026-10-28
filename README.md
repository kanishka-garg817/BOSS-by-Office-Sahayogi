# BOSS by Office Sahayogi

Website for BOSS. This repository currently contains the technical foundation only — no pages or business features have been built yet.

## Tech stack

| Area       | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19              |
| Language   | TypeScript 6 (strict)                                     |
| Styling    | Tailwind CSS 4                                            |
| Database   | PostgreSQL via Drizzle ORM + `pg`                         |
| Validation | zod 4                                                     |
| Monorepo   | pnpm workspaces + Turborepo                               |
| Quality    | ESLint 9 (typescript-eslint strict, Next, a11y), Prettier |

Versions are pinned exactly in each `package.json` and locked in `pnpm-lock.yaml`.

Why not newer: TypeScript 7 is excluded because `typescript-eslint` supports `<6.1`; ESLint 10 is excluded because `eslint-plugin-react`, `jsx-a11y` and `import` (bundled by `eslint-config-next`) do not yet declare support for it. ESLint 9.39 is its maintenance line; the registry marks it deprecated, and it should be bumped once those plugins support ESLint 10.

## Requirements

- Node.js 24 or newer (`.nvmrc`)
- pnpm 12 — selected automatically from the `packageManager` field
- PostgreSQL 16 or newer

## Structure

```
apps/
  web/             Next.js app (frontend + server-side: route handlers, server actions)
packages/
  db/              PostgreSQL access: Drizzle client, schema, migrations (server-only)
  config/          Shared tsconfig bases and ESLint configs
.claude/           Claude Code settings and project rules
CLAUDE.md          Entry point for Claude Code instructions
turbo.json         Task pipeline (build, lint, typecheck, dev)
```

Dependencies point one way: `apps/*` → `packages/*`. See `.claude/rules/architecture.md` for the full rules.

Routes today: `/` (homepage), `/modules`, `/solutions/[slug]` (one page per solution, linked from the homepage Solution cards, defined in `apps/web/src/config/solutions.ts`), plus the health endpoints below and `robots.txt` / `sitemap.xml`.

What exists in `apps/web` today:

- Root layout with `next/font` (Inter), global metadata and `metadataBase`
- `robots.txt` and `sitemap.xml` routes (indexing enabled only when `APP_ENV=production`; sitemap is empty until pages exist)
- `createPageMetadata` helper (canonical, Open Graph, Twitter, robots) and a `JsonLd` component
- Security headers in `next.config.ts`
- `GET /api/health` (liveness) and `GET /api/health/ready` (readiness, checks PostgreSQL)
- Validated environment access in `src/env.ts`

## Setup

```bash
pnpm install
cp .env.example .env     # then edit the values
```

### Environment variables

One `.env` at the repo root is read by both the web app and the db package. It is git-ignored; `.env.example` is the template. In CI, staging and production, set real environment variables instead — they take precedence over the file.

| Variable               | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `APP_ENV`              | `development`, `staging` or `production`. Non-production is `noindex`.         |
| `NEXT_PUBLIC_SITE_URL` | Public origin without trailing slash; used for canonicals, sitemap, Open Graph |
| `DATABASE_URL`         | PostgreSQL connection string (server-only)                                     |

Missing or invalid values fail fast with a clear error.

### Database

Create a database and put its connection string in `DATABASE_URL`:

```bash
createdb boss_dev
```

No tables exist yet. When schema is added in `packages/db/src/schema`:

```bash
pnpm db:generate   # create a SQL migration from the schema
pnpm db:migrate    # apply migrations
pnpm db:studio     # inspect data
```

Verify connectivity with the app running: `curl localhost:3000/api/health/ready`.

## Development

```bash
pnpm dev     # http://localhost:3000
```

Validation commands (all run from the repo root):

| Command             | Purpose                           |
| ------------------- | --------------------------------- |
| `pnpm format`       | Apply Prettier                    |
| `pnpm format:check` | Check formatting                  |
| `pnpm lint`         | ESLint in every workspace         |
| `pnpm typecheck`    | `tsc` in every workspace (strict) |
| `pnpm check`        | format check + lint + typecheck   |

Run `pnpm check` before every commit.

## Production build

```bash
pnpm build
pnpm start    # serves on port 3000; set PORT to change
```

Set `APP_ENV`, `NEXT_PUBLIC_SITE_URL` and `DATABASE_URL` in the build and runtime environment. **`APP_ENV` and `NEXT_PUBLIC_SITE_URL` are baked into the pages at build time** (canonical URLs, `robots.txt`, sitemap, indexing), so build each environment with its own values — e.g. `APP_ENV=production NEXT_PUBLIC_SITE_URL=https://your-domain pnpm build`. A build made with development values will serve `noindex`. Use `/api/health` for liveness and `/api/health/ready` for readiness probes.

## Claude Code

`CLAUDE.md` and `.claude/rules/` define the architecture, coding, security, SEO, accessibility and performance standards that all future changes must follow.
