import { IPartialOptions } from 'ts-api-validator/src/interfaces';
import { IMoney } from '../classes/Money';

import { BasePart } from 'ts-api-validator';
import { get } from 'ts-utils';
import { denormalizeAssetId } from '../utils/remap';

import Money from '../classes/Money';


export interface IMoneyPartOptions extends IPartialOptions<IMoney> {
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

            if (this.options.assetId || this.options.assetId === '') {

                return Money.fromCoins(value, denormalizeAssetId(this.options.assetId));

            } else if (this.options.assetIdPath) {

                const id = get(this._data, this.options.assetIdPath);
                return Money.fromCoins(value, denormalizeAssetId(id));

            } else {

                return null;

            }

        } else {

            return null;

        }

    }

}
