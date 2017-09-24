import { detailedWavesBalanceSchema, aliasesByAddressSchema } from './addresses.x';

/** TEMPORARY MOCKS */
import v1Addresses from '../v1/addresses';
import v1Aliases from '../v1/aliases';


export default {

    get(address) {

        const balanceDetails = v1Addresses.balanceDetails(address).then((data) => {
            return detailedWavesBalanceSchema.parse(data);
        });

        const aliasesByAddress = v1Aliases.byAddress(address).then((data) => {
            return aliasesByAddressSchema.parse(data);
        });

        return Promise.all([balanceDetails, aliasesByAddress]).then((results) => {
            return {
                wavesBalance: results[0],
                aliases: results[1]
            };
        });

    }

};
