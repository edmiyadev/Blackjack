(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "K", "Q"];
  const uriImageCards = "assets/cards/";

  let playerPointers = 0;
  let computerPointers = 0;

  const btnOrderCard = document.querySelector("#btnOrderCard"),
    btnStopGame = document.querySelector("#btnStopGame"),
    btnNewGame = document.querySelector("#btnNewGame");

  const divPlayerCards = document.querySelector("#player-cards"),
    divComputerCards = document.querySelector("#computer-cards"),
    playerScores = document.querySelectorAll("small");

  // Functions
  let createDesk = () => {
    let cards = [];

    for (let index = 2; index <= 10; index++) {
      types.forEach((type) => {
        cards.push(`${index}${type}`);
      });
    }

    specials.forEach((special) => {
      types.forEach((type) => {
        cards.push(`${special}${type}`);
      });
    });

    return _.shuffle(cards);
  };

  let startGame = () => {
    deck = [];
    deck = createDesk();

    btnOrderCard.disabled = false;
    btnStopGame.disabled = false;

    playerPointers = 0;
    computerPointers = 0;

    divPlayerCards.innerHTML = "";
    divComputerCards.innerHTML = "";

    playerScores[0].innerHTML = 0;
    playerScores[1].innerHTML = 0;
  };

  let orderCard = () =>
    deck.length === 0
      ? (() => {
          throw "there are no cards in the deck";
        })()
      : deck.pop();

  let valueCard = (card) => {
    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  let computerShift = (playerPointers) => {
    do {
      let card = orderCard();
      computerPointers += valueCard(card);

      playerScores[1].innerText = computerPointers;

      const imgCard = document.createElement("img");
      console.log(imgCard);
      imgCard.src = `${uriImageCards}${card}.png`;
      imgCard.classList = "card";
      divComputerCards.append(imgCard);

      if (playerPointers > 21) {
        break;
      }
    } while (computerPointers < playerPointers && playerPointers <= 21);

    whoWon();
  };

  const whoWon = () => {
    setTimeout(() => {
      if (playerPointers === computerPointers) {
        alert("DRAW!");
      } else if (playerPointers > 21) {
        alert("YOU LOSE");
      } else if (computerPointers > 21) {
        alert("YOU WIND");
      } else {
        alert("YOU LOSE");
      }
    }, 20);
  };

  // TODO:CREATE FUNCTIONALITY
  let showCard = (pointers, playerScore) => {
    let card = orderCard();
    pointers += valueCard(card);
    playerScore.innerText = pointers;

    const imgCard = document.createElement("img");
    console.log(imgCard);
    imgCard.src = `${uriImageCards}${card}.png`;
    imgCard.classList = "card";
    divPlayerCards.append(imgCard);
  };

  // Events
  btnOrderCard.addEventListener("click", () => {
    let card = orderCard();
    playerPointers += valueCard(card);

    playerScores[0].innerText = playerPointers;

    const imgCard = document.createElement("img");
    console.log(imgCard);
    imgCard.src = `${uriImageCards}${card}.png`;
    imgCard.classList = "card";
    divPlayerCards.append(imgCard);

    if (playerPointers > 21) {
      btnOrderCard.disabled = true;
      computerShift(playerPointers);
      btnStopGame.disabled = true;

      console.warn("YOU LOSE");
    } else if (playerPointers === 21) {
      btnOrderCard.disabled = true;
      console.warn("Uff, 21");
      computerShift(playerPointers);
      btnStopGame.disabled = true;
    }
  });

  btnStopGame.addEventListener("click", () => {
    btnOrderCard.disabled = true;
    btnStopGame.disabled = true;

    computerShift(playerPointers);
  });

  btnNewGame.addEventListener("click", () => {
    startGame();
  });
})();
