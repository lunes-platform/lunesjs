import { IHash, IWavesConfig } from '../interfaces';
import { ITransactionClassConstructor } from './classes/Transactions';

import Currency from './classes/Currency';
import Money from './classes/Money';
import Seed from './classes/Seed';
import Transactions from './classes/Transactions';

import crypto from './utils/crypto';
import * as request from './utils/request';

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
    Money: any;
    Seed: typeof Seed;
    Transactions: IHash<ITransactionClassConstructor>;
    constants: IHash<any>;
    crypto: IHash<any>;
    request: IHash<any>;
    tools: IHash<any>;
    API: IAPIVersions;
}


class WavesAPI implements IWavesAPI {

    public readonly Currency = Currency;
    public readonly Money = Money;
    public readonly Seed = Seed;
    public readonly Transactions = Transactions;

    public readonly config = config;
    public readonly constants = constants;
    public readonly crypto = crypto;
    public readonly request = request;
    public readonly tools = tools;

    public readonly API = {
        Node: {
            v1: NodeAPI.v1
        }
    };

    private static _instance;

    constructor(initialConfiguration) {

        if (this instanceof WavesAPI) {

            this.config.set(initialConfiguration);

            if (WavesAPI._instance === null) {
                WavesAPI._instance = this;
            } else {
                return WavesAPI._instance;
            }

        } else {

            return new WavesAPI(initialConfiguration);

        }

    }

}


export function create(config: IWavesConfig): IWavesAPI {
    return new WavesAPI(config);
}

export const MAINNET_CONFIG: IWavesConfig = constants.DEFAULT_MAINNET_CONFIG;
export const TESTNET_CONFIG: IWavesConfig = constants.DEFAULT_TESTNET_CONFIG;
