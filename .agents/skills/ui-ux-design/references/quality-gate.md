# Design Quality Gate (0–100 Scored Evaluation Rubric)

Before approving and presenting any visual frontend change, evaluate the screen against this rubric. The goal is to achieve a minimum score of **80/100**.

## Rubric Breakdown

### 1. Color Discipline & Contrast (Max 25 pts)
- **+10 pts**: Semantic tokens used exclusively (no inline hardcoded hex).
- **+10 pts**: WCAG AA verified: Body text ≥ 4.5:1, headings ≥ 3:1 against background.
- **+5 pts**: Dark/light mode transitions are seamless, natural, and harmonious.
- *-15 pts penalty*: Use of banned default indigo or flat unlayered `#000`.

### 2. Spatial Rhythm & Layout Hierarchy (Max 25 pts)
- **+10 pts**: Distinct focal point exists per section (not an even soup of identical cards).
- **+10 pts**: Strict adherence to 4px/8px spacing tokens and Law of Proximity (related elements closer together).
- **+5 pts**: Fluid container widths with zero horizontal scroll at 360px, 768px, and 1280px.
- *-10 pts penalty*: Cluttered whitespace or inconsistent card paddings.

### 3. Typography & Scannability (Max 20 pts)
- **+10 pts**: Strict adherence to modular type scale (xs, sm, base, lg, xl, 2xl).
- **+5 pts**: Tracking adjusted appropriately (tighter titles, wider uppercase metadata).
- **+5 pts**: Maximum line length constrained to 65ch for comfortable reading.
- *-10 pts penalty*: Orphaned headings or illegible gray-on-gray captions.

### 4. Interactive Tactility & Micro-interactions (Max 15 pts)
- **+5 pts**: Tactile feedback on interactive elements (slight translateY, subtle border glow, `:active` scale).
- **+5 pts**: Accessible `:focus-visible` styling with 2px offset.
- **+5 pts**: Smooth transitions limited to GPU properties (`transform`, `opacity`, `filter`).
- *-10 pts penalty*: Janky hover effects that cause layout reflows (`width`, `margin`, `padding` transitions).

### 5. Production Hygiene & Performance (Max 15 pts)
- **+5 pts**: Full compliance with `@media (prefers-reduced-motion: reduce)`.
- **+5 pts**: Zero continuous idle animation loops (`requestAnimationFrame`).
- **+5 pts**: High-DPI crisp iconography (SVG only, no emojis as UI icons).
- *-15 pts penalty*: Scroll-jacking or broken touch targets (< 44px on mobile).

---

**Target Threshold**: Only deploy or mark complete if score ≥ 80. If < 80, identify failed criteria and revise immediately.
