import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import schemaParts from '../../schemaParts';


export const leaseSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        recipient: schemaParts.recipient,
        amount: {
            type: NumberPart,
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});

export const cancelLeasingSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        transactionId: {
            type: StringPart,
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});
