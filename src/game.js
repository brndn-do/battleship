function game() {
  const main = document.querySelector(".main");

  const game = document.createElement("div");
  game.classList.add("game");

  const player = document.createElement("div");
  player.classList.add("player");
  const playerText = document.createElement("h1");
  playerText.textContent = "player";
  player.appendChild(playerText);

  const computer = document.createElement("computer");
  computer.classList.add("computer");
  const computerText = document.createElement("h1");
  computerText.textContent = "computer";
  computer.appendChild(computerText);

  const playerBoard = document.createElement("div");
  playerBoard.classList.add("board");

  const computerBoard = document.createElement("div");
  computerBoard.classList.add("board");

  for (let i = 0; i < 100; i++) {
    const playerCell = document.createElement("div");
    playerCell.classList.add("cell");
    const computerCell = document.createElement("div");
    computerCell.classList.add("cell");
    playerBoard.appendChild(playerCell);
    computerBoard.appendChild(computerCell);
  }

  player.appendChild(playerBoard);
  computer.appendChild(computerBoard);

  game.appendChild(player);
  game.appendChild(computer);

  main.appendChild(game);
}

export default game;
