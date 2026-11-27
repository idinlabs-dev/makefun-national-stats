// Japan in Numbers — chart builders.
// Every chart is hand-built SVG: small helpers for lines, areas and bars,
// plus annotate() for direct annotation (dot + thin leader line + short
// text with a paper halo). No chart library, no network, no animation:
// everything renders immediately in its static state.

const INDIGO = "#16284A";
const VERMILION = "#D0342C";
const TEAL = "#2A8C8C";
const SAND = "#C9A95C";
const GRID = "#E3DFD3";
const MUTED = "#6B6659";
const PAPER = "#F6F4EE";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceTicks(min, max, n) {
  const span = max - min || 1;
  const step0 = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = norm < 1.5 ? mag : norm < 3.5 ? 2 * mag : norm < 7.5 ? 5 * mag : 10 * mag;
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(v);
  return ticks;
}

function fmt(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// Direct annotation: a dot at (x,y), a thin leader line to a short text
// label placed at (tx,ty). Max two per chart. Text gets a paper halo so
// it stays readable over gridlines and areas.
export function annotate(x, y, tx, ty, text, color) {
  const c = color || VERMILION;
  return `<g class="annot">
    <circle cx="${x}" cy="${y}" r="4" fill="${c}" stroke="#fff" stroke-width="1.5"/>
    <line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="${c}" stroke-width="1" opacity="0.7"/>
    <text x="${tx}" y="${ty}" class="annot-text" fill="${c}">${esc(text)}</text>
  </g>`;
}

function axisLabels(x0, y0, w, h, xTicks, yTicks, xFor, yFor, xFmt, yFmt) {
  let s = "";
  for (const t of yTicks) {
    const y = yFor(t);
    s += `<line x1="${x0}" y1="${y}" x2="${x0 + w}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${x0 - 6}" y="${y + 4}" class="axis" text-anchor="end">${esc(yFmt(t))}</text>`;
  }
  for (const t of xTicks) {
    const x = xFor(t);
    s += `<text x="${x}" y="${y0 + h + 16}" class="axis" text-anchor="middle">${esc(xFmt(t))}</text>`;
  }
  return s;
}

function frame(w, h, title, source) {
  return `<div class="chart-title">${esc(title)}</div>
  <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet">`;
}

function closeFrame(source) {
  return `</svg><div class="chart-source">Source: ${esc(source)}</div>`;
}

// Line / area chart over years. opts: {area, projFrom, dashedAfter, callouts:[{year,value,text,tx,ty}], endLabel, ymin, ymax, color, projColor, yFmt}
export function yearChart(years, values, o) {
  const W = 640, H = 300, L = 46, R = 14, T = 14, B = 30;
  const w = W - L - R, h = H - T - B;
  const ymin = o.ymin !== undefined ? o.ymin : Math.min(0, Math.min(...values) * 1.08);
  const ymax = o.ymax !== undefined ? o.ymax : Math.max(...values) * 1.08;
  const xFor = (yr) => L + ((yr - years[0]) / (years[years.length - 1] - years[0])) * w;
  const yFor = (v) => T + (1 - (v - ymin) / (ymax - ymin)) * h;
  const pts = years.map((y, i) => [xFor(y), yFor(values[i])]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  let s = frame(W, H, o.title, o.source);
  s += axisLabels(L, T, w, h, years.filter((_, i) => i % Math.ceil(years.length / 6) === 0), niceTicks(ymin, ymax, 4), xFor, yFor, String, fmt);
  if (o.area) {
    s += `<path d="${line} L${pts[pts.length - 1][0].toFixed(1)},${T + h} L${pts[0][0].toFixed(1)},${T + h} Z" fill="${o.color || INDIGO}" opacity="0.12"/>`;
  }
  if (o.projFrom !== undefined) {
    const pi = years.indexOf(o.projFrom);
    if (pi >= 0) {
      const px = xFor(o.projFrom);
      s += `<line x1="${px}" y1="${T}" x2="${px}" y2="${T + h}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>`;
      s += `<text x="${px + 5}" y="${T + h - 6}" class="axis" fill="${MUTED}">Projection →</text>`;
      const proj = pts.slice(pi).map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
      s += `<path d="${proj}" fill="none" stroke="${o.projColor || VERMILION}" stroke-width="2.5" stroke-dasharray="6 4"/>`;
      s += `<path d="${line}" fill="none" stroke="${o.color || INDIGO}" stroke-width="2.5"/>`;
      const last = pts[pts.length - 1];
      if (o.endLabel) s += `<text x="${last[0] - 4}" y="${last[1] - 8}" class="series-end" text-anchor="end" fill="${o.projColor || VERMILION}">${esc(o.endLabel)}</text>`;
      if (o.callouts) for (const co of o.callouts) {
        const i = years.indexOf(co.year);
        if (i >= 0) s += annotate(pts[i][0], pts[i][1], co.tx, co.ty, co.text, co.color);
      }
      s += closeFrame(o.source);
      return s;
    }
  }
  s += `<path d="${line}" fill="none" stroke="${o.color || INDIGO}" stroke-width="2.5"/>`;
  if (o.endLabel) {
    const last = pts[pts.length - 1];
    s += `<text x="${last[0] - 4}" y="${last[1] - 8}" class="series-end" text-anchor="end" fill="${o.color || INDIGO}">${esc(o.endLabel)}</text>`;
  }
  if (o.callouts) for (const co of o.callouts) {
    const i = years.indexOf(co.year);
    if (i >= 0) s += annotate(pts[i][0], pts[i][1], co.tx, co.ty, co.text, co.color);
  }
  s += closeFrame(o.source);
  return s;
}

// Multi-line chart over years: series = [{values, color, label, dashed}]
export function multiLine(years, series, o) {
  const W = 640, H = 300, L = 46, R = 90, T = 14, B = 30;
  const w = W - L - R, h = H - T - B;
  const all = series.flatMap((s) => s.values);
  const ymin = o.ymin !== undefined ? o.ymin : Math.min(0, Math.min(...all) * 1.08);
  const ymax = o.ymax !== undefined ? o.ymax : Math.max(...all) * 1.1;
  const xFor = (yr) => L + ((yr - years[0]) / (years[years.length - 1] - years[0])) * w;
  const yFor = (v) => T + (1 - (v - ymin) / (ymax - ymin)) * h;
  let s = frame(W, H, o.title, o.source);
  s += axisLabels(L, T, w, h, years.filter((_, i) => i % Math.ceil(years.length / 6) === 0), niceTicks(ymin, ymax, 4), xFor, yFor, String, fmt);
  if (o.refLine !== undefined) {
    const ry = yFor(o.refLine);
    s += `<line x1="${L}" y1="${ry}" x2="${L + w}" y2="${ry}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="4 4"/>`;
    s += `<text x="${L + w + 4}" y="${ry + 4}" class="axis" fill="${MUTED}">${esc(o.refLabel || "")}</text>`;
  }
  for (const ser of series) {
    const pts = years.map((y, i) => [xFor(y), yFor(ser.values[i])]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    s += `<path d="${d}" fill="none" stroke="${ser.color}" stroke-width="2.5"${ser.dashed ? ' stroke-dasharray="6 4"' : ""}/>`;
    const last = pts[pts.length - 1];
    s += `<text x="${last[0] + 6}" y="${last[1] + 4}" class="series-end" fill="${ser.color}">${esc(ser.label)}</text>`;
  }
  if (o.callouts) for (const co of o.callouts) {
    const i = years.indexOf(co.year);
    if (i >= 0) {
      const si = series[co.series || 0];
      s += annotate(xFor(co.year), yFor(si.values[i]), co.tx, co.ty, co.text, co.color);
    }
  }
  s += closeFrame(o.source);
  return s;
}

// Diverging vertical bars (e.g. GDP growth).
export function divBars(years, values, o) {
  const W = 640, H = 300, L = 46, R = 14, T = 26, B = 30;
  const w = W - L - R, h = H - T - B;
  const ymin = Math.min(0, Math.min(...values) * 1.15);
  const ymax = Math.max(0, Math.max(...values) * 1.15);
  const xFor = (i) => L + (i + 0.5) * (w / years.length);
  const yFor = (v) => T + (1 - (v - ymin) / (ymax - ymin)) * h;
  const bw = Math.min(18, (w / years.length) * 0.62);
  let s = frame(W, H, o.title, o.source);
  s += axisLabels(L, T, w, h, years.filter((_, i) => i % 5 === 0), niceTicks(ymin, ymax, 4), (y) => xFor(years.indexOf(y)), yFor, String, (v) => fmt(v) + "%");
  s += `<line x1="${L}" y1="${yFor(0)}" x2="${L + w}" y2="${yFor(0)}" stroke="${INDIGO}" stroke-width="1.5"/>`;
  years.forEach((y, i) => {
    const v = values[i];
    const x = xFor(i) - bw / 2;
    const y0 = v >= 0 ? yFor(v) : yFor(0);
    const bh = Math.abs(yFor(v) - yFor(0));
    s += `<rect x="${x.toFixed(1)}" y="${y0.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, bh).toFixed(1)}" fill="${v >= 0 ? INDIGO : VERMILION}"/>`;
  });
  if (o.callouts) for (const co of o.callouts) {
    const i = years.indexOf(co.year);
    if (i >= 0) s += annotate(xFor(i), yFor(values[i]), co.tx, co.ty, co.text, VERMILION);
  }
  s += closeFrame(o.source);
  return s;
}

// Horizontal bars with value labels; one row may be highlighted.
export function hbars(rows, o) {
  const W = 640, H = 34 * rows.length + 66;
  const L = 110, R = 70, T = 14, B = 30;
  const w = W - L - R;
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  let s = frame(W, H, o.title, o.source);
  rows.forEach((r, i) => {
    const y = T + i * 34 + 6;
    const bw = (r.value / max) * w;
    s += `<text x="${L - 8}" y="${y + 12}" class="axis" text-anchor="end" fill="${r.highlight ? INDIGO : MUTED}" font-weight="${r.highlight ? 700 : 400}">${esc(r.name)}</text>`;
    s += `<rect x="${L}" y="${y}" width="${bw.toFixed(1)}" height="18" rx="2" fill="${r.highlight ? VERMILION : INDIGO}" opacity="${r.highlight ? 1 : 0.85}"/>`;
    s += `<text x="${L + bw + 6}" y="${y + 13}" class="series-end" fill="${INDIGO}">${fmt(r.value)}</text>`;
  });
  s += `<text x="${L}" y="${H - 8}" class="axis" fill="${MUTED}">${esc(o.unit || "")}</text>`;
  s += closeFrame(o.source);
  return s;
}

// 100% stacked horizontal bar.
export function stacked100(rows, o) {
  const W = 640, H = 120;
  const L = 14, R = 14, T = 14;
  const w = W - L - R;
  const colors = [TEAL, INDIGO, SAND];
  let s = frame(W, H, o.title, o.source);
  let x = L;
  rows.forEach((r, i) => {
    const bw = (r.value / 100) * w;
    s += `<rect x="${x.toFixed(1)}" y="${T + 18}" width="${bw.toFixed(1)}" height="34" fill="${colors[i % colors.length]}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${T + 39}" class="stack-label" text-anchor="middle">${r.value}%</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${T + 70}" class="axis" text-anchor="middle">${esc(r.name)}</text>`;
    x += bw;
  });
  s += closeFrame(o.source);
  return s;
}

// Population pyramid for one year. men indigo (left), women vermilion (right).
export function pyramid(bands, men, women, o) {
  const W = 640, H = 340, L = 46, R = 46, T = 26, B = 30;
  const w = W - L - R, h = H - T - B;
  const max = Math.max(...men, ...women) * 1.08;
  const cx = L + w / 2;
  const bh = h / bands.length;
  let s = frame(W, H, o.title, o.source);
  s += `<text x="${cx - 8}" y="${T - 8}" class="series-end" text-anchor="end" fill="${INDIGO}">Men</text>`;
  s += `<text x="${cx + 8}" y="${T - 8}" class="series-end" fill="${VERMILION}">Women</text>`;
  bands.forEach((b, i) => {
    const y = T + i * bh + 2;
    const mw = (men[i] / max) * (w / 2);
    const ww = (women[i] / max) * (w / 2);
    s += `<rect x="${(cx - mw).toFixed(1)}" y="${y.toFixed(1)}" width="${mw.toFixed(1)}" height="${(bh - 4).toFixed(1)}" fill="${INDIGO}"/>`;
    s += `<rect x="${cx.toFixed(1)}" y="${y.toFixed(1)}" width="${ww.toFixed(1)}" height="${(bh - 4).toFixed(1)}" fill="${VERMILION}" opacity="0.9"/>`;
    s += `<text x="${cx}" y="${(y + bh / 2 + 1).toFixed(1)}" class="axis" text-anchor="middle" fill="#fff" font-weight="700">${esc(b)}</text>`;
    if (i % 2 === 0) {
      s += `<text x="${cx - mw - 4}" y="${(y + bh / 2 + 1).toFixed(1)}" class="axis" text-anchor="end" fill="${MUTED}">${men[i].toFixed(1)}</text>`;
      s += `<text x="${cx + ww + 4}" y="${(y + bh / 2 + 1).toFixed(1)}" class="axis" text-anchor="start" fill="${MUTED}">${women[i].toFixed(1)}</text>`;
    }
  });
  s += `<line x1="${cx}" y1="${T}" x2="${cx}" y2="${T + h}" stroke="${INDIGO}" stroke-width="1"/>`;
  if (o.median) s += `<text x="${L}" y="${H - 8}" class="axis" fill="${INDIGO}" font-weight="700">Median age: ${o.median} years${o.projected ? " (projection)" : ""}</text>`;
  s += closeFrame(o.source);
  return s;
}

// Stacked area of age groups over years.
export function stackedArea(years, groups, o) {
  const W = 640, H = 300, L = 46, R = 90, T = 14, B = 30;
  const w = W - L - R, h = H - T - B;
  const xFor = (yr) => L + ((yr - years[0]) / (years[years.length - 1] - years[0])) * w;
  const yFor = (v) => T + (1 - v / 100) * h;
  let s = frame(W, H, o.title, o.source);
  s += axisLabels(L, T, w, h, years.filter((_, i) => i % 3 === 0), [0, 25, 50, 75, 100], xFor, yFor, String, (v) => v + "%");
  let cum = years.map(() => 0);
  for (let g = groups.length - 1; g >= 0; g--) {
    const top = years.map((y, i) => cum[i] + groups[g].values[i]);
    const dTop = years.map((y, i) => (i ? "L" : "M") + xFor(y).toFixed(1) + "," + yFor(top[i]).toFixed(1)).join(" ");
    const dBot = years.map((y, i) => (i ? "L" : "M") + xFor(y).toFixed(1) + "," + yFor(cum[i]).toFixed(1)).join(" ");
    s += `<path d="${dTop} ${dBot.split(" ").reverse().join(" ").replace("M", "L")} Z" fill="${groups[g].color}" opacity="0.9"/>`;
    const li = years.length - 1;
    s += `<text x="${xFor(years[li]) + 6}" y="${(yFor(cum[li] + groups[g].values[li] / 2)).toFixed(1)}" class="series-end" fill="${groups[g].color}">${esc(groups[g].label)}</text>`;
    cum = top;
  }
  s += closeFrame(o.source);
  return s;
}

// Small sparkline for KPI cards.
export function sparkline(values, color) {
  const W = 120, H = 28;
  const min = Math.min(...values), max = Math.max(...values);
  const xFor = (i) => 2 + (i / (values.length - 1)) * (W - 4);
  const yFor = (v) => 3 + (1 - (v - min) / (max - min || 1)) * (H - 6);
  const d = values.map((v, i) => (i ? "L" : "M") + xFor(i).toFixed(1) + "," + yFor(v).toFixed(1)).join(" ");
  return `<svg viewBox="0 0 ${W} ${H}" class="spark" aria-hidden="true"><path d="${d}" fill="none" stroke="${color || INDIGO}" stroke-width="2"/></svg>`;
}
