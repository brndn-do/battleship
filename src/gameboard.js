class Gameboard {
  constructor() {
    this.grid = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.grid[i] = new Array(10).fill(null);
    }
  }

  place(x, y, length, vertical = false) {
    // validate arguments
    if (
      !Number.isInteger(x) ||
      !Number.isInteger(y) ||
      !Number.isInteger(length)
    )
      throw new Error("x, y, length must be a positive integer");
    if (typeof vertical !== "boolean")
      throw new Error("vertical must be a boolean");
    if (length < 2 || length > 5)
      throw new Error("length must be between 2 and 5 inclusive");
    //
    // done validating arguments
    //

    // check if it will be out of bounds
    if ((vertical ? y : x) + length >= 9) {
      throw new Error("ship cannot be placed out of bounds!");
    }

    if (vertical) {
      // vertical placement
      for (let i = x; i < x + length; i++) {
        this.grid[i][y] = 0;
      }
    } else {
      // horizontal placement
      for (let i = y; i < y + length; i++) {
        this.grid[x][i] = 0;
      }
    }
  }
}

export default Gameboard;
