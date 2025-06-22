function clearPage() {
  const main = document.querySelector(".main");
  const component = document.querySelector(".main *");
  main.removeChild(component);
}

function landing() {
  const main = document.querySelector(".main");
  const landing = document.createElement("div");
  landing.classList.add("landing");

  const heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = "battleship";

  const button = document.createElement("button");
  button.textContent = "play";
  button.addEventListener("click", () => {
    clearPage();
    game();
  })

  landing.appendChild(heading);
  landing.appendChild(button);

  main.appendChild(landing);
}

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

export { landing };
