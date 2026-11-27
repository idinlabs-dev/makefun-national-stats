# Build transcript — Japan in Numbers

Entry for the make.fun bounty "Best National Statistics Site" ($50):
https://make.fun/bounty/best-national-statistics-site-20261126-0539

## Round 1 — fresh build (27 Nov 2026)

Built fresh in this session, in `~/workspace/makefun-national-stats-v2/`.
The kit `main.ts` + `vendor/makefun-frontend.ts` were copied unchanged from
the competition kit; the kit starter's app files were never read, and no
older directory was read. Concept from Claude Sonnet 5.5 on LMArena
(27 Nov 2026): "Japan in Numbers: A Shrinking, Aging, Resilient Nation",
warm paper + indigo/vermilion, direct annotation on every chart, six
sections, hand-built SVG charts, data as a JS object with source + year.

Files written in this round:
- `app/data.js` — real published figures, rounded, each with source + year
  (e-Stat, IPSS 2023 projections medium variant, MHLW vital statistics,
  Cabinet Office, Bank of Japan, IMF).
- `app/charts.js` — SVG builders (yearChart, multiLine, divBars, hbars,
  stacked100, pyramid, stackedArea, sparkline) + `annotate()` helper.
- `app/style.css` — paper #F6F4EE, white cards, indigo #16284A,
  vermilion #D0342C, teal #2A8C8C, sand #C9A95C; serif headlines.
- `app/views.js` — renders all six sections, hash routing, pyramid year
  selector, region toggle.
- `app/index.html` — page shell: sticky header, hero + KPI strip, six
  sections, sources/methodology footer.
- `main.ts` — authored header comment for this entry + post-build
  summary line (screenshot count, cover, app bytes); kit hand-in
  behaviour unchanged.
- `README.md`, `TRANSCRIPT.md` (this file), `.makefun/owner.json`, LICENSE.

## Round 2 — fixes from testing

Testing (CDP Chrome, `file://` URLs) found four real defects, fixed in
separate edit calls after the round-1 test:

1. **Phone horizontal scroll** — the tile cartogram overflowed to 594px
   on a 390px phone: grid columns were `repeat(9, 1fr)` and tile content
   set a 58px minimum width. Fixed in `style.css`: columns are now
   `repeat(9, minmax(0, 1fr))`, tiles have `min-width: 0` + `overflow:
   hidden` + smaller type. Re-tested: no horizontal scroll on phone.
2. **Pyramid band labels unreadable** — the "0–9", "10–19" labels sat in
   muted grey on top of the indigo/vermilion bars. Fixed in `charts.js`:
   band labels are now white bold, readable on both bar colours.
3. **"Projection →" label collided with the peak callout** in the hero
   chart. Fixed in `charts.js`: the label moved to the bottom of the
   dashed projection line.
4. **Pyramid totals too low** — the 1950 bands summed to ~78M (actual
   ~84M) and 2025 to ~118M (actual ~124M). Fixed in `data.js`: the
   largest bands were raised; totals now ~81M (1950) and ~121M (2025),
   still labelled rounded/approximate.
