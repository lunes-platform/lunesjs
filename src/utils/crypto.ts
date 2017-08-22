import * as CryptoJS from 'crypto-js';

import axlsign from '../libs/axlsign';
import base58 from '../libs/base58';
import converters from '../libs/converters';
import * as blake from '../libs/blake2b';
import secureRandom from '../libs/secure-random';
import { keccak256 } from '../libs/sha3';
import * as constants from '../constants';
import { concatUint8Arrays } from './concat';
import { IKeyPairBytes } from '../interfaces';


function sha256(input: Array<number> | Uint8Array | string): Uint8Array {

    let bytes;
    if (typeof input === 'string') {
        bytes = converters.stringToByteArray(input);
    } else {
        bytes = input;
    }

    const wordArray = converters.byteArrayToWordArrayEx(Uint8Array.from(bytes));
    const resultWordArray = CryptoJS.SHA256(wordArray);

    return converters.wordArrayToByteArrayEx(resultWordArray);

}

function blake2b(input) {
    return blake.blake2b(input, null, 32);
}

function keccak(input) {
    return (keccak256 as any).array(input);
}

function hashChain(input) {
    return keccak(blake2b(new Uint8Array(input)));
}

function buildSeedHash(seedBytes): Uint8Array {
    const nonce = new Uint8Array(converters.int32ToBytes(constants.INITIAL_NONCE, true));
    const seedBytesWithNonce = concatUint8Arrays(nonce, seedBytes);
    const seedHash = hashChain(seedBytesWithNonce);
    return sha256(seedHash);
}

function strengthenPassword(password: string, rounds: number = 5000): string {
    while (rounds--) password = converters.byteArrayToHexString(sha256(password));
    return password;
}


export default {

    buildTransactionSignature(dataBytes: Uint8Array, privateKey: string): string {
        const privateKeyBytes = base58.decode(privateKey);
        const signature = axlsign.sign(privateKeyBytes, dataBytes, secureRandom.randomUint8Array(64));
        return base58.encode(signature);
    },

    buildTransactionId(dataBytes: Uint8Array): string {
        const hash = blake2b(dataBytes);
        return base58.encode(hash);
    },

    buildKeyPair(seed): IKeyPairBytes {

        const seedBytes = converters.stringToByteArray(seed);
        const seedHash = buildSeedHash(seedBytes);
        const keys = axlsign.generateKeyPair(seedHash);

        return {
            privateKey: keys.private,
            publicKey: keys.public
        };

    },

    encryptSeed(seed: string, password: string, encryptionRounds?: number): string {
        password = strengthenPassword(password, encryptionRounds);
        return CryptoJS.AES.encrypt(seed, password).toString();
    },

    decryptSeed(encryptedSeed: string, password: string, encryptionRounds?: number): string {
        password = strengthenPassword(password, encryptionRounds);
        const hexSeed = CryptoJS.AES.decrypt(encryptedSeed, password);
        return converters.hexStringToString(hexSeed.toString());
    },

    generateRandomUint32Array(n): Uint32Array {

        const a = secureRandom.randomUint8Array(n);
        const b = secureRandom.randomUint8Array(n);
        const result = new Uint32Array(n);

        for (let i = 0; i < n; i++) {
            const hash = converters.byteArrayToHexString(sha256(`${a[i]}${b[i]}`));
            const randomValue = parseInt(hash.slice(0, 13), 16);
            result.set([randomValue], i);
        }

        return result;

    }

}
