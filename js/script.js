const cards = document.querySelector(".cards");
const card = document.querySelectorAll(".card");
const flipCard = document.querySelectorAll(".flipCard");
const btnEndGame = document.getElementById("btnEndGame");
const btnEndGameErrors = document.getElementById("btnEndGameErrors");
const countErrorsElement = document.getElementById("countErrorsElement");
const maxErrorsElement = document.getElementById("maxErrorsElement");
const timerElement = document.getElementById("timerElement");
const song = document.getElementById("audio");
const modalEndGame = document.getElementById("modalEndGame");
const modalEndGameErrors = document.getElementById("modalEndGameErrors");
const imgMatch = document.getElementById("imgMatch");
const btnManualStart = document.getElementById("btnManualStart");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnCloseModalErrors = document.getElementById("btnCloseModalErrors");

modalEndGame.style.display = "none";
modalEndGameErrors.style.display = "none";

const INITIAL_TIMER_VALUE = 5;
const MAX_ERROS = 3;
const PLAY_DELAY = 10;
let playing = true;
let hits = 0;
let timerValue = INITIAL_TIMER_VALUE;
let currentErrors = 0;
let displayCards = "hover";
let timerInterval;

maxErrorsElement.textContent = MAX_ERROS;

const songs = [
  "./songs/match.wav",
  "./songs/flip-card.wav",
  "./songs/end-game.wav",
  "./songs/error.wav",
  "./songs/click.wav",
  "./songs/wrong-end-game.wav",
];

const playSong = (key) => {
  song.src = songs[key];
  song.pause();
  song.currentTime = 0;

  setTimeout(() => {
    song.play();
  }, PLAY_DELAY);
};

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
  ].innerHTML = `<div class="flipCard" id="flipCard_${arr[index]}"><img class="imgCard ${addHoverClass}" id="imgCard_${arr[index]}" src="./images/avengers.png"></div>`;
  card[index].style.backgroundImage = `url(images/${arr[index]}.jpg)`;
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
  }, 6000);
};

const updateTimer = () => {
  timerElement.textContent = `${timerValue}`;
  timerValue--;

  if (timerValue < 0) {
    playSong(1);
    clearInterval(timerInterval);
    timerElement.textContent = 0;
  }
};

const updateErros = () => {
  currentErrors++;
  countErrorsElement.textContent = currentErrors;
};

const startTimer = () => {
  timerInterval = setInterval(updateTimer, 1000);
};

const startGame = () => {
  startTimer();
  showAllCards();
  hits = 0;
  playing = true;
};

btnCloseModal.addEventListener("click", () => {
  modalEndGame.style.display = "none";
  verifyPlaying();
});

btnCloseModalErrors.addEventListener("click", () => {
  modalEndGameErrors.style.display = "none";

  verifyPlaying();
});

const verifyPlaying = () => {
  if (!playing) {
    playing = true;
    btnManualStart.removeAttribute("disabled");
    btnManualStart.innerHTML = "JOGAR";
  } else {
    playing = false;
    btnManualStart.setAttribute("disabled", true);
    btnManualStart.innerHTML = "JOGANDO...";
  }
};

const manualStart = () => {
  playing = false;
  btnManualStart.setAttribute("disabled", true);
  btnManualStart.innerHTML = "JOGANDO...";

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
          hitCardCombination();
          hits++;

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
    countErrorsElement.textContent = currentErrors;
    modalEndGameErrors.style.display = "flex";
  } else {
    modalEndGame.style.display = "flex";
  }

  clearInterval(timerInterval);
};

const restartGame = () => {
  modalEndGame.style.display = "none";
  modalEndGameErrors.style.display = "none";
  startGame();
};

btnEndGame.addEventListener("click", restartGame, false);
btnEndGameErrors.addEventListener("click", restartGame, false);

const hitCardCombination = () => {
  imgMatch.style.zIndex = 1;
  imgMatch.style.top = 45 + "%";
  imgMatch.style.opacity = 0;

  setTimeout(() => {
    imgMatch.style.zIndex = -1;
    imgMatch.style.top = 20 + "%";
    imgMatch.style.opacity = 1;
  }, 1500);
};

// startGame();
