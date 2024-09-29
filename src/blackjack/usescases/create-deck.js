import _ from "underscore";

/**
 * 
 * @param {Array<String>} types 
 * @param {Array<String>} specials 
 * @returns {Array<String>} new deck
 */
export const createDeck = (types, specials) => {
  let deck = [];

  for (let index = 2; index <= 10; index++) {
    types.forEach((type) => {
      deck.push(`${index}${type}`);
    });
  }

  specials.forEach((special) => {
    types.forEach((type) => {
      deck.push(`${special}${type}`);
    });
  });

  return _.shuffle(deck);
};

