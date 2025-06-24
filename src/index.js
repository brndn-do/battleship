import "./styles.css";
import "typeface-roboto";

import Display from "./display.js";
import Player from "./player.js";


const display = new Display();
display.renderLanding();
display.clearPage();
display.renderGame();

// create new players
const player = new Player(true);
const computer = new Player(false);
// place ships
player.gameboard.place(1, 3, 2);
player.gameboard.place(2, 6, 3);
player.gameboard.place(3, 1, 3, true);

computer.gameboard.place(1, 3, 2);
computer.gameboard.place(2, 6, 3);
computer.gameboard.place(3, 1, 3, true);

player.gameboard.receiveAttack(1, 3);
player.gameboard.receiveAttack(8, 8);
computer.gameboard.receiveAttack(1, 3);
computer.gameboard.receiveAttack(8, 8);

// render new board for each player
display.renderBoard(player, computer);

display.renderGameOver(computer);
