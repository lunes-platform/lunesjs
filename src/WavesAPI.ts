import { IWavesAPI } from './interfaces';
import Currency from './classes/Currency';
import Transactions from './classes/Transactions';
import * as constants from './constants';
import config from './config';


class WavesAPI implements IWavesAPI {

    public readonly constants = constants;

    public readonly v1 = {};

    public readonly Currency = Currency;
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


export default function (config): IWavesAPI {
    return new WavesAPI(config);
};
