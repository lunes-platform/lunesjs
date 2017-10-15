import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';


const fetch = createFetchWrapper(PRODUCTS.MATCHER, VERSIONS.V1, processJSON);


export default {

    getOrderbooks() {
        return fetch('/orderbook');
    },

    getOrderbook(assetOne: string, assetTwo: string) {
        return fetch(`/orderbook/${assetOne}/${assetTwo}`);
    }

};
