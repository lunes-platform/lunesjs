import { IHash, IWavesConfig } from '../interfaces';
import { ITransactionClassConstructor } from './classes/Transactions';

import BigNumberLibrary from './libs/bignumber';

import Asset from './classes/Asset';
import AssetPair from './classes/AssetPair';
import Money from './classes/Money';
import OrderPrice from './classes/OrderPrice';
import Seed from './classes/Seed';
import Transactions from './classes/Transactions';

import * as byteProcessors from './classes/ByteProcessor';

import crypto from './utils/crypto';
import * as request from './utils/request';
import * as storage from './utils/storage';

import * as NodeAPI from './api/node/index';
import { INodeAPIv1, INodeAPIv2 } from './api/node/index';

import * as MatcherAPI from './api/matcher/index';
import { IMatcherAPIv1 } from './api/matcher/index';

import * as constants from './constants';
import config from './config';
import tools from './tools';


export interface IAPIVersions {
    Node: {
        v1: INodeAPIv1,
        v2: INodeAPIv2
    },
    Matcher: {
        v1: IMatcherAPIv1
    }
}

export interface IWavesAPI {
    Asset: any;
    AssetPair: any;
    Money: any;
    OrderPrice: any;
    Seed: typeof Seed;
    Transactions: IHash<ITransactionClassConstructor | Function>;
    byteProcessors: typeof byteProcessors;
    constants: IHash<any>;
    crypto: IHash<any>;
    request: IHash<any>;
    storage: IHash<any>;
    tools: IHash<any>;
    API: IAPIVersions;
}


class WavesAPI implements IWavesAPI {

    public readonly Asset = Asset;
    public readonly AssetPair = AssetPair;
    public readonly Money = Money;
    public readonly OrderPrice = OrderPrice;
    public readonly Seed = Seed;
    public readonly Transactions = Transactions;

    public readonly byteProcessors = byteProcessors;

    public readonly config = config;
    public readonly constants = constants;
    public readonly crypto = crypto;
    public readonly request = request;
    public readonly storage = storage;
    public readonly tools = tools;

    public readonly API = {
        Node: {
            v1: NodeAPI.v1,
            v2: NodeAPI.v2
        },
        Matcher: {
            v1: MatcherAPI.v1
        }
    };

    private static _instance;

    constructor(initialConfiguration) {

        if (this instanceof WavesAPI) {

            this.config.clear();
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


export const BigNumber = BigNumberLibrary;

export function create(config: IWavesConfig): IWavesAPI {
    return new WavesAPI(config);
}

export const MAINNET_CONFIG: IWavesConfig = constants.DEFAULT_MAINNET_CONFIG;
export const TESTNET_CONFIG: IWavesConfig = constants.DEFAULT_TESTNET_CONFIG;
