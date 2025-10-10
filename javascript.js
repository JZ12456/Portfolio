// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Skill bar animation
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach(bar => {
    const width = bar.dataset.width; // use data-width for reliability
    bar.style.width = "0";
    setTimeout(() => { bar.style.width = width; }, 300);
  });
}

// Section switching
function showSection(sectionId) {
  // Hide all switchable sections
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  
  // Show chosen section
  document.getElementById(sectionId).classList.add('active');

  // Animate skill bars when Skills tab clicked
  if (sectionId === "skills") animateSkillBars();
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

//Fit line
function fitLine(x) { return x.map(v => 3 + 0.5*v); }

//Scatterplots with fit lines
function makeScatter() {
  const subplots = [];
  const rows = 2, cols = 2;
  let index = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const d = datasets[index++];
      if (!d) continue;
      subplots.push({
        type: "scatter",
        x: d.x, y: d.y,
        mode: "markers",
        name: d.name,
        xaxis: `x${index}`,
        yaxis: `y${index}`
      });
      subplots.push({
        type: "scatter",
        x: [...Array(100).keys()].map(v => v/5 + 3),
        y: [...Array(100).keys()].map(v => 3 + 0.5*(v/5 + 3)),
        mode: "lines",
        line: {dash: "dash", color: "red"},
        showlegend: false,
        xaxis: `x${index}`,
        yaxis: `y${index}`
      });
    }
  }

  const layout = {
    title: "Scatterplots with Fit Lines",
    grid: {rows: 2, columns: 2, pattern: "independent"},
    height: 700,
    width: 900
  };

  Plotly.newPlot('scatter', subplots, layout);
}

//Residuals
function makeResiduals() {
  const traces = datasets.map((d) => {
    const residuals = d.y.map((yi, i) => yi - (3 + 0.5*d.x[i]));
    return {
      x: d.x, y: residuals, mode: "markers",
      name: d.name
    };
  });
  const layout = {
    title: "Residual Plots",
    xaxis: {title: "x"},
    yaxis: {title: "Residual (y - ŷ)"},
    height: 700, width: 900
  };
  Plotly.newPlot('residuals', traces, layout);
}

//Box and Violin
function makeBox() {
  const traces = [
    {
      type: "box",
      x: datasets.map(d => d.name),
      y: datasets.flatMap(d => d.x),
      name: "x"
    },
    {
      type: "violin",
      x: datasets.map(d => d.name),
      y: datasets.flatMap(d => d.y),
      name: "y",
      box: {visible: true}
    }
  ];
  const layout = {
    title: "Box and Violin Plots",
    grid: {rows: 1, columns: 2, pattern: "independent"},
    height: 500, width: 900
  };
  Plotly.newPlot('box', traces, layout);
}

//Overlaid comparison
function makeOverlaid() {
  const traces = datasets.map(d => ({
    type: "scatter",
    x: d.x, y: d.y,
    mode: "markers",
    name: d.name
  }));

  const all_x = datasets.flatMap(d => d.x);
  const fitx = Array.from({length: 100}, (_, i) => i/5 + 3);
  const fity = fitLine(fitx);
  traces.push({
    x: fitx, y: fity,
    mode: "lines", name: "Fit Line",
    line: {dash: "dash", color: "red"}
  });

  const layout = {
    title: "Overlaid Comparison of All Datasets",
    xaxis: {range: [2, 20], title: "x"},
    yaxis: {range: [2, 14], title: "y"},
    height: 600, width: 800
  };

  Plotly.newPlot('overlaid', traces, layout);
}

//Run all
makeScatter();
makeResiduals();
makeBox();
makeOverlaid();
