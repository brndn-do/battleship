class Display {
  constructor() {}

  // clears page
  clearPage() {
    const main = document.querySelector(".main");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  // renders landing page
  renderLanding() {
    const main = document.querySelector(".main");
    const landing = document.createElement("div");
    landing.classList.add("landing");

    const heading = document.createElement("h1");
    heading.classList.add("heading");
    heading.textContent = "battleship";

    const button = document.createElement("button");
    button.textContent = "play";

    landing.appendChild(heading);
    landing.appendChild(button);

    main.appendChild(landing);
  }

  // renders game page
  renderGame() {
    const main = document.querySelector(".main");

    const game = document.createElement("game");
    game.classList.add("game");
    const boards = document.createElement("div");
    boards.classList.add("boards");

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

    boards.appendChild(player);
    boards.appendChild(computer);

    game.appendChild(boards);
    main.appendChild(game);

    const menu = document.createElement("div");
    menu.classList.add("menu");
    main.appendChild(menu);
  }

  // given a player and computer, renders their boards
  renderBoard(player, computer) {
    const grids = [player.gameboard.grid, computer.gameboard.grid];
    for (let i = 0; i < 2; i++) {
      const grid = grids[i];
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          // select cell # (row * 10 + column)
          const cell = document.querySelector(
            `.${i == 0 ? "player" : "computer"}.cell${r * 10 + c}`
          );
          cell.classList.remove(
            "showShip",
            "attacked",
            "canClick",
            "highlighted"
          );
          if (i === 0 && grid[r][c].ship) cell.classList.add("showShip");
          if (grid[r][c].attacked) cell.classList.add("attacked");
          if (grid[r][c].canClick) cell.classList.add("canClick");
          if (grid[r][c].highlighted) cell.classList.add("highlighted");
        }
      }
    }
  }

  renderPlace(shipName) {
    const menu = document.querySelector(".menu");
    const info = document.createElement("h1");
    info.textContent = `place your ${shipName}`;
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("rotate");
    rotateButton.textContent = "rotate";
    menu.append(info, rotateButton);
  }

  // given a winner, renders appropriate game over screen
  renderGameOver(winner) {
    const main = document.querySelector(".main");
    const gameOver = document.createElement("div");
    gameOver.classList.add("gameOver");
    const heading = document.createElement("h1");
    heading.textContent = "game over!";
    const outcome = document.createElement("h2");
    outcome.textContent = `you ${winner.real ? "win" : "lose"}!`;
    gameOver.appendChild(heading);
    gameOver.appendChild(outcome);
    main.appendChild(gameOver);
  }
}

export default Display;
