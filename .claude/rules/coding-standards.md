# Coding standards

- TypeScript strict mode (plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) is on. Keep it on.
- No `any`, no non-null `!`, no `as` casts to silence errors, no `@ts-ignore`. Use `unknown` and narrow, or parse with zod.
- Prefer `type` over `interface`. Use string-literal unions or `as const` objects instead of `enum`. Model states with discriminated unions.
- Use `import { type X }` for type-only imports.
- Named exports everywhere, except where Next.js requires default exports (`page`, `layout`, `route` handlers use named method exports, config files).
- Small, single-purpose functions with intention-revealing names. Early returns over nesting. No magic numbers or strings — name them.
- No duplicated logic: extract on the second real repetition, not before. No speculative abstractions, flags or config for hypothetical needs.
- Comments explain why, never what. No commented-out code, no TODOs without an owner and reason.
- Errors: throw `Error`s (or typed subclasses) for exceptional cases; do not swallow errors; do not return `null` to mean failure. Log on the server with `console.error`/`console.warn` (`console.log` is a lint error).
- Tailwind: utility classes in JSX, design tokens in `@theme` in `globals.css`; no arbitrary values when a token fits; no inline `style` for static styling.
- Formatting is owned by Prettier; lint by ESLint. Run `pnpm check` and fix everything before finishing.
