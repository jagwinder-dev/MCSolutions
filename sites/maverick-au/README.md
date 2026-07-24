# Maverick Consulting Solutions — website rebuild

A from-scratch static rebuild of the Maverick Consulting Solutions site, in a bold
black-on-white editorial style (design language adopted from a reference site
codenamed "STARTO", with one graphite accent color added for Maverick).
Semantic HTML5, plain CSS (custom properties, Flexbox/Grid), and vanilla
JavaScript — no build framework, no bundler, no npm install required to run it.

See `WEBSITE-ANALYSIS.md` for the content/design audit of the legacy Maverick
site this rebuild draws its real content from (company facts, team, testimonials,
stats, and every template-leftover issue that was found and removed — "Mitech"
brand leaks, dummy case studies, stock portfolio mockups, dead `#` links, etc.).

## Design system

- **Palette:** near-black ink (`#0A0A0A`) on white, a restrained grey scale for
  secondary text and hairline borders, and **one accent** — "Maverick Graphite"
  (`#35343A`) — used only on interactive/emphasis elements (buttons, links,
  hover states, the periods in headlines) so the site still reads as bold
  black-and-white first. All colors are CSS custom properties in
  `assets/css/tokens.css`.
- **Type:** Archivo Black (900) for all display/headline type, Inter
  (400/500/600) for body and UI text. Both are self-hosted as local `.ttf`
  files in `assets/fonts/` — no Google Fonts CDN dependency, so pages don't
  block on a third-party font request.
- **Motion:** scroll-reveal fade/slide-ins (`.reveal` / `.reveal-group` in
  `assets/css/main.css`, driven by `initScrollReveal()` in `assets/js/main.js`),
  a header that inverts from transparent to solid black on scroll, and stat
  counters that count up when scrolled into view. Everything respects
  `prefers-reduced-motion`, and both effects have a timed fallback that forces
  content visible / counters to their final value if `IntersectionObserver`
  never fires for any reason — content can never get stuck invisible.

## Folder structure

```
/MCSolutions
  index.html            Home
  about.html             About Us
  portfolio.html         Portfolio
  team.html               Team
  contact.html            Contact / Request a Quote
  /services/              21 generated service pages (do not hand-edit — see below)
  /partials/
    header.html           Shared nav, included at runtime via fetch()
    footer.html            Shared footer, included at runtime via fetch()
  /data/
    services.js            Source data for all 21 service pages
  /scripts/
    build-services.js      Generates /services/*.html and sitemap.xml from data/services.js
  /assets/
    css/tokens.css          Design tokens (colors, type scale, spacing, @font-face) as CSS custom properties
    css/main.css             All component/layout styles
    js/main.js                Nav, scroll-reveal, header scroll state, stat counters, testimonial slider, form validation
    fonts/                     Self-hosted Archivo Black + Inter (.ttf)
    images/
      favicon.svg, og-cover.png
      portfolio/                Real portfolio pieces (see "Content still marked TODO")
      banners/                   Real photos from the legacy site, available for future pages
  robots.txt
  sitemap.xml              Generated — do not hand-edit, see build-services.js
  serve.js                  Zero-dependency local preview server
```

## Running it locally

You need Node.js installed (nothing else — no `npm install`). From the project folder:

```
node serve.js
```

Then open `http://localhost:8080/`. A plain static file server (e.g. `python -m
http.server`, VS Code "Live Server") works too — the only requirement is that
partials are fetched over `http://`, not opened directly as `file://`, since
browsers block `fetch()` of local files under `file://`.

## How header/footer are shared

`index.html`, `about.html`, `portfolio.html`, `team.html`, `contact.html`, and
every generated service page all include:

```html
<header class="site-header" data-include="/partials/header.html"></header>
...
<footer class="site-footer" data-include="/partials/footer.html"></footer>
```

`assets/js/main.js` fetches those partial files once per page load and injects
them, so nav/footer edits only ever happen in one place
(`partials/header.html` / `partials/footer.html`) — no page needs to be
touched, and no rebuild step is required for nav or footer changes.

## Adding or editing a service page

All 21 service pages are generated from one template function
(`scripts/build-services.js`) driven by one data file (`data/services.js`).
**Do not hand-edit files inside `/services/` — they get overwritten.**

To add a new service or edit existing copy:

1. Open `data/services.js`.
2. Add a new entry to the `SERVICES` array (or edit an existing one) — you
   need: `slug` (the output filename), `category` (`web` / `mobile` /
   `marketing` / `design` — controls which shared feature/advantage/process
   copy it inherits), `categoryLabel` (breadcrumb/eyebrow text), `name` (full
   display title, used in the H1 and meta title), `short` (a concise form
   used inside body copy so phrases don't double up — e.g. `short: 'PHP'` for
   `name: 'PHP Development'`), and `tagline` (one sentence used in the meta
   description).
3. If you want different feature/advantage/process copy for a whole category,
   edit `CATEGORY_DEFAULTS` at the top of the same file — every service in
   that category updates together.
4. Regenerate the static pages and sitemap:

   ```
   node scripts/build-services.js
   ```

5. If you added a new service, also add its link to the services submenu in
   `partials/header.html` (these are hand-authored, not generated, since the
   submenu is organized by category for humans).

## Plugging in the contact form backend

The contact form (on the home page and `contact.html`) validates client-side
in `assets/js/main.js` (`initContactForms`) and currently posts nowhere real —
`action="/api/contact"` on both `<form>` elements is a **placeholder**, marked
with an HTML comment at each call site. To wire up real delivery:

1. Stand up an endpoint (a serverless function, a small backend route, or a
   third-party form service like Formspree / Netlify Forms).
2. Update the `action` attribute on both `<form data-validate>` elements
   (`index.html` and `contact.html`) to point at it.
3. In `assets/js/main.js`, replace the `if (valid) { ... }` branch inside
   `initContactForms()` with a real `fetch(form.action, { method: 'POST', body:
   new FormData(form) })` call, keeping the existing success/error status
   banner logic.

Without JavaScript, the form still submits as a normal HTML POST to
`action`, so once a real endpoint is in place the form works with JS disabled
too.

## Plugging in analytics

Add your analytics snippet (Google Analytics / Plausible / etc.) just before
`</head>` in each page — or, since every page already loads `assets/js/main.js`
as a shared script, you can instead drop the snippet at the top of that file
so it loads everywhere from one place. There is no analytics code included by
default.

## Content still marked TODO

A few pieces of the legacy site were template placeholders or stock mockups
with no real content behind them. Rather than carry those over, they were
removed or replaced with clearly-marked empty states:

- **Portfolio** (home page "Selected Work" and `portfolio.html`) — of ~18
  images in the legacy site's portfolio folder, only 3 were genuine client
  deliverables (Tiny Umbrellas logo, S Letter Logo, DM Training business
  card — now in `assets/images/portfolio/`); the rest were Envato/stock mockup
  templates ("Firstname Lastname" business cards, a "Your Photo Here"
  placeholder, an unrelated third-party website screenshot) and were not used.
  `portfolio.html` shows the 3 real pieces plus 3 dashed `TODO:` placeholder
  tiles for future work.
- **Team** (`team.html`) — the legacy site used generic flat-icon avatar
  images (no real headshots). The rebuild uses a typographic monogram tile
  instead, which fits the editorial design language without pretending to be
  a real photo. Swap in real headshots by replacing `.team-monogram` with an
  `<img>` when photos are available.
- **About page illustration** — the legacy "company-about.png" illustration
  was hosted on a separate domain (`maverick-solution.com`) that this
  environment couldn't resolve; the About page was designed STARTO-style
  without a hero image instead (the reference site's own About section has no
  photo either), so nothing was lost.

Search the codebase for `TODO:` to find every marked spot. See
`WEBSITE-ANALYSIS.md` §5 for the full list of legacy-site issues found and fixed.

## Known limitation: font file weight

`assets/fonts/*.ttf` are used as-is (not converted to `.woff2`) because the
font-conversion tooling available in the build environment didn't cooperate.
TTF works in every modern browser, it's just larger than WOFF2 would be
(~940KB combined vs. an estimated ~350KB). If you want to shrink it, run the
four files through any WOFF2 converter (e.g. `npx ttf2woff2 in.ttf > out.woff2`
if that package resolves cleanly in your environment) and update the
`@font-face` `src` + `format()` in `assets/css/tokens.css`.
