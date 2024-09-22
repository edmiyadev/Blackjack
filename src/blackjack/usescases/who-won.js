export const whoWon = (players) => {
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