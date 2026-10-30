# Nivå Liften — Skills Setup & Workflow

> Which agent skills this project uses, how to install them, and when each one runs.
> Three sets: **Matt Pocock's skills** (process), **ponytail** (write less code), **avoid-ai-design** (no AI-slop look).

---

## 1. Install

Run inside the project repo, in Claude Code.

### Matt Pocock's skills — https://github.com/mattpocock/skills
```bash
claude plugin install mattpocock-skills@claude-plugins-official
```
Then once per repo:
```
/setup-matt-pocock-skills
```
Answers for this project:
- **Issue tracker:** local markdown → `docs/tickets/`
- **Triage labels:** keep defaults
- **Docs location:** `docs/` (GLOSSARY.md at repo root, ADRs in `docs/adr/`)

### Ponytail — https://github.com/DietrichGebert/ponytail
Send as two separate prompts:
```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```
Needs `node` on PATH (its hooks switch on `full` mode each session).

### avoid-ai-design (the "AI slop" skill)
Already in your Claude skills. For Claude Code, copy the skill folder into the repo so it travels with the project:
```
.claude/skills/avoid-ai-design/SKILL.md
```

Optional, also useful here: Anthropic's `frontend-design` skill (used by `prototype` and by avoid-ai-design when doing a full rebuild).

> Don't install the Matt Pocock skills both as plugin and via `npx skills` — you'd get every skill twice.

---

## 2. Which skill, when

| Phase (PROJECT_PLAN.md §5) | Skill | Type | What it does here |
|---|---|---|---|
| 0 Setup | `/setup-matt-pocock-skills` | user | Configures tracker, labels, doc layout |
| 1 Align | `/grill-with-docs` | user | Interviews you about the demo until every decision is made; writes Nivå terms into GLOSSARY.md and decisions into ADRs |
| 1 Align (non-code) | `/grill-me` | user | Same interview, for client-facing questions (pitch, pricing, what to show) |
| 2 Explore | `prototype` | model | 2–3 radically different homepage variants on one route, toggleable, to pick a direction |
| 3 Plan | `/to-spec` | user | Turns the grill + prototype choice into `docs/spec-demo.md` (no new interview) |
| 3 Plan | `/to-tickets` | user | Splits the spec into tracer-bullet tickets with blocking edges in `docs/tickets/` |
| 4 Build | `/implement` | user | Builds ticket by ticket; calls `tdd` at agreed seams |
| 4 Build | `ponytail` (full) | always on | Smallest complete change: platform/CSS before JS, SvelteKit built-ins before packages, no speculative abstractions |
| 4 Build | `tdd` | model | Only where there is logic worth testing (form validation, slug/date helpers, redirect map). Not for static markup. |
| 5 De-slop | `avoid-ai-design` | model | `detect` mode first → report; then `rewrite` against DESIGN_SYSTEM.md direction "Schacht" |
| 5 Simplify | `/ponytail-review` | user | Tags over-engineering (`delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:`) with net line count |
| 6 Review | `code-review` | model | Two parallel reviews: **Standards** (CLAUDE.md + DESIGN_SYSTEM.md) and **Spec** (spec-demo.md) |
| Bugs | `diagnosing-bugs` | model | Red → minimise → hypothesise → fix → regression test |
| End of session | `/handoff` | user | Compacts the session into a handoff doc for the next session |
| After demo | `/retro` | user | Improvements to CLAUDE.md, checks, tooling |
| Phase 2 | `/wayfinder` | user | Only if phase 2 grows beyond one session (redirect + CMS + SEO) |
| Not sure | `/ask-matt` | user | Routes you to the right Matt Pocock skill |

**User** = you type it. **Model** = Claude may reach for it on its own when the task fits.

---

## 3. How the three sets work together

```
grill-with-docs ──► prototype ──► to-spec ──► to-tickets ──► implement ──► avoid-ai-design ──► ponytail-review ──► code-review ──► deploy
      │                                                         │
      └──── GLOSSARY.md + ADRs                                  └── ponytail "full" active the whole time
```

- **Matt Pocock = the process** (align → plan → build → review).
- **Ponytail = the code budget** (least code, native first).
- **avoid-ai-design = the visual budget** (no default look; everything traces to DESIGN_SYSTEM.md).

### Where they can conflict, and who wins
| Conflict | Rule |
|---|---|
| Ponytail wants to skip the floor-indicator scroll effect (YAGNI) | The floor indicator is the design system's **signature detail**: keep it, but build it with CSS + one small `IntersectionObserver`, no library. |
| avoid-ai-design wants a full rebuild of a page | Only for pages that fail P0 tells. Otherwise surgical: swap tells, keep structure and tokens. |
| Ponytail `ultra` questions the blog | Blog/news is an explicit client request. Never cut it. |
| `tdd` on static pages | Skip. Test only real logic. |
| Ponytail drops accessibility/validation | It won't by design; ponytail never removes a11y basics, input validation, or security. Double-check forms anyway. |

Ponytail level: **`full`** for the demo. Use `/ponytail lite` when you want to see the "proper" version first and decide yourself.

---

## 4. Files these skills create / read

```
CLAUDE.md               ← project rules for the agent (reads DESIGN_SYSTEM.md, PROJECT_PLAN.md)
GLOSSARY.md             ← ubiquitous language (Nivå terms); maintained by grill-with-docs / domain-modeling
DESIGN_SYSTEM.md        ← visual source of truth; used by avoid-ai-design + code-review (Standards)
PROJECT_PLAN.md         ← scope, phases, open questions
SKILLS.md               ← this file
docs/
  adr/                  ← decisions (e.g. 0001-sveltekit-cloudflare.md)
  spec-demo.md          ← from /to-spec
  tickets/              ← from /to-tickets
```

---

## 5. Prompts to start each phase

```
# Phase 1
/grill-with-docs  Read PROJECT_PLAN.md and DESIGN_SYSTEM.md. Grill me on the Phase 1 demo for nivaliften.nl until stack, scope, photos and homepage copy are decided.

# Phase 2
Use the prototype skill: build 3 radically different homepage hero + Diensten variants for Nivå Liften on one route, toggleable. All must follow DESIGN_SYSTEM.md tokens. Variant A = "Schacht" direction as written.

# Phase 3
/to-spec
/to-tickets

# Phase 4
/implement docs/tickets/01-*.md

# Phase 5
Run avoid-ai-design in detect mode on src/routes/+page.svelte against DESIGN_SYSTEM.md §10. Then /ponytail-review.

# Phase 6
Run code-review since the first commit.
```
