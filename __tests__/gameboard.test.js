import Gameboard from "../src/gameboard.js";

describe("gameboard tests", () => {
  let g;
  beforeEach(() => {
    g = new Gameboard();
  });

  test("initializes a 10x10 grid of null elements", () => {
    expect(g.grid.length).toBe(10);
    for (const r of g.grid) {
      expect(r.length).toBe(10);
    }
    for (const r of g.grid) {
      for (const c of r) {
        expect(c).toBeNull();
      }
    }
  });

  describe("place() function tests", () => {
    test("places a ship of length 2 at 0, 0 horizontally", () => {
      // horizontal (row stays same)
      g.place(0, 0, 2);
      expect(g.grid[0][0]).not.toBeNull();
      expect(g.grid[0][1]).not.toBeNull();
    });

    test("places a ship of length 2 at 0, 0 vertically", () => {
      // vertical (col stays same)
      g.place(0, 0, 2, true);
      expect(g.grid[0][0]).not.toBeNull();
      expect(g.grid[1][0]).not.toBeNull();
    });

    test("doesn't place a ship of length < 2 or > 5", () => {
      expect(() => g.place(0, 0, 1)).toThrow();
      expect(() => g.place(5, 5, 6)).toThrow();
    });

    test("doesn't place a ship out of bounds", () => {
      expect(() => g.place(8, 8, 5)).toThrow('out of bounds'); // horizontal (row stays same)
      expect(() => g.place(9, 0, 2, true)).toThrow(''); // vertical (col stays same)
    })

    test("throws when given wrong argument types", () => {
      const badArgs = [
        ["a", 0, 2],
        [0, "a", 2],
        [0, 0, "a"],
        [0, 0, 2, "a"],
        [0.5, 0, 2],
        [0, 0.5, 2],
        [0, 0, 2.5],
      ];
      badArgs.forEach((args) => {
        expect(() => g.place(...args)).toThrow();
      });
    });
  });
});
