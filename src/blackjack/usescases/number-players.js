/**
 * Number of players
 * @returns {Number} number of players between 1 and 3
 */
export const numberPlayers = () => {
  let numberOfPlayers;

  do {
    numberOfPlayers = prompt("Cantidad de jugadores (de 1 a 3):", 1);
  } while (!(numberOfPlayers >= 1 && numberOfPlayers <= 3));

  return numberOfPlayers;
};
