import { IKeyPair } from '../../../../interfaces';
import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { Base58, Long } from '../../../classes/ByteProcessor';
import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { normalizeAssetId } from '../../../utils/remap';
import { orderSchema } from './orderbooks.x';


const fetch = createFetchWrapper(PRODUCTS.MATCHER, VERSIONS.V1, processJSON);

const AuthData = Transactions.createSignableData([
    new Base58('publicKey'),
    new Long('timestamp')
]);

const preOrderAsync = (data) => orderSchema.parse(data);
const postOrder = (data) => {

    data.assetPair = {
        amountAsset: normalizeAssetId(data.amountAsset),
        priceAsset: normalizeAssetId(data.priceAsset)
    };

    delete data.amountAsset;
    delete data.priceAsset;

    return data;

};


export default {

    getOrderbooks() {
        return fetch('/orderbook');
    },

    getOrderbook(assetOne: string, assetTwo: string) {
        return fetch(`/orderbook/${assetOne}/${assetTwo}`);
    },

    getOrders(assetOne: string, assetTwo: string, keyPair: IKeyPair) {

        const authData = new AuthData({
            timestamp: Date.now(),
            publicKey: keyPair.publicKey
        });

        return authData.prepareForAPI(keyPair.privateKey).then((preparedData) => {
            return fetch(`/orderbook/${assetOne}/${assetTwo}/publicKey/${keyPair.publicKey}`, {
                headers: {
                    Timestamp: preparedData.timestamp,
                    Signature: preparedData.signature
                }
            });
        });

    },

    getAllOrders(keyPair: IKeyPair) {

        const authData = new AuthData({
            timestamp: Date.now(),
            publicKey: keyPair.publicKey
        });

        return authData.prepareForAPI(keyPair.privateKey).then((preparedData) => {
            return fetch(`/orderbook/${keyPair.publicKey}`, {
                headers: {
                    Timestamp: preparedData.timestamp,
                    Signature: preparedData.signature
                }
            });
        });

    },

    createOrder: wrapTransactionRequest(Transactions.Order, preOrderAsync, postOrder, (postParams) => {
        return fetch('/orderbook', postParams);
    }) as TTransactionRequest

};
