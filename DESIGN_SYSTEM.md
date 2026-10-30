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

## 2. Design direction: "Schacht" (the lift shaft)

The client's mockup (glossy stainless-steel stock photos, four icon cards, a checkmark grid) is the generic template every lift company already has. We keep its **content order**, not its look.

The direction borrows from the thing Nivå actually works in: the shaft, the floor indicator, the technical drawing.

| Move | Decision |
|---|---|
| **Type** | Montserrat (brand font, used in the presentation) for headings only, set tight and heavy. Source Sans 3 for body. Tabular numerals for all figures. |
| **Palette stance** | One dominant colour: **Nivå teal** from the logo. Deep navy for text and dark sections. Cool off-white backgrounds. **Signal amber** only for 24/7 storing / urgent actions. Nothing else. |
| **Layout stance** | Left-aligned, editorial. Strong vertical rhythm. Services as a **numbered list with rows**, not four identical cards. Real photos, full-bleed or cropped tall (shaft proportion). |
| **Motion** | Almost none. One idea: the floor-indicator number changes as you scroll between sections. Everything respects `prefers-reduced-motion`. |
| **Signature detail** | **Floor indicator**: each home-page section is labelled like a lift floor (`00 Home`, `01 Diensten`, `02 Waarom Nivå` …), shown in a small mono/tabular label at the section's top left, with a thin vertical "shaft line" on large screens. Used on the homepage only, not everywhere. |

Rules that follow from the direction:
- **Real Nivå photography over stock.** The presentation already has usable images: technician in the shaft (p.2), team photo with vans (p.15), project buildings (p.7, p.9), control cabinets and push-button panels (p.8, p.11–13). Use these in the demo. No AI-generated lift cabins.
- Technical line drawings (the Corporatielift Mars drawing on p.10) may be used as a subtle background texture in the Modernisering section.
- Numbers are a design element: 2005 → 2026, 1.200 installaties, 700+ klanten, 25 medewerkers, 24/7.

---

## 3. Colour tokens

All contrast ratios checked against WCAG 2.1.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--color-teal` | `#065C77` | Brand (logo). Primary buttons, links, active states, key accents | 7.5:1 on white, AA/AAA for text |
| `--color-teal-deep` | `#04475C` | Hover/pressed for teal | 10.2:1 on white |
| `--color-teal-mist` | `#8FB8C6` | Small text/lines on navy (labels, floor indicator on dark) | 7.7:1 on navy |
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
--font-label: "Montserrat", system-ui, sans-serif;     /* 600, uppercase, tracked: floor labels */
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
| `--text-label` | 12 → 13px | 600, uppercase, `letter-spacing: .12em` | 1.2 | Floor indicator, eyebrow labels |

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
- **Radius:** `2px` on buttons and inputs, `0` on images and sections. The brand is technical and square (the logo is a square). No `rounded-2xl`.
- **Shadows:** none by default. Separation through borders (`1px var(--color-line)`) and background change. One exception: the sticky header gets a 1px bottom border on scroll.
- **Breakpoints:** 640, 960, 1280.

---

## 6. Components

### Header
- Logo left (teal square "NIVÅ LIFTEN"), nav: Diensten ▾, Projecten, Over ons, Nieuws, Vacatures, Contact.
- Right side: phone number as a text link + **"Storing melden 24/7"** (amber, the only amber on the page).
- Mobile: logo, phone icon-button, menu button → full-screen navy menu.

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
- Photo treatment: natural colour, slight cool grade. No blue overlays over every image. Dark gradient only where white text sits on a photo, and only at the bottom third.
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

## 9. Homepage structure (from the framework wireframe)

| Floor | Section | Content |
|---|---|---|
| `00` | Hero | "Uw lift moet altijd blijven functioneren." + sub: onderhoud, reparatie en modernisering, voor elk merk. CTAs: Onderhoud aanvragen (primary) · Modernisering bespreken (secondary). Photo: technician in the shaft. |
| `01` | Diensten | 4 service rows: Onderhoud, Reparatie, Modernisering, Nieuwbouw |
| `02` | Waarom Nivå | Merkonafhankelijk · Eigen monteurs · 24/7 service · Korte lijnen · Marktconforme prijzen. Shown as stat block + short statements, **not** a checkmark grid |
| `03` | Modernisering | "Renoveren in plaats van vervangen." Dark navy section, technical drawing texture, 60–70 per year, CTA |
| `04` | Projecten | 3 cases: VvE 's Gravenhof Roermond · Student Hotel (7×) · Stadlander Bergen op Zoom (10 nieuwbouw) |
| `05` | Nieuws | Latest 3 posts (client request) |
| `06` | Over Nivå | Since 2005, team photo, 3 leaders (Hasan Koç, Mario Leijen, Ebad Hashemi) |
| `07` | Contact | "Heeft u een vraag over uw lift?" + phone + form link |

IoT / SafetyBlueBox: mention as a short "Vooruitblik: 24/7 verbonden" block on the Onderhoud page, not on the homepage (only 5 installations so far; don't overclaim).

---

## 10. Anti-slop checklist (run before every demo)

From the `avoid-ai-design` skill catalogue; all must pass:

- [ ] No purple/indigo, no gradients on text or buttons
- [ ] No Inter, no default Tailwind/shadcn theme
- [ ] No `rounded-2xl shadow-lg` cards, no icon-in-rounded-square
- [ ] No identical 3- or 4-card rows with icons
- [ ] No checkmark feature grid
- [ ] No stock steel lift cabins or AI-generated photos
- [ ] No arrows on every button, no "Ontdek meer" everywhere
- [ ] Teal is the only accent; amber appears once per view
- [ ] Hover and focus states exist and are visible
- [ ] Spacing varies by section (not every section 96px)
- [ ] Dutch copy proofread, Nivå spelled with å
- [ ] Renders well at 360px wide, no horizontal scroll
