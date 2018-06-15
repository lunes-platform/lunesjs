import { TTransactionRequest } from '../../utils/request';

import { TX_TYPE_MAP } from '@waves/waves-signature-generator';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../utils/request';
import { issueSchema, transferSchema, reissueSchema, burnSchema } from './assets.x';
import addresses from './addresses';
import { createRemapper, normalizeAssetId } from '../../utils/remap';
import * as constants from '../../constants';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preIssueAsync = (data) => issueSchema.parse(data);
const postIssue = createRemapper({
    transactionType: null,
    precision: 'decimals'
});

const preTransferAsync = (data) => transferSchema.parse(data);
const postTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId,
    feeAssetId: normalizeAssetId,
    attachment: {
        from: 'bytes',
        to: 'base58'
    },
    recipient: {
        from: 'raw',
        to: 'prefixed'
    }
});

const preReissueAsync = (data) => reissueSchema.parse(data);
const postReissue = createRemapper({
    transactionType: null
});

const preBurnAsync = (data) => burnSchema.parse(data);
const postBurn = createRemapper(({
    transactionType: null
}));


export default {

    balances(address: string) {
        return fetch(`/assets/balance/${address}`);
    },

    balance(address: string, assetId: string) {
        if (assetId === constants.WAVES) {
            return addresses.balance(address);
        } else {
            return fetch(`/assets/balance/${address}/${assetId}`);
        }
    },

    distribution(assetId: string) {
        return fetch(`/assets/${assetId}/distribution`);
    },

    issue: wrapTransactionRequest(TX_TYPE_MAP.issue, preIssueAsync, postIssue, (postParams) => {
        return fetch('/assets/broadcast/issue', postParams);
    }) as TTransactionRequest,

    transfer: wrapTransactionRequest(TX_TYPE_MAP.transfer, preTransferAsync, postTransfer, (postParams) => {
        return fetch('/assets/broadcast/transfer', postParams);
    }) as TTransactionRequest,

    reissue: wrapTransactionRequest(TX_TYPE_MAP.reissue, preReissueAsync, postReissue, (postParams) => {
        return fetch('/assets/broadcast/reissue', postParams);
    }) as TTransactionRequest,

    burn: wrapTransactionRequest(TX_TYPE_MAP.burn, preBurnAsync, postBurn, (postParams) => {
        return fetch('/assets/broadcast/burn', postParams);
    }) as TTransactionRequest

};
