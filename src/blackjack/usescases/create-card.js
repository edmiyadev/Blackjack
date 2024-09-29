import { uriImageCards } from "../index";

export const createCard = (card, player, divCards) => {
    const imgCard = document.createElement("img");
    imgCard.src = `${uriImageCards}${card}.png`;
    imgCard.classList = "card";
    divCards[player].append(imgCard);
  };
  