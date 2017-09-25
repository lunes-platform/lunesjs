import { IAssetObject } from '../../interfaces';

import { WAVES_PROPS } from '../constants';
import config from '../config';


export interface IAsset extends IAssetObject {
    rating: number;
    ticker: string;
}

class Asset implements IAsset {

    public readonly id;
    public readonly name;
    public readonly precision;
    public description;

    public rating;
    public ticker;

    constructor(props: IAssetObject) {

        if (!props.id) {
            throw new Error('An attempt to create Asset without ID');
        }

        if (!props.name) {
            throw new Error('An attempt to create Asset without a name');
        }

        if (typeof props.precision !== 'number' || props.precision < 0 || props.precision > 8) {
            throw new Error(`An attempt to create Asset with wrong precision (${props.precision})`);
        }

        this.id = props.id;
        this.name = props.name;
        this.precision = props.precision;
        this.description = props.description || '';

        this.rating = 0;
        this.ticker = '';

    }

    public toString() {
        return this.id;
    }

}


let storages = Object.create(null);

function resolveStorage() {
    const network = config.getNetworkByte();
    if (storages[network]) {
        return storages[network];
    } else {
        storages[network] = Object.create(null);
        putAsset(storages[network], WAVES_PROPS);
        return storages[network];
    }
}

function putAsset(storage, assetProps) {
    const asset = new Asset(assetProps);
    storage[asset.id] = asset;
}


export default {

    create(props) {
        const storage = resolveStorage();
        if (storage[props.id]) {
            return storage[props.id];
        } else {
            putAsset(storage, props);
            return storage[props.id];
        }
    },

    get(id) {
        const storage = resolveStorage();
        return storage[id] || null;
    },

    getKnownAssets() {
        const storage = resolveStorage();
        return Object.keys(storage).map(function (key) {
            return storage[key];
        });
    },

    clearCache() {
        storages = Object.create(null);
    },

    isAsset(object) {
        return object instanceof Asset;
    }

};
