/**
 *
 * @param {Array<String>} deck
 * @returns {Array<String>} one card of deck
 */

export const orderCard = (deck) => {
  return deck.length === 0
    ? (() => {
        throw "there are no cards in the deck";
      })()
    : deck.pop();
};
