import { IAPIBalanceOptions, IAPITransactionsOptions } from '../../../../interfaces';

import * as schemas from './addresses.x';
import * as constants from '../../../constants';
import Money from '../../../classes/Money';

/** TEMPORARY MOCKS */
import v1Addresses from '../v1/addresses';
import v1Aliases from '../v1/aliases';
import v1Assets from '../v1/assets';
import v1Transactions from '../v1/transactions';

import _combiners from './_combiners';
import _filters from './_filters';
import _frame from './_frame';
import _warn from './_warn';


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

    balances(address, options: IAPIBalanceOptions = {}) {

        _warn();

        const wavesBalance = v1Addresses.balance(address).then((data) => {
            return Money.fromCoins(String(data.balance), constants.WAVES).then((amount) => {
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

    },

    transactions(address, options: IAPITransactionsOptions = {}) {

        _warn('This method is currently able to return only 1000 last transactions.');

        return v1Transactions.getList(address, options.limit).then((array) => {

            array = array[0]; // Strange response artifact

            if (options.type) {
                array = array.filter(_filters.transactionType(options.type));
            }

            if (options.sender) {
                array = array.filter(_filters.transactionSender(options.sender));
            }

            if (options.recipient) {
                array = array.filter(_filters.transactionRecipient(options.recipient));
            }

            return array;

        }).then((filteredArray) => {

            return Promise.all(filteredArray.map((item) => {

                switch (item.type) {
                    case constants.ISSUE_TX:
                        return schemas.issueTransactionSchema.parse(item);
                    case constants.TRANSFER_TX:
                        return schemas.transferTransactionSchema.parse(item);
                    case constants.REISSUE_TX:
                        return schemas.reissueTransactionSchema.parse(item);
                    case constants.BURN_TX:
                        return schemas.burnTransactionSchema.parse(item);
                    case constants.EXCHANGE_TX:
                        return schemas.exchangeTransactionSchema.parse(item);
                    case constants.LEASE_TX:
                        return schemas.leaseTransactionSchema.parse(item);
                    case constants.CANCEL_LEASING_TX:
                        return schemas.cancelLeasingTransactionSchema.parse(item);
                    case constants.CREATE_ALIAS_TX:
                        return schemas.createAliasTransactionSchema.parse(item);
                    default:
                        throw new Error(`Unknown transaction type encountered: ${item.type}`);
                }

            }));

        });

    }

};
