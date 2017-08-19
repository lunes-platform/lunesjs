import { ByteProcessor } from './classes/ByteProcessor';


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
    readonly from: 'bytes';
    readonly to: 'base58';
}

export interface IWavesAPI {
    v1: any;
    Currency: any;
    TransactionData: any;
    setConfig(config: any): void;
}

export interface IWavesConfig {
    networkByte: number;
    nodeAddress: string;
    matcherAddress: string;
}
