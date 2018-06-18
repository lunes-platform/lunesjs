import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../utils/request';
import * as constants from '../../constants';
import transactions from './transactions';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


export default {

    lease: (data, keys) => transactions.broadcast(constants.LEASE_TX_NAME, data, keys),

    cancelLeasing: (data, keys) => transactions.broadcast(constants.CANCEL_LEASING_TX_NAME, data, keys),

    getAllActiveLeases(address) {
        return fetch(`/leasing/active/${address}`).then((list) => {
            return list.map((tx) => {
                tx.status = 'active';
                return tx;
            });
        });
    }

};
