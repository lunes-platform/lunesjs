export type TPrecision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TBuffer = Uint8Array | number[];

export type TTransactionType = 'issue' | 'transfer' | 'reissue' | 'burn' | 'exchange' | 'lease' | 'cancelLeasing' | 'createAlias';


export interface IHash<T> {
    [key: string]: T;
}

export interface IAssetObject {
    readonly id: string;
    readonly name: string;
    readonly precision: TPrecision;
    description?: string;
}

export interface IKeyPair {
    readonly privateKey: string;
    readonly publicKey: string;
}

export interface IKeyPairBytes {
    readonly privateKey: Uint8Array;
    readonly publicKey: Uint8Array;
}

export interface IWavesConfig {
    networkByte: number;
    nodeAddress: string;
    matcherAddress: string;
    minimumSeedLength: number;
}


// API interfaces

export interface IAPIOptions {
    limit?: number;
    offset?: number;
}

export interface IAPIBalanceOptions extends IAPIOptions {
    assets?: string[];
}


// Missing interfaces
declare global {
    interface Window {
        msCrypto?: any;
        Promise: PromiseConstructor;
    }
}


// Replacement for --allowJs
declare module '*.js' {
    const content: {
        [key: string]: any;
    };
    export = content;
}
