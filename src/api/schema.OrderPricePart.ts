import { IPartialOptions } from 'ts-api-validator/src/interfaces';
import { IOrderPrice } from '../classes/OrderPrice';

import { BasePart } from 'ts-api-validator';
import { get } from 'ts-utils';
import { denormalizeAssetId } from '../utils/remap';

import OrderPrice from '../classes/OrderPrice';


export interface IOrderPricePartOptions extends IPartialOptions<IOrderPrice> {
    amountAssetId?: string;
    amountAssetIdPath?: string;
    priceAssetId?: string;
    priceAssetIdPath?: string;
}

// TODO : replace `fromMatcherCoins` with `fromTokens` in the new API

export class OrderPricePart extends BasePart<IPartialOptions<IOrderPrice>> {

    protected options: IOrderPricePartOptions;

    private _data: any;

    public process(data: any, roots: Array<any>) {
        this._data = data;
        return super.process(data, roots);
    }

    protected getValue(value: any) {

        if (value && OrderPrice.isOrderPrice(value)) {

            return value;

        } else if (typeof value === 'string') {

            let amountAssetId;
            if (typeof this.options.amountAssetId === 'string') {
                amountAssetId = denormalizeAssetId(this.options.amountAssetId);
            } else if (this.options.amountAssetIdPath) {
                amountAssetId = denormalizeAssetId(get(this._data, this.options.amountAssetIdPath));
            }

            let priceAssetId;
            if (typeof this.options.priceAssetId === 'string') {
                priceAssetId = denormalizeAssetId(this.options.priceAssetId);
            } else if (this.options.priceAssetIdPath) {
                priceAssetId = denormalizeAssetId(get(this._data, this.options.priceAssetIdPath));
            }

            if (!amountAssetId || !priceAssetId) {
                return null;
            } else {
                return OrderPrice.fromMatcherCoins(value, amountAssetId, priceAssetId);
            }

        } else {

            return null;

        }

    }

}
