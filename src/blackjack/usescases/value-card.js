/**
 *
 * @param {String} card
 * @returns {Number} value numeric of card
 */
export const valueCard = (card) => {
  const value = card.slice(0, -1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};
