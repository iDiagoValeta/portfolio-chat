# Micro-Interactions & Transitions

## 1. Timing Functions & Motion Tokens

Standard curves for snappy, organic UI feel:

```css
:root {
  /* Durations */
  --duration-fast: 120ms;
  --duration-normal: 200ms;
  --duration-slow: 350ms;

  /* Easing Curves */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 2. Interactive States Principles

### Card Elevation & Border Glow
Interactive cards (such as project cards or experience rows) should react delicately:
```css
.card-interactive {
  transition: transform var(--duration-normal) var(--ease-snappy),
              border-color var(--duration-normal) var(--ease-snappy),
              box-shadow var(--duration-normal) var(--ease-snappy);
}

.card-interactive:hover {
  transform: translateY(-2px);
  border-color: rgba(216, 255, 63, 0.3);
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.5),
              0 0 16px -4px rgba(216, 255, 63, 0.12);
}

.card-interactive:active {
  transform: translateY(0);
}
```

### Buttons & Pills
- **Hover**: Shift background by 5-10% luminance or subtle inset shadow.
- **Active**: Scale down by `scale(0.98)` for tactile feedback.
- **Focus-visible**: Solid outline offset by 2px (`outline: 2px solid var(--accent-primary); outline-offset: 2px;`). Never hide outline without providing `:focus-visible`.

## 3. Accessibility & Performance Guardrails
- Always include:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
- Restrict transitions to GPU-accelerated properties: `transform`, `opacity`, `filter`, and color transitions. Avoid transitioning `width`, `height`, `margin`, or `padding` to prevent layout thrashing.
