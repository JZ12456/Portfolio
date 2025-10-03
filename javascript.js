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
