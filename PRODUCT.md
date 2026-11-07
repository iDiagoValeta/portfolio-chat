# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both confirmed:

- Recruiters and tech leads deciding in a few minutes whether Ignacio fits an AI or back-end role. They end by contacting him or downloading the CV.
- Engineers arriving from GitHub, Hugging Face or La Terminal who want to see the projects and the code behind them.

## Product Purpose

A personal portfolio whose core is a chat that answers questions directly from the CV. It exists because a reviewer would rather ask a candidate's CV specific questions than skim it. Success is a visitor getting a concrete, accurate answer about Ignacio's fit and then reaching contact, the CV or a repository.

## Positioning

The CV is something you talk to. The assistant answers only from the real CV data, in the visitor's language, so the conversation is the proof of the profile, not a gimmick beside it.

## Operating Context

- Visitors mostly arrive from a LinkedIn profile, a job application or a repository link, on desktop and on phones.
- The assistant streams answers from DeepSeek V4 Flash through a Python proxy hosted on Render.
- Content is bilingual (Spanish default, English) and switchable at any time.

## Capabilities and Constraints

- Zero dependencies: semantic HTML, vanilla CSS and vanilla JS, local fonts, no npm, no bundler, no CDN. The server uses the Python standard library only.
- The assistant's knowledge lives in `config.js` and contains nothing that is not in the CV.
- Dark theme by default with a light alternative; the visitor's choice persists.
- Must run smoothly in Chrome (60 fps measured, also with the CPU slowed 4x and on a 2560x1440 retina screen): no full-viewport blur, blend or backdrop layers. The only idle motion is the wave background, a canvas redrawn at about 30 fps that pauses with the tab hidden and stays still under reduced motion; everything else is event-driven.
- Chat is rate limited per visitor and globally to protect the paid API.

## Brand Commitments

- Name: Ignacio Diago Valeta. Role line: AI & Back-End Engineer.
- One visual identity with light and dark modes; no visitor-selectable palettes.
- The site must read instantly as a developer portfolio. Familiar portfolio conventions, executed well, beat conceptual metaphors (a datasheet concept was rejected for this reason).
- Owner preference: calm, clear palettes that do not tire the eye.

## Evidence on Hand

- Portrait: `images/ignacio-diago-valeta.jpg`.
- CV: `resume.pdf`.
- Experience, projects and education copy in the `T` dictionary in `app.js`, mirrored in `config.js`.
- Real projects with public repositories; the site features MonkeyGrab, mouseketool, La Terminal (with a live site) and jev-decision-gate, with previews in `images/projects/`.
- No testimonials, metrics dashboards or client logos exist; none may be invented.

## Product Principles

- The conversation is the product: the first thing a visitor can do is ask.
- Every claim on the page is checkable against the CV or a public repository.
- Fast everywhere beats impressive somewhere: no effect is worth a dropped frame.
- Both languages and both themes are first-class, never an afterthought.

## Accessibility & Inclusion

Keyboard-operable throughout with visible focus, labels on icon-only controls, and full respect for `prefers-reduced-motion`.
