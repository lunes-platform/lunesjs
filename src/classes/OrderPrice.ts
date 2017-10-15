import { IAsset } from './Asset';
import { IAssetPair } from './AssetPair';

import BigNumber from '../libs/bignumber';
import AssetPair from './AssetPair';
import { checkAmount, getDivider } from './Money';


const MATCHER_SCALE = new BigNumber(10).pow(8);

function getMatcherDivider(precision) {
    return getDivider(precision).mul(MATCHER_SCALE);
}

function getPair(pair, secondAsset): Promise<IAssetPair> {
    if (AssetPair.isAssetPair(pair)) {
        return Promise.resolve(pair);
    } else if (pair && secondAsset) {
        // Here, both `pair` and `secondAsset` are assets
        return AssetPair.get(pair, secondAsset);
    } else {
        throw new Error('Invalid data passed instead AssetPair');
    }
}


export interface IOrderPrice {
    toTokens(): string;
    toMatcherCoins(): string;
    toJSON(): object;
    toString(): string;
}

class OrderPrice implements IOrderPrice {

    private amountAsset: IAsset;
    private priceAsset: IAsset;
    private matcherCoins: BigNumber;
    private divider: BigNumber;

    constructor(coins, pair: IAssetPair) {

        if (!AssetPair.isAssetPair(pair)) {
            throw new Error('Please use AssetPair for the `pair` argument');
        }

        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.matcherCoins = new BigNumber(coins);
        this.divider = getMatcherDivider(pair.precisionDifference);

    }

    toTokens() {
        return this.matcherCoins.div(this.divider).toFixed(this.priceAsset.precision);
    }

    toMatcherCoins() {
        return this.matcherCoins.toFixed(0);
    }

    toJSON() {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id,
            priceCoins: this.toTokens()
        };
    }

    toString() {
        return `${this.toTokens()} ${this.amountAsset.id}/${this.priceAsset.id}`;
    }

}


export default {

    fromTokens(tokens, pair: IAssetPair | IAsset | string, secondAsset?: IAsset | string): Promise<IOrderPrice> {

        checkAmount(tokens);

        return getPair(pair, secondAsset).then((p) => {
            tokens = new BigNumber(tokens).toFixed(p.priceAsset.precision);
            const divider = getMatcherDivider(p.precisionDifference);
            const coins = new BigNumber(tokens).mul(divider);
            return new OrderPrice(coins, p);
        });

    },

    fromMatcherCoins(coins, pair: IAssetPair | IAsset | string, secondAsset?: IAsset | string): Promise<IOrderPrice> {

        checkAmount(coins);

        return getPair(pair, secondAsset).then((p) => {
            return new OrderPrice(coins, p);
        });

    },

    isOrderPrice(object) {
        return object instanceof OrderPrice;
    }

};
