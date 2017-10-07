import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';
import config from '../../../config';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


export default {

    get(id: string) {
        return fetch(`/transactions/info/${id}`);
    },

    getList(address: string, limit: number = config.getRequestParams().limit) {
        return fetch(`/transactions/address/${address}/limit/${limit}`);
    },

    utxSize() {
        return fetch('/transactions/unconfirmed/size');
    },

    utxGet(id: string) {
        return fetch(`/transactions/unconfirmed/info/${id}`);
    },

    utxGetList() {
        return fetch('/transactions/unconfirmed');
    }

};
