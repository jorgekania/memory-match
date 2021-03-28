//Constantes
const cards = document.querySelector('.cards')
const card = document.querySelectorAll('.card')
const flipCard = document.querySelectorAll('flipCard')
const btnEndGame = document.querySelector('#btnEndGame')

//Para controlar a modal endGame
var modalEndGame = document.querySelector('#modalEndGame')
modalEndGame.style.display = 'none';
var imgMatch = document.querySelector('#imgMatch')

//Arrays com os sons
const songs = [
    './songs/match.wav',
    './songs/flip-card.wav',
    './songs/end-game.wav'
]

const paySong = (key) => {
    var som = document.getElementById("audio");
    som.src = songs[key];
    som.play();
}

//verificar os acerto
var hits = 0;

//Combinações possíveis para acertos
const calculateResult = (cardOne, cardTwo) => {
    const equals = [
        ['imgCard_0', 'imgCard_6'],
        ['imgCard_1', 'imgCard_7'],
        ['imgCard_2', 'imgCard_8'],
        ['imgCard_3', 'imgCard_9'],
        ['imgCard_4', 'imgCard_10'],
        ['imgCard_5', 'imgCard_11'],
    ]

    let result = false
    equals.map((prop) => {
        if ((cardOne === prop[0] || cardOne === prop[1]) && (cardTwo === prop[0] || cardTwo === prop[1])) {
            result = true
        }
    })
    return result
}

//Gerar background e as cartas
const startGame = () => {

    hits = 0;
    rotateCards = [];
    arr = sort(arr);

    for (let i = 0; i < arr.length; i++) {

        card[i].innerHTML = `<div class="flipCard" id="flipCard_${arr[i]}"><img class="imgCard" id="imgCard_${arr[i]}" src="./images/avengers.png"></div>`;
        card[i].style.backgroundImage = "url(images/" + arr[i] + ".jpg)";
        card[i].style.backgroundSize = "cover";
        card[i].style.backgroundPosition = "center";
        card[i].style.backgroundRepeat = "no-repeat";
    }
    modalEndGame.style.display = 'none';
    btnEndGame.addEventListener('click', startGame, false)
}

//Array que verifica as cartas que forma viradas
var rotateCards = [];
var clickCard = [];

//Montando o array das cartas
var arr = []

for (var i = 0; i < card.length; i++) {
    arr.push(card[i].id)
}

//Sortear as cartas com base no array montado anteriormente
const sort = (oldArray) => {

    var newArray = [];

    while (newArray.length != arr.length) {
        var sortCard = Math.floor(Math.random() * oldArray.length)

        if (newArray.indexOf(oldArray[sortCard]) < 0) {
            newArray.push(oldArray[sortCard]);
        }
    }
    return newArray;
}

//Rodar a carta quando for clicado
const rotateCard = (ev) => {

    const verifyClick = ev.target.classList;

    if (verifyClick.contains('flipCard') || verifyClick.contains('imgCard')) {

        const imgCard = ev.target.id;
        const elCard = ev.target
        const child = elCard.children.length > 0 ? elCard.children.item('id') : false;

        if (rotateCards.length < 2) {

            paySong(1)

            if (child != false) {
                if (child.classList.length > 1) {
                    return;
                }
            }

            if (verifyClick.contains("imgCard") || verifyClick.contains("hover")) {
                ev.target.classList.toggle('hover')

            } else if (verifyClick.contains("flipCard")) {
                child.classList.remove('hover')
            }

            rotateCards.push(elCard);
            clickCard.push(imgCard);

            if (clickCard.length == 2) {
                if (calculateResult(clickCard[0], clickCard[1])) {
                    rotateCards[0].parentNode.classList.add('match')
                    rotateCards[1].parentNode.classList.add('match')

                    paySong(0)
                    hitCardCombination();
                    hits++;

                    rotateCards = [];
                    clickCard = [];

                    if (hits === 6) {
                        endGame();
                        paySong(2)
                    }
                }
            }

        } else {

            paySong(1)
            rotateCards[0].classList.toggle('hover')
            rotateCards[1].classList.toggle('hover')

            rotateCards = [];
            clickCard = [];
        }
    }
}
const cardClick = document.addEventListener('click', rotateCard, false)

//Modal para final do jogo
const endGame = () => {
    modalEndGame.style.display = 'flex';
    btnEndGame.addEventListener('click', startGame, false)
}

//Função para mostrar que o usuário acertou um combinação
const hitCardCombination = () => {
    imgMatch.style.zIndex = 1;
    imgMatch.style.top = 45 + "%";
    imgMatch.style.opacity = 0;

    setTimeout(function () {
        imgMatch.style.zIndex = -1;
        imgMatch.style.top = 20 + "%";
        imgMatch.style.opacity = 1;
    }, 1500);
}

startGame();
