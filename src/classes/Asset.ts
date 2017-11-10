import { IAssetObject, IHash } from '../../interfaces';

import { WAVES_PROPS } from '../constants';
import { getStorage } from '../utils/storage';

/** TEMPORARY MOCKS */
import { v1 as NodeAPIv1 } from '../api/node/index';


function getAsset(id): Promise<IAsset> {
    return NodeAPIv1.transactions.get(id).then((assetTransaction) => {
        return storage.set(id, new Asset({
            id: id,
            name: assetTransaction.name,
            precision: assetTransaction.decimals,
            description: assetTransaction.description
        }));
    });
}


export interface IAsset extends IAssetObject {
    rating: number;
    ticker: string;
}

class Asset implements IAsset {

    public readonly id;
    public readonly name;
    public readonly precision;
    public readonly description;

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


const storage = getStorage((set) => {
    const wavesAsset = new Asset(WAVES_PROPS);
    set(wavesAsset.id, wavesAsset);
});


export default {

    get(input: IAssetObject | string) {
        if (typeof input === 'string') {
            const id = input;
            return storage.get(id).then((asset) => {
                return asset || getAsset(id);
            });
        } else {
            const props = input;
            return storage.get(props.id).then((asset) => {
                return asset || storage.set(props.id, new Asset(props));
            });
        }
    },

    getKnownAssets() {
        return storage.getAll();
    },

    getKnownAssetsList() {
        return storage.getList();
    },

    clearCache() {
        return storage.clear();
    },

    isAsset(object) {
        return object instanceof Asset;
    }

};
