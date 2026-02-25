/* =========================
   TYPING ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Software Developer",
    "Frontend Engineer",
    "Web Creator",
    "Problem Solver",
    "Tea Addict"
  ];

  const typingEl = document.getElementById("typing");

  if (!typingEl) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseAfterTyping = 1200;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentPhrase.slice(0, charIndex);

    // When finished typing
    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }

    // When finished deleting
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, delay);
  }

  typeEffect();


  /* =========================
     GITHUB REPOS FETCH
  ========================= */
  const username = "RamzaTariq";
  const excludeRepos = ["RamzaTariq"]; 

  async function fetchRepos() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      if (!response.ok) {
        throw new Error("GitHub API request failed");
      }

      const data = await response.json();
      const container = document.getElementById("repoList");

      if (!container) return;

      container.innerHTML = "";

      data
        .filter(repo => !excludeRepos.includes(repo.name))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6) // limit to 6 most recent
        .forEach(repo => {
          const div = document.createElement("div");
          div.classList.add("project-card");

          div.innerHTML = `
            <h3>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                ${repo.name}
              </a>
            </h3>
            <p>${repo.description || "No description provided."}</p>
          `;

          container.appendChild(div);
        });

    } catch (error) {
      console.error("GitHub API error:", error);
    }
  }

  fetchRepos();
});