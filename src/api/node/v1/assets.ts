import { IHash, IKeyPair } from '../../../../interfaces';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, POST_TEMPLATE } from '../../../utils/request';
import { createRemapper, handleAssetId, handleRecipient } from '../remap';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const remapIssueTransaction = createRemapper({
    transactionType: null,
    precision: 'decimals'
});

const remapTransferTransaction = createRemapper({
    transactionType: null,
    recipient: handleRecipient,
    assetId: handleAssetId,
    feeAssetId: handleAssetId
});

const remapReissueTransaction = createRemapper({
    transactionType: null
});


export default {

    issue(data: IHash<any>, keyPair: IKeyPair) {

        const issue = new Transactions.IssueTransaction({
            ...data,
            senderPublicKey: keyPair.publicKey
        });

        return issue.prepareForAPI(keyPair.privateKey)
            .then(remapIssueTransaction)
            .then((transaction) => {
                return fetch('/assets/broadcast/issue', {
                    ...POST_TEMPLATE,
                    body: JSON.stringify(transaction)
                });
            });

    },

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

    },

    reissue(data: IHash<any>, keyPair: IKeyPair) {

        const reissue = new Transactions.ReissueTransaction({
            ...data,
            senderPublicKey: keyPair.publicKey
        });

        return reissue.prepareForAPI(keyPair.privateKey)
            .then(remapReissueTransaction)
            .then((transaction) => {
                return fetch('/assets/broadcast/reissue', {
                    ...POST_TEMPLATE,
                    body: JSON.stringify(transaction)
                });
            });

    }

};
