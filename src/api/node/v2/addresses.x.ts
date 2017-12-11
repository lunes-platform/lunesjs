import { Schema, ArrayPart, ObjectPart, StringPart } from 'ts-api-validator';
import { MoneyPart } from '../../schema.MoneyPart';
import * as constants from '../../../constants';
import { removeAliasPrefix } from '../../../utils/remap';

import { stringConversion } from '../../schemaTemporaryTools';


export const detailedWavesBalanceSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        regular: {
            // The amount one have
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: stringConversion
        },
        available: {
            // Available to spend
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: stringConversion
        },
        effective: {
            // Potential leasing balance
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: stringConversion
        },
        generating: {
            // Actual leasing balance
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: stringConversion
        },
        leasedOut: {
            // Leased to another account
            type: MoneyPart,
            assetId: constants.WAVES,
            // TODO : remove in the new API
            path: null,
            parseValue: (o) => {
                return stringConversion(o.regular - o.available);
            }
        },
        leasedIn: {
            // Incoming leasing
            type: MoneyPart,
            assetId: constants.WAVES,
            // TODO : remove in the new API
            path: null,
            parseValue: (o) => {
                return stringConversion(o.effective - o.available);
            }
        }
    }
});

export const aliasesByAddressSchema = new Schema({
    type: ArrayPart,
    required: true,
    content: {
        type: StringPart,
        parseValue: removeAliasPrefix
    }
});

export const assetBalancesSchema = new Schema({
    type: ArrayPart,
    required: true,
    path: 'balances',
    content: {
        type: MoneyPart,
        required: true,
        path: 'balance',
        assetIdPath: 'assetId',
        parseValue: stringConversion
    }
});
