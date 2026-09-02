# Layout, Grid & Spacing System

## 1. 4px/8px Spacing Tokens

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
}
```

## 2. Container & Responsive Architecture

- **Main Content Max Width**: Typically `960px` to `1100px` for focused portfolio layouts, centered with `margin-inline: auto`.
- **Horizontal Padding**:
  - Desktop: `--space-8` (32px) or `--space-10` (40px).
  - Tablet / Mobile: `--space-4` (16px) or `--space-5` (20px).
- **Responsive Breakpoints**:
  - `sm`: `640px`
  - `md`: `768px` (single-column transition)
  - `lg`: `1024px`
  - `xl`: `1280px`

## 3. Law of Proximity in Card Design
- Heading to subtext: `--space-1` or `--space-2` (close relationship).
- Paragraph to metadata tags: `--space-3` or `--space-4`.
- Card internal padding: `--space-5` or `--space-6`.
- Distance between distinct section cards: `--space-4` to `--space-6`.
- Distance between main sections: `--space-12` to `--space-16`.
