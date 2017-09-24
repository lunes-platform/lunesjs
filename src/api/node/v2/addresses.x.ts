import { Schema, ArrayPart, ObjectPart, StringPart } from 'ts-api-validator';
import { MoneyPart } from '../../schemaParts';
import * as constants from '../../../constants';


// TODO : remove in the new API
function temporaryStringConversion(n) {
    return (typeof n === 'number') ? String(n) : null;
}


export const detailedWavesBalanceSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        regular: {
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: temporaryStringConversion
        },
        available: {
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: temporaryStringConversion
        },
        effective: {
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: temporaryStringConversion
        },
        generating: {
            type: MoneyPart,
            assetId: constants.WAVES,
            parseValue: temporaryStringConversion
        },
        leased: {
            type: MoneyPart,
            assetId: constants.WAVES,
            // TODO : remove in the new API
            path: null,
            parseValue: (o) => {
                const regular = o.regular;
                const available = o.available;
                return temporaryStringConversion(regular - available);
            }
        }
    }
});

export const aliasesByAddressSchema = new Schema({
    type: ArrayPart,
    required: true,
    content: {
        type: StringPart
    }
});
