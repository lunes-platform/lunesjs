import { Schema, ObjectPart, StringPart } from 'ts-api-validator';


export const aliasAddressSchema = new Schema({
    type: ObjectPart,
    required: true,
    content: {
        address: {
            type: StringPart,
            required: true
        }
    }
});
