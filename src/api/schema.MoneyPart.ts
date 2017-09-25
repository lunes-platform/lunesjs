import { IPartialOptions } from 'ts-api-validator/src/interfaces';
import { IMoney } from '../classes/Money';

import { BasePart } from 'ts-api-validator';
import { get } from 'ts-utils';
import Asset from '../classes/Asset';
import Money from '../classes/Money';


export interface IMoneyPartOptions extends IPartialOptions<IMoney> {
    asset?: {
        idPath: string;
        namePath: string;
        precisionPath: string;
        descriptionPath: string;
    };
    assetId?: string;
    assetIdPath?: string;
}

// TODO : replace `fromCoins` with `fromTokens` in the new API

export class MoneyPart extends BasePart<IPartialOptions<IMoney>> {

    protected options: IMoneyPartOptions;

    private _data: any;

    public process(data: any) {
        this._data = data;
        return super.process(data);
    }

    protected getValue(value: any) {

        if (value && Money.isMoney(value)) {

            return value;

        } else if (typeof value === 'string') {

            if (this.options.asset) {

                const a = this.options.asset;
                return Money.fromCoins(value, Asset.create({
                    id: get(this._data, a.idPath),
                    name: get(this._data, a.namePath),
                    precision: get(this._data, a.precisionPath),
                    description: get(this._data, a.descriptionPath)
                }));

            } else if (this.options.assetId) {

                return Money.fromCoins(value, this.options.assetId);

            } else if (this.options.assetIdPath) {

                const id = get(this._data, this.options.assetIdPath);
                return Money.fromCoins(value, id);

            }


        } else {

            return null;

        }

    }

}
