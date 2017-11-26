import { IAPIBalanceOptions, IAPITransactionsOptions } from '../../../../interfaces';

import * as schemas from './addresses.x';
import * as constants from '../../../constants';
import Money from '../../../classes/Money';
import { siftTransaction } from '../../schemaTools';

/** TEMPORARY MOCKS */
import v1Addresses from '../v1/addresses';
import v1Aliases from '../v1/aliases';
import v1Assets from '../v1/assets';
import v1Transactions from '../v1/transactions';

import _combiners from './_combiners';
import _filters from './_filters';
import _frame from './_frame';
import _warn from './_warn';


function getBalances(address, options) {

    // TODO : avoid unnecessary requests if the asset option is provided and Waves or any assets are not in it

    const wavesBalance = v1Addresses.balanceDetails(address).then((data) => {
        return Money.fromCoins(String(data.available), constants.WAVES).then((amount) => {
            return [{
                ...constants.WAVES_PROPS,
                amount: amount
            }];
        });
    });

    const assetBalances = v1Assets.balances(address).then((data) => {
        return schemas.assetBalancesSchema.parse(data).then((balances) => {
            return balances.sort((a, b) => a.id > b.id ? -1 : 1);
        });
    });

    return Promise.all([wavesBalance, assetBalances])
        .then((results) => [...results[0], ...results[1]])
        .then((array) => {
            if (options.assets) {
                return _combiners.balanceListByAssets(array, options.assets);
            } else {
                return _frame(array, options.offset, options.limit);
            }
        });

}


export default {

    get(address) {

        _warn();

        const balanceDetails = v1Addresses.balanceDetails(address).then((data) => {
            return schemas.detailedWavesBalanceSchema.parse(data);
        });

        const aliasesByAddress = v1Aliases.byAddress(address).then((data) => {
            return schemas.aliasesByAddressSchema.parse(data);
        });

        return Promise.all([balanceDetails, aliasesByAddress]).then((results) => {
            return {
                wavesBalance: results[0],
                aliases: results[1]
            };
        });

    },

    balance(address, asset: string) {

        _warn();

        return getBalances(address, {
            assets: [asset]
        }).then((array) => array[0]);

    },

    balances(address, options: IAPIBalanceOptions = {}) {

        _warn();

        return getBalances(address, options);

    },

    transactions(address, options: IAPITransactionsOptions = {}) {

        _warn('This method is currently able to return only 1000 last transactions');

        // TODO : this method ignores `options.offset` parameter at the moment

        return v1Transactions.getList(address, options.limit).then((array) => {

            if (options.type) {
                array = array.filter(_filters.transactionType(options.type));
            }

            if (options.sender) {
                array = array.filter(_filters.transactionSender(options.sender));
            }

            if (options.recipient) {
                array = array.filter(_filters.transactionRecipient(options.recipient));
            }

            return Promise.all(array.map(siftTransaction));

        });

    },

    utxTransactions(address) {

        _warn('This method may be switched off on the side of the Node');

        return v1Transactions.utxGetList().then((array) => {

            const filteredArray = array.filter((item) => {
                return item.sender === address || item.recipient === address;
            });

            return Promise.all(filteredArray.map(siftTransaction));

        });

    }

};
