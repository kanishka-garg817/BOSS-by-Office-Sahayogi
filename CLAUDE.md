# BOSS by Office Sahayogi — project instructions

Next.js + TypeScript + Tailwind CSS + PostgreSQL, in a pnpm/Turborepo monorepo.
Read the rules below before writing or changing code. They are mandatory for all future work.

@.claude/rules/architecture.md
@.claude/rules/coding-standards.md
@.claude/rules/security.md
@.claude/rules/seo.md
@.claude/rules/accessibility.md
@.claude/rules/performance.md

## Commands (run from the repo root)

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm check` — format check + lint + typecheck. Must pass before any work is considered done.
- `pnpm format` — apply Prettier
- `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:studio` — Drizzle migrations (needs `DATABASE_URL`)

## Working agreements

- Use pnpm only. Never use npm or yarn, never edit `pnpm-lock.yaml` by hand.
- Pin exact dependency versions. Add a dependency only when the need is concrete; justify it.
- Never bypass failing checks (`--force`, `--legacy-peer-deps`, `eslint-disable`, `@ts-ignore`) — fix the cause.
- Never read, print or commit `.env`. Document new variables in `.env.example`.
- Do not document or build features that do not exist yet. Keep `README.md` and `docs/` accurate to the code.
- Do not add placeholder or fake content (copy, data, structured data, reviews).
- Only commit when asked.
