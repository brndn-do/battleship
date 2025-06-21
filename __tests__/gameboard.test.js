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
      expect(g.grid[0][0].ship).not.toBeNull();
      expect(g.grid[0][1].ship).not.toBeNull();
      expect(g.grid[0][2].ship).toBeNull();
    });

    test("places a ship of length 2 at 0, 0 vertically", () => {
      // vertical (col stays same)
      g.place(0, 0, 2, true);
      expect(g.grid[0][0].ship).not.toBeNull();
      expect(g.grid[1][0].ship).not.toBeNull();
      expect(g.grid[2][0].ship).toBeNull();
    });

    test("doesn't place a ship of length < 2 or > 5", () => {
      expect(() => g.place(0, 0, 1)).toThrow();
      expect(() => g.place(5, 5, 6)).toThrow();
    });

    test("doesn't place a ship out of bounds", () => {
      expect(() => g.place(0, 5, 5)).not.toThrow();
      expect(() => g.place(8, 8, 5)).toThrow("out of bounds"); // horizontal (row stays same)
      expect(() => g.place(9, 0, 2, true)).toThrow("out of bounds"); // vertical (col stays same)
    });

    test("doesn't place a ship if it would overlap", () => {
      g.place(0, 5, 5);
      for (let i = 5; i < 10; i++)
        expect(g.grid[0][i].ship).not.toBeNull();
      expect(() => g.place(0, 4, 2)).toThrow("overlap");
      g.place(5, 5, 3, true);
      expect(() => g.place(6, 3, 3)).toThrow("overlap");
    });

    test("both out of bounds and overlap", () => {
      g.place(0, 5, 5);
      expect(() => g.place(0, 6, 5)).toThrow();
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

  describe("receiveAttack() function tests", () => {
    beforeEach(() => {
      g.place(0, 0, 5);
    })
    test("missed attack returns false", () => {
      expect(g.receiveAttack(1, 0)).toBe(false);
    })
    test("successful attack returns true", () => {
      expect(g.receiveAttack(0 ,0)).toBe(true);
    })
    test("missed/successful attack marks as shot", () => {
      expect(g.grid[1][0].attacked).toBe(false);
      g.receiveAttack(1, 0);
      expect(g.grid[1][0].attacked).toBe(true);
      expect(g.grid[0][0].attacked).toBe(false);
      g.receiveAttack(0, 0);
      expect(g.grid[0][0].attacked).toBe(true);
    })
    test("throws if out of bounds", () => {
      expect(() => g.receiveAttack(10, 1)).toThrow("out of bounds");
      expect(() => g.receiveAttack(0, 10)).toThrow("out of bounds");
      expect(() => g.receiveAttack(-1, 0)).toThrow("out of bounds");
      expect(() => g.receiveAttack(0, -1)).toThrow("out of bounds");
    })
    test("throws if given bad arguments", () => {
      const badArgs = [
        ["a", 1],
        [1, "a"],
        [1.1, 1],
        [1, 1.1],
      ];
      for (const args of badArgs) {
        expect(() => g.receiveAttack(...args)).toThrow();
      }
    })
  })
});
