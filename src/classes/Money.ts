import { IAsset } from './Asset';

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


export interface IMoney {
    toCoins(): string;
    toTokens(): string;
    toJSON(): object;
    toString(): string;
}

class Money implements IMoney {

    public readonly asset: IAsset;

    private coins: BigNumber;
    private divider: BigNumber;

    constructor(coins, asset: IAsset) {

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
        return `${this.toTokens()} ${this.asset.id}`;
    }

}


export default {

    fromCoins(coins, supposedAsset): Promise<IMoney> {
        checkAmount(coins);
        return Asset.get(supposedAsset).then((asset) => {
            return new Money(coins, asset) as IMoney;
        });
    },

    fromTokens(tokens, supposedAsset): Promise<IMoney> {
        checkAmount(tokens);
        return Asset.get(supposedAsset).then((asset) => {
            const divider = getDivider(asset.precision);
            tokens = new BigNumber(tokens).toFixed(asset.precision);
            const coins = new BigNumber(tokens).mul(divider);
            return new Money(coins, asset) as IMoney;
        });
    },

    isMoney(object) {
        return object instanceof Money;
    }

};
