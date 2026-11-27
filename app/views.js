// Japan in Numbers — views.
// Renders every section from data.js into the page shell in index.html,
// draws the charts with charts.js, and routes by hash (#overview,
// #population, #births, #economy, #labour, #regions) so each section can
// be opened — and screenshotted — directly. No network, no animation.

import { META, KPIS, POPULATION, AGE_GROUPS, PYRAMID, VITAL, TFR, LIFE, GDP_GROWTH, GDP_RANK, CPI, MCURVE, SECTORS, FOREIGN, PREFECTURES, PREF_SOURCE } from "./data.js";
import { yearChart, multiLine, divBars, hbars, stacked100, pyramid, stackedArea, sparkline } from "./charts.js";

const INDIGO = "#16284A";
const VERMILION = "#D0342C";
const TEAL = "#2A8C8C";
const SAND = "#C9A95C";

function $(id) { return document.getElementById(id); }

function kpiCards() {
  return KPIS.map((k) => `
    <div class="card kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-value">${k.value}</div>
      <div class="k-sub">${k.sub}</div>
      <span class="k-delta ${k.dir}">${k.delta}</span>
      ${sparkline(k.spark, k.dir === "down" ? VERMILION : k.dir === "up" ? TEAL : INDIGO)}
      <div class="k-note">${k.note}</div>
    </div>`).join("");
}

function renderOverview() {
  $("hero-chart").innerHTML = yearChart(POPULATION.years, POPULATION.values, {
    title: "Japan peaked at 128.1M in 2008 — and could fall below 87M by 2070",
    source: POPULATION.source,
    area: true,
    projFrom: POPULATION.projectionFrom,
    ymin: 60, ymax: 140,
    callouts: [
      { year: 2008, value: 128.1, tx: 300, ty: 30, text: "Peak: 128.1M (2008)", color: INDIGO },
      { year: 2070, value: 87.0, tx: 430, ty: 250, text: "Below 87M by 2070", color: VERMILION },
    ],
  });
  $("kpis").innerHTML = kpiCards();
}

let pyramidYear = 2025;
function renderPyramid() {
  const d = PYRAMID.years[pyramidYear];
  $("pyramid-chart").innerHTML = pyramid(PYRAMID.bands, d.men, d.women, {
    title: pyramidYear >= 2050
      ? `The ${pyramidYear} pyramid is a tower, not a pyramid`
      : `Age pyramid, ${pyramidYear} — the shape flips as Japan ages`,
    source: PYRAMID.source,
    median: d.median,
    projected: pyramidYear >= 2050,
  });
  document.querySelectorAll("#pyr-years button").forEach((b) => {
    b.setAttribute("aria-pressed", String(Number(b.dataset.year) === pyramidYear));
  });
}

function renderPopulation() {
  renderPyramid();
  $("age-area").innerHTML = stackedArea(AGE_GROUPS.years, [
    { label: "0–14", values: AGE_GROUPS.young, color: TEAL },
    { label: "15–64", values: AGE_GROUPS.working, color: SAND },
    { label: "65+", values: AGE_GROUPS.old, color: VERMILION },
  ], {
    title: "The 65+ share has grown sixfold since 1950",
    source: AGE_GROUPS.source,
  });
}

function renderBirths() {
  $("vital-chart").innerHTML = multiLine(VITAL.years, [
    { values: VITAL.births, color: TEAL, label: "Births" },
    { values: VITAL.deaths, color: VERMILION, label: "Deaths" },
  ], {
    title: "Deaths overtook births in 2005 — and the gap keeps widening",
    source: VITAL.source,
    ymin: 500, ymax: 2300,
    callouts: [{ year: 2005, value: 1084, tx: 330, ty: 60, text: "Crossover: 2005", color: VERMILION, series: 1 }],
  });
  $("tfr-chart").innerHTML = multiLine(TFR.years, [
    { values: TFR.values, color: INDIGO, label: "TFR" },
  ], {
    title: "Fertility fell below replacement in 1975 and never came back",
    source: TFR.source,
    ymin: 0, ymax: 2.6,
    refLine: TFR.replacement, refLabel: "Replacement 2.1",
  });
  $("life-chart").innerHTML = multiLine(LIFE.years, [
    { values: LIFE.women, color: TEAL, label: "Women 87.1" },
    { values: LIFE.men, color: INDIGO, label: "Men 81.1" },
  ], {
    title: "Japan lives the longest — women 87.1 years, men 81.1",
    source: LIFE.source,
    ymin: 65, ymax: 90,
  });
}

function renderEconomy() {
  $("gdp-chart").innerHTML = divBars(GDP_GROWTH.years, GDP_GROWTH.values, {
    title: "Growth is rare and shallow — two crashes define the century",
    source: GDP_GROWTH.source,
    callouts: [
      { year: 2009, value: -5.4, tx: 300, ty: 60, text: "2009: −5.4%", color: VERMILION },
      { year: 2020, value: -4.3, tx: 480, ty: 220, text: "2020: −4.3%", color: VERMILION },
    ],
  });
  $("rank-chart").innerHTML = hbars(GDP_RANK.rows, {
    title: "Japan is now the world's 4th-largest economy",
    source: GDP_RANK.source,
    unit: "Nominal GDP, USD trillion, 2024",
  });
  $("cpi-chart").innerHTML = multiLine(CPI.years, [
    { values: CPI.cpi, color: VERMILION, label: "CPI 2.7%" },
    { values: CPI.unemp, color: INDIGO, label: "Unemployment 2.5%" },
  ], {
    title: "Inflation is back — unemployment barely moved",
    source: CPI.source,
    ymin: -1, ymax: 4,
  });
}

function renderLabour() {
  $("mcurve-chart").innerHTML = multiLine(
    [20, 25, 30, 35, 40, 45, 50, 55],
    [
      { values: MCURVE.y2024, color: TEAL, label: "2024" },
      { values: MCURVE.y1990, color: VERMILION, label: "1990" },
    ],
    {
      title: "The 'M-curve' is flattening — women stay in work",
      source: MCURVE.source,
      ymin: 40, ymax: 95,
    }
  );
  $("sectors-chart").innerHTML = stacked100(SECTORS.rows, {
    title: "Three in four workers are in services",
    source: SECTORS.source,
  });
  $("foreign-chart").innerHTML = hbars(FOREIGN.rows.map((r) => ({ name: r.name, value: r.value })), {
    title: "Foreign residents hit 3.77M — 3.0% of the population",
    source: FOREIGN.source,
    unit: "Million residents, end-2024",
  });
}

let regionMode = "aging";
function agingColor(v) {
  if (v >= 36) return "#8C1D18";
  if (v >= 34) return VERMILION;
  if (v >= 32) return "#E0785A";
  if (v >= 30) return SAND;
  if (v >= 27) return "#7FB3A6";
  return TEAL;
}
function changeColor(v) {
  if (v >= 0.2) return TEAL;
  if (v >= 0) return "#7FB3A6";
  if (v >= -0.6) return SAND;
  if (v >= -0.9) return "#E0785A";
  return VERMILION;
}
function renderRegions() {
  const maxCol = 9, maxRow = 14;
  let tiles = "";
  const placed = new Set();
  for (const p of PREFECTURES) {
    const key = p.c + "," + p.r;
    placed.add(key);
    const v = regionMode === "aging" ? p.aging : p.change;
    const bg = regionMode === "aging" ? agingColor(p.aging) : changeColor(p.change);
    const label = regionMode === "aging" ? p.aging.toFixed(1) + "%" : (p.change > 0 ? "+" : "") + p.change.toFixed(1) + "%";
    tiles += `<div class="tile" style="grid-column:${p.c + 1};grid-row:${p.r + 1};background:${bg}" title="${p.name}: ${regionMode === "aging" ? "aged 65+ " + p.aging.toFixed(1) + "%" : "population change " + p.change.toFixed(1) + "%"} (2024)">${p.name}<span class="t-val">${label}</span></div>`;
  }
  for (let r = 0; r < maxRow; r++) {
    for (let c = 0; c < maxCol; c++) {
      if (!placed.has(c + "," + r)) {
        tiles += `<div class="tile empty" style="grid-column:${c + 1};grid-row:${r + 1}"></div>`;
      }
    }
  }
  $("tiles").innerHTML = tiles;
  $("tiles-legend").innerHTML = regionMode === "aging"
    ? `<span><i style="background:#8C1D18"></i>36%+</span><span><i style="background:${VERMILION}"></i>34–36%</span><span><i style="background:#E0785A"></i>32–34%</span><span><i style="background:${SAND}"></i>30–32%</span><span><i style="background:#7FB3A6"></i>27–30%</span><span><i style="background:${TEAL}"></i>under 27%</span>`
    : `<span><i style="background:${TEAL}"></i>+0.2% or more</span><span><i style="background:#7FB3A6"></i>0 to +0.2%</span><span><i style="background:${SAND}"></i>−0.6 to 0%</span><span><i style="background:#E0785A"></i>−0.9 to −0.6%</span><span><i style="background:${VERMILION}"></i>below −0.9%</span>`;
  const sorted = [...PREFECTURES].sort((a, b) => b.aging - a.aging);
  const top = sorted.slice(0, 5);
  const bottom = sorted.slice(-5).reverse();
  const row = (p, cls) => `<li><span>${p.name}</span><span class="rank-bar"><i class="${cls}" style="width:${(p.aging / 40 * 100).toFixed(0)}%"></i></span><span class="r-val">${p.aging.toFixed(1)}%</span></li>`;
  $("rank-top").innerHTML = top.map((p) => row(p, "")).join("");
  $("rank-bottom").innerHTML = bottom.map((p) => row(p, "low")).join("");
  document.querySelectorAll("#region-toggle button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.mode === regionMode));
  });
}

function renderAll() {
  renderOverview();
  renderPopulation();
  renderBirths();
  renderEconomy();
  renderLabour();
  renderRegions();
}

function route() {
  const h = (location.hash || "#overview").replace("#", "");
  document.querySelectorAll("nav.main a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + h);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("as-of").textContent = META.asOf;
  document.getElementById("updated").textContent = "Last updated " + META.updated;
  renderAll();
  route();
  window.addEventListener("hashchange", route);
  document.getElementById("pyr-years").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    pyramidYear = Number(b.dataset.year);
    renderPyramid();
  });
  document.getElementById("region-toggle").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    regionMode = b.dataset.mode;
    renderRegions();
  });
});
