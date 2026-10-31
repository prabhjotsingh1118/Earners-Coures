
const canvas = document.querySelector("#petals");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let petals = [];
let lastTime = 0;

const PETAL_COUNT = 4000;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  petals = Array.from({ length: PETAL_COUNT }, () => createPetal(true));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// function createPetal(initial = false) {
//   return {
//     x: random(0, width),
//     y: initial ? random(-height, height) : random(-70, -15),
//     size: random(4, 9),
//     speed: random(18, 48),
//     drift: random(8, 25),
//     phase: random(0, Math.PI * 2),
//     rotation: random(0, Math.PI * 2),
//     spin: random(-1.2, 1.2),
//     opacity: random(0.45, 0.9)
//   };
// }


function createPetal(initial = false) {
  return {
    x: random(0, width),
    y: initial ? random(-height, height) : random(-100, -20),

    // Petals pehle se bade aur visible honge
    size: random(6, 9),
    speed: random(35, 75),
    drift: random(12, 80),

    phase: random(0, Math.PI * 2),
    rotation: random(0, Math.PI * 2),
    spin: random(-1.5, 1.5),
    opacity: random(0.75, 1)
  };
}


function drawPetal(petal) {
  ctx.save();

  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.opacity;

  const gradient = ctx.createLinearGradient(
    -petal.size,
    -petal.size,
    petal.size,
    petal.size
  );

  gradient.addColorStop(0, "#fff0f8");
  gradient.addColorStop(0.5, "#ffacd8");
  gradient.addColorStop(1, "#e86cae");

  ctx.fillStyle = gradient;

  // Petal ka natural curved shape
  ctx.beginPath();
  ctx.moveTo(0, -petal.size);
  ctx.bezierCurveTo(
    petal.size * 1.4, -petal.size * 0.7,
    petal.size * 1.3, petal.size * 0.7,
    0, petal.size
  );
  ctx.bezierCurveTo(
    -petal.size * 1.3, petal.size * 0.7,
    -petal.size * 1.4, -petal.size * 0.7,
    0, -petal.size
  );
  
  ctx.fill();

  ctx.restore();
}

function animate(time = 0) {
  // Large frame gaps mein animation ko stable rakho
  const delta = lastTime
    ? Math.min((time - lastTime) / 1000, 0.04)
    : 0;

  lastTime = time;

  ctx.clearRect(0, 0, width, height);

  for (const petal of petals) {
    petal.phase += delta * 0.8;
    petal.x += (
      Math.sin(petal.phase) * petal.drift +
      Math.sin(time * 0.0003) * 7
    ) * delta;

    petal.y += petal.speed * delta;
    petal.rotation += petal.spin * delta;

    if (petal.y > height + 30) {
      Object.assign(petal, createPetal());
    }

    drawPetal(petal);
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(animate);
