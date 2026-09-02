# Frontend & Styling Guidelines

- **Vanilla CSS**: Keep all styles in `styles.css`. Do not introduce Sass, Less, Tailwind, or CSS-in-JS.
- **Cache-Busting**: Any change to `styles.css` requires incrementing the stylesheet version parameter in `index.html` (`styles.css?v=N`).
- **No Idle Animation Loops**: Never use continuous `requestAnimationFrame` loops or timer-based DOM manipulation for idle elements. All hover/focus transitions must be CSS-driven (`transform`, `opacity`, `filter`).
- **Theme Variables**: Define variables under `:root` for light mode, `@media (prefers-color-scheme: dark)` guarded by `:root:not(.light)`, and explicitly under `html.dark` and `html.light` to guarantee theme toggle reliability.
- **Bilingual DOM**: Ensure all UI strings are registered under both `es` and `en` in `app.js`'s `T` dictionary, and elements carry `data-i18n` or `data-i18n-ph`.
- **Accessibility**: Support keyboard navigation with `:focus-visible` outlines, provide `aria-label`s for icon-only buttons, and honor `@media (prefers-reduced-motion: reduce)`.
