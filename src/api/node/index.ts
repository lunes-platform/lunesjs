import v1Transactions from './v1/transactions';
import v1Addresses from './v1/addresses';


export interface INodeAPIv1 {
    addresses: {
        balance(address: string, confirmations?: number): Promise<any>;
        balanceDetails(address: string): Promise<any>;
    },
    transactions: {
        get(id: string): Promise<any>;
        getList(address: string): Promise<any>;
        utxSize(): Promise<any>;
        utxGet(id: string): Promise<any>;
        utxGetList(): Promise<any>;
    }
}


export const v1: INodeAPIv1 = {
    addresses: v1Addresses,
    transactions: v1Transactions
};
