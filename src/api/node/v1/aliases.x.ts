import { Schema, NumberPart, ObjectPart, StringPart } from 'ts-api-validator';
import { removeAliasPrefix, getTimestamp } from '../../../utils/remap';
import * as constants from '../../../constants';


export const createAliasSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        senderPublicKey: {
            type: StringPart,
            required: true
        },
        alias: {
            type: StringPart,
            required: true,
            parseValue: removeAliasPrefix
        },
        fee: {
            type: NumberPart,
            required: false,
            defaultValue: constants.MINIMUM_FEE
        },
        timestamp: {
            type: NumberPart,
            required: true,
            parseValue: getTimestamp
        }
    }
});
