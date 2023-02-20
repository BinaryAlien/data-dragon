import { DataDragon } from "../src";

const version = "13.3.1";
const dragon = new DataDragon(version);

test("fetch", async () => {
  expect(dragon.profileicons.empty).toBe(true);
  await dragon.profileicons.fetch();
  expect(dragon.profileicons.size).toBe(3628);
});
