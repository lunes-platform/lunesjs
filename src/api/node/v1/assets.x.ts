import { Schema } from 'ts-api-validator';
import { precisionCheck } from '../../../utils/remap';
import * as constants from '../../../constants';
import schemaParts from '../../schemaParts';


export const issueSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        name: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: false,
            defaultValue: ''
        },
        quantity: {
            type: 'number',
            required: true
        },
        precision: {
            type: 'number',
            required: true,
            isValid: precisionCheck
        },
        reissuable: schemaParts.reissuable,
        fee: schemaParts.issueFee,
        timestamp: schemaParts.timestamp
    }
});

export const transferSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        recipient: schemaParts.recipient,
        assetId: schemaParts.assetId,
        amount: {
            type: 'number',
            required: true
        },
        feeAssetId: {
            type: 'string',
            required: false,
            defaultValue: constants.WAVES
        },
        fee: schemaParts.fee,
        attachment: {
            type: 'string',
            required: false,
            defaultValue: ''
        },
        timestamp: schemaParts.timestamp
    }
});

export const reissueSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        assetId: schemaParts.assetId,
        quantity: {
            type: 'number',
            required: true
        },
        reissuable: schemaParts.reissuable,
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});

export const burnSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: schemaParts.publicKey,
        assetId: schemaParts.assetId,
        quantity: {
            type: 'number',
            required: true
        },
        fee: schemaParts.fee,
        timestamp: schemaParts.timestamp
    }
});
