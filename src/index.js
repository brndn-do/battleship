import "./styles.css";
import "typeface-roboto";

import Display from "./display.js";
import Player from "./player.js";

const display = new Display();
display.renderLanding();

function startGame() {
  display.clearPage();
  display.renderGame();
  
  // create new players
  const player = new Player(true);
  const computer = new Player(false);
  
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

const playButton = document.querySelector("button");
playButton.addEventListener("click", startGame);