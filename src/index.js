import "./styles.css";
import "typeface-roboto";

import Interface from "./interface.js";
import Player from "./player.js";

const ui = new Interface();
ui.landing();

// create new players
const player = new Player(true);
const computer = new Player(false);

ui.clearPage();
ui.game();

// place ships
player.gameboard.place(1, 3, 2);
player.gameboard.place(2, 6, 3);
player.gameboard.place(3, 1, 3, true);

computer.gameboard.place(1, 3, 2);
computer.gameboard.place(2, 6, 3);
computer.gameboard.place(3, 1, 3, true);

ui.renderBoard(player);
ui.renderBoard(computer);

// start game