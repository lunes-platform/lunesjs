import { TTransactionRequest } from '../../../utils/request';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { createRemapper, normalizeAssetId } from '../../../utils/remap';
import { massTransferSchema } from './transactions.x';
import { WAVES, WAVES_V1_ISSUE_TX } from '../../../constants';
import Transactions from '../../../classes/Transactions';
import config from '../../../config';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preMassTransferAsync = (data) => massTransferSchema.parse(data);
const postMassTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId
});


export default {

    get(id: string) {
        if (id === WAVES) {
            return Promise.resolve(WAVES_V1_ISSUE_TX);
        } else {
            return fetch(`/transactions/info/${id}`);
        }
    },

    getList(address: string, limit: number = config.getRequestParams().limit) {
        // In the end of the line a strange response artifact is handled
        return fetch(`/transactions/address/${address}/limit/${limit}`).then((array) => array[0]);
    },

    utxSize() {
        return fetch('/transactions/unconfirmed/size');
    },

    utxGet(id: string) {
        return fetch(`/transactions/unconfirmed/info/${id}`);
    },

    utxGetList() {
        return fetch('/transactions/unconfirmed');
    },

    massTransfer: wrapTransactionRequest(Transactions.MassTransferTransaction, preMassTransferAsync, postMassTransfer, (postParams) => {
        return fetch('/transactions/broadcast', postParams);
    }) as TTransactionRequest

};
