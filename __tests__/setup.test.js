import setup from "../src/setup.js";

test("creates two players", () => {
  expect(() => setup()).not.toThrow();
  
})