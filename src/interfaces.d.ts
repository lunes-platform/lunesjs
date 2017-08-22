import { ByteProcessor } from './classes/ByteProcessor';
import Seed from './classes/Seed';


export type TPrecisions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TBuffer = Uint8Array | number[];

export type TTransactionFields = Array<ByteProcessor | number>;


interface IHash<T> {
    [key: string]: T;
}

export interface IAsset {
    readonly id: string;
    readonly name: string;
    readonly ticker?: string;
    readonly description?: string;
    readonly precision: TPrecisions;
    readonly verified?: boolean;
}

export interface IAPISchema {
    readonly from: 'bytes' | 'raw';
    readonly to: 'base58' | 'prefixed';
}

export interface IKeyPair {
    readonly privateKey: string;
    readonly publicKey: string;
}

export interface IKeyPairBytes {
    readonly privateKey: Uint8Array;
    readonly publicKey: Uint8Array;
}

export interface IWavesAPI {
    v1: any;
    Currency: any;
    Seed: typeof Seed;
    Transactions: IHash<any>;
    setConfig(config: any): void;
}

export interface IWavesConfig {
    networkByte: number;
    nodeAddress: string;
    matcherAddress: string;
}


declare global {
    interface Window {
        msCrypto?: any;
        Promise: PromiseConstructor;
    }
}
