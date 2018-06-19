import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../utils/request';
import addresses from './addresses';
import * as constants from '../../constants';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


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
    }

};
