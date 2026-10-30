# Nivå Liften — Project Plan

> Website for Nivå Liften (nivaliften.nl). **Phase 1 is a clickable demo** to win the job; full build only after the client says yes.

---

## 1. The brief

**Client:** Nivå Liften: lift maintenance, repair, modernisation and new installations, Netherlands. Since 2005, 25 employees, 1.200 installations under maintenance, 700+ clients, ~10% yearly revenue growth.

**What they asked for:**
1. A website mock-up, "clean and fresh, while maintaining a professional appearance"
2. A **blog / news section**
3. **Redirect** www.liftonderhoudvoorvve.nl → www.nivaliften.nl
4. Based on their *Framework* deck: sitemap, homepage wireframe, SEO keywords

**What they said about priority:** a website is a *nice-to-have* to position the company as modern and professional. → Keep the demo lean and impressive, not expensive.

**Business goal (framework):** shift focus from nieuwbouw to service & modernisation; more requests for onderhoud, reparatie and modernisering.

**Success for the demo:** client sees it, recognises their company, and approves a full build.

---

## 2. Scope

### Phase 1: Demo (now)
| In | Out (later or never) |
|---|---|
| Homepage, full (all 8 "floors") | All service sub-pages |
| 1 service page: **Liftmodernisering** (their focus) | Vacatures content |
| Projecten overview (3 cases from the deck) | CMS / editor login |
| Nieuws list + 1 example article | Redirect, DNS, e-mail changes |
| Contact page with form (UI only, no sending) | Analytics, cookie banner |
| Responsive (360px → 1440px) | Multilingual |
| Deployed on a shareable preview URL | Klantenportaal integration |

### Phase 2: Full build (after approval)
- All pages from the sitemap: Home · Diensten (Liftonderhoud, Reparatie, Liftmodernisering, Nieuwbouw) · Projecten (+ detail pages) · Over Nivå Liften · Vacatures · Nieuws · Contact
- Blog/news editable by the client (git-based CMS, see §4)
- Working forms → e-mail to Nivå (+ spam protection)
- SEO: meta, Open Graph, sitemap.xml, schema.org `LocalBusiness` + `Service`, keyword pages
- **301 redirect** liftonderhoudvoorvve.nl → nivaliften.nl (see §6)
- Privacy statement, cookie handling (AVG/GDPR), accessibility check
- Launch + handover

---

## 3. Sitemap

```
/                              Home
/diensten/liftonderhoud
/diensten/lift-reparatie       (incl. storing melden 24/7)
/diensten/liftmodernisering
/diensten/nieuwbouw
/projecten
/projecten/[slug]
/over-niva-liften
/vacatures
/nieuws                        ← client request
/nieuws/[slug]
/contact
/onderhoud-aanvragen           (form, primary CTA)
/privacy
```
URL slugs carry the SEO keywords from the framework (liftonderhoud, liftmodernisering, lift reparatie).

---

## 4. Tech stack (proposal)

Chosen with **ponytail** rules: the least that fully does the job.

| Need | Choice | Why |
|---|---|---|
| Site framework | **SvelteKit 3** + `adapter-cloudflare`, pages prerendered (ADR 0001) | Developer's usual stack. Static HTML for every page; only `/contact` runs on the worker for the form action. |
| Styling | Plain CSS with the tokens from DESIGN_SYSTEM.md (`src/app.css` + scoped component styles) | No Tailwind/shadcn defaults to fight; avoids the AI-slop look by construction |
| Blog | Markdown in `src/content/nieuws/*.md` via mdsvex | No database needed (Neon only if a real data need appears in phase 2) |
| Client editing (phase 2) | Sveltia CMS or Decap CMS (git-based, free) | Client edits news in a browser; posts stay Markdown in the repo |
| Forms (phase 2) | The existing `/contact` form action e-mails Nivå | Validation already runs server-side; only the sending is missing |
| Hosting | Cloudflare (Workers + static assets, free tier) | Preview URLs per branch for client review |
| Fonts | Montserrat + Source Sans 3, self-hosted | Brand font; no Google Fonts call (privacy) |

> Decided: SvelteKit + Cloudflare, no database for now. See `docs/adr/0001-sveltekit-cloudflare.md`.

---

## 5. Phase 1 plan: demo

Estimated **~18–22 hours** total. At 20–25 h/week shared with other projects, plan **~1.5–2 weeks**.

| # | Step | Skills used | Output | Est. |
|---|---|---|---|---|
| 0 | **Setup**: repo, install skills, run `/setup-matt-pocock-skills` (issue tracker = local markdown in `docs/tickets/`) | setup-matt-pocock-skills | repo + `.claude/skills` + CLAUDE.md | 1h |
| 1 | **Grill**: resolve open decisions (stack, demo scope, which photos, homepage copy) | `/grill-with-docs` | updated GLOSSARY.md + ADRs in `docs/adr/` | 1.5h |
| 2 | **Prototype the homepage direction**: 2–3 radically different hero + services variants, toggleable on one route | `prototype`, `frontend-design` | `/prototype` route, pick one | 3h |
| 3 | **Spec + tickets**: turn the chosen direction into a spec, then vertical-slice tickets | `/to-spec`, `/to-tickets` | `docs/spec-demo.md`, `docs/tickets/*.md` | 1h |
| 4 | **Build**: tokens + layout shell → homepage → modernisering page → projecten → nieuws (list + post) → contact | `/implement`, `ponytail` (full) | working pages | 9–11h |
| 5 | **De-slop + simplify**: audit every page against the design system checklist; review the diff for over-engineering | `avoid-ai-design` (detect, then rewrite), `/ponytail-review` | fixes | 2h |
| 6 | **Review + QA**: two-axis review (standards + spec), mobile check, Lighthouse, Dutch proofreading | `/code-review` | clean demo | 1.5h |
| 7 | **Deploy + present**: preview URL, short walkthrough message to the client with 2–3 open questions | — | link + message | 1h |

Definition of done (demo):
- [ ] All Phase 1 pages render at 360 / 768 / 1280 / 1440px with no horizontal scroll
- [ ] Anti-slop checklist in DESIGN_SYSTEM.md §10 passes
- [ ] Lighthouse ≥ 95 performance / accessibility / SEO on the homepage
- [ ] Every fact on the site traces to the presentation or the client (no invented numbers, quotes or testimonials)
- [ ] Dutch copy proofread; Nivå spelled with å everywhere
- [ ] `/ponytail-review` net line count ≤ 0 on the final pass (nothing left to cut)

---

## 6. Redirect plan: liftonderhoudvoorvve.nl → nivaliften.nl (phase 2)

1. **Inventory first**: crawl the old site and list every indexed URL (`site:liftonderhoudvoorvve.nl` + a crawler). Ask who manages its DNS/hosting.
2. **Check e-mail.** If anyone uses `@liftonderhoudvoorvve.nl` addresses, keep the domain's **MX records** untouched. Only change the web (A/CNAME) records. This is the biggest risk in the redirect.
3. Map old URLs → new URLs (page-to-page where possible, e.g. VvE onderhoud page → `/diensten/liftonderhoud`). Everything else → homepage.
4. Set **301** redirects at the host/DNS level (both `www` and bare domain, http and https), keep the old domain registered.
5. Add the new domain in Google Search Console, submit sitemap, use the *Change of Address* tool for the old domain.
6. Check after launch: redirects return 301 (not 302), no redirect chains, rankings for "lift onderhoud VvE" monitored for 4–6 weeks.

> Because the old domain targets **VvE's**, the new site should keep a VvE-focused section (e.g. on `/diensten/liftonderhoud`) so that ranking isn't lost.

---

## 7. Content inventory (what we already have from the deck)

| Content | Source | Status |
|---|---|---|
| Hero line "Uw lift moet altijd blijven functioneren" | Framework p.3 | ✅ |
| Key figures (2005, 1.200 installaties, 25 medewerkers, 700+ klanten, 60–70 moderniseringen/jaar) | Presentation p.4–5 | ✅ |
| USPs: korte lijnen, kennis alle merken, marktconforme prijzen, marktvrije producten, klantenportaal 24/7, eigen monteurs | p.6, p.15 | ✅ |
| Projects: 's Gravenhof Roermond, Meander Arnhem, Student Hotel (7×), Stadlander Bergen op Zoom (10×), Eetvilla Rosmalen, Huisartsenpraktijk Boxtel | p.7, p.9 | ✅ demo; ⚠️ permission for production |
| Team: Hasan Koç, Mario Leijen, Ebad Hashemi | p.5 | ✅ demo; ⚠️ ask if they want photos online |
| Products/partners (KLST, Fuji Electric, NewLift, Ziehl-Abegg, Schaefer, Wittur, Meiller, Fermator) | p.8, p.11–13 | Modernisering page |
| IoT / SafetyBlueBox | p.14 | Onderhoud page, small "vooruitblik" |
| Client logos | p.6 | ⚠️ permission needed |
| Photos | PDF images | demo OK; ⚠️ originals + rights for production |
| Projects text, "Over ons" story | Framework: "input volgt later" | ❌ placeholders in demo, clearly marked |
| Vacatures, contact details, KvK, address | — | ❌ ask client |
| Blog posts | — | 1 example post written by us for demo |

---

## 8. Open questions for the client

Ask after the demo, not before (the demo is the conversation starter):

1. Who will write news/blog posts, and how often? (decides whether a CMS is needed)
2. May we show client logos and project names/photos publicly?
3. Can you send original photos (team, projects, technicians)?
4. Who manages the domains liftonderhoudvoorvve.nl and nivaliften.nl? Are there e-mail addresses on the old domain?
5. Where should form submissions go? Is there a separate 24/7 storingsnummer?
6. Should the existing klantenportaal be linked from the site?
7. Current open vacancies?
8. Is the Skylift site the reference for tone only, or also structure?

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| Client finds the demo "too different" from their mockup | Keep their content order and hero line exactly; differences are only in visual execution. Prototype step shows options. |
| Low priority for client ("nice-to-have") → project stalls | Small demo, fast turnaround, clear phase-2 price/scope |
| Redirect breaks e-mail or loses SEO | §6 steps 1–2 before touching DNS |
| Using logos/photos without permission | Demo only; production waits for written OK |
| Generic "AI look" | Design system + avoid-ai-design audit at step 5 |
| Invented facts in copy | Every figure from the presentation; placeholders marked `[input volgt]` |

---

## 10. Phase 2 outline (after approval)

| Week | Work |
|---|---|
| 1 | Grill session with client input → spec v2 → tickets. Remaining service pages, Over ons, Vacatures |
| 2 | Projecten detail pages, CMS for Nieuws, working forms, privacy page |
| 3 | SEO (schema, sitemap, meta), redirect mapping, accessibility + performance pass, content proofreading |
| 4 | Client review round, DNS/redirect cutover, Search Console, handover doc |
