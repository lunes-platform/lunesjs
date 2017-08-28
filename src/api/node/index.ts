import v1Transactions from './v1/transactions';


export interface INodeAPIv1 {
    transactions: {
        get(id: string): Promise<any>;
        getList(address: string): Promise<any>;
        utxSize(): Promise<any>;
        utxGet(id: string): Promise<any>;
        utxGetList(): Promise<any>;
    }
}


export const v1: INodeAPIv1 = {
    transactions: v1Transactions
};
