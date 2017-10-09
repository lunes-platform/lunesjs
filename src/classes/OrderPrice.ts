import { IAsset, IMatcherAssetPair } from './Asset';

import BigNumber from '../libs/bignumber';
import Asset from './Asset';
import { checkAmount, getDivider, getAsset } from './Money';


const MATCHER_SCALE = new BigNumber(10).pow(8);

function getMatcherDivider(precision) {
    return getDivider(precision).mul(MATCHER_SCALE);
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

    constructor(coins, pair: IMatcherAssetPair) {

        if (!Asset.isAsset(pair.amountAsset) || !Asset.isAsset(pair.priceAsset)) {
            throw new Error('Please use Asset inside the `pair` argument');
        }

        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.matcherCoins = new BigNumber(coins);
        this.divider = getMatcherDivider(this.priceAsset.precision - this.amountAsset.precision);

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


function fromTokens(tokens, pair): Promise<IOrderPrice> {
    checkAmount(tokens);
    return Promise.all([
        getAsset(pair.amountAsset),
        getAsset(pair.priceAsset)
    ]).then((results) => {
        const [ amount, price ] = results;
        const divider = getMatcherDivider(price.precision - amount.precision);
        tokens = new BigNumber(tokens).toFixed(price.precision);
        const coins = new BigNumber(tokens).mul(divider);
        return new OrderPrice(coins, { amountAsset: amount, priceAsset: price });
    });
}

function fromMatcherCoins(coins, pair): Promise<IOrderPrice> {
    checkAmount(coins);
    return Promise.all([
        getAsset(pair.amountAsset),
        getAsset(pair.priceAsset)
    ]).then((results) => {
        const [ amount, price ] = results;
        return new OrderPrice(coins, { amountAsset: amount, priceAsset: price });
    });
}


export default {

    fromTokens,
    fromMatcherCoins,

    isOrderPrice(object) {
        return object instanceof OrderPrice;
    }

};
