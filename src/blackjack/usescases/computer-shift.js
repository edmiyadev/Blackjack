import { orderCard } from "./order-card";
import { collectPoints } from "./collect-points";
import { createCard } from "./create-card";
import { whoWon } from "./who-won";
import { divCards } from "../index";

/**
 * 
 * @param {Number } playerPointers 
 * @param {Array<String>} deck 
 * @param {Array<Number>} players 
 * @param {HTMLCollection} playerScores 
 */

export const computerShift = (playerPointers, deck, players, playerScores) => {
  let computerPointers = 0;

  do {
    let card = orderCard(deck);
    computerPointers = collectPoints(card, players.length - 1, players, playerScores);
    createCard(card, players.length - 1, divCards);

    if (playerPointers > 21) {
      break;
    }
  } while (computerPointers < playerPointers && playerPointers <= 21);

  whoWon(players);
};
