import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../utils/request';
import * as constants from '../../constants';
import transactions from './transactions';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


export default {

    byAlias(alias: string) {
        return fetch(`/alias/by-alias/${alias}`);
    },

    byAddress(address: string) {
        return fetch(`/alias/by-address/${address}`);
    },

    createAlias: (data, keys) => transactions.broadcast(constants.CREATE_ALIAS_TX_NAME, data, keys)

};
