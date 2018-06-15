import { TTransactionRequest } from '../../utils/request';

import { TX_TYPE_MAP} from '@waves/waves-signature-generator';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../utils/request';
import { createAliasSchema } from './aliases.x';
import { createRemapper } from '../../utils/remap';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preCreateAliasAsync = (data) => createAliasSchema.parse(data);
const postCreateAlias = createRemapper({
    transactionType: null
});


export default {

    byAlias(alias: string) {
        return fetch(`/alias/by-alias/${alias}`);
    },

    byAddress(address: string) {
        return fetch(`/alias/by-address/${address}`);
    },

    createAlias: wrapTransactionRequest(TX_TYPE_MAP.createAlias, preCreateAliasAsync, postCreateAlias, (postParams) => {
        return fetch('/alias/broadcast/create', postParams);
    }) as TTransactionRequest

};
