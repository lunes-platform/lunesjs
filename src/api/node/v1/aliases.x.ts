import { Schema } from 'ts-api-validator';
import { removeAliasPrefix, getTimestamp } from '../../../utils/remap';
import * as constants from '../../../constants';


export const createAliasSchema = new Schema({
    type: 'object',
    required: true,
    content: {
        senderPublicKey: {
            type: 'string',
            required: true
        },
        alias: {
            type: 'string',
            required: true,
            parseValue: removeAliasPrefix
        },
        fee: {
            type: 'number',
            required: false,
            defaultValue: constants.MINIMUM_FEE
        },
        timestamp: {
            type: 'number',
            required: true,
            parseValue: getTimestamp
        }
    }
});
