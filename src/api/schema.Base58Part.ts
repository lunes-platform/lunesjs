import { IPartialOptions } from 'ts-api-validator/src/interfaces';

import { BasePart } from 'ts-api-validator';
import converters from '../libs/converters';
import base58 from '../libs/base58';


export interface IBase58Part extends IPartialOptions<string> {
    type: typeof Base58Part;
}

export class Base58Part extends BasePart<IBase58Part> {

    protected getValue(value: string = '') {
        const bytes = base58.decode(value);
        try {
            return converters.byteArrayToString(bytes);
        } catch (e) {
            return null;
        }
    }

}
