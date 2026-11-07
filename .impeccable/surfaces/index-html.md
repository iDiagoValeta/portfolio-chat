# Surface brief: portfolio home (index.html)

Mode: Experience, executed as the category standard. Audience: recruiters and tech leads judging fit in minutes; engineers arriving from GitHub, Hugging Face or La Terminal. Job: understand who Ignacio is, ask his CV a question, see the work, reach contact or the CV. Constraints: zero dependencies, ES/EN, light/dark from system, 60 fps in Chrome (no blur, blend, backdrop or idle animation layers), chat rate limited server side.

## Direction contract

THESIS: the classic developer portfolio played straight, minimal and effective, with one product-specific move: the "Ask my CV" chat as a featured section right after the introduction. Only selected work is shown (four projects whose previews link straight to their repositories), never a full repository dump, and no technology lists: the work speaks, not the stack. Refuses conceptual metaphors (a datasheet concept was rejected) and decoration that does not inform.

OWN-WORLD: earth browns only, from the owner's palette, with white as the single highlight. Dark by default: espresso ground (#221a10), warm beige text (#d6c7b2), brown hairlines (#3d2f1e, #4a3820), tan (#b27d55) for the role line and Now labels, ochre (#9a6d22) only for decorative strokes (portrait outline, active top bar underline), white for name, headings, primary buttons and active states. Light alternative in sand with espresso ink. A background of thin brown waves: invisible points scattered at random keep emitting irregular, undulating rings that expand and fade. Square corners, 1px hairlines, no gradients, no loud colours. Archivo for all text. Professional copy without dashes or middle dots; job titles in English and industry terminology in English where it is the norm; AI and NLP described broadly, never as a list of technologies.

STORY: the visitor reads name and role, skims About, asks the chat something, scans experience and four projects whose previews span the full column, and writes an email or downloads the CV.

FIRST VIEWPORT: two columns. Left, sticky: square portrait with an ochre hairline outline, name in two lines set wide and heavy, role, text-only section index whose active entry turns white, social icons, Download CV, language and theme toggles. Right: a large opening statement, About, a Now list (now, building, interested in), then the chat section starting within the first viewport on desktop.

FORM: canon (category standard), chosen by the owner after rejecting the rolled direction; reference bar brittanychiang.com. seed:6a57cddae1682ee5

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: the sticky text-only section index that marks the section being read in white (IntersectionObserver, no animation loop).
Motion grammar: six invisible emitters at random positions launch undulating rings every 2.5 to 6 s, each with its own speed, reach and deformation, drawn on a canvas at about 30 fps; project previews zoom slightly on hover; typing dots only while an answer is pending. No entrance animations. Under reduced motion the canvas shows one still frame.

Responsive: below 1100px a sticky top bar carries the section links and the layout becomes one centered column (max 760px); verified without overflow from 320px to 1920px.
