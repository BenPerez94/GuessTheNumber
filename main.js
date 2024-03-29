// @ts-nocheck
import "./style.css";

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function resultInfo(text) {
  const alert = document.querySelector("#fail-result");

  alert?.parentElement?.classList.remove("hidden");
  while (alert?.firstChild) {
    alert?.firstChild.remove();
  }
  const span = document.createElement("span");
  span.innerText = text;
  alert?.appendChild(span);

  return;
}

function attempCreate() {
  while (attempsGame?.firstChild) {
    attempsGame?.firstChild.remove();
  }
  const spanattempsGame = document.createElement("span");
  spanattempsGame.innerText = String(attemp);
  attempsGame?.appendChild(spanattempsGame);
}

function createMarker(position) {
  const marker = document.createElement("div");
  const markerIcon = document.createElement("i");
  markerIcon.className = "fa-solid";
  markerIcon.classList.add("fa-crosshairs");

  marker.appendChild(markerIcon);
  marker.className = "marker";
  marker.style.left = `${position}%`;
  document.getElementById("range-container").appendChild(marker);
}

function updateProgressAndCreateMarker(numberPlayer) {
  const percentage = (numberPlayer / 500) * 100;
  createMarker(percentage);
}

const showRules = document.querySelector("#show-rules");
const rules = document.querySelector("#rules");
const playButton = document.querySelector("#play");
const game = document.querySelector("#game");
const endGame = document.querySelector("#end-game");
const numberView = document.querySelector("#number-Search");
const span = document.createElement("span");
const spanattemp = document.createElement("span");
const attemps = document.querySelector("#attemps");
const attempsGame = document.querySelector("#amouts-game");

playButton?.addEventListener("click", (e) => {
  e.preventDefault();
  showRules?.classList.remove("hidden");
  playButton.classList.add("hidden");
  game?.classList.remove("hidden");
  rules?.classList.add("hidden");
});

let numberSearch = getRandomArbitrary(0, 500);
let attemp = 0;

attempCreate();

const form = document.querySelector("#form");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const numberPlayer = Number(formData.get("number"));
  document.getElementById("number").value = "";

  if (isNaN(numberPlayer)) {
    const err = "Fait un effort.. on te demande un nombre !";
    resultInfo(err);
    return;
  }

  if (numberPlayer < 0 || numberPlayer > 500) {
    const err = "Veuillez entrez un chiffre entre 0 et 500";
    resultInfo(err);
    return;
  }

  attemp++;
  attempCreate();

  const alert = document.querySelector("#fail-result");
  const blockAlertActive = document.querySelector(".hidden");

  if (blockAlertActive !== null) {
    alert?.parentElement?.classList.add("hidden");
  }

  if (numberPlayer > numberSearch) {
    const err = `C'est plus petit que ${numberPlayer} !`;
    resultInfo(err);
    updateProgressAndCreateMarker(numberPlayer);
    return;
  }
  if (numberPlayer < numberSearch) {
    const err = `C'est plus grand que ${numberPlayer} !`;
    resultInfo(err);
    updateProgressAndCreateMarker(numberPlayer);

    return;
  }
  if (numberPlayer === numberSearch) {
    game?.classList.add("hidden");
    endGame?.classList.remove("hidden");
    span.innerText = String(numberSearch);
    numberView?.appendChild(span);

    spanattemp.innerText = "Tu as reussi en " + String(attemp) + " coups !";
    attemps?.appendChild(spanattemp);

    return;
  }
});

showRules?.addEventListener("click", () => {
  const rules = document.querySelector("#rules");
  rules?.classList.toggle("hidden");
});

const replayButton = document.querySelector("#replay");
replayButton?.addEventListener("click", (e) => {
  e.preventDefault();
  attemp = 0;
  attempCreate();
  endGame?.classList.add("hidden");
  game?.classList.remove("hidden");
  numberSearch = getRandomArbitrary(0, 500);
  numberView?.removeChild(span);
  document.getElementById("range-container").innerHTML = "";
});
