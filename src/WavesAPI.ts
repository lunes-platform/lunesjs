import { IHash, IWavesConfig } from '../interfaces';

import { ByteProcessor as byteProcessors } from '@waves/waves-signature-generator';

import Seed from './classes/Seed';

import crypto from './utils/crypto';
import * as request from './utils/request';

import * as NodeAPI from './api/node/index';
import { INodeAPI } from './api/node/index';

import * as MatcherAPI from './api/matcher/index';
import { IMatcherAPI } from './api/matcher/index';

import * as constants from './constants';
import config from './config';
import tools from './tools';


export interface IAPIVersions {
    Node: INodeAPI,
    Matcher: IMatcherAPI
}

export interface IWavesAPI {
    Seed: typeof Seed;
    byteProcessors: typeof byteProcessors;
    constants: IHash<any>;
    crypto: IHash<any>;
    request: IHash<any>;
    tools: IHash<any>;
    API: IAPIVersions;
}


class WavesAPI implements IWavesAPI {

    public readonly Seed = Seed;
    public readonly byteProcessors = byteProcessors;
    public readonly config = config;
    public readonly constants = constants;
    public readonly crypto = crypto;
    public readonly request = request;
    public readonly tools = tools;

    public readonly API = {
        Node: NodeAPI,
        Matcher: MatcherAPI
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


export function create(config: IWavesConfig): IWavesAPI {
    return new WavesAPI(config);
}

export const MAINNET_CONFIG: IWavesConfig = constants.DEFAULT_MAINNET_CONFIG;
export const TESTNET_CONFIG: IWavesConfig = constants.DEFAULT_TESTNET_CONFIG;
