import axlsign from '../../src/libs/axlsign';
import base58 from '../../src/libs/base58';
import * as constants from '../../src/constants';


export function deterministicSign(dataBytes: Uint8Array, privateKey: string): string {

    if (!dataBytes || !(dataBytes instanceof Uint8Array)) {
        throw new Error('Missing or invalid data');
    }

    if (!privateKey || typeof privateKey !== 'string') {
        throw new Error('Missing or invalid private key');
    }

    const privateKeyBytes = base58.decode(privateKey);

    if (privateKeyBytes.length !== constants.PRIVATE_KEY_LENGTH) {
        throw new Error('Invalid public key');
    }

    // Intentionally drop random values to make it deterministic
    const signature = axlsign.sign(privateKeyBytes, dataBytes);
    return base58.encode(signature);

}
