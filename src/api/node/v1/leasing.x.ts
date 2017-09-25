import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import schemaFields from '../../schemaFields';


export const leaseSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        recipient: schemaFields.recipient,
        amount: {
            type: NumberPart,
            required: true
        },
        fee: schemaFields.fee,
        timestamp: schemaFields.timestamp
    }
});

export const cancelLeasingSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        transactionId: {
            type: StringPart,
            required: true
        },
        fee: schemaFields.fee,
        timestamp: schemaFields.timestamp
    }
});
