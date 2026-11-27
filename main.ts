// A working best-site-01 entry (Node 22, standard library only): the site is this directory's app/ folder, plain
// static files a browser opens at app/index.html (ES modules, CSS, no build step), its content held in its own files:
// nothing it runs, styles or shows loads over the network. The program hands it in: it copies app/ and screenshots/
// from beside this file to /output and writes /output/dossier.json, the summary the judge reads (your screenshots, the
// first load's files and bytes, and your source), with the vendored make.fun library. Leave vendor/makefun-frontend.ts
// as it is: the scorer requires dossier.json to be byte for byte what its own copy writes.
//
// A starting point, not a winner: a plain recipe collection, a list of recipes and a page for each. Build the site the
// brief asks for in app/ (its content, ease of use, a phone layout, its look), put 3 or 4 PNG or JPEG screenshots of
// it running in screenshots/ (the first by name is the cover; one may be a 390 x 844 phone view; shots.json says which
// views this starter's were taken of), and run it.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

// Japan in Numbers — a national statistics site (best-national-statistics-site-20261126-0539).
//
// What this entry hands in: "Japan in Numbers: A Shrinking, Aging, Resilient Nation" —
// a single-page statistics portal in app/ (index.html, style.css, data.js with real
// published figures and their sources, charts.js with hand-built SVG charts and a
// direct-annotation helper, views.js with hash routing for the six sections), plus
// 3-4 real screenshots of it running in screenshots/ (first by name is the cover,
// one is a 390x844 phone view). This file is the entrypoint: it copies app/ and
// screenshots/ beside it to /output and writes /output/dossier.json with the
// vendored make.fun library, exactly as the kit's starter does. After the dossier
// is written it prints a one-line summary of what was handed in, so a human
// running it locally can see at a glance that the hand-in is complete.
// Run: `node main.ts` (writes /output), or `MAKEFUN_OUTPUT_DIR=out node main.ts`.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// One-line hand-in summary: how many screenshots landed (first by name is the
// cover) and how big app/ is, so a local run shows at a glance that the
// hand-in is complete. This only reads the output dir; it never changes
// dossier.json.
const shotDir = join(out, 'screenshots');
const shots = existsSync(shotDir)
  ? readdirSync(shotDir).filter((f) => statSync(join(shotDir, f)).isFile()).sort()
  : [];
const appBytes = existsSync(join(out, 'app'))
  ? readdirSync(join(out, 'app')).reduce((n, f) => n + statSync(join(out, 'app', f)).size, 0)
  : 0;
console.log(
  `JapanStats handed in to ${out}: ${shots.length} screenshot(s)` +
    (shots.length ? ` (cover: ${shots[0]})` : ' — none!') +
    `, app/ ${appBytes} bytes, dossier at ${join(out, 'dossier.json')}`,
);
