import Player from "../src/player.js";
import Gameboard from "../src/gameboard.js";
jest.mock("../src/gameboard.js");

test("real player has real property true", () => {
  const real = new Player(true);
  expect(real.real).toBe(true);
});

test("computer has real property false", () => {
  const computer = new Player(false);
  expect(computer.real).toBe(false);
})

test("throws when given bad arguments", () => {
  expect(() => new Player("a")).toThrow("argument");
})

test("each has own gameboard", () => {
  Gameboard.mockClear();
  const real = new Player(true);
  const computer = new Player(false);
  expect(real.gameboard).not.toBe(computer.gameboard);
  expect(Gameboard).toHaveBeenCalledTimes(2);
})