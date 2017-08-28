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

    if (password && password.length < 8) {
        console.warn('Your password may be too weak');
    }

    if (encryptionRounds < 1000) {
        console.warn('Encryption rounds may be too few');
    }

    return crypto.encryptSeed(seedPhrase, password, encryptionRounds);

}

function decryptSeedPhrase(encryptedSeedPhrase: string, password: string, encryptionRounds: number = 5000) {

    const wrongPasswordMessage = 'The password is wrong';

    let phrase;

    try {
        phrase = crypto.decryptSeed(encryptedSeedPhrase, password, encryptionRounds);
    } catch (e) {
        throw new Error(wrongPasswordMessage);
    }

    if (phrase === '') {
        throw new Error(wrongPasswordMessage);
    }

    return phrase;

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

    public encrypt(password: string, encryptionRounds?: number) {
        return encryptSeedPhrase(this.phrase, password, encryptionRounds);
    }

}


export default {

    create(length: number = 15): ISeed {

        if (length < 12) {
            console.warn(`A seed of length ${length} may be too weak`);
        }

        const phrase = generateNewSeed(length);
        return new Seed(phrase);

    },

    fromExistingPhrase(phrase: string): ISeed {

        if (phrase.length < 25) {
            console.warn('Your seed may be too weak');
        }

        return new Seed(phrase);

    },

    encryptSeedPhrase,

    decryptSeedPhrase

};
