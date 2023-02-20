import { DataDragon, Champion } from "../src";

const version = "11.4.1";
const dragon = new DataDragon(version);

beforeAll(async () => await dragon.champions.fetch());

test("count", () => {
  // There is a single champion with the ID `Graves'.
  expect(dragon.champions.count((champion) => champion.id === "Graves")).toBe(
    1,
  );

  // Every champion has a strictly positive HP stat.
  expect(dragon.champions.count((champion) => champion.stats.hp > 0)).toBe(
    dragon.champions.size,
  );
});

test("every", () => {
  // Not every champion has more than 500 HP.
  expect(dragon.champions.every((champion) => champion.stats.hp > 500)).toBe(
    false,
  );

  // Every champion has a non-empty name.
  expect(dragon.champions.every((champion) => champion.name.length !== 0)).toBe(
    true,
  );
});

test("find", () => {
  // There is a champion with the ID `MonkeyKing'.
  const wukong = dragon.champions.find(
    (champion) => champion.id === "MonkeyKing",
  );
  expect(wukong).toBeDefined();

  // There are no champions with an empty name.
  expect(
    dragon.champions.find((champion) => champion.name.length === 0),
  ).toBeUndefined();
});

test("findKey", () => {
  // The key of Wukong is `MonkeyKing'.
  const wukong = dragon.champions.find(
    (champion) => champion.name === "Wukong",
  );
  expect(wukong).toBeDefined();
  expect(dragon.champions.keyOf(wukong as Champion)).toBe("MonkeyKing");
});

test("filter", () => {
  const champions = dragon.champions.filter(
    (champion) => champion.name === "Graves",
  );
  expect(champions.length).toBe(1);
  expect(champions[0].name).toBe("Graves");

  // Every champion has a strictly positive HP stat.
  expect(
    dragon.champions.filter((champion) => champion.stats.hp > 0).length,
  ).toBe(dragon.champions.size);
});

test("forEach", () => {
  let count = 0;
  dragon.champions.forEach(() => ++count);
  expect(count).toBe(dragon.champions.size);
});

test("map", () => {
  const names = dragon.champions.map((champion) => champion.name);
  expect(names.length).toBe(dragon.champions.size);
  expect(names).toContain("Graves");
});

test("some", () => {
  // There are some champions with less than 500 HP.
  expect(dragon.champions.some((champion) => champion.stats.hp < 500)).toBe(
    true,
  );

  // There are no champions with an empty name.
  expect(dragon.champions.some((champion) => champion.name.length === 0)).toBe(
    false,
  );
});
