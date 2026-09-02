# Typography Scales & Hierarchy

## 1. Modular Type Scale

A fluid typography scale avoids jarring layout shifts between screen sizes:

```css
:root {
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Fluid Modular Sizes using clamp() */
  --text-xs: clamp(0.7rem, 0.68rem + 0.1vw, 0.75rem);   /* 11px - 12px */
  --text-sm: clamp(0.8rem, 0.78rem + 0.15vw, 0.875rem); /* 13px - 14px */
  --text-base: clamp(0.95rem, 0.92rem + 0.2vw, 1rem);   /* 15px - 16px */
  --text-lg: clamp(1.1rem, 1.05rem + 0.3vw, 1.25rem);   /* 17px - 20px */
  --text-xl: clamp(1.35rem, 1.25rem + 0.5vw, 1.625rem); /* 21px - 26px */
  --text-2xl: clamp(1.75rem, 1.55rem + 1vw, 2.25rem);   /* 28px - 36px */
  --text-3xl: clamp(2.25rem, 1.95rem + 1.5vw, 3.25rem); /* 36px - 52px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.35;
  --leading-normal: 1.55;
  --leading-relaxed: 1.7;

  /* Tracking (Letter Spacing) */
  --tracking-tighter: -0.04em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0em;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.08em;
}
```

## 2. Text Hierarchy Guidelines

1. **Section Headers (`h2`, `.section-title`)**:
   - Font size: `--text-xl` to `--text-2xl`.
   - Font weight: `600` or `700`.
   - Tracking: `--tracking-tight` (`-0.02em`).
   - Accompanied by a subtle accent indicator (such as a square dot or pill in `--accent-primary`).

2. **Body & Descriptive Paragraphs (`p`, `.card-desc`)**:
   - Font size: `--text-sm` or `--text-base`.
   - Color: `--text-secondary` (`#9ca3af`) for comfort during prolonged reading.
   - Line height: `--leading-normal` (around `1.5` to `1.6`).
   - Line measure: Max `65ch` width.

3. **Metadata, Tags & Overlines (`.badge`, `.timestamp`, `.tag`)**:
   - Font size: `--text-xs`.
   - Font family: `--font-mono` or `--font-sans` with uppercase styling.
   - Letter spacing: `--tracking-wider` (`0.06em` to `0.08em`).
   - Font weight: `500` to `600`.
