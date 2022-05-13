import { Dataset } from './dataset';

import {
    Champion,
    ChampionInfo,
    ChampionImage,
    ChampionStats
} from './types/champion';

import {
    Item,
    ItemRune,
    ItemGold,
    ItemStats,
    ItemMaps
} from './types/item';

import axios from 'axios';

class DataDragon {
    public readonly version: string;

    public readonly champions: Dataset<Champion>;
    public readonly items: Dataset<Item>;

    /**
     * @param version version of League of Legends to use
     */
    constructor(version: string) {
        this.version = version;

        this.champions = new Dataset('champion', version);
        this.items = new Dataset('item', version);
    }

    /**
     * @returns new instance of Data Dragon using the latest version of League of Legends
     */
    static async latest(): Promise<DataDragon> {
        const version = await DataDragon.fetchLatestVersion();
        return new DataDragon(version);
    }

    /**
     * @returns latest version of League of Legends
     */
    static async fetchLatestVersion(): Promise<string> {
        const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        return response.data[0];
    }
}

export {
    DataDragon,
    Dataset,
    Champion, ChampionInfo, ChampionImage, ChampionStats,
    Item, ItemRune, ItemGold, ItemStats, ItemMaps
};
