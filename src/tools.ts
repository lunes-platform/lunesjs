import base58 from './libs/base58';
import crypto from './utils/crypto';
import { siftTransaction } from './api/schemaTools';


export default {

    getAddressFromPublicKey(publicKey: string) {
        const publicKeyBytes = base58.decode(publicKey);
        return crypto.buildRawAddress(publicKeyBytes);
    },

    base58: {
        encode: base58.encode,
        decode: base58.decode
    },

    siftTransaction

};
