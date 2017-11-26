import * as constants from '../constants';
import * as txSchemas from './schema.transactions';


// Get v2 transaction from v1 transaction object
export function siftTransaction(transaction): Promise<any> {
    switch (transaction.type) {
        case constants.ISSUE_TX:
            return txSchemas.issueTransactionSchema.parse(transaction);
        case constants.TRANSFER_TX:
            return txSchemas.transferTransactionSchema.parse(transaction);
        case constants.REISSUE_TX:
            return txSchemas.reissueTransactionSchema.parse(transaction);
        case constants.BURN_TX:
            return txSchemas.burnTransactionSchema.parse(transaction);
        case constants.EXCHANGE_TX:
            return txSchemas.exchangeTransactionSchema.parse(transaction);
        case constants.LEASE_TX:
            return txSchemas.leaseTransactionSchema.parse(transaction);
        case constants.CANCEL_LEASING_TX:
            return txSchemas.cancelLeasingTransactionSchema.parse(transaction);
        case constants.CREATE_ALIAS_TX:
            return txSchemas.createAliasTransactionSchema.parse(transaction);
        default:
            throw new Error(`Unknown transaction type encountered: ${transaction.type}`);
    }
}
