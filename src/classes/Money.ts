import { IHash } from '../../interfaces';
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
    asset: IAsset;
    getCoins(): BigNumber;
    getTokens(): BigNumber;
    toCoins(): string;
    toTokens(): string;
    add(money: IMoney): IMoney;
    sub(money: IMoney): IMoney;
    toJSON(): IHash<any>;
    toString(): string;
}

class Money implements IMoney {

    public readonly asset: IAsset;
    private _coins: BigNumber;
    private _tokens: BigNumber;

    constructor(coins, asset: IAsset) {

        const divider = getDivider(asset.precision);

        this.asset = asset;
        this._coins = new BigNumber(coins);
        this._tokens = this._coins.div(divider);

    }

    public getCoins() {
        return this._coins.add(0);
    }

    public getTokens() {
        return this._tokens.add(0);
    }

    public toCoins() {
        return this._coins.toFixed(0);
    }

    public toTokens() {
        return this._tokens.toFixed(this.asset.precision);
    }

    public add(money) {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.add(inputCoins);
        return new Money(result, this.asset);
    }

    public sub(money) {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.sub(inputCoins);
        return new Money(result, this.asset);
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

    private _matchAssets(money) {
        if (this.asset !== money.asset) {
            throw new Error('You cannot apply arithmetic operations to Money created with different assets');
        }
    }

}


export default {

    fromCoins(coins, supposedAsset): Promise<IMoney> {
        checkAmount(coins);
        return Asset.get(supposedAsset).then((asset) => {
            return new Money(coins, asset);
        });
    },

    fromTokens(tokens, supposedAsset): Promise<IMoney> {
        checkAmount(tokens);
        return Asset.get(supposedAsset).then((asset) => {
            const divider = getDivider(asset.precision);
            tokens = new BigNumber(tokens).toFixed(asset.precision);
            const coins = new BigNumber(tokens).mul(divider);
            return new Money(coins, asset);
        });
    },

    convert(money: IMoney, asset: IAsset, exchangeRate: BigNumber | string): IMoney {
        if (money.asset === asset) {
            return money;
        } else {
            const difference = money.asset.precision - asset.precision;
            const divider = new BigNumber(10).pow(difference);
            const coins = money.getCoins();
            const result = coins.mul(exchangeRate).div(divider);
            return new Money(result, asset);
        }
    },

    isMoney(object) {
        return object instanceof Money;
    }

};
