import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import { getTimestamp } from '../../utils/remap';
import { DEFAULT_ORDER_EXPIRATION_DAYS } from '../../constants';
import schemaFields from '../schemaFields';


export const createOrderSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        matcherPublicKey: schemaFields.publicKey,
        amountAsset: schemaFields.assetId,
        priceAsset: schemaFields.assetId,
        orderType: {
            type: StringPart,
            required: true,
            isValid(orderType) {
                return orderType === 'buy' || orderType === 'sell';
            }
        },
        amount: {
            type: NumberPart,
            required: true
        },
        price: {
            type: NumberPart,
            required: true
        },
        timestamp: schemaFields.timestamp,
        expiration: {
            type: NumberPart,
            required: true,
            parseValue: (expiration) => {
                if (expiration) {
                    return getTimestamp(expiration);
                } else {
                    const date = new Date(getTimestamp());
                    return date.setDate(date.getDate() + DEFAULT_ORDER_EXPIRATION_DAYS);
                }
            }
        },
        matcherFee: schemaFields.matcherFee
    }
});
