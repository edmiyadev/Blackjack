import { valueCard } from "./value-card";

/**
 * 
 * @param {String} card 
 * @param {Number} shift 
 * @param {Array<Number>} players 
 * @param {HTMLElement} playerScores 
 * @returns {Number} player index 
 */

export const collectPoints = (card, shift, players, playerScores) => {
    players[shift] = players[shift] + valueCard(card);
    playerScores[shift].innerText = players[shift];
    return players[shift];
  };