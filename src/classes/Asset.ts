import { IAssetObject } from '../../interfaces';

import config from '../config';
import * as constants from '../constants';


const WAVES_PROPS: IAssetObject = {
    id: constants.WAVES,
    name: 'Waves',
    precision: 8
};


export interface IAsset extends IAssetObject {
    toString(): string;
}

class Asset implements IAsset {

    public readonly id;
    public readonly name;
    public readonly precision;

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
    storage[asset.id] = Object.freeze(asset);
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
