# Japan in Numbers — A Shrinking, Aging, Resilient Nation

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/idinlabs-dev/makefun-national-stats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/idinlabs-dev/makefun-national-stats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539): Japan's population, age structure, births, economy, labour and regions in numbers — one story running through every chart.

## The story

Japan peaked at 128.1 million people in 2008. Fertility is ~1.2, about 29% of the population is 65 or older, and deaths have outnumbered births since 2005. Yet life expectancy is the world's longest and unemployment sits near 2.5%. A shrinking, aging, resilient nation.

## What is inside

- **Overview** — population 1950–2070 area chart (projection dashed) + 6 KPI cards with sparklines
- **Population & Age Structure** — interactive pyramid with year selector (1950/1975/2000/2025/2050/2070) + stacked area of age groups
- **Births, Deaths & Longevity** — births vs deaths crossover, fertility vs the 2.1 replacement line, life expectancy by sex
- **Economy** — real GDP growth diverging bars, nominal GDP ranking, CPI + unemployment
- **Labour & Society** — the flattening "M-curve", employment by sector, foreign residents
- **Regions** — 47-prefecture tile-grid cartogram (toggle: aging rate / population change) + oldest/youngest rankings

Every chart states its own conclusion on the chart itself (direct annotation), every figure carries its source and year, and projections are dashed and labelled. All charts are hand-built SVG — no libraries, no network requests, no animation. Open `app/index.html` in a browser; sections are reachable by hash (`#overview`, `#population`, `#births`, `#economy`, `#labour`, `#regions`).

## Files

- `app/index.html` — page shell, six sections
- `app/style.css` — warm paper, indigo/vermilion/teal/sand, bento grid
- `app/data.js` — real published figures with source + year (e-Stat, IPSS 2023, MHLW, Cabinet Office, IMF)
- `app/charts.js` — SVG chart builders + `annotate()` helper
- `app/views.js` — rendering + hash routing
- `main.ts` — entrypoint: hands app/ + screenshots/ in and writes `/output/dossier.json`
