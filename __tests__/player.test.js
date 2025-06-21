import Player from "../src/player.js";

test("real player has real property true", () => {
  const real = new Player(true);
  expect(real.real).toBe(true);
});

test("computer has real property false", () => {
  const computer = new Player(false);
  expect(computer.real).toBe(false);
})
