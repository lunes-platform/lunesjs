import { IAsset } from '../../interfaces';

import BigNumber from 'bignumber.js';
import Currency from './Currency';


function checkAmount(amount) {
    if (!(typeof amount === 'string' || (amount as any) instanceof BigNumber)) {
        throw new Error('Please use strings to create instances of Money');
    }
}

function getDivider(precision) {
    return new BigNumber(10).pow(precision);
}

function getAsset(asset: IAsset | string): IAsset {
    if (typeof asset === 'string') {
        return Currency.get(asset);
    } else {
        return asset;
    }
}


export interface IMoney {
    toCoins(): string;
    toTokens(): string;
}


class Money implements IMoney {

    private coins: BigNumber;
    private divider: BigNumber;
    private precision: number;

    constructor(coins, asset: IAsset) {

        if (!Currency.isCurrency(asset)) {
            throw new Error('Please use Currency for the `asset` argument');
        }

        this.coins = new BigNumber(coins);
        this.divider = getDivider(asset.precision);
        this.precision = asset.precision;

    }

    public toCoins() {
        return this.coins.toFixed(0);
    }

    public toTokens() {
        return this.coins.div(this.divider).toFixed(this.precision);
    }

}


export default {

    fromCoins(coins, asset) {
        checkAmount(coins);
        asset = getAsset(asset);
        return new Money(coins, asset) as IMoney;
    },

    fromTokens(tokens, asset) {
        checkAmount(tokens);
        asset = getAsset(asset);
        const divider = getDivider(asset.precision);
        const coins = new BigNumber(tokens).mul(divider).toFixed(0);
        return new Money(coins, asset) as IMoney;
    },

    isMoney(object) {
        return object instanceof Money;
    }

};
