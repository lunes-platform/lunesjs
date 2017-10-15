import { IAsset } from './Asset';

import { v1 as MatcherAPIv1 } from '../api/matcher/index';
import Asset from './Asset';


function getMatcherPairOrder(assetOne, assetTwo) {

    assetOne = Asset.isAsset(assetOne) ? assetOne.id : assetOne;
    assetTwo = Asset.isAsset(assetTwo) ? assetTwo.id : assetTwo;

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
    toJSON(): object;
    toString(): string;
}

class AssetPair implements IAssetPair {

    public amountAsset;
    public priceAsset;
    public precisionDifference;

    constructor(amountAsset, priceAsset) {

        if (!Asset.isAsset(amountAsset) || !Asset.isAsset(priceAsset)) {
            throw new Error('Please use instances of Asset in the AssetPair constructor');
        }

        this.amountAsset = amountAsset;
        this.priceAsset = priceAsset;
        this.precisionDifference = priceAsset.precision - amountAsset.precision;

    }

    toJSON() {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id
        };
    }

    toString() {
        return `${this.amountAsset}/${this.priceAsset}`;
    }

}


export default {

    get(assetOne: IAsset | string, assetTwo: IAsset | string): Promise<IAssetPair> {

        return getMatcherPairOrder(assetOne, assetTwo).then((matcherPair) => {
            return Promise.all([
                Asset.get(matcherPair.amountAssetId),
                Asset.get(matcherPair.priceAssetId)
            ]);
        }).then((assets) => {
            return new AssetPair(assets[0], assets[1]);
        });

    },

    isAssetPair(object) {
        return object instanceof AssetPair;
    }

};
