# 0002: Follow the client's mockup for layout and components

**Status:** accepted (2026-10-31). Supersedes the "Schacht" direction in DESIGN_SYSTEM.md §2.

## Context

DESIGN_SYSTEM.md originally kept the content order of the client's mockup (`docs/Website Mock up.png`) but deliberately avoided its look: no icon cards, no checkmark grid, no stainless lift hero, and a floor-indicator signature detail instead. After seeing that version, the developer asked to style the site like the client's mockup.

## Decision

- Homepage follows the mockup section by section: centred photo hero with two buttons; "Onze **Diensten**" as four white icon cards; "Waarom **Nivå Liften**?" as a checkmark grid; dark "Is uw lift verouderd?" banner with photo; "Recente **projecten**" as photo tiles with a dark caption bar; centred contact CTA with "Contact opnemen" and "Offerte aanvragen".
- Section titles centred, one word bold. Cards white with a soft shadow, 4px radius.
- The floor indicator (`00`–`07`) is dropped; the mockup has none.
- **Kept from the design system:** the colour tokens (Nivå teal from the logo instead of the mockup's royal blue), Montserrat + Source Sans 3, amber only for 24/7 storing, accessibility rules, and "never invent facts". The mockup's typos and filler are not copied.
- Icons are a handful of inline SVGs (`ServiceIcon.svelte`), not an icon library.

## Consequences

- The client recognises their own design; the demo is judged on content and finish rather than on a new visual direction.
- Several items on the original anti-slop checklist (icon cards, checkmark grid, card rows) no longer apply; DESIGN_SYSTEM.md §10 is updated accordingly.
