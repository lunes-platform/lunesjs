import { IHash } from '../../interfaces';
import { IAsset } from './Asset';

import BigNumber from '../libs/bignumber';
import Asset from './Asset';


export interface IMoney {
    asset: IAsset;
    getCoins(): BigNumber;
    getTokens(): BigNumber;
    toCoins(): string;
    toTokens(): string;
    toFormat(): string;
    add(money: IMoney): IMoney;
    plus(money: IMoney): IMoney;
    sub(money: IMoney): IMoney;
    minus(money: IMoney): IMoney;
    eq(money: IMoney): boolean;
    lt(money: IMoney): boolean;
    lte(money: IMoney): boolean;
    gt(money: IMoney): boolean;
    gte(money: IMoney): boolean;
    cloneWithCoins(coins: BigNumber | string): IMoney;
    cloneWithTokens(tokens: BigNumber | string): IMoney;
    convertTo(asset: IAsset, exchangeRate: BigNumber | string): IMoney;
    toJSON(): IHash<any>;
    toString(): string;
}

export default class Money implements IMoney {

    public readonly asset: IAsset;

    private _coins: BigNumber;
    private _tokens: BigNumber;

    private constructor(coins, asset: IAsset) {
        const divider = Money._getDivider(asset.precision);
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

    public toFormat() {
        return this._tokens.toFormat(this.asset.precision);
    }

    public add(money) {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.add(inputCoins);
        return new Money(result, this.asset);
    }

    public plus(money) {
        return this.add(money);
    }

    public sub(money) {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.sub(inputCoins);
        return new Money(result, this.asset);
    }

    public minus(money) {
        return this.sub(money);
    }

    public eq(money) {
        this._matchAssets(money);
        return this._coins.eq(money.getCoins());
    }

    public lt(money) {
        this._matchAssets(money);
        return this._coins.lt(money.getCoins());
    }

    public lte(money) {
        this._matchAssets(money);
        return this._coins.lte(money.getCoins());
    }

    public gt(money) {
        this._matchAssets(money);
        return this._coins.gt(money.getCoins());
    }

    public gte(money) {
        this._matchAssets(money);
        return this._coins.gte(money.getCoins());
    }

    public cloneWithCoins(coins) {
        Money._checkAmount(coins);
        return new Money(coins, this.asset);
    }

    public cloneWithTokens(tokens) {
        Money._checkAmount(tokens);
        const coins = Money._tokensToCoins(tokens, this.asset.precision);
        return new Money(coins, this.asset);
    }

    public convertTo(asset, exchangeRate) {
        return Money.convert(this, asset, exchangeRate);
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
        if (this.asset.id !== money.asset.id) {
            throw new Error('You cannot apply arithmetic operations to Money created with different assets');
        }
    }

    public static fromCoins(coins, supposedAsset): Promise<IMoney> {
        Money._checkAmount(coins);
        return Asset.get(supposedAsset).then((asset) => {
            return new Money(coins, asset);
        });
    }

    public static fromTokens(tokens, supposedAsset): Promise<IMoney> {
        Money._checkAmount(tokens);
        return Asset.get(supposedAsset).then((asset) => {
            const coins = Money._tokensToCoins(tokens, asset.precision);
            return new Money(coins, asset);
        });
    }

    public static convert(money: IMoney, asset: IAsset, exchangeRate: BigNumber | string): IMoney {
        if (money.asset === asset) {
            return money;
        } else {
            const difference = money.asset.precision - asset.precision;
            const divider = new BigNumber(10).pow(difference);
            const coins = money.getCoins();
            const result = coins.mul(exchangeRate).div(divider);
            return new Money(result, asset);
        }
    }

    public static isMoney(object: any): boolean {
        return object instanceof Money;
    }

    private static _checkAmount(amount: any): void {
        if (!(typeof amount === 'string' || amount instanceof BigNumber)) {
            throw new Error('Please use strings to create instances of Money');
        }
    }

    private static _tokensToCoins(tokens, precision) {
        const divider = Money._getDivider(precision);
        tokens = new BigNumber(tokens).toFixed(precision);
        return new BigNumber(tokens).mul(divider);
    }

    private static _getDivider(precision: number): BigNumber {
        return new BigNumber(10).pow(precision);
    }

}
