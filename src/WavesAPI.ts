import { IHash, IWavesConfig } from '../interfaces';
import { ITransactionClassConstructor } from './classes/Transactions';

import Currency from './classes/Currency';
import Seed from './classes/Seed';
import Transactions from './classes/Transactions';

import * as NodeAPI from './api/node/index';
import { INodeAPIv1 } from './api/node/index';

import * as constants from './constants';
import config from './config';


export interface IWavesAPI {
    API: any;
    Currency: any;
    Seed: typeof Seed;
    Transactions: IHash<ITransactionClassConstructor>;
    setConfig(config: IWavesConfig): void;
}

export interface IAPIVersions {
    Node: {
        v1: INodeAPIv1
    }
}


class WavesAPI implements IWavesAPI {

    public readonly constants = constants;

    public readonly API: IAPIVersions = {
        Node: {
            v1: NodeAPI.v1
        }
    };

    public readonly Currency = Currency;
    public readonly Seed = Seed;
    public readonly Transactions = Transactions;

    private static _instance;

    constructor(initialConfiguration) {

        if (this instanceof WavesAPI) {

            this.setConfig(initialConfiguration);

            if (WavesAPI._instance === null) {
                WavesAPI._instance = this;
            } else {
                return WavesAPI._instance;
            }

        } else {

            return new WavesAPI(initialConfiguration);

        }

    }

    public setConfig(newConfiguration) {
        config.set(newConfiguration);
    }

}


export function create(config: IWavesConfig): IWavesAPI {
    return new WavesAPI(config);
}

export const MAINNET_CONFIG: IWavesConfig = constants.DEFAULT_MAINNET_CONFIG;
export const TESTNET_CONFIG: IWavesConfig = constants.DEFAULT_TESTNET_CONFIG;
