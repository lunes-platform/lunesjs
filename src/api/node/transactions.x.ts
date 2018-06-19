import { TTransactionRequest } from '../../utils/request';

import { Schema, NumberPart, ObjectPart, StringPart, ArrayPart, BasePart } from 'ts-api-validator';
import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import schemaFields from '../schemaFields';
import { createRemapper, normalizeAssetId, precisionCheck, removeAliasPrefix } from '../../utils/remap';
import { createFetchWrapper, processJSON, PRODUCTS, VERSIONS, wrapTxRequest } from '../../utils/request';
import * as constants from '../../constants';


class AnyPart extends BasePart<any> {
    protected getValue<T>(data: T): T {
        return data;
    }
}


const BROADCAST_PATH = '/transactions/broadcast';

const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


/* ISSUE */

export const issueSchema = new Schema({
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
    precision: 'decimals',
    type: constants.ISSUE_TX,
    version: constants.ISSUE_TX_VERSION
});

export const sendIssueTx = wrapTxRequest(TX_TYPE_MAP.issue, preIssue, postIssue, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* TRANSFER */

export const transferSchema = new Schema({
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
    },
    type: constants.TRANSFER_TX,
    version: constants.TRANSFER_TX_VERSION
});

export const sendTransferTx = wrapTxRequest(TX_TYPE_MAP.transfer, preTransfer, postTransfer, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* REISSUE */

export const reissueSchema = new Schema({
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
    transactionType: null,
    type: constants.REISSUE_TX,
    version: constants.REISSUE_TX_VERSION
});

export const sendReissueTx = wrapTxRequest(TX_TYPE_MAP.reissue, preReissue, postReissue, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* BURN */

export const burnSchema = new Schema({
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
    transactionType: null,
    type: constants.BURN_TX,
    version: constants.BURN_TX_VERSION
}));

export const sendBurnTx = wrapTxRequest(TX_TYPE_MAP.burn, preBurn, postBurn, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* LEASE */

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

const preLease = (data) => leaseSchema.parse(data);
const postLease = createRemapper({
    transactionType: null,
    recipient: {
        from: 'raw',
        to: 'prefixed'
    },
    type: constants.LEASE_TX,
    version: constants.LEASE_TX_VERSION
});

export const sendLeaseTx = wrapTxRequest(TX_TYPE_MAP.lease, preLease, postLease, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* CANCEL LEASING */

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

const preCancelLeasing = (data) => cancelLeasingSchema.parse(data);
const postCancelLeasing = createRemapper({
    transactionType: null,
    transactionId: 'txId',
    type: constants.CANCEL_LEASING_TX,
    version: constants.CANCEL_LEASING_TX_VERSION
});

export const sendCancelLeasingTx = wrapTxRequest(TX_TYPE_MAP.cancelLeasing, preCancelLeasing, postCancelLeasing, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* CREATE ALIAS */

export const createAliasSchema = new Schema({
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
    transactionType: null,
    type: constants.CREATE_ALIAS_TX,
    version: constants.CREATE_ALIAS_TX_VERSION
});

export const sendCreateAliasTx = wrapTxRequest(TX_TYPE_MAP.createAlias, preCreateAlias, postCreateAlias, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;


/* MASS TRANSFER */

export const massTransferSchema = new Schema({
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
}, true) as TTransactionRequest;


/* DATA */

export const dataTxSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: schemaFields.publicKey,
        data: {
            type: ArrayPart,
            content: {
                type: ObjectPart,
                required: true,
                content: {
                    type: {
                        type: StringPart,
                        required: true
                    },
                    key: {
                        type: StringPart,
                        required: true
                    },
                    value: {
                        type: AnyPart,
                        required: true
                    }
                }
            },
            defaultValue: []
        },
        timestamp: schemaFields.timestamp,
        fee: schemaFields.fee // TODO : validate against the transaction size in bytes
    }
});

const preData = (data) => dataTxSchema.parse(data);
const postData = createRemapper({
    transactionType: null,
    type: constants.DATA_TX,
    version: constants.DATA_TX_VERSION
});

export const sendDataTx = wrapTxRequest(TX_TYPE_MAP.data, preData, postData, (postParams) => {
    return fetch(BROADCAST_PATH, postParams);
}, true) as TTransactionRequest;
