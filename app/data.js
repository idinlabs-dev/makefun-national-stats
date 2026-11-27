// Japan in Numbers — data file.
// Every figure is a real published figure, rounded for display.
// Each series carries its source and year. Projections are marked
// and are drawn dashed / hatched in the charts. Figures are rounded;
// see the methodology note in the footer.
// Sources: Statistics Bureau of Japan (e-Stat), National Institute of
// Population and Social Security Research (IPSS) 2023 projections
// (medium variant), Ministry of Health, Labour and Welfare (MHLW)
// vital statistics, Cabinet Office, Bank of Japan, IMF.

export const META = {
  country: "Japan",
  title: "Japan in Numbers",
  subtitle: "A Shrinking, Aging, Resilient Nation",
  asOf: "Data as of 2024/25",
  updated: "27 November 2026",
  sourcesLine:
    "Sources: Statistics Bureau of Japan (e-Stat) · IPSS 2023 projections (medium variant) · MHLW vital statistics · Cabinet Office · Bank of Japan · IMF",
};

export const KPIS = [
  { label: "Population", value: "124.0M", sub: "2024 estimate", delta: "−0.6% YoY", dir: "down", spark: [128.1, 127.3, 126.7, 126.1, 125.5, 124.9, 124.5, 124.0], note: "Peak 128.1M in 2008" },
  { label: "Aged 65+", value: "29.1%", sub: "of population, 2024", delta: "+0.4 pp", dir: "up", spark: [26.6, 27.3, 27.7, 28.4, 28.6, 28.9, 29.1], note: "Highest share in the world" },
  { label: "Total fertility rate", value: "1.15", sub: "children per woman, 2024", delta: "−0.05", dir: "down", spark: [1.45, 1.42, 1.36, 1.33, 1.26, 1.20, 1.15], note: "Replacement level is 2.1" },
  { label: "Life expectancy", value: "84.0 yrs", sub: "both sexes, 2024", delta: "+0.2 yrs", dir: "up", spark: [83.1, 83.4, 83.5, 83.7, 83.9, 84.0], note: "Women 87.1 · Men 81.1" },
  { label: "Real GDP growth", value: "+0.1%", sub: "2024, year on year", delta: "vs +1.7% in 2023", dir: "flat", spark: [-4.3, 2.6, 1.0, 1.7, 0.1], note: "World's 4th-largest economy" },
  { label: "CPI inflation", value: "2.7%", sub: "2024 average", delta: "vs 3.3% in 2023", dir: "down", spark: [-0.1, 0.2, 2.5, 3.3, 2.7], note: "Unemployment 2.5%" },
];

// Population 1950-2070, millions. 2009+ are projections (IPSS 2023, medium variant).
export const POPULATION = {
  source: "Statistics Bureau of Japan (e-Stat); IPSS 2023 projections, medium variant",
  unit: "million people",
  years: [1950, 1960, 1970, 1980, 1990, 2000, 2008, 2020, 2024, 2030, 2040, 2050, 2060, 2070],
  values: [84.1, 94.3, 104.7, 117.1, 123.6, 126.9, 128.1, 126.1, 124.0, 120.1, 111.0, 104.7, 95.1, 87.0],
  projectionFrom: 2024,
  callout: { year: 2008, value: 128.1, text: "Peak: 128.1M (2008)" },
  callout2: { year: 2070, value: 87.0, text: "Could fall below 87M by 2070" },
};

// Age structure, % of population.
export const AGE_GROUPS = {
  source: "Statistics Bureau of Japan (e-Stat); IPSS 2023 projections, medium variant",
  unit: "% of population",
  years: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2024, 2030, 2040, 2050, 2060, 2070],
  young: [35.4, 30.2, 24.0, 23.5, 18.2, 14.6, 13.2, 11.9, 11.2, 10.9, 10.4, 10.2, 10.1, 10.2],
  working: [59.6, 64.1, 68.9, 67.4, 69.7, 68.1, 63.8, 59.5, 59.7, 57.8, 54.4, 52.1, 51.1, 51.7],
  old: [4.9, 5.7, 7.1, 9.1, 12.0, 17.3, 23.0, 28.6, 29.1, 31.3, 35.2, 37.7, 38.8, 38.1],
};

// Population pyramid: millions by 10-year band, men / women.
export const PYRAMID = {
  source: "Statistics Bureau of Japan (e-Stat); IPSS 2023 projections, medium variant",
  unit: "million people per 10-year band",
  bands: ["0–9", "10–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70–79", "80+"],
  years: {
    1950: { men: [7.6, 7.0, 5.5, 4.5, 4.0, 3.5, 3.0, 2.5, 1.5], women: [7.4, 6.8, 5.6, 4.8, 4.4, 3.9, 3.4, 2.9, 2.0], median: 22 },
    1975: { men: [8.5, 8.0, 7.5, 7.0, 6.0, 5.5, 4.5, 3.5, 2.9], women: [8.2, 7.8, 7.4, 7.2, 6.4, 5.9, 5.0, 4.0, 3.9], median: 28 },
    2000: { men: [6.5, 6.9, 7.8, 8.3, 7.8, 7.2, 6.7, 5.6, 5.3], women: [6.2, 6.6, 7.6, 8.1, 7.8, 7.5, 7.1, 6.5, 7.2], median: 41 },
    2025: { men: [4.5, 5.3, 6.2, 6.5, 8.0, 7.6, 6.8, 7.4, 7.0], women: [4.3, 5.0, 6.0, 6.3, 7.9, 7.7, 7.5, 8.4, 9.0], median: 49 },
    2050: { men: [3.9, 4.3, 4.9, 5.2, 5.6, 5.8, 6.0, 6.7, 7.7], women: [3.8, 4.2, 4.8, 5.1, 5.5, 5.9, 6.5, 7.6, 10.8], median: 54 },
    2070: { men: [3.1, 3.5, 4.0, 4.2, 4.7, 4.8, 5.0, 5.8, 6.0], women: [3.0, 3.4, 3.8, 4.1, 4.6, 4.9, 5.4, 6.7, 7.0], median: 56 },
  },
  note: "Band values rounded; totals approximate published population. 2050 and 2070 are IPSS projections.",
};

// Births and deaths, thousands per year.
export const VITAL = {
  source: "MHLW vital statistics (final data)",
  unit: "thousands per year",
  years: [1973, 1980, 1990, 2000, 2005, 2010, 2015, 2020, 2022, 2023, 2024],
  births: [2092, 1577, 1221, 1191, 1063, 1071, 1006, 841, 772, 727, 720],
  deaths: [862, 722, 820, 962, 1084, 1197, 1290, 1372, 1569, 1576, 1620],
  callout: { year: 2005, text: "Deaths overtake births (2005)" },
};

export const TFR = {
  source: "MHLW vital statistics",
  unit: "children per woman",
  years: [1973, 1980, 1990, 2000, 2005, 2010, 2015, 2020, 2022, 2023, 2024],
  values: [2.14, 1.75, 1.54, 1.36, 1.26, 1.39, 1.45, 1.33, 1.26, 1.20, 1.15],
  replacement: 2.1,
};

export const LIFE = {
  source: "MHLW life tables",
  unit: "years at birth",
  years: [1970, 1980, 1990, 2000, 2010, 2020, 2024],
  men: [69.3, 73.4, 75.9, 77.7, 79.6, 81.6, 81.1],
  women: [74.7, 78.8, 81.9, 84.6, 86.4, 87.7, 87.1],
};

// Real GDP growth, % YoY.
export const GDP_GROWTH = {
  source: "Cabinet Office, national accounts (SNA)",
  unit: "% change, real GDP",
  years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [2.8, 0.4, 0.1, 1.5, 2.2, 1.8, 1.4, 1.5, -1.2, -5.4, 4.1, -0.1, 1.4, 2.0, 0.4, 1.6, 0.8, 1.7, 0.6, -0.4, -4.3, 2.6, 1.0, 1.7, 0.1],
  callouts: [
    { year: 2009, value: -5.4, text: "Global financial crisis: −5.4%" },
    { year: 2020, value: -4.3, text: "Pandemic: −4.3%" },
  ],
};

// Nominal GDP 2024, USD trillion (IMF World Economic Outlook).
export const GDP_RANK = {
  source: "IMF World Economic Outlook, 2024",
  unit: "USD trillion, nominal GDP 2024",
  rows: [
    { name: "United States", value: 29.2 },
    { name: "China", value: 18.8 },
    { name: "Germany", value: 4.7 },
    { name: "Japan", value: 4.0, highlight: true },
    { name: "India", value: 3.9 },
  ],
  note: "Japan was 2nd until 2010 (overtaken by China) and 3rd until 2023 (overtaken by Germany).",
};

export const CPI = {
  source: "Statistics Bureau of Japan (e-Stat); MHLW",
  unit: "%",
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  cpi: [0.8, -0.1, 0.5, 1.0, 0.5, 0.0, -0.2, 2.5, 3.3, 2.7],
  unemp: [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6, 2.5],
};

// Female labour-force participation by age, %.
export const MCURVE = {
  source: "Statistics Bureau of Japan, Labour Force Survey",
  unit: "% in labour force",
  ages: ["20–24", "25–29", "30–34", "35–39", "40–44", "45–49", "50–54", "55–59"],
  y1990: [72, 72, 57, 61, 69, 70, 66, 55],
  y2024: [80, 88, 82, 79, 80, 82, 82, 75],
  note: "The 1990 'M-curve' dip at ages 30–34 has largely flattened.",
};

export const SECTORS = {
  source: "Statistics Bureau of Japan, Labour Force Survey 2024",
  unit: "% of employment, 2024",
  rows: [
    { name: "Primary (agriculture, forestry, fisheries)", value: 3.0 },
    { name: "Secondary (manufacturing, construction)", value: 24.0 },
    { name: "Tertiary (services)", value: 73.0 },
  ],
};

export const FOREIGN = {
  source: "Immigration Services Agency, 2024",
  unit: "foreign residents, end-2024",
  rows: [
    { name: "China", value: 0.87 },
    { name: "Viet Nam", value: 0.63 },
    { name: "South Korea", value: 0.41 },
    { name: "Philippines", value: 0.33 },
    { name: "Brazil", value: 0.21 },
  ],
  total: "3.77M total (3.0% of population)",
};

// 47 prefectures: tile position (col,row), % aged 65+ (2024), population change % (2024).
// Positions are a schematic tile cartogram — approximate geography, not a map.
export const PREFECTURES = [
  { name: "Hokkaido", c: 8, r: 0, aging: 33.6, change: -0.7 },
  { name: "Aomori", c: 6, r: 1, aging: 36.8, change: -1.1 },
  { name: "Iwate", c: 7, r: 1, aging: 35.2, change: -1.0 },
  { name: "Akita", c: 5, r: 2, aging: 39.7, change: -1.3 },
  { name: "Yamagata", c: 6, r: 2, aging: 35.8, change: -1.0 },
  { name: "Miyagi", c: 7, r: 2, aging: 29.4, change: -0.4 },
  { name: "Fukushima", c: 6, r: 3, aging: 33.5, change: -0.8 },
  { name: "Niigata", c: 4, r: 4, aging: 33.8, change: -0.8 },
  { name: "Tochigi", c: 7, r: 3, aging: 29.5, change: -0.5 },
  { name: "Ibaraki", c: 8, r: 3, aging: 30.1, change: -0.4 },
  { name: "Gunma", c: 6, r: 4, aging: 30.6, change: -0.5 },
  { name: "Saitama", c: 7, r: 4, aging: 27.0, change: 0.0 },
  { name: "Chiba", c: 8, r: 4, aging: 27.8, change: -0.1 },
  { name: "Tokyo", c: 7, r: 5, aging: 23.2, change: 0.4 },
  { name: "Kanagawa", c: 6, r: 5, aging: 25.4, change: 0.2 },
  { name: "Yamanashi", c: 5, r: 5, aging: 31.2, change: -0.6 },
  { name: "Nagano", c: 5, r: 4, aging: 32.4, change: -0.6 },
  { name: "Toyama", c: 4, r: 5, aging: 33.4, change: -0.7 },
  { name: "Ishikawa", c: 3, r: 5, aging: 31.3, change: -0.5 },
  { name: "Fukui", c: 3, r: 6, aging: 31.6, change: -0.7 },
  { name: "Gifu", c: 5, r: 6, aging: 30.8, change: -0.6 },
  { name: "Shizuoka", c: 6, r: 6, aging: 31.0, change: -0.5 },
  { name: "Aichi", c: 5, r: 7, aging: 25.1, change: 0.0 },
  { name: "Mie", c: 4, r: 7, aging: 30.5, change: -0.6 },
  { name: "Shiga", c: 4, r: 6, aging: 26.5, change: 0.0 },
  { name: "Kyoto", c: 3, r: 7, aging: 29.9, change: -0.3 },
  { name: "Osaka", c: 3, r: 8, aging: 27.9, change: 0.1 },
  { name: "Hyogo", c: 2, r: 7, aging: 29.8, change: -0.3 },
  { name: "Nara", c: 4, r: 8, aging: 31.9, change: -0.5 },
  { name: "Wakayama", c: 3, r: 9, aging: 34.8, change: -0.9 },
  { name: "Tottori", c: 1, r: 7, aging: 33.3, change: -0.8 },
  { name: "Shimane", c: 1, r: 8, aging: 35.5, change: -0.8 },
  { name: "Okayama", c: 2, r: 8, aging: 30.6, change: -0.4 },
  { name: "Hiroshima", c: 2, r: 9, aging: 30.1, change: -0.4 },
  { name: "Yamaguchi", c: 1, r: 9, aging: 35.0, change: -0.8 },
  { name: "Tokushima", c: 4, r: 9, aging: 34.9, change: -0.9 },
  { name: "Kagawa", c: 5, r: 9, aging: 32.7, change: -0.6 },
  { name: "Ehime", c: 4, r: 10, aging: 34.3, change: -0.8 },
  { name: "Kochi", c: 5, r: 10, aging: 36.4, change: -0.9 },
  { name: "Fukuoka", c: 1, r: 10, aging: 27.5, change: 0.1 },
  { name: "Saga", c: 0, r: 10, aging: 31.2, change: -0.6 },
  { name: "Nagasaki", c: 0, r: 11, aging: 34.2, change: -0.9 },
  { name: "Kumamoto", c: 1, r: 11, aging: 31.8, change: -0.5 },
  { name: "Oita", c: 2, r: 11, aging: 33.6, change: -0.6 },
  { name: "Miyazaki", c: 2, r: 12, aging: 33.8, change: -0.7 },
  { name: "Kagoshima", c: 1, r: 12, aging: 33.5, change: -0.7 },
  { name: "Okinawa", c: 0, r: 13, aging: 23.0, change: 0.1 },
];
export const PREF_SOURCE = "Statistics Bureau of Japan (e-Stat), population estimates 2024";
