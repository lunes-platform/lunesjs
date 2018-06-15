import { TTransactionRequest } from '../../utils/request';

import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../utils/request';
import { createRemapper } from '../../utils/remap';
import { cancelLeasingSchema, leaseSchema } from './leasing.x';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preLeaseAsync = (data) => leaseSchema.parse(data);
const postLease = createRemapper({
    transactionType: null,
    recipient: {
        from: 'raw',
        to: 'prefixed'
    }
});

const preCancelLeasingAsync = (data) => cancelLeasingSchema.parse(data);
const postCancelLeasing = createRemapper({
    transactionType: null,
    transactionId: 'txId'
});


export default {

    lease: wrapTransactionRequest(TX_TYPE_MAP.lease, preLeaseAsync, postLease, (postParams) => {
        return fetch('/leasing/broadcast/lease', postParams);
    }) as TTransactionRequest,

    cancelLeasing: wrapTransactionRequest(TX_TYPE_MAP.cancelLeasing, preCancelLeasingAsync, postCancelLeasing, (postParams) => {
        return fetch('/leasing/broadcast/cancel', postParams);
    }) as TTransactionRequest,

    getAllActiveLeases(address) {
        return fetch(`/leasing/active/${address}`).then((list) => {
            return list.map((tx) => {
                tx.status = 'active';
                return tx;
            });
        });
    }

};
