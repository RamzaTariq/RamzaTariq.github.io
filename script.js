const username = "RamzaTariq";
const exclude = "team-a-calc";

async function fetchRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();

    const container = document.getElementById("repoList");

    data
      .filter(repo => repo.name !== exclude)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const div = document.createElement("div");
        div.classList.add("project-card");

        div.innerHTML = `
          <h3>
            <a href="${repo.html_url}" target="_blank">
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