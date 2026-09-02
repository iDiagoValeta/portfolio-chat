# Banned AI Tells & Anti-Patterns (StyleSeed & UI-UX Pro Max Heuristics)

The "AI-generated look" comes from specific repetitive patterns. Avoid these tells on sight:

## 1. Strictly Banned Patterns

| Anti-Pattern | Why It Fails | What to Do Instead |
|---|---|---|
| **Default Indigo Accent** (`#4F46E5`, `#5E6AD2`) | Universal "an AI generated this" marker. Generic and overused. | Use intentional, brand-specific accents (e.g. Electric Lime `#d8ff3f`, Cyber Teal, or Warm Amber). |
| **Emoji as UI Icons** (🚀 💡 ⭐ ⚡) | Renders with inconsistent OS styling, injects random unharmonized colors, looks unprofessional. | Use clean inline SVGs with `currentColor` or crisp geometric indicators. |
| **The Icon-in-a-Chip on Every Card** | Decoration masquerading as information. | Let typography, layout, and hierarchy lead. Use icons only when providing clear functional signposts. |
| **All-Even Grid of Centered Cards** | The #1 machine-composed layout tell. Creates no visual tension or focal point. | Create asymmetrical balance: highlight key items with span-2, elevation, or distinct styling. |
| **Pure `#000000` Flat Void** | Harsh, unnatural contrast that flattens depth on OLED/LCD screens. | Use layered dark ramps (e.g. `hsl(225, 20%, 8%)` to `hsl(225, 18%, 14%)`) with hairline borders. |
| **Unanchored Font Sizing Drift** | Screens feel "off" when font sizes are chosen ad-hoc (13px, 15px, 17px, 21px). | Lock strictly to a modular clamp scale (`--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`). |
| **Hardcoded Hex in Components** | Breaks themes and token consistency across pages and viewports. | All colors must route through semantic CSS custom properties (`var(--bg-surface)`, `var(--text-primary)`, etc.). |
| **Scroll-Jacking / Inertial Overrides** | Disrupts user muscle memory and feels laggy or erratic. | Always use native browser scrolling. Enhance with CSS `scroll-behavior: smooth` only when appropriate. |
| **Gray-on-Gray Low Contrast** | Text that is illegible in low light or failed contrast ratios. | Maintain minimum 4.5:1 WCAG AA contrast for body text, 3:1 for large display titles. |
| **Continuous `requestAnimationFrame` Idle Loops** | Heats up laptop CPU/GPU and drains battery. | Rely on hardware-accelerated CSS transitions on user interaction (`:hover`, `:active`, `:focus`). |
