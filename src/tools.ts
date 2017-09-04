import base58 from './libs/base58';
import crypto from './utils/crypto';


export default {

    getAddressFromPublicKey(publicKey: string) {
        const publicKeyBytes = base58.decode(publicKey);
        return crypto.buildRawAddress(publicKeyBytes);
    }

};
