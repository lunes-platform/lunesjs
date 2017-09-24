import { IPartialOptions } from 'ts-api-validator/src/interfaces';
import { IMoney } from '../classes/Money';

import { getTimestamp, removeRecipientPrefix } from '../utils/remap';
import { BasePart, BooleanPart, NumberPart, StringPart } from 'ts-api-validator';
import * as constants from '../constants';
import Money from '../classes/Money';


export interface IMoneyPartOptions extends IPartialOptions<IMoney> {
    assetId: string;
}

export class MoneyPart extends BasePart<IPartialOptions<IMoney>> {

    protected options: IMoneyPartOptions;

    protected getValue(data: any) {
        if (data && Money.isMoney(data)) {
            return data;
        } else if (typeof data === 'string' && this.options.assetId) {
            // TODO : replace with `fromTokens` in the new API
            return Money.fromCoins(data, this.options.assetId);
        } else {
            return null;
        }
    }

}


export default {

    publicKey: {
        type: StringPart,
        required: true
    },

    assetId: {
        type: StringPart,
        required: true
    },

    fee: {
        type: NumberPart,
        required: false,
        defaultValue: constants.MINIMUM_FEE
    },

    issueFee: {
        type: NumberPart,
        required: false,
        defaultValue: constants.MINIMUM_ISSUE_FEE
    },

    recipient: {
        type: StringPart,
        required: true,
        parseValue: removeRecipientPrefix
    },

    reissuable: {
        type: BooleanPart,
        required: false,
        defaultValue: false
    },

    timestamp: {
        type: NumberPart,
        required: true,
        parseValue: getTimestamp
    }

}
