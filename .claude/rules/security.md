# Security

- Secrets live only in environment variables. Never hard-code credentials, tokens or connection strings; never log them; never commit `.env`.
- Only `NEXT_PUBLIC_*` variables may reach the browser, and they must contain nothing sensitive.
- Server-only modules start with `import "server-only"` (env, db, auth, anything touching secrets). Never import them from client components.
- Validate and sanitize all input with zod on the server, including server actions and route handlers; do not trust client-side validation.
- Database: parameterized queries through Drizzle only. No string-built SQL. Use least-privilege DB roles per environment.
- Authentication and authorization (when added) are enforced on the server for every protected route, action and handler — not only in the UI. Deny by default.
- Never use `dangerouslySetInnerHTML` with unsanitized content. Structured data goes through `JsonLd`, which escapes `<`.
- Mutating endpoints must be protected against CSRF (use server actions or verify origin) and rate-limited when they are public.
- Do not leak internals in responses: return generic error messages, log details server-side.
- Security headers are set in `apps/web/next.config.ts`. Adding a Content-Security-Policy is a planned hardening step; do not loosen existing headers.
- Keep dependencies minimal and pinned; review new packages before adding them.
