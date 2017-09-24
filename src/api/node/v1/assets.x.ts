import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import { precisionCheck } from '../../../utils/remap';
import * as constants from '../../../constants';
import schemaParts from '../../schemaParts';


export const issueSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        name: {
            type: StringPart,
            required: true
        },
        description: {
            type: StringPart,
            required: false,
            defaultValue: ''
        },
        quantity: {
            type: NumberPart,
            required: true
        },
        precision: {
            type: NumberPart,
            required: true,
            isValid: precisionCheck
        },
        reissuable: schemaParts.reissuable,
        fee: schemaParts.issueFee,
        timestamp: schemaParts.timestamp
    }
});

export const transferSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        recipient: schemaParts.recipient,
        assetId: schemaParts.assetId,
        amount: {
            type: NumberPart,
            required: true
        },
        feeAssetId: {
            type: StringPart,
            required: false,
            defaultValue: constants.WAVES
        },
        fee: schemaParts.fee,
        attachment: {
            type: StringPart,
            required: false,
            defaultValue: ''
        },
        timestamp: schemaParts.timestamp
    }
});

export const reissueSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        assetId: schemaParts.assetId,
        quantity: {
            type: NumberPart,
            required: true
        },
        reissuable: schemaParts.reissuable,
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});

export const burnSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        assetId: schemaParts.assetId,
        quantity: {
            type: NumberPart,
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});
