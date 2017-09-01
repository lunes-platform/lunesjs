import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { createRemapper, handleAlias } from '../remap';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const remapCreateAlias = createRemapper({
    transactionType: null,
    alias: handleAlias
});


export default {

    byAlias(alias: string) {
        return fetch(`/alias/by-alias/${alias}`);
    },

    byAddress(address: string) {
        return fetch(`/alias/by-address/${address}`);
    },

    createAlias: wrapTransactionRequest(Transactions.CreateAliasTransaction, remapCreateAlias, (postParams) => {
        return fetch('/alias/broadcast/create', postParams);
    }) as TTransactionRequest

};
