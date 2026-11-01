
const petalsContainer = document.querySelector("#petals");
const starsContainer = document.querySelector("#stars");
const glow = document.querySelector(".cursor-glow");

// Random number generate karne ke liye
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Cherry blossoms branches par create karo
document.querySelectorAll(".blossoms").forEach((container) => {
  for (let i = 0; i < 45; i++) {
    const blossom = document.createElement("div");
    blossom.className = "blossom";

    blossom.style.left = `${random(0, 85)}%`;
    blossom.style.top = `${random(0, 78)}%`;
    blossom.style.setProperty("--size", `${random(20, 48)}px`);
    blossom.style.setProperty("--duration", `${random(3, 6)}s`);
    blossom.style.animationDelay = `${random(-5, 0)}s`;

    container.appendChild(blossom);
  }
});

// Sky mein stars create karo
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.className = "star";

  star.style.left = `${random(0, 100)}%`;
  star.style.top = `${random(0, 75)}%`;
  star.style.setProperty("--duration", `${random(1, 4)}s`);
  star.style.animationDelay = `${random(-4, 0)}s`;

  starsContainer.appendChild(star);
}

// Hawa mein girti hui cherry petals
for (let i = 0; i < 35; i++) {
  const petal = document.createElement("div");
  petal.className = "petal";

  petal.style.left = `${random(0, 100)}%`;
  petal.style.setProperty("--duration", `${random(7, 16)}s`);
  petal.style.animationDelay = `${random(-16, 0)}s`;
  petal.style.opacity = random(0.35, 0.9);
  petal.style.width = `${random(7, 13)}px`;
  petal.style.height = `${random(10, 19)}px`;

  petalsContainer.appendChild(petal);
}

// Mouse ke saath pink-purple glow move karo
window.addEventListener("mousemove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
