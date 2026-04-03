// Floating hearts background
(function spawnHearts() {
  const bg = document.getElementById("heartsBg");
  const emojis = ["❤️", "💖", "💕", "💗", "💓", "🌹"];
  setInterval(() => {
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    const dur = 6 + Math.random() * 8;
    el.style.animationDuration = dur + "s";
    el.style.fontSize = (0.9 + Math.random() * 1.2) + "rem";
    el.style.animationDelay = "0s";
    bg.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }, 600);
})();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const questionSection = document.getElementById("questionSection");
const yesSection = document.getElementById("yesSection");
const noSection = document.getElementById("noSection");

const subtitle = document.getElementById("subtitle");
const catSubtitle = document.getElementById("catSubtitle");
const bgMusic = document.getElementById("bgMusic");
const nakreMusic = document.getElementById("nakreMusic");
const buttonArea = document.getElementById("buttonArea");

let noCount = 0;
let subtitleInterval;

const yesLyrics = [
  { time: 1, text: "You call the shots, babe 💖" },
  { time: 4, text: "I just wanna be yours" },
  { time: 7, text: "Secrets I have held in my heart ❤️" },
  { time: 11, text: "Are harder to hide than I thought" },
  { time: 15, text: "Maybe I just wanna be yours" },
  { time: 19, text: "I wanna be yours, I wanna be yours" },
  { time: 23, text: "Wanna be yours..." },
  { time: 26, text: "Wanna be yours..." },
  { time: 29, text: "Wanna be yours 💕" }
];

const nakreLyrics = [
  { time: 1,  text: "Jhumka dilaaoonga kangna dilaaoonga 💖" },
  { time: 5,  text: "Sab kuch main laaoonga teri kasam" },
  { time: 9,  text: "Chanda churaaoonga taarein bhi laaoonga ❤️" },
  { time: 13, text: "Sooraj jhukaaoonga teri kasam" },
  { time: 17, text: "Kabhi to meri jaan deewaani banogi 💕" },
  { time: 22, text: "Mujhse shaadi karogi, hey mujhse shaadi karogi" },
  { time: 27, text: "Mujhse shaadi karogi 💍" },
  { time: 31, text: "Mujhse shaadi karogi 💖" }
];

function startSubtitles(targetEl, lyrics, duration) {
  clearInterval(subtitleInterval);
  targetEl.textContent = "";

  const startTime = Date.now();

  subtitleInterval = setInterval(() => {
    const currentTime = (Date.now() - startTime) / 1000;

    for (let i = 0; i < lyrics.length; i++) {
      const currentLyric = lyrics[i];
      const nextLyric = lyrics[i + 1];

      if (
        currentTime >= currentLyric.time &&
        (!nextLyric || currentTime < nextLyric.time)
      ) {
        targetEl.textContent = currentLyric.text;
        break;
      }
    }

    if (currentTime > duration) {
      targetEl.textContent = "";
      clearInterval(subtitleInterval);
    }
  }, 200);
}

yesBtn.addEventListener("click", () => {
  questionSection.classList.add("hidden");
  noSection.classList.add("hidden");
  yesSection.classList.remove("hidden");

  nakreMusic.pause();
  bgMusic.currentTime = 0;
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {});

  startSubtitles(subtitle, yesLyrics, 33);
});

function moveNoButton() {
  noCount++;

  if (noCount >= 6) {
    questionSection.classList.add("hidden");
    yesSection.classList.add("hidden");
    noSection.classList.remove("hidden");

    bgMusic.pause();
    nakreMusic.currentTime = 0;
    nakreMusic.volume = 0.5;
    nakreMusic.play().catch(() => {});
    startSubtitles(catSubtitle, nakreLyrics, 36);
    return;
  }

  const areaWidth = buttonArea.clientWidth;
  const areaHeight = buttonArea.clientHeight;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = areaWidth - btnWidth;
  const maxY = areaHeight - btnHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  yesBtn.style.transform = `scale(${1 + noCount * 0.08})`;
}


noBtn.addEventListener("mouseenter", moveNoButton);


noBtn.addEventListener("click", moveNoButton);