# Color Palettes & Token Architecture

## 1. Token Semantic Hierarchy

Every modern UI system should structure colors into distinct semantic tiers:

```css
:root {
  /* Surfaces & Canvas */
  --bg-canvas: #0d0f14;
  --bg-surface: #151921;
  --bg-surface-hover: #1c222d;
  --bg-elevated: #242b38;

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.22);
  --border-focus: #d8ff3f;

  /* Typography & Foreground */
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --text-inverse: #0d0f14;

  /* Brand Accents */
  --accent-primary: #d8ff3f;          /* Electric Lime */
  --accent-primary-hover: #c4ec2a;
  --accent-glow: rgba(216, 255, 63, 0.18);
  --accent-subtle: rgba(216, 255, 63, 0.08);

  /* Status Colors */
  --status-success: #10b981;
  --status-warning: #f59e0b;
  --status-danger: #ef4444;
}
```

## 2. Harmonious Palettes for AI & Engineering Portfolios

### Cyber Slate & Electric Lime (Current Theme Direction)
- **Primary Canvas**: `hsl(225, 20%, 8%)`
- **Surface**: `hsl(225, 18%, 13%)`
- **Surface Highlight**: `hsl(225, 16%, 18%)`
- **Accent**: `hsl(72, 100%, 62%)` (`#d8ff3f`)
- **Accent Dark / Contrast**: Deep dark slate `#0d0f14` for text placed on top of lime.

### Glassmorphism & Depth Tokens
When layering glassmorphism:
- Background: `backdrop-filter: blur(12px) saturate(160%);`
- Fill: `background-color: rgba(21, 25, 33, 0.75);`
- Inset Top Glow: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.28);`

## 3. Light Mode Equivalents
Ensure the light mode tokens maintain the same semantic meaning without feeling washed out:
- Canvas: `#f9fafb`
- Surface: `#ffffff`
- Surface Hover: `#f3f4f6`
- Borders: `rgba(0, 0, 0, 0.08)`
- Text Primary: `#111827`
- Text Secondary: `#4b5563`
- Accent Primary: `#4d7c0f` or dark olive lime with strong contrast ratio (> 4.5:1 against light canvas).
