import { IHash, IKeyPair } from '../../../interfaces';

import v1Addresses from './v1/addresses';
import v1Aliases from './v1/aliases';
import v1Assets from './v1/assets';
import v1Blocks from './v1/blocks';
import v1Leasing from './v1/leasing';
import v1Transactions from './v1/transactions';


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
        issue(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        transfer(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
        reissue(data: IHash<any>, keyPair: IKeyPair): Promise<any>;
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
