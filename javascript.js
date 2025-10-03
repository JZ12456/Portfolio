// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Animate skill bars
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach(bar => {
    const width = bar.dataset.width; // safer than style.width
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// Show/hide sections
function showSection(sectionId) {
  // Hide all switchable sections
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

  // Show the chosen section
  document.getElementById(sectionId).classList.add('active');

  // If skills tab is clicked, animate bars
  if (sectionId === "skills") {
    animateSkillBars();
  }
}
