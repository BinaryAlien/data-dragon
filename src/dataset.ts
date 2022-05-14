import fetch from './fetch';

export class Dataset<T> {
    public readonly key: string;
    public readonly version: string;

    private readonly _cache: Map<string, T>;

    constructor(key: string, version: string) {
        this.key = key;
        this.version = version;

        this._cache = new Map();
    }

    async fetch(): Promise<Dataset<T>> {
        if (this.size !== 0)
            return this;

        const dataset = await fetch(`/cdn/${this.version}/data/en_US/${this.key}.json`);

        for (const champ in dataset['data'])
            this._cache.set(champ, dataset['data'][champ]);

        return this;
    }

    count(predicate: ((value: T, key: string) => boolean)): number {
        let count = 0;

        for (const [key, value] of this._cache) {
            if (predicate(value, key)) {
                ++count;
            }
        }

        return count;
    }

    every(predicate: ((value: T, key: string) => boolean)): boolean {
        for (const [key, value] of this._cache) {
            if (!predicate(value, key)) {
                return false;
            }
        }

        return true;
    }

    find(predicate: ((value: T, key: string) => boolean)): T | undefined {
        for (const [key, value] of this._cache) {
            if (predicate(value, key)) {
                return value;
            }
        }
    }

    findKey(value: T): string | undefined {
        for (const entry of this._cache) {
            if (entry[1] === value) {
                return entry[0];
            }
        }
    }

    filter(predicate: ((value: T, key: string) => boolean)): T[] {
        const values: T[] = [];

        for (const [key, value] of this._cache) {
            if (predicate(value, key)) {
                values.push(value);
            }
        }

        return values;
    }

    forEach(callbackfn: ((value: T, key: string) => void)) {
        for (const [key, value] of this._cache) {
            callbackfn(value, key);
        }
    }

    get(key: string): T | undefined {
        return this._cache.get(key);
    }

    map<U>(callbackfn: (value: T, key: string) => U): U[] {
        const values = [];

        for (const [key, value] of this._cache) {
            values.push(callbackfn(value, key));
        }

        return values;
    }

    some(predicate: ((value: T, key: string) => boolean)): boolean {
        for (const [key, value] of this._cache) {
            if (predicate(value, key)) {
                return true;
            }
        }

        return false;
    }

    get size(): number {
        return this._cache.size;
    }
}
