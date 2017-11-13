import v1Transactions from '../v1/transactions';
import { siftTransaction } from '../../schemaTools';


export default {

    get(id: string) {
        return v1Transactions.get(id).then(siftTransaction);
    }

};
