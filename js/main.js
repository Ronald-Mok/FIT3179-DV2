// Ideas at Work — embeds every chart with one shared theme.
// Colour values mirror the CSS custom properties in css/style.css.

const PALETTE = {
  ink: "#1d2125",
  muted: "#5b6470",
  rule: "#e3e5e8",
  context: "#c8ccd2",
  accent: "#d55e00", // Australia / focus
  goods: "#0072b2", // goods & services innovation
  process: "#009e73", // process innovation
  seq: ["#efedf5", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"],
  size: ["#c9d3dd", "#93a5b8", "#5c7590", "#2e4560"] // Micro → Large
};

const FONT = "IBM Plex Sans, system-ui, sans-serif";

// Vega / Vega-Lite config applied to every chart.
const THEME = {
  background: "transparent",
  font: FONT,
  view: { stroke: null },
  axis: {
    labelColor: PALETTE.muted,
    labelFontSize: 12,
    titleColor: PALETTE.ink,
    titleFontSize: 12,
    titleFontWeight: 500,
    domainColor: PALETTE.rule,
    tickColor: PALETTE.rule,
    gridColor: "#eceef0"
  },
  legend: {
    labelColor: PALETTE.muted,
    labelFontSize: 12,
    titleColor: PALETTE.ink,
    titleFontSize: 12,
    titleFontWeight: 500
  },
  header: {
    labelColor: PALETTE.ink,
    labelFontSize: 12,
    titleFontSize: 12
  },
  text: { color: PALETTE.ink, fontSize: 12 },
  mark: { color: PALETTE.size[2] },
  range: {
    category: [PALETTE.goods, PALETTE.process, PALETTE.accent, PALETTE.context],
    ordinal: PALETTE.size,
    ramp: PALETTE.seq,
    heatmap: PALETTE.seq
  }
};

// One entry per chart slot in index.html. Set `spec` when the chart is built.
const CHARTS = [
  { id: "c01", spec: "charts/c01_sunburst.vl.json" }, // S1 Sunburst (Task 1)
  { id: "c02", spec: "charts/c02_waffle.vl.json" }, // S2 Waffle (Task 2)
  { id: "c03", spec: "charts/c03_choropleth.vl.json" }, // S2 World choropleth (Task 2)
  { id: "c04", spec: "charts/c04_proportional_symbol.vl.json" }, // S2 Proportional symbol map (Task 2)
  { id: "c05", spec: "charts/c05_flow_map.vl.json" }, // S2 Flow map (Task 2)
  { id: "c06", spec: "charts/c06_heatmap.vl.json" }, // S3 Heatmap (Task 3)
  { id: "c07", spec: "charts/c07_lollipop.vl.json" }, // S3 Lollipop (Task 3)
  { id: "c08", spec: "charts/c08_marimekko.vl.json" }, // S4 Marimekko (Task 4)
  { id: "c09", spec: "charts/c09_dumbbell.vl.json" }, // S4 Dumbbell (Task 4)
  { id: "c10", spec: "charts/c10_choropleth_states.vl.json" }, // S5 State choropleth (Task 5)
  { id: "c11", spec: "charts/c11_dot_map.vl.json" }, // S5 Dot map (Task 5)
  { id: "c12", spec: "charts/c12_hexbin_map.vl.json" }, // S5 Bin map (Task 5)
  { id: "c13", spec: null }, // S5 Scorecard heatmap (Task 5)
  { id: "c14", spec: null }, // S6 Line chart (Task 6)
  { id: "c15", spec: null }, // S6 Bump chart (Task 6)
  { id: "c16", spec: null }, // S6 Slope chart (Task 6)
  { id: "c17", spec: null }, // S7 Bar chart (Task 7)
  { id: "c18", spec: null } // S7 Dumbbell (Task 7)
];

// "no-cache" makes the browser check for newer specs and data on every load,
// so edited charts show up without a hard refresh.
const EMBED_OPTIONS = {
  actions: false,
  renderer: "svg",
  config: THEME,
  loader: vega.loader({ http: { cache: "no-cache" } }),
};

for (const { id, spec } of CHARTS) {
  if (!spec) continue;
  vegaEmbed(`#${id}`, spec, EMBED_OPTIONS).catch((err) =>
    console.error(`Chart ${id} failed to load:`, err)
  );
}
