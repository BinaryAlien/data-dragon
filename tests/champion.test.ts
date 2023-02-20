import { DataDragon } from "../src";

const version = "11.4.1";
const dragon = new DataDragon(version);

test("fetch", async () => {
  expect(dragon.champions.empty).toBe(true);
  await dragon.champions.fetch();
  expect(dragon.champions.size).toBe(154);
});
