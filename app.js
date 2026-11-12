const sky = document.getElementById("sky");
const ctx = sky.getContext("2d");
let fireflies = [];

function resize() {
  sky.width = innerWidth;
  sky.height = innerHeight;
}

function spawnFly() {
  fireflies.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: 1.2 + Math.random() * 1.8,
    a: Math.random() * Math.PI * 2,
    s: 0.008 + Math.random() * 0.02,
  });
}

function drawSky() {
  ctx.clearRect(0, 0, sky.width, sky.height);
  fireflies.forEach((fly) => {
    fly.a += fly.s;
    fly.x += Math.cos(fly.a) * 0.35;
    fly.y += Math.sin(fly.a * 0.8) * 0.25;
    ctx.globalAlpha = 0.25 + Math.abs(Math.sin(fly.a)) * 0.75;
    ctx.fillStyle = "#ffd7a1";
    ctx.beginPath();
    ctx.arc(fly.x, fly.y, fly.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawSky);
}

addEventListener("resize", resize);
resize();
for (let i = 0; i < 40; i += 1) spawnFly();
drawSky();

const sparkLayer = document.getElementById("sparks");
const sparkMarks = ["✨", "☀️", "💫"];
document.addEventListener("click", (event) => {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.textContent = sparkMarks[Math.floor(Math.random() * sparkMarks.length)];
  spark.style.left = `${event.clientX - 8}px`;
  spark.style.top = `${event.clientY - 8}px`;
  sparkLayer.appendChild(spark);
  setTimeout(() => spark.remove(), 900);
});

const sunrise = document.getElementById("sunrise");
const windowHint = document.getElementById("windowHint");
const windowWish = document.getElementById("windowWish");
sunrise.addEventListener("click", () => {
  sunrise.classList.toggle("open");
  const open = sunrise.classList.contains("open");
  windowHint.classList.toggle("is-hidden", open);
  windowWish.classList.toggle("is-hidden", !open);
});

document.querySelectorAll(".polaroid").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("developed");
    card.querySelector(".caption").textContent = card.dataset.caption;
  });
});

const cassette = document.querySelector(".cassette");
const nowPlaying = document.getElementById("nowPlaying");
document.querySelectorAll(".tracks button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tracks button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    cassette.classList.add("playing");
    nowPlaying.textContent = `♪ ${btn.dataset.track}`;
  });
});

const order = [];
const line = document.getElementById("starLine");
const starWish = document.getElementById("starWish");
const points = {
  1: "38,104",
  2: "102,50",
  3: "166,83",
  4: "224,40",
  5: "275,94",
};

document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", () => {
    const n = Number(star.dataset.n);
    if (order.includes(n)) return;
    if (n !== order.length + 1) {
      starWish.textContent = "По порядку: 1 → 2 → 3 → 4 → 5";
      return;
    }
    star.classList.add("on");
    order.push(n);
    line.setAttribute("points", order.map((i) => points[i]).join(" "));
    if (order.length === 5) {
      starWish.textContent = "Сияй. Созвездие собрано — Ксюша, ты в центре кадра.";
    }
  });
});

document.querySelectorAll(".cookie").forEach((cookie) => {
  cookie.addEventListener("click", () => {
    if (cookie.classList.contains("broken")) return;
    cookie.classList.add("broken");
    cookie.textContent = cookie.dataset.fortune;
  });
});

const diaryText =
  "Ксюша,\n\nпусть этот год будет ярче штор на окне: много света, своих людей и смелых «да».\n\nС днём рождения ☀️";
const diaryPage = document.getElementById("diaryPage");
let typing = false;
document.getElementById("diary").addEventListener("click", () => {
  if (typing) return;
  typing = true;
  diaryPage.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    diaryPage.textContent += diaryText[i];
    i += 1;
    if (i >= diaryText.length) clearInterval(timer);
  }, 24);
});
