import { IPartialOptions } from 'ts-api-validator/src/interfaces';
import { IMoney } from '../classes/Money';

import { BasePart } from 'ts-api-validator';
import { get } from 'ts-utils';
import { denormalizeAssetId } from '../utils/remap';

import Money from '../classes/Money';


export interface IMoneyPartOptions extends IPartialOptions<IMoney> {
    assetId?: string;
    assetIdPath?: string;
    nthParent?: number;
}

export class MoneyPart extends BasePart<IPartialOptions<IMoney>> {

    protected options: IMoneyPartOptions;

    private _data: any;

    public process(data: any, roots: Array<any>) {
        this._data = data;
        return super.process(data, roots);
    }

    protected getValue(value: any, roots: Array<any>) {

        if (value && Money.isMoney(value)) {

            return value;

        } else if (typeof value === 'string') {

            if (this.options.assetId || this.options.assetId === '') {

                return Money.fromCoins(value, denormalizeAssetId(this.options.assetId));

            } else if (this.options.assetIdPath) {

                const nthParent = this.options.nthParent;
                const root = nthParent ? roots[roots.length - nthParent] : this._data;

                const id = get(root, this.options.assetIdPath);
                return Money.fromCoins(value, denormalizeAssetId(id));

            } else {

                return null;

            }

        } else {

            return null;

        }

    }

}
