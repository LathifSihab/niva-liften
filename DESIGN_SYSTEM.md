# Nivå Liften — Design System

> Source of truth for the look of nivaliften.nl. Every page, component and demo screen follows this file.
> If a design decision isn't here, decide it, then add it here.

Sources: *Framework Nivå Liften* (pptx), *Bedrijfspresentatie Niva liften* (pdf, 16 april 2026), client brief (clean, fresh, professional, modern).

---

## 1. Positioning in one line

**The brand-independent lift service partner that keeps your lift running: maintenance, repair and modernisation first, new installations second.**

The website exists to change how Nivå is seen: from "installer" to **modern, professional service company**, and to get more requests for **onderhoud, reparatie and modernisering** (the framework says the focus moves away from nieuwbouw; Skylift is the reference for positioning).

Primary audiences (from the presentation's segmentation):
| Audience | What they need to see fast |
|---|---|
| **VvE boards / property managers** | Reliability, fair prices, short lines, 24/7 storing service, "we maintain any brand" |
| **Commercial / housing corporations** (Stadlander, MVGM, Student Hotel…) | Scale (1.200 installations, 700+ clients), project references, modernisation capacity (60–70 per year) |
| **Job seekers** (monteurs) | Vacatures, own technicians, growing company |

---

## 2. Design direction: the client's mockup

> Changed 2026-10-31 (docs/adr/0002). The earlier "Schacht" direction (editorial rows, floor indicator `00`–`07`, no cards) is retired. We now follow the client's mockup (`docs/Website Mock up.png`) for layout and components, with Nivå's own tokens.

| Move | Decision |
|---|---|
| **Type** | Montserrat for headings, Source Sans 3 for body. Section titles centred with one bold word: "Onze **Diensten**". Tabular numerals for all figures. |
| **Palette stance** | **Nivå teal** from the logo (not the mockup's royal blue) for primary buttons and accents. Navy for text and dark sections. Light surface backgrounds alternating with white. **Signal amber** only for 24/7 storing. |
| **Layout stance** | As the mockup: centred photo hero, four white service cards with icons, checkmark grid, dark modernisering banner with photo, project photo tiles with a dark caption bar, centred contact CTA. Inner pages: photo hero (text bottom-left), two-column intro with a card, "Andere diensten" cards, CTA band. |
| **Motion** | Hover only: cards lift 2px and gain shadow, project photos zoom 4%. Everything respects `prefers-reduced-motion`. |

Rules that follow from the direction:
- Photos: free-licence stand-ins for now, each captioned "Voorbeeldfoto" (§7). Real Nivå photos replace them when the client sends originals.
- Numbers stay visible: 2005, 1.200 installaties, 700+ klanten, 25 medewerkers, 60–70 moderniseringen per jaar, 24/7.
- Copy from the mockup is used where it is the client's own wording ("Is uw lift verouderd?", "Technische expertise", "Maatwerk oplossingen"); its typos are not.

---

## 3. Colour tokens

All contrast ratios checked against WCAG 2.1.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--color-teal` | `#065C77` | Brand (logo). Primary buttons, links, active states, key accents | 7.5:1 on white, AA/AAA for text |
| `--color-teal-deep` | `#04475C` | Hover/pressed for teal | 10.2:1 on white |
| `--color-teal-mist` | `#8FB8C6` | Small text/lines on navy (labels and captions on dark) | 7.7:1 on navy |
| `--color-navy` | `#0B1F3A` | Body text, headings, dark sections, footer | 16.5:1 on white |
| `--color-steel` | `#4A5866` | Secondary text, meta, captions | 7.3:1 on white |
| `--color-steel-light` | `#6B7884` | Placeholder text only (min. size 16px) | 4.5:1 on white |
| `--color-line` | `#C9D1D6` | Borders, dividers, shaft line. **Never text.** | 1.6:1 |
| `--color-surface` | `#F4F6F7` | Alternate section background | — |
| `--color-white` | `#FFFFFF` | Main background, text on teal/navy | — |
| `--color-signal` | `#F2B134` | **Only** for 24/7 storing CTA and alert badges. Navy text on amber. | 8.7:1 with navy |

Proportions on any screen: ~70% white/surface, ~20% navy, ≤10% teal, amber appears at most once per view.

```css
:root {
  --color-teal: #065C77;
  --color-teal-deep: #04475C;
  --color-teal-mist: #8FB8C6;
  --color-navy: #0B1F3A;
  --color-steel: #4A5866;
  --color-steel-light: #6B7884;
  --color-line: #C9D1D6;
  --color-surface: #F4F6F7;
  --color-white: #FFFFFF;
  --color-signal: #F2B134;
}
```

> No dark mode for the demo. A service-company marketing site doesn't need it (ponytail: YAGNI).

---

## 4. Typography

```css
/* Google Fonts, self-host in production */
--font-heading: "Montserrat", system-ui, sans-serif;   /* 600, 700, 800 */
--font-body: "Source Sans 3", system-ui, sans-serif;     /* 400, 600 */
--font-label: "Montserrat", system-ui, sans-serif;     /* 600, uppercase, tracked: eyebrow labels */
```

Scale (fluid, 1.25 ratio, `clamp()` between 360px and 1280px):

| Token | Size (mobile → desktop) | Weight | Line height | Use |
|---|---|---|---|---|
| `--text-display` | 40 → 72px | 800 | 1.0 | Hero headline only |
| `--text-h1` | 32 → 52px | 700 | 1.08 | Page titles |
| `--text-h2` | 26 → 38px | 700 | 1.15 | Section titles |
| `--text-h3` | 20 → 24px | 600 | 1.25 | Service rows, card titles |
| `--text-body-lg` | 18 → 20px | 400 | 1.55 | Intro paragraphs |
| `--text-body` | 16 → 17px | 400 | 1.6 | Body |
| `--text-small` | 14px | 400 | 1.5 | Meta, captions |
| `--text-label` | 12 → 13px | 600, uppercase, `letter-spacing: .12em` | 1.2 | Eyebrow labels, card labels |

Rules:
- Headings: `letter-spacing: -0.02em` from h2 up. Max line length of body: `65ch`.
- Figures use `font-variant-numeric: tabular-nums lining-nums`.
- Always write **Nivå** with the å. In URLs/domain: `niva`.
- No gradient text. No all-caps headings (labels only).

---

## 5. Spacing, grid, shape

- **Base unit 8px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section padding:** 64px mobile, 128px desktop (vertical). Rhythm comes from varying it: hero and modernisation get more, lists get less.
- **Grid:** 12 columns, max content width **1200px**, gutter 24px, side padding 16px mobile / 32px tablet / 48px desktop. Text columns sit in 7 of 12 columns, left-aligned. Avoid centring paragraphs.
- **Radius:** `4px` (`--radius`) on buttons, inputs, cards and photo tiles. `0` on full-bleed sections. No large rounding.
- **Shadows:** `--shadow-card` on white cards and photo tiles, `--shadow-card-hover` on hover. Nothing else gets a shadow; the sticky header gets a 1px bottom border on scroll.
- **Breakpoints:** 640, 960, 1280.

---

## 6. Components

### Header
- Logo left (teal square "NIVÅ LIFTEN"), nav: Diensten ▾, Projecten, Over ons, Nieuws, Vacatures, Contact.
- Right side: **"Storing melden 24/7"** (amber, the only amber on the page).
- Above it (≥960px), a slim navy top bar that scrolls away: "Merkonafhankelijk liftonderhoud sinds 2005" left, "24/7 storingsdienst + phone" right.
- Mobile: logo, phone icon-button, menu button → full-screen navy menu.

### Page hero (every page)
- **PageHero**: full-screen photo (100svh minus header and top bar), white text bottom-left (homepage: centred), credit bottom-right, round scroll cue to `#inhoud`.
- **Motion** (CSS only, motion-safe): photo zooms out slowly (14s), text rises in one element at a time, scroll cue bobs.
- **Lift doors** (homepage, `doors` prop → `LiftIntro.svelte`): two brushed-steel panels from the colour tokens cover the hero on load and slide open (~1.75s; text starts at 1.3s). Scrolling down slides them shut again on the `--hero` view timeline (Chrome/Edge; other browsers skip it). Homepage photo: a straight-on landing door.
- Hidden overflow uses `overflow: clip`, not `hidden`, so the doors' `view()` timeline tracks the page.

### Split section
Sticky heading column left (5/12), content right (7/12) on ≥960px. Used for Diensten, Waarom Nivå, Nieuws. Projects use one large card (7/12, 4:5) next to two stacked (5/12, 3:2); images zoom 3% on hover (motion-safe only).

### Buttons
| Variant | Style | Use |
|---|---|---|
| Primary | Teal fill, white text, 2px radius, 48px tall, 600 weight | "Onderhoud aanvragen", "Offerte aanvragen" |
| Secondary | 1.5px navy border, navy text, transparent | "Modernisering bespreken" |
| Signal | Amber fill, navy text | "Storing melden 24/7" only |
| Text link | Teal, underline offset 3px, underline thickens on hover | Inline and "Meer over…" |

No arrow glyphs (→) stapled onto every CTA. Visible focus state on all: `outline: 2px solid var(--color-teal); outline-offset: 3px` (on dark: teal-mist).

### Service row (replaces the 4 icon cards)
```
01   Liftonderhoud          Periodiek onderhoud voor elk merk, ook marktvrij.        Bekijk →
──────────────────────────────────────────────────────────────────────────────────────────
02   Reparatie & storingen   24/7 bereikbaar, eigen monteurs.                         Bekijk →
```
Number (label style, steel) · title (h3) · one-line description · link. Whole row clickable, background turns `--color-surface` on hover. Nieuwbouw listed last.

### Stat block
Large tabular figure (h1 size, navy) + label (small, steel). Used for: sinds 2005 · 1.200 installaties in onderhoud · 700+ klanten · 60–70 moderniseringen per jaar.

### Project card
Photo (4:5 or 3:2, no radius) → label (location, label style) → title (h3) → one line (scope, e.g. "7× modernisering compleet"). Category tag: Modernisering / Nieuwbouw / Onderhoud.

### Blog / Nieuws card
Date (tabular, label style) · category · title (h3) · 2-line excerpt. Optional image. The list page is a simple list, not a masonry grid.

### Brand logos strip ("Onze grote klanten")
Logos in greyscale at 60% opacity, full colour on hover. **Only with client permission** (see open questions in PROJECT_PLAN.md).

### Forms (Onderhoud aanvragen / Offerte / Contact)
Labels above inputs, 48px inputs, 1px line border, 2px radius, teal focus. Fields: naam, organisatie/VvE, e-mail, telefoon, adres van de lift, merk lift (optional, "weet ik niet" allowed), type aanvraag, bericht. Error text in plain Dutch below the field.

### Footer
Navy background. Three groups max: contact (address, phone, e-mail, KvK), diensten links, "24/7 storingsdienst" block with the phone number large. No four-column link farm.

---

## 7. Iconography & imagery

- Icons only where they carry meaning (phone, 24/7, download). Use a handful of inline SVGs (1.5px stroke, square caps to match the square logo) at text colour; no full icon library (a default `lucide` import is itself an AI-design tell). **No icons in coloured rounded squares.**
- Photo treatment: natural colour, slight cool grade (`saturate(.7)` on full-bleed hero photos). No blue overlays over every image. Navy shade only where white text sits on a photo: from the bottom, plus from the left on wide screens (`PageHero`).
- Image sources (demo): free-licence photos (Wikimedia Commons, CC BY / CC BY-SA) in every slot: lift machinery for hero, Modernisering and Over Nivå; Dutch buildings as stand-ins on project cards. Each carries a visible "Voorbeeldfoto · author, licence" caption so no one mistakes them for Nivå's own work. The Over Nivå slot shows machinery, not stand-in people. Production: real Nivå originals, permission per image.

---

## 8. Voice & copy (Dutch, nl-NL)

- **Formal "u"**, short sentences, concrete facts. The client's own words are good: *deskundigheid, klantgerichtheid, betrouwbaarheid, professionaliteit*, "ontzorging", "korte lijnen".
- Lead with the customer's problem: *"Uw lift moet altijd blijven functioneren."* (framework hero line, keep it).
- Facts beat adjectives: "1.200 liften in onderhoud" not "uitgebreide ervaring".
- Brands: "Wij onderhouden alle merken: Otis, Kone, Thyssen, Schindler, Mitsubishi en marktvrije liften."
- Banned phrases: *ontzorgen naar een hoger niveau, innovatieve oplossingen, toekomstbestendig* (unless backed by a fact), *one-stop-shop, synergie*, and any English marketing filler.
- SEO keywords (framework): liftonderhoud, liftmodernisering, lift reparatie, lift onderhoud bedrijf, lift service. Use naturally in titles/H1s of the matching pages.
- **Proofread Dutch.** The client mockup has typos ("toskomstbestendig", "liftinstallaites"); the demo must have zero.

---

## 9. Homepage structure (Framework wireframe + client mockup)

| # | Section | Content |
|---|---|---|
| 1 | Hero | Centred: "Uw lift moet altijd blijven functioneren." + "Onderhoud, reparaties en modernisering van liften door Nivå Liften." CTAs: Onderhoud aanvragen (primary) · Modernisering bespreken (white). |
| 2 | Onze **Diensten** | 4 icon cards: Liftonderhoud, Liftreparatie, Liftmodernisering, Nieuwbouw (each links to its page) |
| 3 | Waarom **Nivå Liften**? | Checkmark grid (3×2): Merkonafhankelijk · Technische expertise · Snelle service · Eigen monteurs · Maatwerk oplossingen · Verantwoordelijk. Key figures below. |
| 4 | Modernisering banner | "Is uw lift verouderd?" Navy text half, photo half, 60–70 per year, CTA |
| 5 | Recente **projecten** | 3 photo tiles: VvE 's Gravenhof · Student Hotel · Stadlander |
| 6 | Laatste **nieuws** | Latest posts as cards (client request) |
| 7 | Over **Nivå Liften** | Growth since 2005, company statement, Directie with roles |
| 8 | Contact CTA | "Heeft u een vraag over **uw lift**?" Contact opnemen · Offerte aanvragen |

IoT / SafetyBlueBox: mention as a short "Vooruitblik: 24/7 verbonden" block on the Onderhoud page, not on the homepage (only 5 installations so far; don't overclaim).

---

## 10. Checklist (run before every demo)

Cards, icon cards and the checkmark grid are allowed since ADR 0002 (client's mockup). All of these must pass:

- [ ] No purple/indigo, no gradients on text or buttons
- [ ] No Inter, no default Tailwind/shadcn theme
- [ ] Only `--radius` and `--shadow-card*`; no large rounding, no icon-in-coloured-square
- [ ] No AI-generated photos; every stand-in photo is captioned "Voorbeeldfoto" with its credit
- [ ] No arrows on every button, no "Ontdek meer" everywhere
- [ ] Teal is the only accent; amber appears once per view
- [ ] Hover and focus states exist and are visible
- [ ] Spacing varies by section (not every section 96px)
- [ ] Dutch copy proofread, Nivå spelled with å
- [ ] Renders well at 360px wide, no horizontal scroll
