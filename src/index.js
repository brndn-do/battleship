import "./styles.css";
import "typeface-roboto";

import Display from "./display.js";
import Player from "./player.js";

// globals
const display = new Display();
const player = new Player(true);
const computer = new Player(false);

function startGame() {
  display.clearPage();
  display.renderGame();
  display.renderBoard(player, computer);

  // happens when user clicks on clickable cell
  function attack(event) {
    // remove this cell's event listener
    event.target.removeEventListener("click", attack);

    // get cell number, calculate row and col number
    const cellNum = parseInt(event.target.classList[2].slice(4));
    const rowNum = Math.floor(cellNum / 10);
    const colNum = cellNum % 10;

    // attack coordinates
    computer.gameboard.receiveAttack(rowNum, colNum);

    // render
    display.renderBoard(player, computer);

    // check computer lost
    if (computer.gameboard.report()) return display.renderGameOver(player);

    // computer's turn:
    // get player's attackable cells
    const choices = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (!player.gameboard.grid[r][c].attacked) choices.push([r, c]);
      }
    }

    // choose a random one and attack
    const index = Math.floor(Math.random() * choices.length);
    player.gameboard.receiveAttack(choices[index][0], choices[index][1]);

    // render
    display.renderBoard(player, computer);

    // check player lost
    if (player.gameboard.report()) return display.renderGameOver(computer);
  }

  // add event listener to all cells that the player can click
  const cells = document.querySelectorAll(".cell.canClick");
  for (const cell of cells) cell.addEventListener("click", attack);

  // render
  display.renderBoard(player, computer);
}

// start placing ship of length shipLength horizontally/vertically
function startPlace(shipLength = 0, vertical = false) {
  function highlightCells(event) {
    // clear all highlights
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 10; c++)
        player.gameboard.grid[r][c].highlighted = false;
    // get cell number, calculate row and col number
    const cellNum = parseInt(event.target.classList[2].slice(4));
    const rowNum = Math.floor(cellNum / 10);
    const colNum = cellNum % 10;
    // if the target can be clicked, highlight more cells based on ship length and vertical
    if (player.gameboard.grid[rowNum][colNum].canClick) {
      if (vertical) {
        for (let r = rowNum + 1; r < rowNum + shipLength; r++) {
          if (r < 10) player.gameboard.grid[r][colNum].highlighted = true;
        }
      } else {
        for (let c = colNum + 1; c < colNum + shipLength; c++) {
          if (c < 10) player.gameboard.grid[rowNum][c].highlighted = true;
        }
      }
    }
    display.renderBoard(player, computer);
  }

  display.clearPage();
  display.renderGame();

  // clear all .canClick
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++) player.gameboard.grid[r][c].canClick = false;

  // make player's cells clickable based on vertical and ship length
  for (let r = 0; r < (vertical ? 11 - shipLength : 10); r++) {
    for (let c = 0; c < (vertical ? 10 : 11 - shipLength); c++) {
      player.gameboard.grid[r][c].canClick = true;
    }
  }

  // event listener for highlighting
  const cells = document.querySelectorAll(".player.cell");
  cells.forEach((cell) => cell.addEventListener("mouseover", highlightCells));

  // render
  display.renderBoard(player, computer);

  // assume everyone finished placing
  // startGame();
}

// landing page
display.renderLanding();
const playButton = document.querySelector("button");
playButton.addEventListener("click", () => startPlace(5));
