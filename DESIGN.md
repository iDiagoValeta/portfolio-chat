---
name: Ignacio Diago Valeta
description: A classic two-column developer portfolio in earth browns, dark by default, whose featured section is a chat that answers from the CV.
colors:
  white-highlight: "#ffffff"
  tan: "#b27d55"
  ochre: "#9a6d22"
  espresso-ground: "#221a10"
  surface: "#2a2015"
  surface-hover: "#33271a"
  warm-beige: "#d6c7b2"
  dust: "#a89880"
  line: "#3d2f1e"
  wave: "#4a3820"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(40px, 6vh, 50px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 102"
  title-lg:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 104"
  role:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "19px"
    fontWeight: 600
  title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "12.5px"
    fontWeight: 700
    letterSpacing: "0.14em"
  meta:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    letterSpacing: "0.06em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  xl: "64px"
  gutter: "56px"
  top: "80px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.white-highlight}"
    textColor: "{colors.espresso-ground}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.tan}"
    textColor: "{colors.espresso-ground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white-highlight}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "38px"
  button-outline-hover:
    backgroundColor: "{colors.white-highlight}"
    textColor: "{colors.espresso-ground}"
  tool-button:
    backgroundColor: "transparent"
    textColor: "{colors.warm-beige}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "38px"
  suggestion-chip:
    backgroundColor: "transparent"
    textColor: "{colors.warm-beige}"
    rounded: "{rounded.none}"
    padding: "7px 13px"
  list-row:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    padding: "24px 0"
  project-preview:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    width: "100%"
  top-bar:
    backgroundColor: "{colors.espresso-ground}"
    textColor: "{colors.dust}"
    rounded: "{rounded.none}"
  chat-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
  input-chat:
    backgroundColor: "{colors.espresso-ground}"
    textColor: "{colors.white-highlight}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  bubble-user:
    backgroundColor: "{colors.white-highlight}"
    textColor: "{colors.espresso-ground}"
    rounded: "{rounded.none}"
    padding: "9px 14px"
  bubble-bot:
    backgroundColor: "{colors.espresso-ground}"
    textColor: "{colors.white-highlight}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
---

# Design System: Ignacio Diago Valeta

## Overview

**Creative North Star: "The Survey Map"**

The site is the category-standard developer portfolio played straight: a sticky identity column on the left, a single reading column on the right, and a ground of earth browns under it like an old survey sheet. The only atmosphere is a quiet field of signals: six invisible points scattered across the page keep sending out thin, slightly wavering brown rings that widen and fade behind everything, like soundings on the sheet. It is deliberately familiar; the system's job is to execute the convention well, not to reinvent it.

Density is moderate and editorial. Every section opens with a small tracked label followed by a hairline, then prose, a definition list or a stack of flat rows divided by 1px lines. About opens with a large statement and closes with a short Now list. Experience rows put dates in a narrow left column. Projects invert that: each of the four previews spans the full reading column and links straight to its repository, with the title, description and links below it. The "Ask my CV" chat sits directly after About so a visitor can ask before they scroll. The work speaks, not the stack: there are no technology tags or technology lists anywhere.

Dark is the default: espresso ground, warm beige reading text and white kept for what must stand out. The light theme swaps roles: sand ground, espresso ink, and espresso takes the highlight role that white plays in dark. The choice persists. The world is square, flat and quiet: no gradients, no rounded corners, no shadows, and nothing animates in on load.

**Key Characteristics:**
- Earth browns only, with one highlight (white in dark, espresso in light).
- A background canvas of irregular 1px rings rising from six invisible points, each ring with its own speed, reach and drifting outline.
- Archivo for all text; the name and the contact heading set wide (108%) and heavy (800).
- Flat rows divided by 1px hairlines; no cards at rest.
- Square corners everywhere, including the portrait, chips and chat bubbles.
- Content is static on arrival: no entrance animations.

## Colors

A single family of warm browns from espresso to beige, with tan and ochre as the only hues and white as the one highlight.

The frontmatter records the dark theme, which is the default. Every token is redefined in the light theme in the same stylesheet; the light values sit in the sidecar.

### Primary
- **White Highlight**: the accent. Name, headings, strong text, the email button, Download CV outline, user chat bubbles, the active section index entry and top bar label, focus outlines and text selection. In the light theme this role is held by espresso.

### Secondary
- **Tan**: the role line under the name, Now list labels, and the hover state of links, project titles, project preview frames, the email button and the chat send button. Reads at 4.87:1 on the dark ground and, in its darker light-theme value, 5.79:1 on sand.

### Tertiary
- **Ochre**: small decorative marks only. The 1px outline around the portrait and the 2px underline of the active top bar link. Identical in both themes.

### Neutral
- **Espresso Ground**: the page background (painted on the root so the ring canvas can sit above it), the top bar, the chat input and assistant bubbles, and the text colour on highlight fills.
- **Surface**: the chat panel and the backdrop behind project previews while they load.
- **Surface Hover**: inline code background inside chat answers. Despite its name, nothing in the current build uses it as a hover wash.
- **Warm Beige**: body text, tool button text and suggestion chip text (10.36:1 on the ground).
- **Dust**: tertiary text. Section labels, index and top bar entries at rest, dates, the chat lead, placeholders, the footer and the typing dots (6.1:1).
- **Line**: every hairline. Section label rules, row dividers, the chat frame, the top bar's bottom edge, tool button borders, preview frames, link underlines.
- **Wave**: the 1px stroke of the background rings, and nothing else. At full opacity it sits about 1.53:1 on the dark ground (1.55:1 on sand in its light value); the rings peak near 79% opacity (a 90% ceiling scaled by the fade) and spend most of their life far lower, so they are felt rather than read.

### Named Rules
**The Earth and White Rule.** Everything is brown. Only the highlight (white in dark, espresso in light) marks what must stand out: the name, headings, strong text, primary actions, active and focused states. No third hue, no loud colour.

**The Ochre Mark Rule.** Ochre is for small decorative marks only (the 1px portrait outline and the 2px active top bar underline), never for text; at 3.75:1 it is not a reading colour.

**The Flat Fill Rule.** There are no gradients anywhere. Colour is a flat fill or a thin line.

## Typography

**Display Font:** Archivo (with system-ui, -apple-system, sans-serif), variable width 62% to 125%, served locally
**Body Font:** Archivo
**Label/Mono Font:** JetBrains Mono, only for code inside chat answers

**Character:** one grotesque family doing every job, made expressive through its width axis: the name, the top bar monogram and the contact heading stretch to 108% at weight 800, the lede and project titles widen slightly, and everything else runs at normal width.

### Hierarchy
- **Display** (800, 0.98, width 108%): the name, broken into two lines. On desktop its size follows viewport height between 40px and 50px, capped so it always fits two lines in the 360px column; below 1100px it follows viewport width between 34px and 52px.
- **Headline** (800, 44px, 1.05, width 108%): the contact heading, which replaces the small label in that one section. Below 640px it scales with width down to 30px.
- **Lede** (600, 34px, 1.3, width 102%, max 24ch): the opening statement of About, in the highlight colour. Below 1100px it scales with width between 23px and 34px and loses its measure limit.
- **Title Large** (700, 24px, width 104%): project titles. 21px below 640px.
- **Role** (600, 19px): the role line in tan under the name.
- **Title** (600, 18px, 1.35): experience row titles; the organisation follows in warm beige at 500.
- **Body** (400, 17px, 1.65, 66 to 68ch): About and project descriptions. 16px below 640px.
- **Body Small** (400, 15.5px, 1.65): row descriptions, chat messages and input (the input goes to 16px below 640px).
- **Label** (700, 12.5px, 0.14em, uppercase): section headings. The index uses 0.12em, the Now terms 0.1em, and the top bar links 12px at 0.1em.
- **Meta** (600, 12.5px, 0.06em, uppercase): dates in experience rows.

### Named Rules
**The Wide Heavy Rule.** Width 108% at weight 800 is reserved for the name, its monogram in the top bar and the contact heading. Nothing else goes that wide or that heavy.

**The Label Is the Heading Rule.** The tracked uppercase label is used as the section heading itself, as navigation entries and as data labels (dates, Now terms), never as a tagline above another heading.

## Layout

A centred shell up to 1360px wide with 56px side padding, split into a 360px identity column and a fluid reading column (max 880px) with a 96px gap.

The identity column is sticky and grouped at the top: portrait, name, role, the section index, social icons and the Download CV, language and theme controls. Its spacing scales with viewport height (each gap is a clamp on vh, for example the portrait from 64px to 112px and the top padding from 24px to 88px), so it breathes on tall screens and fits on short ones. It is capped at the viewport height and scrolls on its own, with a hidden scrollbar, only when it still cannot fit.

The reading column starts 80px from the top; sections are 96px apart. Rows use a 140px label column and a 24px gutter (Now list and experience). Projects stack vertically 64px apart, each a full-width 16:9 preview with its text 20px below.

Below 1100px the layout becomes one centred column, max 760px with 32px side padding. A sticky top bar appears with the monogram on the left and the section links on the right, aligned to the same 760px column; the side index is hidden, the identity block stops being sticky and sits above the content with a 96px portrait, and sections tighten to 80px. Below 640px side padding drops to 20px, the two-column rows stack with a 6px gap, projects sit 48px apart, the chat insets drop to 16px and its message area scales with viewport height between 260px and 360px.

**The Top-Grouped Column Rule.** The identity column never distributes its content to fill the viewport height; it reads as one block from the top, with gaps that scale but never stretch into a void.

## Elevation & Depth

The system is flat. There are no box shadows, no blur, no backdrop filters and no blend modes. Depth comes from three things only: the surface tone of the chat panel against the ground, 1px hairlines, and the ring field, a fixed full-bleed canvas behind all content that never takes pointer events. The top bar is an opaque ground-colour strip with a hairline below, not a floating layer.

**The Hairline Depth Rule.** Separation is a 1px line or a one-step tone change, never a shadow.

**The Moving Ground Rule.** The ring field is the only motion at rest, drawn by script on one canvas rather than animated in CSS. Six invisible emitters sit at random positions chosen on each load; each launches a ring every 2.5 to 6 s, so they never fall into step. Every ring has its own speed (28 to 70 px/s), reach (260 to 820 px) and three sine deformations of its outline (1.2% to 5% each) that drift over time, so no two rings match and none is a true circle. Each is a 1px Wave stroke whose opacity rises over the first eighth of its life and fades to nothing at its reach. The canvas draws at 1:1 pixel resolution at about 30 fps, starts with rings already in flight so the ground is never empty, stops while the tab is hidden, rereads the Wave colour when the theme changes, and uses no filters, shadows or blend modes. Under reduced motion it draws one still frame of rings at scattered sizes and never animates.

## Shapes

Every corner is square (0px): the portrait, buttons, suggestion chips, chat bubbles, the chat panel, the input and the preview frames. The only curves are the background rings, near-circles drawn as 1px strokes whose outline undulates by a few percent; nothing marks their centres. Borders are 1px. The portrait is a square cropped from the top, outlined 1px in ochre with a 4px offset. The typing indicator uses three 7px squares. Icons are SVGs inlined in the markup, at 22px for social links and 17px for the theme toggle; the GitHub, LinkedIn and Hugging Face marks are the real brand glyphs as solid paths, the email icon is a line drawing.

## Components

### Buttons
- **Shape:** square (0px).
- **Primary (email in Contact, chat send):** highlight fill with ground-colour text, weight 600, 48px tall with 22px side padding (send button: 20px padding, 15px text). Hover switches the fill to tan. The send button drops to 45% opacity while a request is in flight.
- **Outline (Download CV):** transparent with a 1px highlight border and highlight text, 38px tall, 16px padding, 14px weight 600. Hover fills with the highlight and switches the text to the ground colour.
- **Tool button (language, theme, clear chat):** transparent with a Line border, warm beige 13px weight 600, at least 38 by 38px. Hover darkens the border to dust and the text to the highlight. The clear button is a 32px variant at 12.5px.
- **Focus:** every interactive element shows a 2px highlight outline offset 3px.

### Suggestion chips
In the chat only: warm beige 13.5px text with a Line border, 7px by 13px, 8px apart. Hover turns the border tan and the text to the highlight.

### Rows and lists
- **Experience rows:** flat, no fill and no hover state. A top hairline on the list and a bottom hairline on each row, 24px vertical padding, dates in the 140px column in dust meta type.
- **Now list:** a definition list in the same 140px plus content grid, 12px rows between hairlines, tan uppercase terms and highlight-colour definitions.
- **Continuation links:** text in the highlight colour at weight 600 with a Line underline and a small square-capped arrow, after experience (full CV) and projects (GitHub). Hover turns text and underline tan. Inline project links follow the same treatment at 14.5px.

### Project preview
A full-column 16:9 screenshot aligned top left inside a 1px Line frame on the surface colour. The preview links straight to the project's repository. Hover turns the frame tan and zooms the image to 1.025 over 0.6s (only without reduced motion). Title, description and links follow below; the preview always comes first.

### Inputs / Fields
- **Style:** the chat input sits on the ground colour with a Line border, 12px by 14px padding, 15.5px text, dust placeholder.
- **Focus:** the border turns to the highlight; no glow.

### Navigation
- **Section index (desktop):** a vertical list of text-only entries between hairlines in the identity column, labels in dust with no lines or markers. Hover and the section being read turn the label to the highlight (white in dark). Entry padding scales with viewport height. Hidden below 1100px.
- **Top bar (below 1100px):** sticky, opaque ground colour, hairline below. The monogram (800, width 108%, highlight) on the left; the section links on the right as 12px tracked uppercase labels in dust that scroll sideways on narrow screens without a visible scrollbar. The active link turns to the highlight with a 2px ochre underline, and the row scrolls itself to keep it in view.
- **Active state:** one IntersectionObserver drives both the index and the top bar; never a scroll loop.
- **Social icons:** 22px inline SVGs in dust, turning to the highlight on hover, each with an accessible label.

### Ask my CV chat (signature component)
A surface panel with a 1px Line border. A header row holds the title (highlight, 600), a one-line lead in dust and the clear button, separated by a hairline from a 300px scrolling message area. Visitor messages are highlight blocks aligned right; assistant messages are ground-colour blocks with a hairline, aligned left, rendering sanitised Markdown, at most 86% of the width (94% below 640px). Suggestion chips sit under the messages, then the input row behind a hairline, then a 12.5px rate-limit note in dust. Three square dust dots pulse while an answer is pending.

## Do's and Don'ts

### Do:
- **Do** keep the palette to the earth browns in the tokens, with white (dark) or espresso (light) as the only highlight.
- **Do** use tan for the role line, Now labels and hover states, and ochre only for the portrait outline and the active top bar underline.
- **Do** define every new colour in both themes in the same change, with dark as the default.
- **Do** separate content with 1px hairlines and flat rows; keep every corner square.
- **Do** show each project preview at full column width, linking to its repository, with its text below it.
- **Do** keep the identity column grouped at the top, scaling its gaps with viewport height.
- **Do** keep the side index and the top bar driven by the same IntersectionObserver.
- **Do** animate interface elements only through transform and opacity, and guard every motion behind reduced motion; the ring canvas is the one scripted drawing.

### Don't:
- **Don't** use gradients of any kind.
- **Don't** add a hue outside the brown family, a second highlight or a visitor-selectable palette.
- **Don't** round corners, including chips, bubbles and the portrait; the background rings are the one curved form.
- **Don't** add drop shadows, blur, backdrop filters or blend modes; the rings stay flat 1px strokes.
- **Don't** add a second ambient animation, a visible mark at the emitters, or make the rings stronger than a quiet line near the ground tone.
- **Don't** animate sections or content in on load or on scroll.
- **Don't** add technology tags or stack lists (suggestion chips in the chat are the only chips); the work speaks, not the stack.
- **Don't** wrap rows in bordered cards at rest.
- **Don't** set anything other than the name, its monogram and the contact heading at width 108% and weight 800.
- **Don't** put a small tracked label above a larger heading as a tagline.
- **Don't** use ochre for text.
