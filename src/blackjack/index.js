import {
  createDeck,
  orderCard,
  computerShift,
  collectPoints,
  createCard,
  numberPlayers,
} from "./usescases";

let numberOfPlayers = 1;
let deck = [];
let players = [];

const types = ["C", "D", "H", "S"],
  specials = ["A", "J", "K", "Q"];

export const uriImageCards = "assets/cards/";

const btnOrderCard = document.querySelector("#btnOrderCard"),
  btnStopGame = document.querySelector("#btnStopGame"),
  btnNewGame = document.querySelector("#btnNewGame");

export const divCards = document.querySelectorAll(".divCards");
const playerScores = document.querySelectorAll("small");

export const startGame = () => {
  // numberOfPlayers = numberPlayers();

  deck = createDeck(types, specials);
  players = [];

  for (let index = 0; index < numberOfPlayers * 1 + 1; index++) {
    players.push(0);
  }

  btnOrderCard.disabled = false;
  btnStopGame.disabled = false;

  divCards.forEach((value, key) => {
    divCards[key].innerHTML = "";
  });

  playerScores.forEach((value, key) => {
    playerScores[key].innerHTML = 0;
  });
};

// Events
btnOrderCard.addEventListener("click", () => {
  let card = orderCard(deck);
  const playerPointers = collectPoints(card, 0, players, playerScores);
  createCard(card, 0, divCards);

  if (playerPointers > 21) {
    computerShift(playerPointers, deck, players, playerScores);
    btnOrderCard.disabled = true;
    btnStopGame.disabled = true;

    console.warn("YOU LOSE");
  } else if (playerPointers === 21) {
    computerShift(playerPointers, deck, players, playerScores);
    btnOrderCard.disabled = true;
    btnStopGame.disabled = true;

    console.warn("Uff, 21");
  }
});

btnStopGame.addEventListener("click", () => {
  btnOrderCard.disabled = true;
  btnStopGame.disabled = true;

  computerShift(players[0], deck, players, playerScores);
});

btnNewGame.addEventListener("click", () => {
  startGame();
});
