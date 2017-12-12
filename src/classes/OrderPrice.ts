import { IHash } from '../../interfaces';
import { IAsset } from './Asset';
import { IAssetPair } from './AssetPair';

import BigNumber from '../libs/bignumber';
import AssetPair from './AssetPair';


export interface IOrderPrice {
    pair: IAssetPair;
    getMatcherCoins(): BigNumber;
    getTokens(): BigNumber;
    toMatcherCoins(): string;
    toTokens(): string;
    toFormat(): string;
    toJSON(): IHash<any>;
    toString(): string;
}

export default class OrderPrice implements IOrderPrice {

    public readonly pair: IAssetPair;

    private _matcherCoins: BigNumber;
    private _tokens: BigNumber;

    private static _MATCHER_SCALE = new BigNumber(10).pow(8);

    private constructor(coins, pair: IAssetPair) {
        const divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
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

    public toFormat() {
        return this._tokens.toFormat(this.pair.priceAsset.precision);
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

    public static fromTokens(tokens, pair: IAssetPair | IAsset | string, secondAsset?: IAsset | string): Promise<IOrderPrice> {
        OrderPrice._checkAmount(tokens);
        return OrderPrice._getPair(pair, secondAsset).then((p) => {
            tokens = new BigNumber(tokens).toFixed(p.priceAsset.precision);
            const divider = OrderPrice._getMatcherDivider(p.precisionDifference);
            const coins = new BigNumber(tokens).mul(divider);
            return new OrderPrice(coins, p);
        });
    }

    public static fromMatcherCoins(coins, pair: IAssetPair | IAsset | string, secondAsset?: IAsset | string): Promise<IOrderPrice> {
        OrderPrice._checkAmount(coins);
        return OrderPrice._getPair(pair, secondAsset).then((p) => {
            return new OrderPrice(coins, p);
        });
    }

    public static isOrderPrice(object) {
        return object instanceof OrderPrice;
    }

    private static _checkAmount(amount) {
        if (!(typeof amount === 'string' || amount instanceof BigNumber)) {
            throw new Error('Please use strings to create instances of OrderPrice');
        }
    }

    private static _getPair(pair, secondAsset): Promise<IAssetPair> {
        if (AssetPair.isAssetPair(pair)) {
            return Promise.resolve(pair);
        } else if (pair && secondAsset) {
            // Here, both `pair` and `secondAsset` are assets
            return AssetPair.get(pair, secondAsset);
        } else {
            throw new Error('Invalid data passed instead AssetPair');
        }
    }

    private static _getMatcherDivider(precision) {
        return new BigNumber(10).pow(precision).mul(OrderPrice._MATCHER_SCALE);
    }

}
