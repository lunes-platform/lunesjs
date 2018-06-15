import { TTransactionRequest } from '../../utils/request';

import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../utils/request';
import { createRemapper, normalizeAssetId } from '../../utils/remap';
import { massTransferSchema } from './transactions.x';
import * as constants from '../../constants';
import config from '../../config';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preMassTransferAsync = (data) => massTransferSchema.parse(data);
const postMassTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId,
    attachment: {
        from: 'bytes',
        to: 'base58'
    },
    transfers: {
        from: 'raw',
        to: 'prefixed',
        path: 'recipient'
    },
    type: () => constants.MASS_TRANSFER_TX,
    version: () => constants.MASS_TRANSFER_TX_VERSION
});


export default {

    get(id: string) {
        if (id === constants.WAVES) {
            return Promise.resolve(constants.WAVES_V1_ISSUE_TX);
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

    massTransfer: wrapTransactionRequest(TX_TYPE_MAP.massTransfer, preMassTransferAsync, postMassTransfer, (postParams) => {
        return fetch('/transactions/broadcast', postParams);
    }) as TTransactionRequest

};
