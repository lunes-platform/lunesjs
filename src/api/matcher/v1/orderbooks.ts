import { IKeyPair } from '../../../../interfaces';

import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';
import { Base58, Long } from '../../../classes/ByteProcessor';
import Transactions from '../../../classes/Transactions';


const fetch = createFetchWrapper(PRODUCTS.MATCHER, VERSIONS.V1, processJSON);

const AuthData = Transactions.createSignableData([
    new Base58('publicKey'),
    new Long('timestamp')
]);


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

    }

};
