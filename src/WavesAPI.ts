import { IWavesAPI } from './interfaces';
import Currency from './classes/Currency';
import Seed from './classes/Seed';
import Transactions from './classes/Transactions';
import * as constants from './constants';
import config from './config';


class WavesAPI implements IWavesAPI {

    public readonly constants = constants;

    public readonly v1 = {};

    public readonly Currency = Currency;
    public readonly Seed = Seed;
    public readonly Transactions = Transactions;

    private static instance;

    constructor(initialConfiguration) {

        if (this instanceof WavesAPI) {

            this.setConfig(initialConfiguration);

            if (WavesAPI.instance === null) {
                WavesAPI.instance = this;
            } else {
                return WavesAPI.instance;
            }

        } else {

            return new WavesAPI(initialConfiguration);

        }

    }

    public setConfig(newConfiguration) {
        config.set(newConfiguration);
    }

}


export function create(config): IWavesAPI {
    return new WavesAPI(config);
}

export const MAINNET_CONFIG = constants.DEFAULT_MAINNET_CONFIG;
export const TESTNET_CONFIG = constants.DEFAULT_TESTNET_CONFIG;
