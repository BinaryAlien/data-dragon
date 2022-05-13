import { DataDragon } from '../src/index';

const version = '11.4.1';
const dragon = new DataDragon(version);

test('fetch', async () => {
    expect(dragon.champions.size).toBe(0);
    await dragon.champions.fetch();
    expect(dragon.champions.size).toBe(154);
});
