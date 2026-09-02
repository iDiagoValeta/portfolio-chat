---
name: ui-ux-design
description: >-
  Advanced UI/UX and Frontend Design System skill enriched with StyleSeed,
  UI-UX Pro Max, and production-grade engineering principles. Use when designing,
  styling, polishing, or refactoring web interfaces, CSS tokens, color palettes,
  typography, spacing systems, layouts, and micro-interactions.
---

# UI/UX & Frontend Design System Skill

This skill provides design heuristics, visual hierarchy rules, color theory, typography systems, and interaction patterns tailored for state-of-the-art web applications and portfolios. Enriched with industry-standard rulesets from **StyleSeed**, **UI-UX Pro Max**, and **Addy Osmani's Frontend UI Engineering**.

## Core Design Principles

1. **Anti-AI-Slop & Banned Patterns**:
   - Eliminate common AI visual tells: no generic indigo `#4F46E5`, no pure flat black `#000000` voids, no emoji as UI icons, no decorative chips above every card, and no uniform grid of identical cards.
   - Every view must have an unmistakable focal point and clear visual hierarchy.
   - See [references/anti-patterns.md](./references/anti-patterns.md).

2. **Refined Color Architecture**:
   - Work with structured HSL or OKLCH token systems (Base, Surface, Overlay, Accent, Primary, Muted).
   - Ensure WCAG AA (minimum 4.5:1 for body text, 3:1 for large text) and aim for AAA (7:1) on primary copy.
   - Dark themes must use layered ramps with subtle border strokes (e.g. `rgba(255, 255, 255, 0.08)`).
   - See [references/color-palettes.md](./references/color-palettes.md).

3. **Typography & Rhythm**:
   - Use a consistent modular scale (Minor Third 1.200 or Major Second 1.125 for compact UI; Perfect Fourth 1.333 for editorial headings).
   - Constrain line lengths (`max-inline-size: 65ch`) for optimal readability.
   - Adjust `letter-spacing` (tracking): tighter for large titles (`-0.02em` to `-0.04em`), slightly looser for small uppercase labels (`0.05em` to `0.1em`).
   - See [references/typography-scales.md](./references/typography-scales.md).

4. **Spatial System (4px / 8px Grid)**:
   - Base all margin, padding, gap, and dimension values on increments of 4px / 8px (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
   - Sibling spacing should be smaller than parent-to-sibling padding (Law of Proximity).
   - See [references/layout-spacing.md](./references/layout-spacing.md).

5. **Micro-Interactions & Performance**:
   - Use smooth, natural easing (`cubic-bezier(0.16, 1, 0.3, 1)` for spring-like entrance, `ease` for standard transitions).
   - Restrict animations strictly to composite properties: `transform`, `opacity`, `filter`.
   - Never use permanent JavaScript animation loops (`requestAnimationFrame`) for idle elements.
   - Always honor `@media (prefers-reduced-motion: reduce)`.
   - See [references/microinteractions.md](./references/microinteractions.md).

6. **Scored Quality Gate (0-100 Rubric)**:
   - Score each screen before marking done; enforce a minimum score of 80/100 across color discipline, spatial rhythm, typography, tactility, and performance.
   - See [references/quality-gate.md](./references/quality-gate.md).

## Workflow Checklist

When executing an aesthetic or visual update:
- [ ] **Audit Current Tokens**: Check existing CSS variables (`:root`, `html.dark`, media queries).
- [ ] **Review Anti-Patterns**: Verify that no banned AI tells are present.
- [ ] **Establish Color & Contrast**: Verify dark/light harmony and WCAG AA contrast.
- [ ] **Check Responsive Flow**: Ensure smooth adaptation across 360px, 768px, 1024px, and 1440px without horizontal scroll.
- [ ] **Interactive States**: Verify `:hover`, `:active`, `:focus-visible`, and `:disabled` states for all clickable elements.
- [ ] **Score via Quality Gate**: Ensure total score reaches ≥ 80.
- [ ] **Visual Verification**: Render and review visual output.
