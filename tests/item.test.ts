import { DataDragon } from '../src/index';

const version = '11.4.1';
const dragon = new DataDragon(version);

test('fetch', async () => {
    expect(dragon.items.size).toBe(0);
    await dragon.items.fetch();
    expect(dragon.items.size).toBe(201);
});
