import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import schemaFields from '../../schemaFields';
import { DEFAULT_ORDER_EXPIRATION_DAYS } from '../../../constants';


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
                    return expiration;
                } else {
                    const date = new Date();
                    return date.setDate(date.getDate() + DEFAULT_ORDER_EXPIRATION_DAYS);
                }
            }
        },
        matcherFee: schemaFields.matcherFee
    }
});
