import { IAccount } from "./wallet.types";
declare class Account implements IAccount {
    privateKey: string;
    publicKey: string;
    address: string;
    chain: number;
    nonce: number;
    seed: string;
    constructor(wallet: IAccount);
}
export declare function accountFactory({ privateKey, publicKey, address, nWords, chain, nonce, seed }?: {
    privateKey?: string;
    publicKey?: string;
    address?: string;
    nWords?: number;
    chain?: number;
    nonce?: number;
    seed?: string;
}): Account;
export {};
