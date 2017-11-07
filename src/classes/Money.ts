import { IAsset } from './Asset';
import { IAssetObject } from '../../interfaces';

import BigNumber from '../libs/bignumber';
import Asset from './Asset';


// TODO : stop exporting the following functions when OrderPrice is removed

export function checkAmount(amount) {
    if (!(typeof amount === 'string' || amount instanceof BigNumber)) {
        throw new Error('Please use strings to create instances of Money');
    }
}

export function getDivider(precision) {
    return new BigNumber(10).pow(precision);
}

export function getAsset(asset: IAssetObject | string): Promise<IAsset> {
    if (typeof asset === 'string') {
        return Asset.get(asset);
    } else {
        return Promise.resolve(Asset.create(asset));
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
            assetId: this.asset.id,
            tokens: this.toTokens()
        };
    }

    public toString() {
        return `${this.toTokens()} ${this.asset.name}`;
    }

}


export default {

    fromCoins(coins, asset): Promise<IMoney> {
        checkAmount(coins);
        return getAsset(asset).then((a) => {
            return new Money(coins, a) as IMoney;
        });
    },

    fromTokens(tokens, asset): Promise<IMoney> {
        checkAmount(tokens);
        return getAsset(asset).then((a) => {
            const divider = getDivider(a.precision);
            tokens = new BigNumber(tokens).toFixed(a.precision);
            const coins = new BigNumber(tokens).mul(divider);
            return new Money(coins, a) as IMoney;
        });
    },

    isMoney(object) {
        return object instanceof Money;
    }

};
