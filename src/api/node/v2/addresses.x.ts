import { Schema, ArrayPart, BooleanPart, DatePart, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import { MoneyPart } from '../../schema.MoneyPart';
import * as constants from '../../../constants';

import _stub from './_stub';


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

export const assetBalancesSchema = new Schema({
    type: ArrayPart,
    required: true,
    path: 'balances',
    content: {
        type: ObjectPart,
        content: {
            id: {
                type: StringPart,
                required: true,
                path: 'assetId'
            },
            name: {
                type: StringPart,
                required: true,
                path: 'issueTransaction.name'
            },
            precision: {
                type: NumberPart,
                required: true,
                path: 'issueTransaction.decimals'
            },
            amount: {
                type: MoneyPart,
                required: true,
                path: 'balance',
                assetIdPath: 'assetId',
                parseValue: temporaryStringConversion
            }
        }
    }
});


const getTxCommonFields = (typeName, wavesFeeOnly) => ({
    transactionType: {
        type: StringPart,
        defaultValue: typeName
    },
    id: {
        type: StringPart,
        required: true
    },
    senderPublicKey: {
        type: StringPart,
        required: true
    },
    sender: {
        type: StringPart,
        required: true
    },
    fee: wavesFeeOnly ? {
        type: MoneyPart,
        required: true,
        assetId: '',
        parseValue: temporaryStringConversion
    } : {
        type: MoneyPart,
        required: true,
        assetIdPath: 'feeAsset',
        parseValue: temporaryStringConversion
    },
    // TODO : add blockHeight for the separate TXs scheme
    timestamp: {
        type: DatePart,
        required: true
    },
    signature: {
        type: StringPart,
        required: true
    }
});

const getTxRecipient = () => ({
    type: StringPart,
    required: true
});

const getTxRecipientAddress = () => ({
    type: StringPart,
    required: true,
    parseValue: _stub('string')
});

const getTxAssetId = (path?) => ({
    type: StringPart,
    required: true,
    path: path,
    parseValue: (d) => d ? d : constants.WAVES
});

const getTxAssetName = () => ({
    type: StringPart,
    required: true
});

const getTxAssetDescription = () => ({
    type: StringPart,
    required: true
});

const getTxAssetPrecision = () => ({
    type: NumberPart,
    required: true,
    path: 'decimals'
});

const getTxAssetTotalAmount = (path, assetIdPath) => ({
    type: MoneyPart,
    required: true,
    path: path,
    assetIdPath: assetIdPath,
    parseValue: temporaryStringConversion
});

const getTxAssetReissuable = () => ({
    type: BooleanPart,
    required: true
});

const getTxAmount = (assetIdPath) => ({
    type: MoneyPart,
    required: true,
    assetIdPath: assetIdPath,
    parseValue: temporaryStringConversion
});

const getTxWavesAmount = () => ({
    type: MoneyPart,
    required: true,
    assetId: '',
    parseValue: temporaryStringConversion
});

const getTxPrice = (assetIdPath) => ({
    type: MoneyPart, // TODO : PricePart
    required: true,
    assetIdPath: assetIdPath,
    parseValue: temporaryStringConversion
});

const getTxWavesFee = (path?) => ({
    type: MoneyPart,
    required: true,
    path: path,
    assetId: '',
    parseValue: temporaryStringConversion
});

const getTxAttachment = () => ({
    type: StringPart,
    defaultValue: ''
});

const getTxLeaseTransactionId = (path) => ({
    type: StringPart,
    required: true,
    path: path
});

const getTxAlias = () => ({
    type: StringPart,
    required: true
});


// TODO : move to the Matcher API section
const getTxOrder = (path) => ({
    type: ObjectPart,
    required: true,
    path: path,
    content: {
        id: {
            type: StringPart,
            required: true
        },
        type: {
            type: StringPart,
            required: true,
            path: `${path}.orderType`
        },
        senderPublicKey: {
            type: StringPart,
            required: true
        },
        sender: {
            type: StringPart,
            required: true,
            parseValue: _stub('string')
        },
        matcherPublicKey: {
            type: StringPart,
            required: true
        },
        amountAsset: getTxAssetId('assetPair.amountAsset'),
        amount: getTxAmount('assetPair.amountAsset'),
        priceAsset: getTxAssetId('assetPair.priceAsset'),
        price: getTxAmount('assetPair.priceAsset'),
        matcherFee: getTxWavesFee()
    }
});


export const issueTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.ISSUE_TX_NAME, true),
        assetId: getTxAssetId(),
        name: getTxAssetName(),
        description: getTxAssetDescription(),
        precision: getTxAssetPrecision(),
        amount: getTxAssetTotalAmount('quantity', 'assetId'),
        reissuable: getTxAssetReissuable()
    }
});

export const transferTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.TRANSFER_TX_NAME, false),
        recipient: getTxRecipient(),
        recipientAddress: getTxRecipientAddress(),
        attachment: getTxAttachment(),
        assetId: getTxAssetId(),
        amount: getTxAmount('assetId'),
        feeAssetId: getTxAssetId('feeAsset')
    }
});

export const reissueTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.REISSUE_TX_NAME, true),
        assetId: getTxAssetId(),
        amount: getTxAssetTotalAmount('quantity', 'assetId'),
        reissuable: getTxAssetReissuable()
    }
});

export const burnTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.BURN_TX_NAME, true),
        assetId: getTxAssetId(),
        amount: getTxAssetTotalAmount('amount', 'assetId')
    }
});

export const exchangeTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.EXCHANGE_TX_NAME, true),
        amountAsset: getTxAssetId('order1.assetPair.amountAsset'),
        amount: getTxAmount('order1.assetPair.amountAsset'),
        priceAsset: getTxAssetId('order1.assetPair.priceAsset'),
        price: getTxPrice('order1.assetPair.priceAsset'),
        buyOrder: getTxOrder('order1'),
        buyMatcherFee: getTxWavesFee(),
        sellOrder: getTxOrder('order2'),
        sellMatcherFee: getTxWavesFee()
    }
});

export const leaseTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.LEASE_TX_NAME, true),
        recipient: getTxRecipient(),
        recipientAddress: getTxRecipientAddress(),
        amount: getTxWavesAmount()
    }
});

export const cancelLeasingTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.CANCEL_LEASING_TX_NAME, true),
        leaseTransactionId: getTxLeaseTransactionId('leaseId')
    }
});

export const createAliasTransactionSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        ...getTxCommonFields(constants.CREATE_ALIAS_TX_NAME, true),
        alias: getTxAlias()
    }
});
