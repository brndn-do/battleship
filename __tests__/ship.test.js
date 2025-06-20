import Ship from "../src/ship.js";

describe("ship tests", () => {
  let s;
  beforeEach(() => {
    s = new Ship(2);
  });
  test("initializes with length, hits = 0, and isSunk returns false", () => {
    expect(s.length).toBe(2);
    expect(s.hits).toBe(0);
    expect(s.isSunk()).toBe(false);
  });
  test("hit() increments hits when not sunk", () => {
    s.hit();
    expect(s.hits).toBe(1);
  });
  test("isSunk() flips to true when hits === length", () => {
    s.hit();
    expect(s.hits).toBe(1);
    expect(s.isSunk()).toBe(false);
    s.hit();
    expect(s.hits).toBe(2);
    expect(s.isSunk()).toBe(true);
  });
  test("hit() does not increment when sunk", () => {
    s.hit();
    s.hit();
    expect(s.hits).toBe(2);
    expect(s.isSunk()).toBe(true);
    s.hit();
    expect(s.hits).toBe(2);
  });
  test("isSunk() stays true once sunk", () => {
    s.hit();
    s.hit();
    expect(s.isSunk()).toBe(true);
    s.hit();
    expect(s.isSunk()).toBe(true);
  });
  test("throws when argument is not a positive integer", () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(-1)).toThrow();
    expect(() => new Ship(1.5)).toThrow();
    expect(() => new Ship('hello')).toThrow();
    expect(() => new Ship()).toThrow();
  })
});
