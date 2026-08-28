# NEXCRAFT — Vite + React

## Task 01 — Vite + React conversion
Static HTML/CSS/JS converted to component-based React. Design preserved 1:1.

## Task 02 — Selected Work / Flagship Portal system
Added inside the "Web & UI/UX Work" section, positioned before the existing
web project cards:

- **Selected Work portal grid** — 6 flagship cards (ÉLANE, VAULTA, LUMEN,
  LUMORA, AURELIA, EMBER & OAK), each an "Enter World →" portal linking to
  `/work/:slug`
- **Others toggle** — a button labeled "Others" that expands/collapses the
  original 4 supporting web projects (Library Management System, Student
  Portal, Restaurant Landing Page, E-Commerce Store UI). Collapsed by
  default so flagships are the first thing seen, per protocol rule
  "Flagship projects are the protagonists."
- **FlagshipWorld route** (`/work/:slug`) — a minimal placeholder page for
  each flagship (industry tag, name, "World in progress"). ÉLANE already
  renders in its real palette (Ivory / Charcoal / Champagne Gold) since
  that's the only flagship with a confirmed brand theme so far. The other
  five stay on NEXCRAFT's neutral theme until their own palettes are
  established — nothing was invented.

## Setup
```
npm install
npm run dev      # local dev server
npm run build    # production build
```

## Assets you need to add
- public/images/  → Fashion.png, Brand mockup.png, School Banner.jpg,
                     school-hiring.png, churcu-flyer.jpg, valentine.jpg
                     (Beluxe, Dlip, Swaggy, Velvet Nails already included)
- public/videos/  → Library-system.mp4, Restaurant.mp4

## Structure additions (Task 02)
```
src/
├── data/
│   └── flagships.js            6 flagship records (slug, name, industry, theme)
├── components/
│   ├── flagship/
│   │   └── FlagshipPortalCard.jsx
│   └── sections/
│       └── SelectedWork.jsx     portal grid + Others toggle + collapsible panel
└── pages/
    └── FlagshipWorld.jsx        /work/:slug placeholder shell
```

## Next
- Task 03: ELANE Flagship World (full build — Website Showcase Standard:
  screenshots primary + BrowserFrame + optional supporting video, no
  forced outbound navigation, in-page Lightbox)
- Task 04: AURELIA Flagship World

## Task 03 — ELANE Flagship World

Route: `/work/elane`

Built per the locked Website Showcase Standard (Executive Decision, memory):
screenshots primary, optional supporting video, in-page GalleryLightbox only
— zero forced outbound navigation in the main flow.

- **LogoReveal** — 2s branded entrance in ÉLANE's real palette (Ivory /
  Charcoal / Champagne Gold), skippable, auto-skips on repeat visits via
  localStorage
- **Brief** — description pulled directly from the live site's meta tags
  (elane-sigma.vercel.app), nothing invented
- **WebsiteShowcase** — `BrowserFrame` wraps a hero screenshot + 3 section
  thumbnails + optional scroll video + 2 mobile previews; clicking any
  screenshot opens `GalleryLightbox` (Prev/Next, arrow-key nav) in-page
- **The Build** — tech tags + a single small "View Live Website →" link,
  the *only* outbound link in the whole World, placed last, opt-in only
- **Next World** — links to VAULTA (next flagship in the locked order)

### ⚠️ Placeholder screenshots
I don't have a browser tool to capture the live ELANE site from here, so
`public/images/elane/*.jpg` are currently clearly-labeled placeholder
graphics, not real captures — the "PLACEHOLDER" text makes this obvious
so nothing gets mistaken for a finished asset. Replace these 6 files
with real screenshots from elane-sigma.vercel.app (same filenames):

```
desktop-hero.jpg        1600×1000  homepage hero
desktop-collection.jpg  1600×1000  collection/products section
desktop-about.jpg       1600×1000  about/craftsmanship section
desktop-footer.jpg      1600×1000  footer
mobile-hero.jpg          720×1520  mobile hero
mobile-collection.jpg    720×1520  mobile collection view
```

Optional: `public/videos/elane/elane-scroll.mp4` — an 8-15s muted looping
screen recording of the site scrolling. If the file isn't present, that
section of the showcase simply doesn't render (no broken video icon).

### Reusable for the next 5 flagships
`BrowserFrame`, `WebsiteShowcase`, `GalleryLightbox`, `LogoReveal`, and
`WorldProgress` are all flagship-agnostic — VAULTA, LUMEN, LUMORA, AURELIA,
and EMBER & OAK each just need their own `src/data/<slug>.js` file (same
shape as `elane.js`) and a `<Slug>World.jsx` page. No new base components
needed.

## Next
- Task 04: AURELIA Flagship World

## Task 04 — AURELIA Flagship World + World system refactor

Route: `/work/aurelia`

Before adding AURELIA, the ELANE-specific page was generalized into
**`WorldTemplate`** (`src/components/flagship/WorldTemplate.jsx`) — the
single reusable Flagship World architecture the protocol calls for.
`ElaneWorld.jsx` and `AureliaWorld.jsx` are now both just:

```jsx
export default function AureliaWorld() {
  return <WorldTemplate flagship={aurelia} />
}
```

All CSS moved from `.elane-*` to generic `.fw-*` classes. A flagship with
a confirmed palette (`theme` set, like ELANE) renders themed; one without
(`theme: null`, like AURELIA) falls back to NEXCRAFT's neutral ink/gold —
no colors were invented for AURELIA since none are confirmed yet.

### To finish AURELIA — swap in real assets only
Everything is already linked (data file → route → nav → World template).
You only need to replace 6 placeholder JPGs with real screenshots from
aurelia-three-tan.vercel.app, **same filenames**, dropped into
`public/images/aurelia/`:

```
desktop-hero.jpg          1600×1000  homepage hero
desktop-specialists.jpg   1600×1000  specialists section
desktop-library.jpg       1600×1000  health library section
desktop-footer.jpg        1600×1000  footer
mobile-hero.jpg            720×1520  mobile hero
mobile-booking.jpg         720×1520  mobile booking flow
```

Optional: `public/videos/aurelia/aurelia-scroll.mp4` (8-15s muted loop).
If it's not there, that part of the showcase just doesn't render.

Same applies to ELANE — placeholders live in `public/images/elane/`,
same filenames listed in the Task 03 section above.

### Remaining flagships (VAULTA, LUMEN, LUMORA, EMBER & OAK)
Same pattern, no new components needed:
1. `src/data/<slug>.js` — copy `aurelia.js`, fill in confirmed facts only
2. `src/pages/worlds/<Slug>World.jsx` — two lines, same as ElaneWorld/AureliaWorld
3. One `<Route>` line in `App.jsx`
4. `theme: null` in `src/data/flagships.js` until a real palette is confirmed

## VAULTA + EMBER & OAK — real brand colors added

Palette confirmed by pixel-sampling your uploaded brand identity sheets
directly (not by trusting the printed hex labels blindly — two of them
were garbled and got corrected against the actual rendered swatch color).

**VAULTA** (`/work/vaulta`) — Deep Navy `#0A1236` / Teal `#14B8A6` / Light
Grey `#E5E8EC`. Fonts: Space Grotesk (display), Inter (body), JetBrains
Mono. One swatch on the sheet was unreadable (label cut off, and the
color blends invisibly into the dark background) — skipped rather than
guessed.

**EMBER & OAK** (`/work/ember-oak`) — Charcoal `#0F0E0E` / Cream `#F6EEE5`
/ Copper `#B67333`. Fonts: Cormorant Garamond (display), Inter (body).
Two labels on the sheet were corrupted: "Espresso" was printed as a
navy-purple hex that didn't match the actual brown swatch at all, and
"Cream" had an invalid 7-character code — both corrected against the
real pixel color instead.

Both now render themed on `/work/vaulta` and `/work/ember-oak`, and their
homepage portal cards (`/` → Selected Work) pick up the same colors.

## Still pending — AURELIA
You described an AURELIA brand sheet, but the file didn't actually attach
(only the VAULTA and EMBER & OAK images came through). AURELIA's World
still renders on the neutral placeholder theme. Please re-send that image
— three of the six hex codes in the text description were malformed
(invalid characters / wrong length) so I don't want to lock those in
without verifying against the real pixels, same as I just did for the
other two.

## LUMORA — still no brand asset
No brand sheet received yet for LUMORA either. Still on neutral theme.

## AURELIA — real brand colors added (previous image re-sent)

Palette confirmed by pixel-sampling the re-uploaded brand identity sheet.
Three of the six printed hex labels on the sheet were genuinely corrupted
— not just hard to read, but rendering as invalid characters (e.g. "Gold
Accent" showed as "S0B Acer5", not a hex code at all). This looks like an
image-generation text artifact rather than a real design token label, so
those three were measured directly from the swatch pixels instead:

- **Deep Teal** `#0D5C63` — label was legible, used as printed
- **Sage Green** `#6B8F7A` — label was legible, used as printed
- **Warm Sand** `#E3D9CB` — label corrupted, pixel-sampled
- **Soft Grey** `#ECEBE7` — label corrupted, pixel-sampled
- **Navy** `#0F1F2E` — label was legible, used as printed
- **Gold Accent** `#BF9B65` — label corrupted, pixel-sampled

World theme: background = sheet's actual page color `#F5F3F0` (also
pixel-sampled, not one of the six swatches), text = Deep Teal, accent =
Gold Accent. Fonts: Cormorant Garamond (display) + Inter (body), matching
the sheet's typography section.

One more thing worth flagging: the brand sheet's tagline reads "Elevating
Everyday Healthcare." — different from the live site's meta tag ("Care
that grows with you"). I used the sheet's tagline since it's the more
recently confirmed source; the live site copy may be from an earlier
pass. Worth a check if that matters to you.

`/work/aurelia` now renders fully themed. AURELIA's homepage portal card
picks up the same palette.

## Still pending — LUMORA
No brand sheet received for LUMORA yet. Still on neutral theme, same
process (real pixel sampling, not guessing) whenever it's ready.

## LUMORA — real brand colors added

Palette confirmed by pixel-sampling the uploaded brand identity sheet.
Unlike AURELIA and EMBER & OAK, all six labels here were legible and
matched their swatches cleanly — including disambiguating one character
that could've read as either "S" or "5" (Walnut Brown), confirmed by
comparing against the actual sampled swatch color: `#6E5645`.

- Warm Ivory `#F8F5F0`
- Walnut Brown `#6E5645`
- Slate Charcoal `#2F2F2F`
- Soft Sage `#A8B2A1`
- Stone Grey `#D9D6D2`
- Brushed Brass `#C6A15B`

World theme: Warm Ivory background, Slate Charcoal text, Brushed Brass
accent. Fonts: Cormorant Garamond (headlines) + Inter (body), per the
sheet's typography section.

**Flag for you:** three different taglines exist across sources —
the live site's meta tag ("Light Reveals Home"), the sheet's logo subtitle
("Premium Living & Property Services"), and the sheet's footer slogan
("Every Detail. Every Space. Beautifully Connected."). I used the footer
slogan as the primary tagline since it reads as the actual brand line,
folded the subtitle into the description. Same pattern as AURELIA/ELANE —
worth deciding which is canonical across all three sources at some point.

`/work/lumora` now renders fully themed.

## Status — all six flagships
- ✅ ÉLANE — themed (Ivory / Charcoal / Champagne Gold)
- ✅ VAULTA — themed (Navy / Teal / Light Grey)
- ✅ AURELIA — themed (Ivory / Deep Teal / Gold)
- ✅ LUMORA — themed (Warm Ivory / Slate Charcoal / Brushed Brass)
- ✅ EMBER & OAK — themed (Charcoal / Cream / Copper)
- ⏳ LUMEN — accent only confirmed (`#0B2545` navy), no full palette yet

All Worlds are placeholder-screenshot only until real site captures are
dropped into their `public/images/<slug>/` folders — filenames are listed
per-flagship earlier in this README.

## LUMEN — full brand palette added (last flagship)

Palette confirmed by pixel-sampling the uploaded brand identity sheet.
Clean sheet, all six labels legible, no corrections needed:

- Oxford Navy `#0B2545` — also matches the live site's theme-color meta
  tag exactly, confirmed across two independent sources
- Forest Green `#1B4332`
- Antique Gold `#C9A227`
- Ivory `#F8F4E3`
- Charcoal `#36454F`
- Dark Brown `#4E342E`

Tagline matches the live site too ("Limitless Potential.") — first
flagship where sheet and live site agree, no conflict to flag.

World theme: Ivory background, Oxford Navy text, Antique Gold accent.
Fonts: Cormorant Garamond + Inter, per the sheet.

`/work/lumen` now renders fully themed.

## Status — all six flagships: DONE
- ✅ ÉLANE — Ivory / Charcoal / Champagne Gold
- ✅ VAULTA — Navy / Teal / Light Grey
- ✅ AURELIA — Ivory / Deep Teal / Gold
- ✅ LUMORA — Warm Ivory / Slate Charcoal / Brushed Brass
- ✅ EMBER & OAK — Charcoal / Cream / Copper
- ✅ LUMEN — Ivory / Oxford Navy / Antique Gold

Every flagship World now renders in its real, verified brand colors. The
only remaining work across all six is swapping placeholder screenshots
for real site captures — filenames listed per-flagship earlier in this
README, same pattern throughout: drop files into
`public/images/<slug>/`, matching names exactly, nothing else to touch.

Three flagships (ÉLANE, AURELIA, LUMORA) had a tagline mismatch between
their live site and their brand sheet — worth a pass to decide which is
canonical for each, whenever convenient.

## Protocol cross-reference + responsiveness/performance pass

Full audit against `NEXCRAFT_OS_MASTER_CREATION_PROTOCOL.md`, verified
programmatically (not just read-through) — real browser, real viewport
widths, real console/network inspection via headless Chrome.

### 3.3 Responsive rule — verified at all six specified widths
Tested 320 / 375 / 390 / 768 / 1024 / 1280 on the homepage and every
themed World (ELANE, VAULTA, AURELIA, LUMEN, LUMORA, EMBER & OAK).

**One real bug found and fixed:** `overflow-x: hidden` was set on `body`
but never on `html`. The marquee ticker is *intentionally* wider than the
viewport (it's a translating strip), and without `overflow-x` on the root
element, that intentional overflow was leaking into an actual page-level
horizontal scrollbar on narrow phones — confirmed by measuring
`document.documentElement.scrollWidth` (was 399px in a 320px viewport;
now exactly 320px). Fixed by moving the rule to `html`.

Also fixed while auditing:
- `.bf-mobile-frame` (the phone-shaped screenshot frame in each World's
  showcase) had a fixed 200px width — two side by side could overflow a
  320–375px screen. Now `min(200px, 78vw)`, fluid.
- Added a tablet tier (768–1024px) for the World showcase's screenshot
  grid — it previously jumped straight from 3 columns to 1 with nothing
  between.
- Added a large-desktop content constraint (max 1440px, centered) — the
  protocol's "large desktop 1280px+" bucket wasn't accounted for at all;
  text was free to stretch edge-to-edge on wide monitors.
- Small-screen tightening pass at ≤480px and ≤400px (portal cards,
  contact cards, section padding, hero stat sizes).

Verified with a scripted check across every route × every width —
`document.documentElement.scrollWidth` equals viewport width everywhere,
zero horizontal overflow.

### 3.4 Performance rule
- **Images**: `loading="lazy" decoding="async"` added to every
  below-the-fold image (portfolio grid, World showcase thumbnails, mobile
  previews). The World's above-the-fold hero screenshot stays eager,
  correctly.
- **Video**: `preload="metadata"` added to every autoplaying video
  (previously defaulted to `preload="auto"`, pulling the full file
  regardless of visibility).
- **Fonts**: this was the biggest fix. Every flagship's display font
  (Fraunces, Inter, Space Grotesk, Cormorant Garamond) was loading on
  *every* page, including the homepage, which uses none of them. Built
  `useFlagshipFonts` — a hook that injects a flagship's fonts only when
  its World actually mounts. The homepage now loads only its own 3 font
  families (Syne, Lora, JetBrains Mono) instead of 7.
- **Animation**: added `prefers-reduced-motion` support site-wide
  (marquee, reveal-on-scroll, logo reveal, card tilt) — there was none
  before this pass.
- **Dependencies**: none added. Still React + react-router-dom only.

### 6.4 Accessibility (surfaced during the responsive pass)
No visible keyboard-focus state existed anywhere in the app. Added
`:focus-visible` outlines to every interactive element (links, buttons,
portfolio items, filter tabs, portal cards, showcase thumbnails).

### 25 — Design Quality Control checklist
- ✅ No console errors (checked headlessly across all 7 routes)
- ✅ No broken links — found and fixed one real one: missing favicon was
  404ing on every page load. Added a simple on-brand SVG favicon.
- ✅ No layout overflow (see above)
- ✅ No unnecessary dependencies
- ✅ No exposed secrets
- ⚠️ The 403s you'd see in this sandbox's console are `fonts.googleapis.com`
  being blocked by *this development environment's* network egress rules
  — not a real app bug. Fonts load normally in an actual browser.

### Gaps still open against the protocol (not addressed this pass)
- **9.11 "The Build" / Contact**: the homepage Contact section is
  mailto/WhatsApp links only, no actual form. The protocol's component
  list implies a contact-form pattern under `components/contact/` — that
  folder doesn't exist yet. Flagging rather than building it silently,
  since it likely needs backend/email-delivery decisions (protocol
  section 5) I shouldn't make unprompted.
- **10 — Component architecture**: `components/projects/`,
  `components/galleries/`, `components/motion/`, and `components/contact/`
  from the suggested structure don't exist as dedicated folders yet —
  current equivalents live inline in `sections/` and `shared/`. Protocol
  explicitly says "do not restructure merely to match this diagram," so
  left as-is; flagging only because you asked for a full cross-reference.
- **Tagline mismatches** (ÉLANE, AURELIA, LUMORA — flagged in earlier
  turns): still unresolved, still worth a canonical-source decision.
- **Placeholder screenshots**: every World still needs its real site
  captures swapped in (filenames documented per-flagship above).

## Follow-ups from the audit

**WhatsApp number corrected** — Contact section now links to the real
number (+234 805 538 2336), confirmed working via smoke test after the
change.

**Component folder gap — resolved case-by-case, not restructured wholesale:**
- `galleries/` — real gap, low-risk fix. `Lightbox.jsx` and
  `GalleryLightbox.jsx` moved out of `shared/` into their own
  `components/galleries/` folder (they're gallery components, not generic
  shared utilities). Both import paths updated, build verified clean,
  smoke-tested that the moved Lightbox still opens correctly from the
  portfolio grid.
- `projects/`, `motion/`, `contact/` — intentionally left alone. Each
  would require inventing a new component/abstraction with no second use
  case yet (project cards are inline in `Work.jsx`, there's no contact
  form to relocate, motion is just `<video>` tags inside existing cards).
  Creating folders to hold nothing, or extracting one-off abstractions
  just to match a diagram, is exactly what protocol section 2.4/26 warns
  against ("do not overengineer before launch," "do not restructure
  merely to match this diagram"). `contact/` will make sense once an
  actual form exists — that's a separate decision, not a folder-naming
  one.

## Admin System + Contact Form (protocol sections 5, 17, 18)

### What was built
- **Real contact form** on the homepage (protocol's MUST-HAVE "reliable
  contact submission") — Name, Email, Phone, WhatsApp, Company, Project
  Type, Message. Submits straight to a `messages` table in Supabase
  (database-first, per protocol 17: the message is stored before anything
  else happens). Existing mailto/WhatsApp buttons kept as fast
  alternatives, not replaced.
- **Admin panel** at `/admin`, gated by Supabase Auth login:
  - **Dashboard** — message/portfolio/project counts
  - **Messages** — view every submission, update status (`NEW` →
    `CONTACTED` → `IN PROGRESS` → `CLOSED` → `ARCHIVED`, exact list from
    protocol section 18)
  - **Portfolio** — add / edit / delete / show-hide the graphic design
    grid items
  - **Web Projects** — same CRUD for the "Others" supporting web projects
- **Scoped deliberately**: protocol section 18 explicitly says "do not
  build this entire CMS before the public portfolio experience is ready"
  and marks full admin CMS as a LATER-priority item. You asked for it now
  directly, so I built it — but scoped to exactly what you described
  (Projects, Messages) plus what's needed to support it. **Not built**:
  a Media upload library (items take an image path/URL, not a drag-drop
  uploader) and a Settings panel. Both are natural next additions once
  you're using this and want them.
- **The six flagship Worlds are intentionally NOT wired into this admin.**
  They're Executive-Decision-locked curated experiences (brand colors,
  copy, showcase captures — all hand-verified against real sources), not
  simple data records. Exposing them to freeform CRUD risked one wrong
  field breaking a themed brand experience. They stay as code (`src/data/*.js`)
  editable by hand or by asking me directly.

### One real structural change, done on purpose
The graphic design portfolio grid used a **hand-positioned masonry
layout** (10 fixed grid-cell coordinates, `.p1`–`.p10`). That's
fundamentally incompatible with "add new project, delete old ones" — a
hand-tuned layout for exactly 10 items breaks the moment the count
changes. Replaced it with a responsive auto-flow grid (uniform aspect-
ratio tiles) so it works correctly for any number of admin-managed items.
Verified: zero horizontal overflow at all 6 protocol widths, before and
after.

### Setup — required before any of this works live
Nothing above works until you connect a real Supabase project. The app
is built to **never break** in the meantime — the homepage falls back to
its original static data, the contact form shows a clear "not connected"
message instead of crashing, and `/admin` shows a setup notice instead of
a blank page. Verified all three fallback paths in headless testing.

**1. Create a Supabase project** — supabase.com, free tier is enough.

**2. Run the schema** — Supabase Dashboard → SQL Editor → New Query →
paste the entire contents of `supabase/schema.sql` → Run. This creates
the `messages`, `portfolio_items`, and `web_projects` tables, sets up
Row Level Security (public can submit messages and read visible items;
only logged-in admins can read messages or manage projects), and seeds
your existing 10 portfolio items + 4 web projects so nothing's empty on
first load.

**3. Create your admin login** — Dashboard → Authentication → Users →
Add User. Use your own email + a real password. This is the only account
that can log into `/admin`.

**4. Get your API keys** — Dashboard → Settings → API. Copy the
**Project URL** and the **anon public** key. Never use the
"service_role" key anywhere in this frontend code — protocol 5.3 is
explicit about this, and RLS is what makes the anon key safe to expose.

**5. Set environment variables:**
- Locally: copy `.env.example` to `.env`, fill in the two values.
- On Vercel: Project Settings → Environment Variables → add
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` → redeploy.

**6. Log in** at `yoursite.com/admin/login` with the email/password from
step 3.

### What's still NOT built (protocol's SHOULD-HAVE / LATER tiers)
- n8n workflow (email/WhatsApp auto-notification on new message) —
  protocol explicitly says local n8n is fine for dev but "must not become
  the permanent assumption for production." Messages are safely stored
  either way (database-first) — you just check the admin panel to see
  new ones for now instead of getting pinged automatically.
- Media upload library, Settings panel — noted above.
- Homepage section reordering (Selected Work → right after Hero,
  per protocol 9.1) — you asked to come back to this separately.
