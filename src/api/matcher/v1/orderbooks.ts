import { IKeyPair } from '../../../../interfaces';
import { TTransactionRequest } from '../../../utils/request';

import Transactions from '../../../classes/Transactions';
import { Base58, Long } from '../../../classes/ByteProcessor';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTransactionRequest } from '../../../utils/request';
import { createRemapper, getTimestamp, normalizeAssetId } from '../../../utils/remap';
import { POST_TEMPLATE } from '../../../utils/request';
import { createOrderSchema } from './orderbooks.x';


const GetOrdersAuthData = Transactions.createSignableData([
    new Base58('senderPublicKey'),
    new Long('timestamp')
]);

const CancelOrderAuthData = Transactions.createSignableData([
    new Base58('senderPublicKey'),
    new Base58('orderId')
]);


const fetch = createFetchWrapper(PRODUCTS.MATCHER, VERSIONS.V1, processJSON);

const preCreateOrderAsync = (data) => createOrderSchema.parse(data);
const postCreateOrder = (data) => {

    data.assetPair = {
        amountAsset: normalizeAssetId(data.amountAsset),
        priceAsset: normalizeAssetId(data.priceAsset)
    };

    delete data.amountAsset;
    delete data.priceAsset;

    return data;

};

const postCancelOrder = createRemapper({
    senderPublicKey: 'sender'
});


const generateCancelLikeRequest = (type: string) => {

    return (amountAssetId: string, priceAssetId: string, orderId: string, keyPair: IKeyPair) => {

        const authData = new CancelOrderAuthData({
            senderPublicKey: keyPair.publicKey,
            orderId: orderId
        });

        return authData.prepareForAPI(keyPair.privateKey)
            .then(postCancelOrder)
            .then((tx) => {
                return fetch(`/orderbook/${amountAssetId}/${priceAssetId}/${type}`, {
                    ...POST_TEMPLATE,
                    body: JSON.stringify(tx)
                });
            });

    };

};


export default {

    getOrderbooks() {
        return fetch('/orderbook');
    },

    getOrderbook(assetOne: string, assetTwo: string) {
        return fetch(`/orderbook/${assetOne}/${assetTwo}`);
    },

    getOrders(assetOne: string, assetTwo: string, keyPair: IKeyPair) {

        const authData = new GetOrdersAuthData({
            senderPublicKey: keyPair.publicKey,
            timestamp: getTimestamp()
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

        const authData = new GetOrdersAuthData({
            senderPublicKey: keyPair.publicKey,
            timestamp: getTimestamp()
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

    createOrder: wrapTransactionRequest(Transactions.Order, preCreateOrderAsync, postCreateOrder, (postParams) => {
        return fetch('/orderbook', postParams);
    }) as TTransactionRequest,

    cancelOrder: generateCancelLikeRequest('cancel'),

    deleteOrder: generateCancelLikeRequest('delete')

};
