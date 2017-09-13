import { Schema } from 'ts-api-validator';
import schemaParts from '../../schemaParts';


export const leaseSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        recipient: schemaParts.recipient,
        amount: {
            type: 'number',
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});

export const cancelLeasingSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        transactionId: {
            type: 'string',
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});
