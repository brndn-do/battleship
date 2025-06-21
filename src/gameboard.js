class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => {
      return Array.from({ length: 10 }, () => {
        return { ship: null, attacked: false };
      });
    });
  }

  place(r, c, length, vertical = false) {
    // validate arguments
    if (
      !Number.isInteger(r) ||
      !Number.isInteger(c) ||
      !Number.isInteger(length)
    )
      throw new Error("r, c, length must be a positive integer");
    if (typeof vertical !== "boolean")
      throw new Error("vertical must be a boolean");
    if (length < 2 || length > 5)
      throw new Error("length must be between 2 and 5 inclusive");
    //
    // done validating arguments
    //

    // check if it will be out of bounds
    if ((vertical ? r : c) + length > 10) {
      throw new Error("ship cannot be placed out of bounds");
    }

    // check if it will overlap with an exisiting ship
    if (vertical) {
      for (let i = r; i < r + length; i++)
        if (this.grid[i][c].ship !== null)
          throw new Error("ship cannot overlap with another ship");
    } else {
      for (let i = c; i < c + length; i++)
        if (this.grid[r][i].ship !== null)
          throw new Error("ship cannot overlap with another ship");
    }

    // place ship
    if (vertical) {
      // col stays same
      for (let i = r; i < r + length; i++) this.grid[i][c].ship = 0;
    } else {
      // row stays same
      for (let i = c; i < c + length; i++) this.grid[r][i].ship = 0;
    }
  }

  receiveAttack(r, c) {
    // validate inputs
    if (!Number.isInteger(r) || !Number.isInteger(c))
      throw new Error("arguments must be an integer");
    // check if out of bounds
    if (r < 0 || r > 9 || c < 0 || c > 9)
      throw new Error("cannot attack out of bounds");
    if (this.grid[r][c].ship === null) return false;
    if (this.grid[r][c].ship !== null) return true;
  }
}

export default Gameboard;
