import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { issueSchema, transferSchema, reissueSchema, burnSchema } from './assets.x';
import addresses from './addresses';
import { createRemapper, normalizeAssetId } from '../../../utils/remap';
import * as constants from '../../../constants';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

const preIssue = (data) => issueSchema.parse(data);
const postIssue = createRemapper({
    transactionType: null,
    precision: 'decimals'
});

const preTransfer = (data) => transferSchema.parse(data);
const postTransfer = createRemapper({
    transactionType: null,
    assetId: normalizeAssetId,
    feeAssetId: normalizeAssetId
});

const preReissue = (data) => reissueSchema.parse(data);
const postReissue = createRemapper({
    transactionType: null
});

const preBurn = (data) => burnSchema.parse(data);
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

    issue: wrapTransactionRequest(Transactions.IssueTransaction, preIssue, postIssue, (postParams) => {
        return fetch('/assets/broadcast/issue', postParams);
    }) as TTransactionRequest,

    transfer: wrapTransactionRequest(Transactions.TransferTransaction, preTransfer, postTransfer, (postParams) => {
        return fetch('/assets/broadcast/transfer', postParams);
    }) as TTransactionRequest,

    reissue: wrapTransactionRequest(Transactions.ReissueTransaction, preReissue, postReissue, (postParams) => {
        return fetch('/assets/broadcast/reissue', postParams);
    }) as TTransactionRequest,

    burn: wrapTransactionRequest(Transactions.BurnTransaction, preBurn, postBurn, (postParams) => {
        return fetch('/assets/broadcast/burn', postParams);
    }) as TTransactionRequest

};
