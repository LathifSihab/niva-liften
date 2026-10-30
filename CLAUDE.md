# CLAUDE.md — nivaliften.nl

Marketing website for **Nivå Liften** (lift maintenance, repair, modernisation, new builds; Netherlands). Phase 1 = demo for the client.

## Read first
- `PROJECT_PLAN.md`: scope (what's in the demo, what isn't), sitemap, open questions
- `DESIGN_SYSTEM.md`: tokens, type, components, voice. **The visual source of truth.**
- `GLOSSARY.md`: Nivå domain terms. Use these words in code, copy and conversation.
- `SKILLS.md`: which skill runs in which phase

## Rules
- **Site language is Dutch (nl-NL), formal "u".** Code, comments, commits in English.
- Always write **Nivå** with å in copy; `niva` in URLs, filenames, identifiers.
- **Never invent facts.** Figures, project names, people and quotes come from the client's presentation or the client. Missing content → visible placeholder `[input volgt]`.
- No testimonials or reviews unless the client supplies real ones.
- Use only the colour tokens in DESIGN_SYSTEM.md §3. Amber (`--color-signal`) is for 24/7 storing only.
- Plain CSS with tokens. No Tailwind, no component library, no new dependency without saying why.
- Prefer HTML/CSS and SvelteKit built-ins over client JS. Pages are prerendered; only `/contact` runs on the worker. Every interactive bit must work with JS off or degrade cleanly.
- Images: real Nivå photos from `src/assets/`; never AI-generated or stock lift cabins. Demo only: free-licence photos (Wikimedia Commons etc.) in generic slots via `src/lib/photos.ts`, credited on the page. Never as Nivå's team or projects, never with another lift brand's logo visible.
- Accessibility: semantic HTML, visible focus, alt text in Dutch, `prefers-reduced-motion` respected, 360px wide works.
- Before calling a page done: DESIGN_SYSTEM.md §10 checklist + `/ponytail-review`.

## Stack (docs/adr/0001)
SvelteKit 3 + Svelte 5, `adapter-cloudflare`, mdsvex for `src/content/nieuws/*.md`. No database.
- Kit 3: config lives in `vite.config.ts` (`sveltekit({...})`), there is no `svelte.config.js`. Import shared code as `#lib/...` with an explicit `.ts` extension (`$lib` no longer exists).
- Content facts live in `src/lib/site.ts`; `null` renders as `[input volgt]`. Missing photos use `PhotoPlaceholder`.

## Commands
```bash
npm run dev           # local dev
npm run build         # build for Cloudflare (.svelte-kit/cloudflare)
npm run preview       # preview build
npm run check         # svelte-check (types + a11y)
npm test              # node --test on src/**/*.test.ts
npx wrangler deploy   # deploy (needs Cloudflare login)
```
