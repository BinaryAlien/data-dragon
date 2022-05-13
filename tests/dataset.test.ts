import { DataDragon } from '../src/index';

const version = '11.4.1';
const dragon = new DataDragon(version);

beforeAll(async () => await dragon.champions.fetch());

test('count', () => {
    // There is 1 champion with the ID `Graves'.
    expect(dragon.champions.count(champion => champion.id === 'Graves')).toBe(1);

    // There are 154 champions with a strictly positive HP stat.
    expect(dragon.champions.count(champion => champion.stats.hp > 0)).toBe(154);
});

test('every', () => {
    // Not every champion has more than 500 HP stat.
    expect(dragon.champions.every(champion => champion.stats.hp > 500)).toBe(false);

    // Every champion has a name.
    expect(dragon.champions.every(champion => champion.name.length !== 0)).toBe(true);
});

test('find', () => {
    // The champion with the ID `MonkeyKing' exists.
    const wukong = dragon.champions.find(champion => champion.id === 'MonkeyKing');
    expect(wukong).toBeDefined();

    // The champion with an empty name does not exist.
    expect(dragon.champions.find(champion => champion.name.length === 0)).toBeUndefined();
});

test('findKey', () => {
    const wukong = dragon.champions.find(champion => champion.name === 'Wukong');

    // The key of Wukong is `MonkeyKing'.
    expect(dragon.champions.findKey(wukong)).toBe('MonkeyKing');
});

test('filter', () => {
    const graves = dragon.champions.find(champion => champion.name === 'Graves');

    // There is 1 champion with the name `Graves'.
    expect(dragon.champions.filter(champion => champion.name === graves.name)).toEqual([graves]);

    // There are 154 champions with a strictly positive HP stat.
    expect(dragon.champions.filter(champion => champion.stats.hp > 0).length).toBe(154);
});

test('forEach', () => {
    let count = 0;
    dragon.champions.forEach(() => ++count);
    expect(count).toBe(154);
});

test('map', () => {
    let names = dragon.champions.map(champion => champion.name);
    expect(names.length).toBe(154);
    expect(names).toContain('Graves');
});

test('some', () => {
    // There are some champions with less than 500 HP stat.
    expect(dragon.champions.some(champion => champion.stats.hp < 500)).toBe(true);

    // There are no champions with an empty name.
    expect(dragon.champions.some(champion => champion.name.length === 0)).toBe(false);
});
