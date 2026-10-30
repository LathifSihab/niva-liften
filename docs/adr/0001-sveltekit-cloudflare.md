# 0001: SvelteKit on Cloudflare, no database

**Status:** accepted (2026-10-31)

## Context

PROJECT_PLAN.md §4 proposed Astro with SvelteKit as the alternative "if you'd rather stay in your usual stack". The developer's usual stack is SvelteKit, Neon (Postgres) and Cloudflare.

## Decision

- **SvelteKit 3** (Svelte 5) with **`@sveltejs/adapter-cloudflare`**, deployed to Cloudflare (Workers + static assets; `wrangler.jsonc`).
- **Every page is prerendered** (`prerender = true` in the root layout), so it ships as static HTML. The exception is `/contact`, which runs on the worker so that the form action can validate on the server and works with JS off.
- **Nieuws** = Markdown files in `src/content/nieuws/`, compiled by **mdsvex** and loaded with `import.meta.glob`.
- **No Neon for now.** Phase 1 stores nothing: news is Markdown and the form sends nothing. In Phase 2 the form e-mails Nivå. Add Neon only if the client wants form submissions stored or another real data need appears.
- Fonts are self-hosted via `@fontsource-variable/*` (no Google Fonts call).
- Tests: `node --test` on pure logic (`src/lib/*.test.ts`), with no test framework dependency.

## Consequences

- One stack the developer already knows. Cloudflare gives a preview URL per branch for client review.
- `wrangler` is a dev dependency because the adapter needs it.
- SvelteKit 3 specifics: config lives in `sveltekit({...})` in `vite.config.ts` (no `svelte.config.js`); `$lib` is gone. Import from `#lib/*` (package.json `imports`) with explicit `.ts` extensions.
- Phase 2 git-based CMS (Sveltia/Decap) still works: posts remain Markdown in the repo.
