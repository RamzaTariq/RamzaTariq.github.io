document.addEventListener("DOMContentLoaded", () => {

/* TYPING EFFECT */

const phrases = [
"Software Developer",
"Full-Stack Engineer",
"Web Creator",
"Problem Solver",
"Tea Addict"
];

const typingEl = document.getElementById("typing");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

const phrase = phrases[phraseIndex];

if(isDeleting){
charIndex--;
}else{
charIndex++;
}

typingEl.textContent = phrase.substring(0,charIndex);

if(!isDeleting && charIndex === phrase.length){
setTimeout(()=> isDeleting = true, 1200);
}

if(isDeleting && charIndex === 0){
isDeleting = false;
phraseIndex = (phraseIndex + 1) % phrases.length;
}

setTimeout(typeEffect, isDeleting ? 50 : 100);

}

typeEffect();



/* GITHUB PROJECTS */

const username = "RamzaTariq";
const excludeRepos = ["RamzaTariq"];

async function fetchRepos(){

try{

const res = await fetch(`https://api.github.com/users/${username}/repos`);

const data = await res.json();

const container = document.getElementById("repoList");

if(!container) return;

container.innerHTML = "";

data
.filter(repo => !excludeRepos.includes(repo.name))
.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
.slice(0,6)
.forEach(repo => {

const div = document.createElement("div");
div.classList.add("project-card");

const liveDemo = `https://${username}.github.io/${repo.name}`;

div.innerHTML = `

<h3>${repo.name}</h3>

<p>${repo.description || "No description provided."}</p>

<div class="project-buttons">

<a href="${repo.html_url}" target="_blank" class="btn-secondary">
GitHub
</a>

<a href="${liveDemo}" target="_blank" class="btn-primary">
Live Demo
</a>

</div>

`;

container.appendChild(div);

});

}catch(err){

console.error("GitHub API error:", err);

}

}

/* CALL FUNCTION */

fetchRepos();



/* THEME TOGGLE */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark-mode");
themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", ()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
themeIcon.textContent = "☀️";
localStorage.setItem("theme","dark");
}else{
themeIcon.textContent = "🌙";
localStorage.setItem("theme","light");
}

});

});