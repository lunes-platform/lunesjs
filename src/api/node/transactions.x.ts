import { Schema, NumberPart, ObjectPart, StringPart, ArrayPart } from 'ts-api-validator';
import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import schemaFields from '../schemaFields';
import { createRemapper, normalizeAssetId, precisionCheck, removeAliasPrefix } from '../../utils/remap';
import { TTransactionRequest, wrapTxRequest } from '../../utils/request';
import * as constants from '../../constants';


const BROADCAST_PATH = '/transactions/broadcast';


// TODO : version!!!


/* ISSUE */

const issueSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
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
        reissuable: schemaFields.reissuable,
        fee: schemaFields.issueFee,
        timestamp: schemaFields.timestamp
    }
});

const preIssue = (data) => issueSchema.parse(data);
const postIssue = createRemapper({
    transactionType: null,
    precision: 'decimals'
});

export const sendIssueTx = wrapTxRequest(TX_TYPE_MAP.issue, preIssue, postIssue, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/assets/broadcast/issue', postParams);
}) as TTransactionRequest;


/* TRANSFER */

const transferSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        recipient: schemaFields.recipient,
        assetId: schemaFields.assetId,
        amount: {
            type: NumberPart,
            required: true
        },
        feeAssetId: {
            type: StringPart,
            required: false,
            defaultValue: constants.WAVES
        },
        fee: schemaFields.fee,
        attachment: {
            // TODO : make it possible to pass a byte array
            type: StringPart,
            required: false,
            defaultValue: ''
        },
        timestamp: schemaFields.timestamp
    }
});

const preTransfer = (data) => transferSchema.parse(data);
const postTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId,
    feeAssetId: normalizeAssetId,
    attachment: {
        from: 'bytes',
        to: 'base58'
    },
    recipient: {
        from: 'raw',
        to: 'prefixed'
    }
});

export const sendTransferTx = wrapTxRequest(TX_TYPE_MAP.transfer, preTransfer, postTransfer, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/assets/broadcast/transfer', postParams);
}) as TTransactionRequest;


/* REISSUE */

const reissueSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        assetId: schemaFields.assetId,
        quantity: {
            type: NumberPart,
            required: true
        },
        reissuable: schemaFields.reissuable,
        fee: schemaFields.issueFee,
        timestamp: schemaFields.timestamp
    }
});

const preReissue = (data) => reissueSchema.parse(data);
const postReissue = createRemapper({
    transactionType: null
});

export const sendReissueTx = wrapTxRequest(TX_TYPE_MAP.reissue, preReissue, postReissue, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/assets/broadcast/reissue', postParams);
}) as TTransactionRequest;


/* BURN */

const burnSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        assetId: schemaFields.assetId,
        quantity: {
            type: NumberPart,
            required: true
        },
        fee: schemaFields.fee,
        timestamp: schemaFields.timestamp
    }
});

const preBurn = (data) => burnSchema.parse(data);
const postBurn = createRemapper(({
    transactionType: null
}));

export const sendBurnTx = wrapTxRequest(TX_TYPE_MAP.burn, preBurn, postBurn, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/assets/broadcast/burn', postParams);
}) as TTransactionRequest;


/* LEASE */

const leaseSchema = new Schema({
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

const preLease = (data) => leaseSchema.parse(data);
const postLease = createRemapper({
    transactionType: null,
    recipient: {
        from: 'raw',
        to: 'prefixed'
    }
});

export const sendLeaseTx = wrapTxRequest(TX_TYPE_MAP.lease, preLease, postLease, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/leasing/broadcast/lease', postParams);
}) as TTransactionRequest;


/* CANCEL LEASING */

const cancelLeasingSchema = new Schema({
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

const preCancelLeasing = (data) => cancelLeasingSchema.parse(data);
const postCancelLeasing = createRemapper({
    transactionType: null,
    transactionId: 'txId'
});

export const sendCancelLeasingTx = wrapTxRequest(TX_TYPE_MAP.cancelLeasing, preCancelLeasing, postCancelLeasing, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/leasing/broadcast/cancel', postParams);
}) as TTransactionRequest;


/* CREATE ALIAS */

const createAliasSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        alias: {
            type: StringPart,
            required: true,
            parseValue: removeAliasPrefix
        },
        fee: schemaFields.fee,
        timestamp: schemaFields.timestamp
    }
});

const preCreateAlias = (data) => createAliasSchema.parse(data);
const postCreateAlias = createRemapper({
    transactionType: null
});

export const sendCreateAliasTx = wrapTxRequest(TX_TYPE_MAP.createAlias, preCreateAlias, postCreateAlias, (postParams) => {
    // TODO : use the 2nd version, add type and change the path
    return fetch('/alias/broadcast/create', postParams);
}) as TTransactionRequest;


/* MASS TRANSFER */

const massTransferSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        assetId: schemaFields.assetId,
        transfers: {
            type: ArrayPart,
            content: {
                type: ObjectPart,
                required: true,
                content: {
                    recipient: schemaFields.recipient,
                    amount: {
                        type: NumberPart,
                        required: true
                    }
                }
            },
            defaultValue: []
        },
        timestamp: schemaFields.timestamp,
        fee: schemaFields.fee,
        attachment: {
            // TODO : make it possible to pass a byte array
            type: StringPart,
            required: false,
            defaultValue: ''
        }
    }
});

const preMassTransfer = (data) => massTransferSchema.parse(data);
const postMassTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId,
    attachment: {
        from: 'bytes',
        to: 'base58'
    },
    transfers: {
        from: 'raw',
        to: 'prefixed',
        path: 'recipient'
    },
    type: constants.MASS_TRANSFER_TX,
    version: constants.MASS_TRANSFER_TX_VERSION
});

export const sendMassTransferTx = wrapTxRequest(TX_TYPE_MAP.massTransfer, preMassTransfer, postMassTransfer, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}) as TTransactionRequest;
