import { IHash } from '../../interfaces';
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
    getMatcherCoins(): BigNumber;
    getTokens(): BigNumber;
    toMatcherCoins(): string;
    toTokens(): string;
    toJSON(): IHash<any>;
    toString(): string;
}

class OrderPrice implements IOrderPrice {

    public readonly pair: IAssetPair;
    private _matcherCoins: BigNumber;
    private _tokens: BigNumber;

    constructor(coins, pair: IAssetPair) {

        const divider = getMatcherDivider(pair.precisionDifference);

        this.pair = pair;
        this._matcherCoins = new BigNumber(coins);
        this._tokens = this._matcherCoins.div(divider);

    }

    public getMatcherCoins() {
        return this._matcherCoins.add(0);
    }

    public getTokens() {
        return this._tokens.add(0);
    }

    public toMatcherCoins() {
        return this._matcherCoins.toFixed(0);
    }

    public toTokens() {
        return this._tokens.toFixed(this.pair.priceAsset.precision);
    }

    public toJSON() {
        return {
            amountAssetId: this.pair.amountAsset.id,
            priceAssetId: this.pair.priceAsset.id,
            priceTokens: this.toTokens()
        };
    }

    public toString() {
        return `${this.toTokens()} ${this.pair.amountAsset.id}/${this.pair.priceAsset.id}`;
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
