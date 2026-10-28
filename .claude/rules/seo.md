# SEO

Every public page must ship SEO-complete. Do not add fake or filler content to "improve SEO".

- Metadata: every public route exports `metadata` or `generateMetadata` built with `createPageMetadata` (`apps/web/src/lib/seo.ts`): unique title, unique description, canonical, Open Graph, Twitter. Never set a canonical in the root layout.
- Canonical URLs are absolute-resolved from `NEXT_PUBLIC_SITE_URL` via `metadataBase`; one canonical per page; strip tracking params.
- URLs: clean, lowercase, hyphenated, stable, no file extensions. Add a redirect when a URL changes.
- Semantic HTML: one `<h1>` per page, headings in order without skipping levels, landmarks (`header`, `nav`, `main`, `footer`), real `<a>` links for navigation, `<button>` for actions.
- Sitemap: every indexable public route is added to `src/app/sitemap.ts`. Private, API and auth routes are not.
- Robots: `src/app/robots.ts` allows crawling only when `APP_ENV=production`; non-production is `noindex` and disallow-all. Pages that must not be indexed pass `noIndex: true`.
- Structured data: add JSON-LD with the `JsonLd` component only when it accurately describes real page content (Organization, Product, BreadcrumbList, FAQPage, etc.). No invented ratings, reviews or facts.
- Render indexable content on the server (Server Components / static). Do not hide primary content behind client-only rendering.
- Images: `next/image` with meaningful `alt` (empty `alt=""` only for decorative), explicit dimensions or `fill` with a sized parent, `priority` only for the LCP image.
- Fonts: `next/font` only (self-hosted, `display: swap`). No external font or stylesheet links. **Inter is the only typeface for the whole site** (loaded once in the root layout, exposed as `font-sans`); never introduce another font family.
- Core Web Vitals targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
