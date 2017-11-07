import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';
import { IMoney } from '../../../classes/Money';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);

export interface IBalanceDetails {
    regular: IMoney;
    available: IMoney;
    effective: IMoney;
    generating: IMoney;
    leased: IMoney;
}


export default {

    balance(address: string, confirmations?: number) {
        if (!confirmations) {
            return fetch(`/addresses/balance/${address}`);
        } else {
            return fetch(`/addresses/balance/${address}/${confirmations}`);
        }
    },

    balanceDetails(address: string): Promise<IBalanceDetails> {
        return fetch(`/addresses/balance/details/${address}`);
    }

};
