import * as constants from '../constants';
import * as txSchemas from './schema.transactions';


// Get v2 transaction from v1 transaction object
export function siftTransaction(tx): Promise<any> {
    switch (tx.type) {
        case constants.ISSUE_TX:
            return txSchemas.issueTransactionSchema.parse(tx);
        case constants.TRANSFER_TX:
            return txSchemas.transferTransactionSchema.parse(tx);
        case constants.REISSUE_TX:
            return txSchemas.reissueTransactionSchema.parse(tx);
        case constants.BURN_TX:
            return txSchemas.burnTransactionSchema.parse(tx);
        case constants.EXCHANGE_TX:
            return txSchemas.exchangeTransactionSchema.parse(tx);
        case constants.LEASE_TX:
            return txSchemas.leaseTransactionSchema.parse(tx);
        case constants.CANCEL_LEASING_TX:
            return txSchemas.cancelLeasingTransactionSchema.parse(tx);
        case constants.CREATE_ALIAS_TX:
            return txSchemas.createAliasTransactionSchema.parse(tx);
        case constants.MASS_TRANSFER_TX:
            return txSchemas.massTransferTransactionSchema.parse(tx);
        default:
            return Promise.resolve({
                type: 'unknown',
                originalTx: tx
            });
    }
}
