function spawnBit(x, y) {
  const bits = ["™", "!!", "kern", "lorem", "px", "wtf", "8pt", "а?", "нет", "да?"];
  const colors = ["#ff00aa", "#111", "#00e5ff", "#ccff00"];
  const bit = document.createElement("span");
  bit.className = "junk-bit";
  bit.textContent = bits[Math.floor(Math.random() * bits.length)];
  bit.style.left = `${x - 8}px`;
  bit.style.top = `${y - 8}px`;
  bit.style.color = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(bit);
  setTimeout(() => bit.remove(), 860);
}

const logo = document.getElementById("logo");
const hint = document.getElementById("toolHint");
const kern = document.getElementById("kern");
const mailPage = document.getElementById("mailPage");
const tiltables = document.querySelectorAll(".section, .hero, h1, .lead");
let scale = 1;
let smashed = 0;
let typing = false;
const mailText =
  "Ксюша,\n\nможем чуть кривее? и шрифтов побольше. и чтобы «вау». и чтобы как у конкурентов, но иначе.\n\nкороче: с днём рождения. ты дизайнер от бога и от дедлайна.\n\nп.с. правки пришлю в субботу вечером.";

function onAction(event) {
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (!target) return;

  const bigger = target.closest("#bigger");
  const align = target.closest("#align");
  const contrast = target.closest("#contrast");
  const sticker = target.closest(".sticker");
  const letter = target.closest(".kern button");
  const swatch = target.closest(".swatches button");
  const mail = target.closest("#mail");

  if (bigger && logo) {
    scale = Math.min(scale + 0.18, 2.4);
    logo.style.transform = `scale(${scale}) rotate(${(scale - 1) * 12}deg)`;
    logo.style.transformOrigin = "left top";
    if (hint) {
      hint.textContent = scale >= 2.4
        ? "клиент доволен. макет умер."
        : `лого ×${scale.toFixed(1)}. ещё чуть-чуть.`;
    }
    return;
  }

  if (align) {
    tiltables.forEach((el) => {
      el.style.transform = `rotate(${(Math.random() * 14 - 7).toFixed(1)}deg)`;
    });
    if (hint) hint.textContent = "выровняла. (нет)";
    return;
  }

  if (contrast) {
    document.body.classList.toggle("contrast-bomb");
    if (hint) {
      hint.textContent = document.body.classList.contains("contrast-bomb")
        ? "доступность: мы её видели. мельком."
        : "вернула. почти.";
    }
    return;
  }

  if (sticker) {
    sticker.classList.add("open");
    sticker.textContent = sticker.dataset.text;
    return;
  }

  if (letter && kern) {
    smashed += 1;
    letter.style.transform = `translateX(${-12 * smashed}px) rotate(${smashed * 4}deg)`;
    if (smashed >= 5) {
      kern.classList.add("tight");
      const wish = document.getElementById("kernWish");
      if (wish) wish.textContent = "КСЮША. плотно. как дедлайн и любовь.";
    }
    return;
  }

  if (swatch) {
    document.body.style.backgroundColor = swatch.dataset.hex;
    const wish = document.getElementById("swatchWish");
    if (wish) wish.textContent = `${swatch.dataset.hex} — «сделайте поярче» (с)`;
    return;
  }

  if (mail && mailPage && !typing) {
    typing = true;
    mailPage.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      mailPage.textContent += mailText[i];
      i += 1;
      if (i >= mailText.length) clearInterval(timer);
    }, 18);
  }
}

document.addEventListener("click", (event) => {
  spawnBit(event.clientX, event.clientY);
  onAction(event);
});
