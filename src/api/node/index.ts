import { IAPIBalanceOptions, IAPITransactionsOptions, IHash, IKeyPair } from '../../../interfaces';

import v1Addresses from './v1/addresses';
import v1Aliases from './v1/aliases';
import v1Assets from './v1/assets';
import v1Blocks from './v1/blocks';
import v1Leasing from './v1/leasing';
import v1Transactions from './v1/transactions';

import v2Addresses from './v2/addresses';
import v2Aliases from './v2/aliases';
import v2Transactions from './v2/transactions';


export interface INodeAPIv1 {
    addresses: {
        balance(address: string, confirmations?: number): Promise<any>;
        balanceDetails(address: string): Promise<any>;
    },
    aliases: {
        byAlias(alias: string): Promise<any>;
        byAddress(address: string): Promise<any>;
        createAlias(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
    },
    assets: {
        balances(address: string): Promise<any>;
        balance(address: string, assetId: string): Promise<any>;
        distribution(assetId: string): Promise<any>;
        issue(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        transfer(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        reissue(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        burn(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
    },
    blocks: {
        get(signature: string): Promise<any>;
        at(height: number): Promise<any>;
        first(): Promise<any>;
        last(): Promise<any>;
        height(): Promise<any>;
    },
    leasing: {
        lease(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        cancelLeasing(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        getAllActiveLeases(address: string): Promise<any>;
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
    aliases: v1Aliases,
    assets: v1Assets,
    blocks: v1Blocks,
    leasing: v1Leasing,
    transactions: v1Transactions
};


export interface INodeAPIv2 {
    addresses: {
        get(address: string): Promise<any>;
        balance(address: string, asset: string): Promise<any>;
        balances(address: string, options: IAPIBalanceOptions): Promise<any>;
        transactions(address: string, options: IAPITransactionsOptions): Promise<any>;
        utxTransactions(address: string): Promise<any>;
        aliasList(address: string): Promise<any>;
        activeLeaseTransactions(address: string): Promise<any>;
    },
    aliases: {
        getAddress(alias: string): Promise<any>;
    },
    transactions: {
        get(id: string): Promise<any>;
        utxGet(id: string): Promise<any>;
    }
}

export const v2: INodeAPIv2 = {
    addresses: v2Addresses,
    aliases: v2Aliases,
    transactions: v2Transactions
};
