class Interface {
  constructor() {}

  // clears page
  clearPage() {
    const main = document.querySelector(".main");
    const component = document.querySelector(".main *");
    main.removeChild(component);
  }

  // renders landing page
  landing() {
    const main = document.querySelector(".main");
    const landing = document.createElement("div");
    landing.classList.add("landing");

    const heading = document.createElement("h1");
    heading.classList.add("heading");
    heading.textContent = "battleship";

    const button = document.createElement("button");
    button.textContent = "play";
    button.addEventListener("click", () => {
      this.clearPage();
      this.game();
    });

    landing.appendChild(heading);
    landing.appendChild(button);

    main.appendChild(landing);
  }

  // renders game page
  game() {
    const main = document.querySelector(".main");

    const game = document.createElement("div");
    game.classList.add("game");

    const player = document.createElement("div");
    player.classList.add("player");
    const playerText = document.createElement("h1");
    playerText.textContent = "player";
    player.appendChild(playerText);

    const computer = document.createElement("div");
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
      playerCell.classList.add("player");
      playerCell.classList.add("cell");
      playerCell.classList.add(`cell${i}`);
      const computerCell = document.createElement("div");
      computerCell.classList.add("computer");
      computerCell.classList.add("cell");
      computerCell.classList.add(`cell${i}`);
      playerBoard.appendChild(playerCell);
      computerBoard.appendChild(computerCell);
    }

    player.appendChild(playerBoard);
    computer.appendChild(computerBoard);

    game.appendChild(player);
    game.appendChild(computer);

    main.appendChild(game);
  }

  // given a player object, renders their board
  renderBoard(player) {
    const grid = player.gameboard.grid;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (grid[r][c].ship) {
          const cell = document.querySelector(
            `.${player.real ? "player" : "computer"}.cell${r * 10 + c}`
          );
          cell.classList.add("hasShip");
        }
        if (grid[r][c].attacked) {
          const cell = document.querySelector(
            `.${player.real ? "player" : "computer"}.cell${r * 10 + c}`
          );
          cell.classList.add("attacked");
        }
      }
    }
  }
}

export default Interface;
