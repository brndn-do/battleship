import Gameboard from "../src/gameboard.js";
import Ship from "../src/ship.js";

const hitSpy = jest.spyOn(Ship.prototype, "hit");

describe("gameboard tests", () => {
  let g;
  beforeEach(() => {
    g = new Gameboard();
  });

  test("initializes a 10x10 grid of cells containing .ship, .attacked, .canClick, and .highlighted", () => {
    expect(g.grid.length).toBe(10);
    for (const r of g.grid) {
      expect(r.length).toBe(10);
    }
    for (const r of g.grid) {
      for (const c of r) {
        expect(c).toEqual({
          ship: null,
          attacked: false,
          canClick: false,
          highlighted: false
        });
      }
    }
  });

  describe("place() function tests", () => {
    test("places a ship of length 2 at 0, 0 horizontally", () => {
      // horizontal (row stays same)
      expect(g.canPlace(0, 0, 2)).toBe(true);
      g.place(0, 0, 2);
      expect(g.grid[0][0].ship).not.toBeNull();
      expect(g.grid[0][1].ship).not.toBeNull();
      expect(g.grid[0][2].ship).toBeNull();
    });

    test("places a ship of length 2 at 0, 0 vertically", () => {
      // vertical (col stays same)
      expect(g.canPlace(0, 0, 2, true)).toBe(true);
      g.place(0, 0, 2, true);
      expect(g.grid[0][0].ship).not.toBeNull();
      expect(g.grid[1][0].ship).not.toBeNull();
      expect(g.grid[2][0].ship).toBeNull();
    });

    test("doesn't place a ship of length < 2 or > 5", () => {
      expect(g.canPlace(0, 0, 1)).toBe(false);
      expect(() => g.place(0, 0, 1)).toThrow();
      expect(g.canPlace(5, 5, 6)).toBe(false);
      expect(() => g.place(5, 5, 6)).toThrow();
    });

    test("doesn't place a ship out of bounds", () => {
      expect(g.canPlace(0, 5, 5)).toBe(true);
      expect(() => g.place(0, 5, 5)).not.toThrow();
      expect(g.canPlace(8, 8, 5)).toBe(false);
      expect(() => g.place(8, 8, 5)).toThrow("out of bounds"); // horizontal (row stays same)
      expect(g.canPlace(9, 0, 2, true)).toBe(false);
      expect(() => g.place(9, 0, 2, true)).toThrow("out of bounds"); // vertical (col stays same)
    });

    test("doesn't place a ship horizontally if it would overlap", () => {
      g.place(0, 5, 5);
      for (let i = 5; i < 10; i++) expect(g.grid[0][i].ship).not.toBeNull();
      expect(g.canPlace(0, 4, 2)).toBe(false);
      expect(() => g.place(0, 4, 2)).toThrow("overlap");
      expect(g.canPlace(5, 5, 3, true)).toBe(true);
      g.place(5, 5, 3, true);
      expect(g.canPlace(6, 3, 3)).toBe(false);
      expect(() => g.place(6, 3, 3)).toThrow("overlap");
    });

    test("doesn't place a ship vertically if it would overlap", () => {
      g.place(5, 0, 5, true);
      for (let i = 5; i < 10; i++) expect(g.grid[i][0].ship).not.toBeNull();
      expect(g.canPlace(4, 0, 2, true)).toBe(false);
      expect(() => g.place(4, 0, 2, true)).toThrow("overlap");
      expect(g.canPlace(5, 5, 3)).toBe(true);
      g.place(5, 5, 3);
      expect(g.canPlace(3, 6, 3, true)).toBe(false);
      expect(() => g.place(3, 6, 3, true)).toThrow("overlap");
    });

    test("both out of bounds and overlap", () => {
      g.place(0, 5, 5);
      expect(g.canPlace(0, 6, 5)).toBe(false);
      expect(() => g.place(0, 6, 5)).toThrow();
    });

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

    test("places different ships", () => {
      g.place(0, 0, 5);
      for (let i = 0; i < 4; i++)
        expect(g.grid[0][i].ship).toBe(g.grid[0][i + 1].ship);
      g.place(1, 0, 5);
      expect(g.grid[0][0].ship).not.toBe(g.grid[1][0].ship);
    });
  });

  describe("receiveAttack() function tests", () => {
    beforeEach(() => {
      g.place(0, 0, 5);
    });
    afterEach(() => {
      Ship.prototype.hit.mockClear();
    })
    test("missed attack returns false", () => {
      expect(g.receiveAttack(1, 0)).toBe(false);
    });
    test("successful attack returns true", () => {
      expect(g.receiveAttack(0, 0)).toBe(true);
    });
    test("missed/successful attack marks as attacked", () => {
      expect(g.grid[1][0].attacked).toBe(false);
      g.receiveAttack(1, 0);
      expect(g.grid[1][0].attacked).toBe(true);
      expect(g.grid[0][0].attacked).toBe(false);
      g.receiveAttack(0, 0);
      expect(g.grid[0][0].attacked).toBe(true);
    });
    test("throws if try to attack a cell that's already been attacked", () => {
      g.receiveAttack(5, 5);
      expect(g.grid[5][5].attacked).toBe(true);
      expect(() => g.receiveAttack(5, 5)).toThrow("already attacked");
    });
    test("throws if out of bounds", () => {
      expect(() => g.receiveAttack(10, 1)).toThrow("out of bounds");
      expect(() => g.receiveAttack(0, 10)).toThrow("out of bounds");
      expect(() => g.receiveAttack(-1, 0)).toThrow("out of bounds");
      expect(() => g.receiveAttack(0, -1)).toThrow("out of bounds");
    });
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
    });
    test("calls hit() function to correct ship when an attack lands", () => {
      g.place(1, 0, 2); // extra ship
      expect(g.receiveAttack(0, 0)).toBe(true);
      expect(hitSpy.mock.instances[0]).toBe(g.grid[0][0].ship);
      expect(hitSpy.mock.instances).not.toContain(g.grid[1][0].ship);
    });
  });

  describe("report() function test", () => {
    test("correctly reports whether all ships have sunk", () => {
      g.place(0, 0, 2);
      g.place(1, 0, 2);
      expect(g.report()).toBe(false);
      g.receiveAttack(0, 0);
      expect(g.report()).toBe(false);
      g.receiveAttack(0, 1);
      expect(g.report()).toBe(false);
      g.receiveAttack(1, 1);
      expect(g.report()).toBe(false);
      g.receiveAttack(1, 0);
      expect(g.report()).toBe(true);
    });
  });
});
