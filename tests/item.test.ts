import { DataDragon } from "../src";

const version = "11.4.1";
const dragon = new DataDragon(version);

test("fetch", async () => {
  expect(dragon.items.empty).toBe(true);
  await dragon.items.fetch();
  expect(dragon.items.size).toBe(201);
});
