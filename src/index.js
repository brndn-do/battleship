import "./styles.css";
import "typeface-roboto";

import Display from "./display.js";
import Player from "./player.js";

// globals
const display = new Display();
const player = new Player(true);
const computer = new Player(false);
const shipTypes = [
  [5, "carrier"],
  [4, "battleship"],
  [3, "cruiser"],
  [3, "submarine"],
  [2, "destroyer"],
];

function startGame() {
  display.clearPage();
  display.renderGame();
  display.renderBoard(player, computer);

  // clear all .canClick
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++) player.gameboard.grid[r][c].canClick = false;

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
function startPlace(index, vertical = false) {
  // clear
  display.clearPage();
  display.renderGame();

  if (index === shipTypes.length)
    // we have placed all ships, start the game
    return startGame();
  const shipType = shipTypes[index];
  const shipLength = shipType[0];
  const shipName = shipType[1];
  // all of player's cells
  const cells = document.querySelectorAll(".player.cell");

  function highlightCells(event) {
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

  function unhighlightCells() {
    // clear all highlights
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 10; c++)
        player.gameboard.grid[r][c].highlighted = false;
    display.renderBoard(player, computer);
  }

  function placeShip(event) {
    // get cell number, calculate row and col number
    const cellNum = parseInt(event.target.classList[2].slice(4));
    const rowNum = Math.floor(cellNum / 10);
    const colNum = cellNum % 10;
    // if the target cannot be clicked, return
    if (!player.gameboard.grid[rowNum][colNum].canClick) return;

    // clear all listeners
    cells.forEach((cell) =>
      cell.removeEventListener("mouseover", highlightCells)
    );
    cells.forEach((cell) => cell.removeEventListener("click", placeShip));
    // place
    player.gameboard.place(rowNum, colNum, shipLength, vertical);
    display.renderBoard(player, computer);
    // call next startPlace
    startPlace(index + 1, vertical);
  }

  display.renderPlace(shipName);
  const rotateButton = document.querySelector(".rotate");
  rotateButton.addEventListener("click", () => {return startPlace(index, !vertical);});

  // clear all .canClick
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++) player.gameboard.grid[r][c].canClick = false;

  // set cells as clickable
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++)
      if (player.gameboard.canPlace(r, c, shipLength, vertical))
        player.gameboard.grid[r][c].canClick = true;

  // event listeners: we add event listeners to all cells (even ones that can't be clicked)
  // in each callback, we check for .canClick and simply return if it can't be clicked
  cells.forEach((cell) => cell.addEventListener("mouseover", highlightCells));
  cells.forEach((cell => cell.addEventListener("mouseleave", unhighlightCells)))
  cells.forEach((cell) => cell.addEventListener("click", placeShip));

  // render
  display.renderBoard(player, computer);
}

// landing page
display.renderLanding();
const playButton = document.querySelector("button");
playButton.addEventListener("click", () => startPlace(0));
