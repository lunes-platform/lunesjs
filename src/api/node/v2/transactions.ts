import v1Transactions from '../v1/transactions';
import { siftTransaction } from '../../schemaTools';
import { CANCEL_LEASING_TX_NAME, WAVES, WAVES_V1_ISSUE_TX } from '../../../constants';


function extendTransaction(transaction) {
    if (transaction.transactionType === CANCEL_LEASING_TX_NAME) {
        return v1Transactions.get(transaction.leaseTransactionId)
            .then(siftTransaction)
            .then((leaseTransaction) => {
                transaction.leaseTransactionAmount = leaseTransaction.amount;
                return transaction;
            });
    } else {
        return transaction;
    }
}


export default {

    get(id: string) {
        if (id === WAVES) {
            return siftTransaction(WAVES_V1_ISSUE_TX);
        } else {
            return v1Transactions.get(id)
                .then(siftTransaction)
                .then(extendTransaction);
        }
    },

    utxGet(id: string) {
        return v1Transactions.utxGet(id)
            .then(siftTransaction)
            .then(extendTransaction);
    }

};
