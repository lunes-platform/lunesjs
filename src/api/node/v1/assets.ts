import { IHash, IKeyPair } from '../../../../interfaces';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, POST_TEMPLATE } from '../../../utils/request';
import { createRemapper, handleAssetId, handleRecipient } from '../remap';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const remapTransferTransaction = createRemapper({
    transactionType: null,
    recipient: handleRecipient,
    assetId: handleAssetId,
    feeAssetId: handleAssetId
});


export default {

    transfer(data: IHash<any>, keyPair: IKeyPair) {

        const transfer = new Transactions.TransferTransaction({
            ...data,
            senderPublicKey: keyPair.publicKey
        });

        return transfer.prepareForAPI(keyPair.privateKey)
            .then(remapTransferTransaction)
            .then((transaction) => {
                return fetch('/assets/broadcast/transfer', {
                    ...POST_TEMPLATE,
                    body: JSON.stringify(transaction)
                });
            });

    }

};
