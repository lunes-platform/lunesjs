import v1Transactions from './v1/transactions';


export interface INodeAPIv1 {
    transactions: {
        getList(address: string): Promise<any>;
    }
}


export const v1: INodeAPIv1 = {
    transactions: v1Transactions
};
