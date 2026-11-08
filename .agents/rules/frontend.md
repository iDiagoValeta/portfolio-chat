# Frontend & Styling Guidelines

- **Vanilla CSS**: Keep all styles in `styles.css`. Do not introduce Sass, Less, Tailwind, or CSS-in-JS.
- **Cache-Busting**: Any change to `styles.css` requires incrementing the stylesheet version parameter in `index.html` (`styles.css?v=N`).
- **One Animation Loop**: The wave background (`startWaves()` on `canvas#waves`) is the only continuous `requestAnimationFrame` loop; it runs at 1:1 resolution and about 30 fps, pauses with the tab hidden and stays still under reduced motion. No other idle loops or timer-driven DOM changes. Project videos play only while visible, one at a time, and stay on their poster under reduced motion. All hover/focus transitions are CSS-driven (`transform`, `opacity`, colour).
- **Theme Variables**: Dark is the default: define variables under `:root, html.dark` and override them under `html.light`. No rounded corners, no loud colours, and no dashes in the copy. Job titles always in English; industry terminology stays in English where it is the norm (back-end, pipelines, pull requests, open source); professional tone; describe AI and NLP broadly rather than listing specific technologies.
- **Bilingual DOM**: Ensure all UI strings are registered under both `es` and `en` in `app.js`'s `T` dictionary, and elements carry `data-i18n` or `data-i18n-ph`.
- **Accessibility**: Support keyboard navigation with `:focus-visible` outlines, provide `aria-label`s for icon-only buttons, and honor `@media (prefers-reduced-motion: reduce)`.
