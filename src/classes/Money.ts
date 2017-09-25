import { IAsset } from './Asset';
import { IAssetObject } from '../../interfaces';

import BigNumber from 'bignumber.js';
import Asset from './Asset';


function checkAmount(amount) {
    if (!(typeof amount === 'string' || amount instanceof BigNumber)) {
        throw new Error('Please use strings to create instances of Money');
    }
}

function getDivider(precision) {
    return new BigNumber(10).pow(precision);
}

function getAsset(asset: IAssetObject | string): IAsset {
    if (typeof asset === 'string') {
        return Asset.get(asset);
    } else {
        return Asset.create(asset);
    }
}


export interface IMoney {
    toCoins(): string;
    toTokens(): string;
    toJSON(): object;
    toString(): string;
}


class Money implements IMoney {

    private asset: IAsset;
    private coins: BigNumber;
    private divider: BigNumber;

    constructor(coins, asset: IAsset) {

        if (!Asset.isAsset(asset)) {
            throw new Error('Please use Asset for the `asset` argument');
        }

        this.asset = asset;
        this.coins = new BigNumber(coins);
        this.divider = getDivider(asset.precision);

    }

    public toCoins() {
        return this.coins.toFixed(0);
    }

    public toTokens() {
        return this.coins.div(this.divider).toFixed(this.asset.precision);
    }

    public toJSON() {
        return {
            asset: this.asset,
            tokens: this.toTokens()
        };
    }

    public toString() {
        return `${this.toTokens()} ${this.asset.id}`;
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
