import { IKeyPair } from '../../interfaces';

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

function encryptSeedPhrase(seedPhrase: string, password: string, encryptionRounds: number = 5000) {
    return crypto.encryptSeed(seedPhrase, password, encryptionRounds);
}

function decryptSeedPhrase(seedPhrase: string, password: string, encryptionRounds: number = 5000) {
    return crypto.decryptSeed(seedPhrase, password, encryptionRounds);
}


export interface ISeed {
    readonly phrase: string;
    readonly address: string;
    readonly keyPair: IKeyPair;
    encrypt(password: string, encryptionRounds?: number);
}


class Seed implements ISeed {

    public readonly phrase: string;
    public readonly address: string;
    public readonly keyPair: IKeyPair;

    constructor(phrase: string) {

        const keys = crypto.buildKeyPair(phrase);

        this.phrase = phrase;
        this.address = crypto.buildRawAddress(keys.publicKey);
        this.keyPair = {
            privateKey: base58.encode(keys.privateKey),
            publicKey: base58.encode(keys.publicKey)
        };

        Object.freeze(this);
        Object.freeze(this.keyPair);

    }

    encrypt(password: string, encryptionRounds?: number) {
        return encryptSeedPhrase(this.phrase, password, encryptionRounds);
    }

}


export default {

    create(length: number = 15): ISeed {
        const phrase = generateNewSeed(length);
        return new Seed(phrase);
    },

    fromExistingPhrase(phrase: string): ISeed {
        if (phrase.length < 25) console.warn('Your seed may be too weak');
        return new Seed(phrase);
    },

    encryptSeedPhrase,

    decryptSeedPhrase

};
