import Gameboard from "./gameboard.js"

class Player {
  constructor(real) {
    if (typeof(real) !== "boolean")
      throw new Error("argument must be boolean");
    this.real = real;
    this.gameboard = new Gameboard();
  }
}

export default Player;