# data-dragon

🐉 A TypeScript wrapper for the [Data Dragon](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html) Riot API.

## Usage

To use `data-dragon`, you must **instantiate** a `DataDragon` object.

```javascript
import { DataDragon } from 'data-dragon';

// Specify a game version ...
const dragon = new DataDragon('11.4.1');

// ... or use the latest one
const dragon = await DataDragon.latest();
```

From there, you must **fetch** the datasets you would like to use.

```javascript
import { DataDragon } from 'data-dragon';

const dragon = new DataDragon('11.4.1');

console.log(dragon.champions.size);
// > 0

await dragon.champions.fetch();

console.log(dragon.champions);
// > 154
```

Once a dataset is cached, calling its `fetch` function again will have no effect.

```javascript
import { DataDragon } from 'data-dragon';

const dragon = new DataDragon('11.4.1');

await dragon.champions.fetch();

const mundo = dragon.champions.find(champion.name => 'Dr. Mundo');
console.log(mundo.id);
// > DrMundo

const squishy = dragon.champions.count(champion => champion.stats.hp < 500 && champion.stats.armor <= 25);
console.log(squishy);
// > 4

const biscuit = dragon.items.find(item => item.name === 'Total Biscuit of Everlasting Will');
console.log(biscuit.gold.total);
// > 75

const boots = dragon.items.get('1001');
console.log(boots.stats.FlatMovementSpeedMod);
// > 25
```
