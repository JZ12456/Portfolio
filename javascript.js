function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }

    window.onload = () => {
      const bars = document.querySelectorAll(".skill-bar-fill");
      bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
    };

   function showSection(id) {
  const sections = document.querySelectorAll(".page-section");
  sections.forEach(section => {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}


function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const skillsLink = document.querySelector('a[onclick*="skills"]');
  if (skillsLink) {
    skillsLink.addEventListener("click", animateSkillBars);
  }


  const defaultSection = document.querySelector(".page-section.active");
  if (defaultSection && defaultSection.id === "skills") {
    animateSkillBars();
  }
});

