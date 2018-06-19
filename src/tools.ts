import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import { MINIMUM_DATA_FEE_PER_KB } from './constants';
import base58 from './libs/base58';
import crypto from './utils/crypto';
import { createTransaction, ITransactionWrapper } from './utils/transactions'; // TODO : fix this issue with interface


export default {

    getAddressFromPublicKey(publicKey: string) {
        const publicKeyBytes = base58.decode(publicKey);
        return crypto.buildRawAddress(publicKeyBytes);
    },

    calculateTimeDiff(nodeTime, userTime) {
         return nodeTime - userTime;
    },

    base58: {
        encode: base58.encode,
        decode: base58.decode
    },

    getMinimumDataTxFee(data: any[]): Promise<number> {
        const emptyDataTx = new TX_TYPE_MAP.data({
            senderPublicKey: '11111111111111111111111111111111', // 32 bytes
            timestamp: 0,
            fee: '',
            data
        });

        return emptyDataTx.getBytes().then((bytes) => Math.ceil(bytes.length / 1024) * MINIMUM_DATA_FEE_PER_KB);
    },

    createTransaction

};
