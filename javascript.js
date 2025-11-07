document.addEventListener('DOMContentLoaded', () => {
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const darkModeToggle = document.getElementById('darkModeToggle');
const skillBars = document.querySelectorAll('.skill-bar');
const projectItems = document.querySelectorAll('.project-item');
const projectDetail = document.getElementById('project-detail');
const projectContent = document.getElementById('project-content');
const backButton = document.getElementById('backButton');


function showSection(id) {
sections.forEach(sec => sec.classList.remove('active'));
document.querySelector(id).classList.add('active');
}


navLinks.forEach(link => {
link.addEventListener('click', e => {
e.preventDefault();
const target = e.target.getAttribute('href');
showSection(target);
history.pushState(null, '', target);
});
});


darkModeToggle.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});


skillBars.forEach(bar => {
const skill = bar.dataset.skill;
bar.style.setProperty('--width', skill + '%');
setTimeout(() => bar.classList.add('fill'), 200);
});


projectItems.forEach(item => {
item.addEventListener('click', () => {
const id = item.dataset.project;
projectDetail.classList.remove('hidden');
projectContent.innerHTML = `<h2>${item.textContent}</h2><div id="chart"></div>`;
renderChart(id);
});
});


backButton.addEventListener('click', () => {
projectDetail.classList.add('hidden');
projectContent.innerHTML = '';
});


function renderChart(id) {
if (!document.getElementById('chart')) return;
const data = id === '1'
? [{x: [1,2,3,4], y: [10,15,13,17], type: 'scatter', name: 'Dataset A'}]
: [{x: [1,2,3,4], y: [12,9,15,12], type: 'bar', name: 'Dataset B'}];


Plotly.newPlot('chart', data, {margin: {t: 20}, responsive: true});
}
