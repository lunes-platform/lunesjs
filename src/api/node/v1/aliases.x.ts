import { Schema, ObjectPart, StringPart } from 'ts-api-validator';
import { removeAliasPrefix } from '../../../utils/remap';
import schemaFields from '../../schemaFields';


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
