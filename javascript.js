//Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

//Animate Skill Bars
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach(bar => {
    const width = bar.dataset.width;
    bar.style.width = "0";
    setTimeout(() => { bar.style.width = width; }, 100);
  });
}

//Section Switching
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === "skills") animateSkillBars();
}

//Anscombe Data
const x123 = [10,8,13,9,11,14,6,4,12,7,5];
const y1 = [8.04,6.95,7.58,8.81,8.33,9.96,7.24,4.26,10.84,4.82,5.68];
const y2 = [9.14,8.14,8.74,8.77,9.26,8.10,6.13,3.10,9.13,7.26,4.74];
const y3 = [7.46,6.77,12.74,7.11,7.81,8.84,6.08,5.39,8.15,6.42,5.73];
const x4 = [8,8,8,8,8,8,8,19,8,8,8];
const y4 = [6.58,5.76,7.71,8.84,8.47,7.04,5.25,12.50,5.56,7.91,6.89];

const datasets = [
  {x: x123, y: y1, name: "Dataset I"},
  {x: x123, y: y2, name: "Dataset II"},
  {x: x123, y: y3, name: "Dataset III"},
  {x: x4,   y: y4,  name: "Dataset IV"}
];

function fitLine(x) { return x.map(v => 3 + 0.5*v); }

//Plotly Graphs

//Scatterplots with fit lines
function makeScatter() {
  const subplots = [];
  let index = 0;
  for (const d of datasets) {
    index++;
    subplots.push({
      type: "scatter", mode: "markers",
      x: d.x, y: d.y, name: d.name,
      xaxis: "x" + index, yaxis: "y" + index
    });
    subplots.push({
      type: "scatter", mode: "lines",
      x: [3, 20], y: [fitLine([3,20])[0], fitLine([3,20])[1]],
      line: {dash: "dash", color: "red"},
      showlegend: false,
      xaxis: "x" + index, yaxis: "y" + index
    });
  }

  const layout = {
    title: "Scatterplots with Fit Lines",
    grid: {rows: 2, columns: 2, pattern: "independent"},
    height: 700,
    width: 900
  };
  Plotly.newPlot("scatter", subplots, layout);
}

//Residuals
function makeResiduals() {
  const traces = datasets.map(d => {
    const residuals = d.y.map((yi, i) => yi - (3 + 0.5*d.x[i]));
    return {x: d.x, y: residuals, mode: "markers", name: d.name};
  });
  const layout = {
    title: "Residual Plots",
    xaxis: {title: "x"},
    yaxis: {title: "Residual (y - ŷ)"},
    height: 600, width: 900
  };
  Plotly.newPlot("residuals", traces, layout);
}

//Box and Violin
function makeBox() {
  const traces = [
    {type: "box", name: "x", y: datasets.flatMap(d => d.x)},
    {type: "violin", name: "y", y: datasets.flatMap(d => d.y), box: {visible: true}}
  ];
  const layout = {title: "Box and Violin Plots", height: 500, width: 900};
  Plotly.newPlot("box", traces, layout);
}

//Overlaid Comparison
function makeOverlaid() {
  const traces = datasets.map(d => ({
    type: "scatter", mode: "markers", name: d.name, x: d.x, y: d.y
  }));
  const fitx = Array.from({length: 100}, (_, i) => i/5 + 3);
  const fity = fitLine(fitx);
  traces.push({
    type: "scatter", mode: "lines", name: "Fit Line",
    x: fitx, y: fity, line: {dash: "dash", color: "red"}
  });
  const layout = {
    title: "Overlaid Comparison of All Datasets",
    xaxis: {range: [2, 20], title: "x"},
    yaxis: {range: [2, 14], title: "y"},
    height: 600, width: 800
  };
  Plotly.newPlot("overlaid", traces, layout);
}

//Run all plots
document.addEventListener("DOMContentLoaded", () => {
  makeScatter();
  makeResiduals();
  makeBox();
  makeOverlaid();
});
