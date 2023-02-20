import fetch from "./fetch";

import { Language } from "./types/language";

export class Dataset<T> {
  public readonly version: string;

  private readonly _key: string;
  private readonly _lang: Language;
  private readonly _cache: Map<string, T>;

  constructor(key: string, version: string, lang: Language) {
    this.version = version;
    this._key = key;
    this._lang = lang;
    this._cache = new Map();
  }

  async fetch(): Promise<Dataset<T>> {
    if (!this.empty) {
      return this;
    }
    const path = `/cdn/${this.version}/data/${this._lang}/${this._key}.json`;
    const dataset = await fetch(path);
    this._cache.clear();
    for (const key in dataset["data"]) {
      this._cache.set(key, dataset["data"][key]);
    }
    return this;
  }

  count(predicate: (value: T, key: string) => boolean): number {
    return this.filter(predicate).length;
  }

  every(predicate: (value: T, key: string) => boolean): boolean {
    return Array.from(this._cache).every((entry) =>
      predicate(entry[1], entry[0]),
    );
  }

  filter(predicate: (value: T, key: string) => boolean): T[] {
    return Array.from(this._cache)
      .filter((entry) => predicate(entry[1], entry[0]))
      .map((entry) => entry[1]);
  }

  find(predicate: (value: T, key: string) => boolean): T | undefined {
    const entry = Array.from(this._cache).find((entry) =>
      predicate(entry[1], entry[0]),
    );
    if (entry !== undefined) {
      return entry[1];
    }
    return undefined;
  }

  forEach(callbackfn: (value: T, key: string) => void) {
    return this._cache.forEach(callbackfn);
  }

  get(key: string): T | undefined {
    return this._cache.get(key);
  }

  keyOf(value: T): string | undefined {
    for (const entry of this._cache) {
      if (entry[1] === value) {
        return entry[0];
      }
    }
    return undefined;
  }

  map<U>(callbackfn: (value: T, key: string) => U): U[] {
    return Array.from(this._cache).map((entry) =>
      callbackfn(entry[1], entry[0]),
    );
  }

  some(predicate: (value: T, key: string) => boolean): boolean {
    return Array.from(this._cache).some((entry) =>
      predicate(entry[1], entry[0]),
    );
  }

  get empty(): boolean {
    return this.size === 0;
  }

  get size(): number {
    return this._cache.size;
  }
}
