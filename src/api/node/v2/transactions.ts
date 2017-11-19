import v1Transactions from '../v1/transactions';
import { siftTransaction } from '../../schemaTools';
import { CANCEL_LEASING_TX_NAME } from '../../../constants';


export default {

    get(id: string) {
        return v1Transactions.get(id)
            .then(siftTransaction)
            .then((transaction) => {
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
            });
    }

};
