# data-dragon

🐉 A TypeScript wrapper for the
[Data Dragon](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html)
Riot API.

## Usage

**Instantiate** a `DataDragon` object.

```typescript
import { DataDragon } from "data-dragon";

// Specify a game version ...
const dragon = new DataDragon("11.4.1");

// ... or use the latest one.
const dragon = await DataDragon.latest();
```

**Fetch** the datasets you would like to use.

```typescript
import { DataDragon } from "data-dragon";

const dragon = new DataDragon("11.4.1");

console.log(dragon.champions.size); // 0
console.log(dragon.items.size); // 0

await dragon.champions.fetch();
await dragon.items.fetch();

console.log(dragon.champions.size); // 154
console.log(dragon.items.size); // 201
```

The datasets are cached, thus fetching is only required **once per dataset**.

```typescript
import { DataDragon } from "data-dragon";

const dragon = new DataDragon("11.4.1");
await dragon.champions.fetch();
await dragon.items.fetch();

const mundo = dragon.champions.find(
  (champion) => champion.name === "Dr. Mundo",
);
console.log(mundo.id); // DrMundo

const fast = dragon.champions.count(
  (champion) => champion.stats.movespeed > 340,
);
console.log(fast); // 34

const biscuit = dragon.items.find(
  (item) => item.name === "Total Biscuit of Everlasting Will",
);
console.log(biscuit.gold.total); // 75

const boots = dragon.items.get("1001");
console.log(boots.stats.FlatMovementSpeedMod); // 25
```
