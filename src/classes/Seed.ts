import { IKeyPair, ISeedFields } from '../../interfaces';
import dictionary from '../seedDictionary';
import crypto from '../utils/crypto';
import base58 from '../libs/base58';


function generateNewSeed(length): string {

    const random = crypto.generateRandomUint32Array(length);
    const wordCount = dictionary.length;
    const phrase = [];

    for (let i = 0; i < length; i++) {
        const wordIndex = random[i] % wordCount;
        phrase.push(dictionary[wordIndex]);
    }

    random.set(new Uint8Array(random.length));

    return phrase.join(' ');

}


export interface ISeed {
    get(password: string): ISeedFields;
    getPhrase(password: string): string;
    getKeyPair(password: string): IKeyPair;
    getAddress(password: string): string;
    getEncryptedSeed(): string;
}


class Seed implements ISeed {

    private readonly _encryptedSeed;
    private readonly _encryptionRounds;

    constructor(phrase: string, password: string, encryptionRounds?: number) {
        this._encryptedSeed = crypto.encryptSeed(phrase, password, encryptionRounds);
        this._encryptionRounds = encryptionRounds;
    }

    public get(password: string): ISeedFields {
        return this._getFields(password);
    }

    public getPhrase(password: string): string {
        return this._getFields(password, 'phrase').phrase;
    }

    public getKeyPair(password: string): IKeyPair {
        return this._getFields(password, 'keyPair').keyPair;
    }

    public getAddress(password: string): string {
        return this._getFields(password, 'address').address;
    }

    public getEncryptedSeed(): string {
        return this._encryptedSeed;
    }

    private _getFields(password: string, stopOn: string = 'address') {

        const fields: ISeedFields = Object.create(null);

        fields.phrase = crypto.decryptSeed(this._encryptedSeed, password, this._encryptionRounds);

        // Return object with phrase only
        if (stopOn === 'phrase') return fields;

        const keys = crypto.buildKeyPair(fields.phrase);
        fields.keyPair = {
            privateKey: base58.encode(keys.privateKey),
            publicKey: base58.encode(keys.publicKey)
        };

        // Return object with phrase and keyPair
        if (stopOn === 'keyPair') return fields;

        fields.address = crypto.buildRawAddress(keys.publicKey);

        // Return object with all fields
        if (stopOn === 'address') return fields;

        throw new Error(`Seed doesn't have ${stopOn} field`);

    }

}


export default {

    create(password: string, length: number = 15, encryptionRounds?: number): ISeed {
        const phrase = generateNewSeed(length);
        return new Seed(phrase, password, encryptionRounds);
    },

    fromExistingPhrase(phrase: string, password: string, encryptionRounds?: number): ISeed {
        if (phrase.length < 25) console.warn('Your seed may be too weak');
        return new Seed(phrase, password, encryptionRounds);
    }

};
