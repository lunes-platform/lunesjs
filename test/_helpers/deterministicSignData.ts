import axlsign from '../../src/libs/axlsign';
import base58 from '../../src/libs/base58';


export function deterministicSignData(byteArray, privateKey): string {
    const privateKeyBytes = base58.decode(privateKey);
    const signature = axlsign.sign(privateKeyBytes, byteArray);
    return base58.encode(signature);
}
