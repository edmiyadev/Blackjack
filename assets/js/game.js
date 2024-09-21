(() => {
  "use strict";

  let numberOfPlayers = 0;
  let deck = [];

  let players = [];

  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "K", "Q"],
    uriImageCards = "assets/cards/";

  const btnOrderCard = document.querySelector("#btnOrderCard"),
    btnStopGame = document.querySelector("#btnStopGame"),
    btnNewGame = document.querySelector("#btnNewGame");

  const divCards = document.querySelectorAll(".divCards"),
    playerScores = document.querySelectorAll("small");

  // Functions

  // Number of players
  const numberPlayers = () => {
    do {
      numberOfPlayers = prompt("Cantidad de jugadores (de 1 a 3):", 1);
    } while (!(numberOfPlayers >= 1 && numberOfPlayers <= 3));
  };

  // Start the game
  const startGame = (numberOfPlayers = 1) => {
    deck = createDeck();
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

  const collectPoints = (card, shift) => {
    players[shift] = players[shift] + valueCard(card);
    playerScores[shift].innerText = players[shift];
    return players[shift];
  };

  const createCard = (card, player) => {
    const imgCard = document.createElement("img");
    imgCard.src = `${uriImageCards}${card}.png`;
    imgCard.classList = "card";
    divCards[player].append(imgCard);
  };

  const createDeck = () => {
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

  const orderCard = () => {
    return deck.length === 0
      ? (() => {
          throw "there are no cards in the deck";
        })()
      : deck.pop();
  };

  const valueCard = (card) => {
    const value = card.slice(0, -1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  const computerShift = (playerPointers) => {
    let computerPointers = 0;

    do {
      let card = orderCard();
      computerPointers = collectPoints(card, players.length - 1);
      createCard(card, players.length - 1);

      if (playerPointers > 21) {
        break;
      }
    } while (computerPointers < playerPointers && playerPointers <= 21);

    whoWon();
  };

  const whoWon = () => {
    const [playerPointers, computerPointers] = players;

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
    }, 30);
  };

  numberPlayers();

  // Events
  btnOrderCard.addEventListener("click", () => {
    let card = orderCard();
    const playerPointers = collectPoints(card, 0);
    createCard(card, 0);

    if (playerPointers > 21) {
      computerShift(playerPointers);
      btnOrderCard.disabled = true;
      btnStopGame.disabled = true;

      console.warn("YOU LOSE");
    } else if (playerPointers === 21) {
      computerShift(playerPointers);
      btnOrderCard.disabled = true;
      btnStopGame.disabled = true;

      console.warn("Uff, 21");
    }
  });

  btnStopGame.addEventListener("click", () => {
    btnOrderCard.disabled = true;
    btnStopGame.disabled = true;

    computerShift(players[0]);
  });

  btnNewGame.addEventListener("click", () => {
    startGame(numberOfPlayers);
  });
})();
