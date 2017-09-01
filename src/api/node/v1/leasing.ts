import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { createRemapper } from '../remap';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const remapLeaseTransaction = createRemapper({
    transactionType: null
});

const remapCancelLeasingTransaction = createRemapper({
    transactionType: null,
    transactionId: 'txId'
});


export default {

    lease: wrapTransactionRequest(Transactions.LeaseTransaction, remapLeaseTransaction, (postParams) => {
        return fetch('/leasing/broadcast/lease', postParams);
    }) as TTransactionRequest,

    cancelLeasing: wrapTransactionRequest(Transactions.CancelLeasingTransaction, remapCancelLeasingTransaction, (postParams) => {
        return fetch('/leasing/broadcast/cancel', postParams);
    }) as TTransactionRequest

};
