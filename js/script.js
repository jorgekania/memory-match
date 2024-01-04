const imagePaths = ["./images/avengers/avengers.png"];
const gameBoard = document.getElementById("gameBoard");

const createCards = () => {
  for (let i = 0; i < 24; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = i.toString();
    const img = document.createElement("img");
    img.src = imagePaths[0];
    card.appendChild(img);
    gameBoard.appendChild(card);
  }
};

createCards();

const cards = document.querySelector(".cards");
const card = document.querySelectorAll(".card");
const flipCard = document.querySelectorAll(".flipCard");
const btnEndGame = document.getElementById("btnEndGame");
const btnEndGameErrors = document.getElementById("btnEndGameErrors");
const countErrorsElement = document.getElementById("countErrorsElement");
const maxErrorsElement = document.getElementById("maxErrorsElement");
const song = document.getElementById("audio");
const modalEndGame = document.getElementById("modalEndGame");
const modalEndGameErrors = document.getElementById("modalEndGameErrors");
const btnManualStart = document.getElementById("btnManualStart");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnCloseModalErrors = document.getElementById("btnCloseModalErrors");
const countHitsElement = document.getElementById("countHitsElement");
const currentTimeElement = document.getElementById("currentTimeElement");

modalEndGame.style.display = "none";
modalEndGameErrors.style.display = "none";

const INITIAL_TIMER_VALUE = 10;
const MAX_ERROS = 3;
const PLAY_DELAY = 10;
let playing = true;
let hits = 0;
let timerValue = INITIAL_TIMER_VALUE;
let currentErrors = 0;
let currentTime = 0;
let displayCards = "hover";
let timerInterval;
let timeInterval;

maxErrorsElement.textContent = MAX_ERROS;
currentTimeElement.innerText = currentTime;

const songs = [
  "./songs/match.wav",
  "./songs/flip-card.wav",
  "./songs/end-game.wav",
  "./songs/error.wav",
  "./songs/click.wav",
  "./songs/wrong-end-game.wav",
  "./songs/countdown.wav",
];

const combinations = [
  ["imgCard_0", "imgCard_12"],
  ["imgCard_1", "imgCard_13"],
  ["imgCard_2", "imgCard_14"],
  ["imgCard_3", "imgCard_15"],
  ["imgCard_4", "imgCard_16"],
  ["imgCard_5", "imgCard_17"],
  ["imgCard_6", "imgCard_18"],
  ["imgCard_7", "imgCard_19"],
  ["imgCard_8", "imgCard_20"],
  ["imgCard_9", "imgCard_21"],
  ["imgCard_10", "imgCard_22"],
  ["imgCard_11", "imgCard_23"],
];

const playSong = (key) => {
  song.src = songs[key];
  song.pause();
  song.currentTime = 0;

  setTimeout(() => {
    song.play();
  }, PLAY_DELAY);
};

const calculateResult = (cardOne, cardTwo) => {
  return combinations.some(
    ([prop1, prop2]) =>
      (cardOne === prop1 || cardOne === prop2) &&
      (cardTwo === prop1 || cardTwo === prop2)
  );
};

const configureCard = (index, addHoverClass) => {
  card[
    index
  ].innerHTML = `<div class="flipCard" id="flipCard_${arr[index]}"><img class="imgCard ${addHoverClass}" id="imgCard_${arr[index]}" src="./images/avengers/avengers.png"></div>`;
  card[index].style.backgroundImage = `url(images/avengers/${arr[index]}.jpg)`;
  card[index].style.backgroundSize = "cover";
  card[index].style.backgroundPosition = "center";
  card[index].style.backgroundRepeat = "no-repeat";
};

const showAllCards = () => {
  rotateCards = [];
  arr = sort(arr);

  for (let i = 0; i < arr.length; i++) {
    configureCard(i, "hover");
    card[i].classList.add("unclickable");
  }

  setTimeout(() => {
    for (let i = 0; i < arr.length; i++) {
      configureCard(i, "");
      card[i].classList.remove("unclickable");
    }
  }, INITIAL_TIMER_VALUE * 1000 + 1000);
};

const updateHits = () => {
  hits++;
  countHitsElement.textContent = hits;
};

const updateCurrentTime = () => {
  currentTime++;
  currentTimeElement.textContent = currentTime;
};

const updateTimer = () => {
  btnManualStart.innerHTML = `<i class="fa-solid fa-clock"></i> ${timerValue} seg. para memorizar as cartas`;
  timerValue--;

  if (timerValue < 0) {
    playSong(1);
    clearInterval(timerInterval);
    timeInterval = setInterval(updateCurrentTime, 1000);
    btnManualStart.innerHTML =
      '<i class="fa-solid fa-gamepad"></i> VOCÊ ESTÁ JOGANDO...';
    btnManualStart.classList.toggle("btnManualStartPlaying");
  }
};

const updateErros = () => {
  currentErrors++;
  countErrorsElement.textContent = currentErrors;
};

const startTimer = () => {
  setTimeout(() => {
    playSong(6);
  }, 2000);
  timerInterval = setInterval(updateTimer, 1000);
};

const startGame = () => {
  startTimer();
  showAllCards();
  hits = 0;
  countHitsElement.textContent = hits;
  countErrorsElement.textContent = currentErrors;
  playing = true;
};

btnCloseModal.addEventListener("click", () => {
  modalEndGame.style.display = "none";
  verifyPlaying();
});

btnCloseModalErrors.addEventListener("click", () => {
  modalEndGameErrors.style.display = "none";

  clearInterval(timeInterval);
  verifyPlaying();
});

const verifyPlaying = () => {
  if (!playing) {
    playing = true;
    btnManualStart.classList.remove("unclickable");
    btnManualStart.innerHTML = '<i class="fa-solid fa-play"></i> JOGAR';
    btnManualStart.classList.toggle("btnManualStartPlaying");
  } else {
    playing = false;
    btnManualStart.classList.add("unclickable");
    btnManualStart.innerHTML =
      '<i class="fa-solid fa-gamepad"></i> VOCÊ ESTÁ JOGANDO...';
    btnManualStart.classList.toggle("btnManualStartPlaying");
  }
};

const manualStart = () => {
  playing = false;
  btnManualStart.classList.add("unclickable");
  currentTime = 0;
  currentTimeElement.textContent = currentTime;

  startGame();
};

btnManualStart.addEventListener("click", manualStart, false);

let rotateCards = [];
let clickCard = [];
let arr = [];

for (let i = 0; i < card.length; i++) {
  arr.push(card[i].id);
}

const sort = (oldArray) => {
  let newArray = [];

  while (newArray.length !== arr.length) {
    let sortCard = Math.floor(Math.random() * oldArray.length);

    if (newArray.indexOf(oldArray[sortCard]) < 0) {
      newArray.push(oldArray[sortCard]);
    }
  }
  return newArray;
};

const rotateCard = (ev) => {
  const verifyClick = ev.target.classList;

  if (verifyClick.contains("unclickable")) {
    return;
  }

  if (verifyClick.contains("flipCard") || verifyClick.contains("imgCard")) {
    const imgCard = ev.target.id;
    const elCard = ev.target;
    const child =
      elCard.children.length > 0 ? elCard.children.item("id") : false;

    if (rotateCards.length < 2) {
      playSong(1);

      if (child !== false) {
        if (child.classList.length > 1) {
          return;
        }
      }

      if (verifyClick.contains("imgCard") || verifyClick.contains("hover")) {
        ev.target.classList.toggle("hover");
      } else if (verifyClick.contains("flipCard")) {
        child.classList.toggle("hover");
      }

      rotateCards.push(elCard);
      clickCard.push(imgCard);

      if (
        clickCard.length === 2 &&
        !calculateResult(clickCard[0], clickCard[1])
      ) {
        setTimeout(() => {
          playSong(3);
          rotateCards[0].classList.remove("hover");
          rotateCards[1].classList.remove("hover");
          rotateCards = [];
          clickCard = [];
        }, 500);

        updateErros();

        if (currentErrors === MAX_ERROS) {
          setTimeout(() => {
            endGame();
            playSong(5);
          }, 1000);
        }
      }

      if (clickCard.length === 2) {
        if (calculateResult(clickCard[0], clickCard[1])) {
          rotateCards[0].parentNode.classList.add("match");
          rotateCards[1].parentNode.classList.add("match");

          playSong(0);
          updateHits();

          rotateCards = [];
          clickCard = [];

          if (hits === 12) {
            endGame();
            playSong(2);
          }
        }
      }
    } else {
      playSong(1);
      rotateCards[0].classList.toggle("hover");
      rotateCards[1].classList.toggle("hover");

      rotateCards = [];
      clickCard = [];
    }
  }
};

document.addEventListener("click", rotateCard, false);

const endGame = () => {
  timerValue = INITIAL_TIMER_VALUE;
  playing = false;

  if (currentErrors === MAX_ERROS) {
    currentErrors = 0;
    modalEndGameErrors.style.display = "flex";
  } else {
    modalEndGame.style.display = "flex";
  }

  clearInterval(timerInterval);
  clearInterval(timeInterval);
};

const restartGame = () => {
  modalEndGame.style.display = "none";
  modalEndGameErrors.style.display = "none";
  hits = 0;
  currentTime = 0;
  countHitsElement.textContent = hits;
  currentTimeElement.textContent = currentTime;
  btnManualStart.classList.toggle("btnManualStartPlaying");

  clearInterval(timeInterval);
  startGame();
};

btnEndGame.addEventListener("click", restartGame, false);
btnEndGameErrors.addEventListener("click", restartGame, false);
