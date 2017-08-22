import { IKeyPair } from '../interfaces';
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


class Seed {

    private readonly encryptedSeed;
    private readonly encryptionRounds;

    constructor(phrase: string, password: string, encryptionRounds?: number) {
        this.encryptedSeed = crypto.encryptSeed(phrase, password, encryptionRounds);
        this.encryptionRounds = encryptionRounds;
    }

    // public get(password: string): object {}

    public getPhrase(password: string): string {
        return crypto.decryptSeed(this.encryptedSeed, password, this.encryptionRounds);
    }

    public getKeyPair(password: string): IKeyPair {
        const phrase = this.getPhrase(password);
        const keys = crypto.buildKeyPair(phrase);
        return {
            privateKey: base58.encode(keys.privateKey),
            publicKey: base58.encode(keys.publicKey)
        };
    }

    // public getAddress(password: string): string {}

    // public getBytes(password: string): Uint8Array {}

    public getEncryptedSeed(): string {
        return this.encryptedSeed;
    }

}


export default {

    create(password: string, length: number = 15, encryptionRounds?: number) {
        const phrase = generateNewSeed(length);
        return new Seed(phrase, password, encryptionRounds);
    },

    fromExistingPhrase(phrase: string, password: string, encryptionRounds?: number) {
        if (phrase.length < 25) console.warn('Your seed may be too weak');
        return new Seed(phrase, password, encryptionRounds);
    }

};
