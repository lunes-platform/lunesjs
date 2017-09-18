import { getTimestamp, removeRecipientPrefix } from '../utils/remap';
import { IBooleanPart, INumberPart, IStringPart } from 'ts-api-validator/src/interfaces';
import * as constants from '../constants';


export default {

    publicKey: {
        type: 'string',
        required: true
    } as IStringPart,

    assetId: {
        type: 'string',
        required: true
    } as IStringPart,

    fee: {
        type: 'number',
        required: false,
        defaultValue: constants.MINIMUM_FEE
    } as INumberPart,

    issueFee: {
        type: 'number',
        required: false,
        defaultValue: constants.MINIMUM_ISSUE_FEE
    } as INumberPart,

    recipient: {
        type: 'string',
        required: true,
        parseValue: removeRecipientPrefix
    } as IStringPart,

    reissuable: {
        type: 'boolean',
        required: false,
        defaultValue: false
    } as IBooleanPart,

    timestamp: {
        type: 'number',
        required: true,
        parseValue: getTimestamp
    } as INumberPart

}
