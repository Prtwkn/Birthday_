const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}
themeToggle.addEventListener("click", () => {
  htmlElement.classList.toggle("dark");
  if (htmlElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
});
function openGift() {
  const giftContainer = document.getElementById("gift-container");
  const introSection = document.getElementById("intro-section");
  const mainContent = document.getElementById("main-content");
  giftContainer.classList.add("gift-open");
  setTimeout(() => {
    introSection.style.opacity = "0";
    setTimeout(() => {
      introSection.style.display = "none";
      mainContent.classList.add("visible");
      setTimeout(() => {
        mainContent.classList.add("fade-in");
      }, 50);
      fireConfetti(100);
    }, 700);
  }, 600);
}
function flipCard(element) {
  element.classList.toggle("flipped");
}
function celebrate() {
  let count = 0;
  const interval = setInterval(() => {
    fireConfetti(60);
    count++;
    if (count > 15) clearInterval(interval);
  }, 100);
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createFloatingHeart();
    }, i * 150);
  }
}
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 5000);
}
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
function fireConfetti(amount) {
  const colors = [
    "#ec4899",
    "#f472b6",
    "#fbbf24",
    "#34d399",
    "#60a5fa",
    "#a78bfa",
  ];
  for (let i = 0; i < amount; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 25,
      vy: (Math.random() - 0.5) * 25 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.4,
      drag: 0.95,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
    });
  }
}
function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.rotation += p.rotationSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    const size = p.size;
    const radius = 2;
    ctx.roundRect(-size / 2, -size / 2, size, size, radius);
    ctx.fill();
    ctx.restore();
    if (p.y > canvas.height) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(updateConfetti);
}
updateConfetti();

//Audio=>
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

window.addEventListener("load", () => {
  music.volume = 0.7;

  music.play().then(()=>{
      musicBtn.classList.add("playing");
  }).catch(()=>{
      console.log("Autoplay blocked");
  });
});

musicBtn.addEventListener("click", () => {

  if (music.paused) {
    music.play();
    musicBtn.classList.add("playing");
  } 
  else {
    music.pause();
    musicBtn.classList.remove("playing");
  }

});
