import blake from 'blakejs';
import CryptoJS from 'crypto-js';

import SHA3 from '../libs/sha3';
import axlsign from '../libs/axlsign';
import base58 from '../libs/base58';
import converters from '../libs/converters';
import { randomUint8Array } from '../libs/secure-random';


function sha256(input) {

    let bytes;
    if (typeof input === 'string') {
        bytes = converters.stringToByteArray(input);
    } else {
        bytes = input;
    }

    const wordArray = converters.byteArrayToWordArrayEx(new Uint8Array(bytes));
    const resultWordArray = CryptoJS.SHA256(wordArray);

    return converters.wordArrayToByteArrayEx(resultWordArray);

}

function blake2b(input) {
    return blake.blake2b(input, null, 32);
}

function keccak(input) {
    return (SHA3.keccak_256 as any).array(input);
}

function hashChain(input) {
    return keccak(blake2b(new Uint8Array(input)));
}


export default {

    buildTransactionSignature(dataBytes: Uint8Array, privateKey: string): string {
        const privateKeyBytes = base58.decode(privateKey);
        const signature = axlsign.sign(privateKeyBytes, dataBytes, randomUint8Array(64));
        return base58.encode(signature);
    },

    buildTransactionId(dataBytes: Uint8Array): string {
        const hash = blake2b(dataBytes);
        return base58.encode(hash);
    }

};
