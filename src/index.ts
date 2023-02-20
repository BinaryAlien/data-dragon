import { Dataset } from "./dataset";

import { Image } from "./types/image";
import { Language } from "./types/language";

import { Champion, ChampionInfo, ChampionStats } from "./types/champion";
import { Item, ItemRune, ItemGold, ItemStats } from "./types/item";
import { ProfileIcon } from "./types/profileicon";
import { Summoner, SummonerImage } from "./types/summoner";

import fetch from "./fetch";

const DEFAULT_LANGUAGE: Language = "en_US";

class DataDragon {
  public readonly version: string;
  public readonly lang: Language;

  public readonly champions: Dataset<Champion>;
  public readonly items: Dataset<Item>;
  public readonly profileicons: Dataset<ProfileIcon>;
  public readonly summoners: Dataset<Summoner>;

  constructor(version: string, lang: Language = DEFAULT_LANGUAGE) {
    this.version = version;
    this.lang = lang;
    this.champions = new Dataset("champion", version, lang);
    this.items = new Dataset("item", version, lang);
    this.profileicons = new Dataset("profileicon", version, lang);
    this.summoners = new Dataset("summoner", version, lang);
  }

  static async latest(): Promise<DataDragon> {
    const version = await DataDragon.fetchLatestVersion();
    return new DataDragon(version);
  }

  static async fetchLatestVersion(): Promise<string> {
    const versions = await fetch("/api/versions.json");
    return versions[0];
  }
}

export {
  DataDragon,
  Dataset,
  Language,
  Image,
  Champion,
  ChampionInfo,
  ChampionStats,
  Item,
  ItemRune,
  ItemGold,
  ItemStats,
  ProfileIcon,
  Summoner,
  SummonerImage,
};
