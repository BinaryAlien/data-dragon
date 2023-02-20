import { DataDragon } from "../src";

const version = "13.3.1";
const dragon = new DataDragon(version);

test("fetch", async () => {
  expect(dragon.summoners.empty).toBe(true);
  await dragon.summoners.fetch();
  expect(dragon.summoners.size).toBe(16);
});
