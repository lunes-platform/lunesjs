import { IAPIBalanceOptions } from '../../../../interfaces';

import { detailedWavesBalanceSchema, aliasesByAddressSchema, assetBalancesSchema } from './addresses.x';
import { WAVES, WAVES_PROPS } from '../../../constants';
import Money from '../../../classes/Money';

/** TEMPORARY MOCKS */
import v1Addresses from '../v1/addresses';
import v1Aliases from '../v1/aliases';
import v1Assets from '../v1/assets';
import _filters from './_filters';
import _frame from './_frame';
import _warn from './_warn';


export default {

    get(address) {

        _warn();

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

    },

    balances(address, options: IAPIBalanceOptions = {}) {

        _warn();

        const wavesBalance = v1Addresses.balance(address).then((data) => {
            return Money.fromCoins(String(data.balance), WAVES).then((money) => {
                return [{
                    ...WAVES_PROPS,
                    amount: money
                }];
            });
        });

        const assetBalances = v1Assets.balances(address).then((data) => {
            return assetBalancesSchema.parse(data).then((balances) => {
                return balances.sort((a, b) => a.id > b.id ? -1 : 1);
            });
        });

        return Promise.all([wavesBalance, assetBalances])
            .then((results) => [...results[0], ...results[1]])
            .then((array) => {

                if (options.assets) {
                    array = array.filter(_filters.assets(options.assets));
                }

                return _frame(array, options.offset, options.limit);

            });

    }

};
