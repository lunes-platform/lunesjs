import { IHash, IWavesConfig } from '../interfaces';
import { ITransactionClassConstructor } from './classes/Transactions';

import Currency from './classes/Currency';
import Seed from './classes/Seed';
import Transactions from './classes/Transactions';

import * as NodeAPI from './api/node/index';
import { INodeAPIv1 } from './api/node/index';

import * as constants from './constants';
import config from './config';
import tools from './tools';


export interface IAPIVersions {
    Node: {
        v1: INodeAPIv1
    }
}

export interface IWavesAPI {
    Currency: any;
    Seed: typeof Seed;
    Transactions: IHash<ITransactionClassConstructor>;
    constants: IHash<any>;
    tools: IHash<any>;
    API: IAPIVersions;
    setConfig(config: IWavesConfig): void;
}


class WavesAPI implements IWavesAPI {

    public readonly Currency = Currency;
    public readonly Seed = Seed;
    public readonly Transactions = Transactions;

    public readonly constants = constants;
    public readonly tools = tools;

    public readonly API = {
        Node: {
            v1: NodeAPI.v1
        }
    };

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
