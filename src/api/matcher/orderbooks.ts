import { IKeyPair } from '../../../interfaces';
import { TTransactionRequest } from '../../utils/request';

import { CREATE_ORDER_SIGNATURE, AUTH_ORDER_SIGNATURE, CANCEL_ORDER_SIGNATURE } from '@waves/waves-signature-generator';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON, wrapTxRequest } from '../../utils/request';
import { createRemapper, getTimestamp, normalizeAssetId } from '../../utils/remap';
import { POST_TEMPLATE } from '../../utils/request';
import { createOrderSchema } from './orderbooks.x';


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

        const data = {
            senderPublicKey: keyPair.publicKey,
            orderId: orderId
        };

        const authData = new CANCEL_ORDER_SIGNATURE(data);

        return authData.getSignature(keyPair.privateKey)
            .then((signature) => postCancelOrder({ ...data, signature }))
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

        const data = {
            senderPublicKey: keyPair.publicKey,
            timestamp: getTimestamp()
        };

        const authData = new AUTH_ORDER_SIGNATURE(data);

        return authData.getSignature(keyPair.privateKey).then((signature) => {
            const preparedData = { ...data, signature };
            return fetch(`/orderbook/${assetOne}/${assetTwo}/publicKey/${keyPair.publicKey}`, {
                headers: {
                    Timestamp: preparedData.timestamp,
                    Signature: preparedData.signature
                }
            });
        });

    },

    getAllOrders(keyPair: IKeyPair) {

        const data = {
            senderPublicKey: keyPair.publicKey,
            timestamp: getTimestamp()
        };

        const authData = new AUTH_ORDER_SIGNATURE(data);

        return authData.getSignature(keyPair.privateKey).then((signature) => {
            const preparedData = { ...data, signature };
            return fetch(`/orderbook/${keyPair.publicKey}`, {
                headers: {
                    Timestamp: preparedData.timestamp,
                    Signature: preparedData.signature
                }
            });
        });

    },

    createOrder: wrapTxRequest(CREATE_ORDER_SIGNATURE, preCreateOrderAsync, postCreateOrder, (postParams) => {
        return fetch('/orderbook', postParams);
    }) as TTransactionRequest,

    cancelOrder: generateCancelLikeRequest('cancel'),

    deleteOrder: generateCancelLikeRequest('delete')

};
