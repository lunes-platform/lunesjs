import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
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

    issue: wrapTransactionRequest(Transactions.IssueTransaction, remapIssueTransaction, (postParams) => {
        return fetch('/assets/broadcast/issue', postParams);
    }) as TTransactionRequest,

    transfer: wrapTransactionRequest(Transactions.TransferTransaction, remapTransferTransaction, (postParams) => {
        return fetch('/assets/broadcast/transfer', postParams);
    }) as TTransactionRequest,

    reissue: wrapTransactionRequest(Transactions.ReissueTransaction, remapReissueTransaction, (postParams) => {
        return fetch('/assets/broadcast/reissue', postParams);
    }) as TTransactionRequest

};
