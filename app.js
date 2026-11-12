const junk = document.getElementById("junk");
const bits = ["™", "!!", "kern", "lorem", "px", "wtf", "8pt", "а?", "нет", "да?"];

document.addEventListener("click", (event) => {
  const bit = document.createElement("span");
  bit.className = "junk-bit";
  bit.textContent = bits[Math.floor(Math.random() * bits.length)];
  bit.style.left = `${event.clientX - 8}px`;
  bit.style.top = `${event.clientY - 8}px`;
  bit.style.color = ["#ff00aa", "#111", "#00e5ff", "#ccff00"][Math.floor(Math.random() * 4)];
  bit.style.transform = `rotate(${Math.floor(Math.random() * 40) - 20}deg)`;
  junk.appendChild(bit);
  setTimeout(() => bit.remove(), 860);
});

const logo = document.getElementById("logo");
let scale = 1;
document.getElementById("bigger").addEventListener("click", () => {
  scale = Math.min(scale + 0.18, 2.4);
  logo.style.transform = `scale(${scale}) rotate(${(scale - 1) * 12}deg)`;
  logo.style.transformOrigin = "left top";
  document.getElementById("toolHint").textContent = scale >= 2.4
    ? "клиент доволен. макет умер."
    : `лого ×${scale.toFixed(1)}. ещё чуть-чуть.`;
});

const tiltables = document.querySelectorAll(".section, .hero, h1, .lead");
document.getElementById("align").addEventListener("click", () => {
  tiltables.forEach((el) => {
    const rot = (Math.random() * 14 - 7).toFixed(1);
    el.style.transform = `rotate(${rot}deg)`;
  });
  document.getElementById("toolHint").textContent = "выровняла. (нет)";
});

document.getElementById("contrast").addEventListener("click", () => {
  document.body.classList.toggle("contrast-bomb");
  document.getElementById("toolHint").textContent = document.body.classList.contains("contrast-bomb")
    ? "доступность: мы её видели. мельком."
    : "вернула. почти.";
});

document.querySelectorAll(".sticker").forEach((sticker) => {
  sticker.addEventListener("click", () => {
    sticker.classList.add("open");
    sticker.textContent = sticker.dataset.text;
  });
});

const kern = document.getElementById("kern");
const letters = [...kern.querySelectorAll("button")];
let smashed = 0;
letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    smashed += 1;
    letter.style.transform = `translateX(${-12 * smashed}px) rotate(${smashed * 4}deg)`;
    if (smashed >= 5) {
      kern.classList.add("tight");
      document.getElementById("kernWish").textContent = "КСЮША. плотно. как дедлайн и любовь.";
    }
  });
});

document.querySelectorAll(".swatches button").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    document.body.style.backgroundColor = swatch.dataset.hex;
    document.getElementById("swatchWish").textContent = `${swatch.dataset.hex} — «сделайте поярче» (с)`;
  });
});

const mailText =
  "Ксюша,\n\nможем чуть кривее? и шрифтов побольше. и чтобы «вау». и чтобы как у конкурентов, но иначе.\n\nкороче: с днём рождения. ты дизайнер от бога и от дедлайна.\n\nп.с. правки пришлю в субботу вечером.";
const mailPage = document.getElementById("mailPage");
let typing = false;
document.getElementById("mail").addEventListener("click", () => {
  if (typing) return;
  typing = true;
  mailPage.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    mailPage.textContent += mailText[i];
    i += 1;
    if (i >= mailText.length) clearInterval(timer);
  }, 18);
});
