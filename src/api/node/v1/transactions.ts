import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


export default {

    getList(address: string, limit: number = 50) {
        return fetch(`/transactions/address/${address}/limit/${limit}`);
    }

};
