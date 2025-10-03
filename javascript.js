//dark mode

function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }

 //skill bar
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

//skill bar animation
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


      //sidebar
  function showSection(sectionId) {
  
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

      document.getElementById(sectionId).classList.add('active');
    }
