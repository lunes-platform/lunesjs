import { IHash } from '../../interfaces';
import { IAsset } from './Asset';

import { v1 as MatcherAPIv1 } from '../api/matcher/index';
import { getStorage } from '../utils/storage';
import Asset from './Asset';


function getAssetIds(assetOne, assetTwo) {
    assetOne = Asset.isAsset(assetOne) ? assetOne.id : assetOne;
    assetTwo = Asset.isAsset(assetTwo) ? assetTwo.id : assetTwo;
    return [ assetOne, assetTwo ];
}

function getKey(part1, part2) {
    const parts = [part1, part2].sort();
    return `${parts[0]}_${parts[1]}`;
}

function getMatcherPairOrder(assetOne, assetTwo) {

    return MatcherAPIv1.getOrderbook(assetOne, assetTwo).then((orderbook) => {
        return {
            amountAssetId: orderbook.pair.amountAsset,
            priceAssetId: orderbook.pair.priceAsset
        };
    });

}


export interface IAssetPair {
    amountAsset: IAsset;
    priceAsset: IAsset;
    precisionDifference: number;
    toJSON(): IHash<any>;
    toString(): string;
}

class AssetPair implements IAssetPair {

    public amountAsset;
    public priceAsset;
    public precisionDifference;

    constructor(amountAsset, priceAsset) {

        this.amountAsset = amountAsset;
        this.priceAsset = priceAsset;
        this.precisionDifference = priceAsset.precision - amountAsset.precision;

    }

    public toJSON() {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id
        };
    }

    public toString() {
        return `${this.amountAsset}/${this.priceAsset}`;
    }

}


const storage = getStorage();


export default {

    get(assetOne: IAsset | string, assetTwo: IAsset | string): Promise<IAssetPair> {

        const [assetOneId, assetTwoId] = getAssetIds(assetOne, assetTwo);
        const key = getKey(assetOneId, assetTwoId);

        return storage.get(key).then((pair) => {
            if (pair) {
                return pair;
            } else {
                return getMatcherPairOrder(assetOneId, assetTwoId).then((matcherPair) => {
                    return Promise.all([
                        Asset.get(matcherPair.amountAssetId),
                        Asset.get(matcherPair.priceAssetId)
                    ]);
                }).then((assets) => {
                    const newPair = new AssetPair(assets[0], assets[1]);
                    return storage.set(key, newPair);
                });
            }
        });

    },

    clearCache() {
        return storage.clear();
    },

    isAssetPair(object) {
        return object instanceof AssetPair;
    }

};
