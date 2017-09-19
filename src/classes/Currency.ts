import { IAsset } from '../../interfaces';

import config from '../config';
import * as constants from '../constants';


const WAVES_PROPS: IAsset = {
    id: constants.WAVES,
    name: 'Waves',
    precision: 8,
    ticker: 'WAVES'
};


class Currency {

    public readonly id;
    public readonly name;
    public readonly precision;

    public readonly description;
    public readonly ticker;

    constructor(props: IAsset) {

        if (!props.id) {
            throw new Error('An attempt to create Currency without ID');
        }

        if (!props.name) {
            throw new Error('An attempt to create Currency without a name');
        }

        if (typeof props.precision !== 'number' || props.precision < 0 || props.precision > 8) {
            throw new Error(`An attempt to create Currency with wrong precision (${props.precision})`);
        }

        this.id = props.id;
        this.name = props.name;
        this.precision = props.precision;

        this.description = props.description || '';
        this.ticker = props.ticker || this.name;

    }

}


let storages = Object.create(null);

function resolveStorage() {
    const network = config.getNetworkByte();
    if (storages[network]) {
        return storages[network];
    } else {
        storages[network] = Object.create(null);
        putCurrency(storages[network], WAVES_PROPS);
        return storages[network];
    }
}

function putCurrency(storage, currencyProps) {
    const currency = new Currency(currencyProps);
    storage[currency.id] = Object.freeze(currency);
}


export default {

    create: function (props) {
        const storage = resolveStorage();
        if (storage[props.id]) {
            return storage[props.id];
        } else {
            putCurrency(storage, props);
            return storage[props.id];
        }
    },

    getKnownCurrencies: function () {
        const storage = resolveStorage();
        return Object.keys(storage).map(function (key) {
            return storage[key];
        });
    },

    isCurrency: function (object) {
        return object instanceof Currency;
    },

    clearCache: function () {
        storages = Object.create(null);
    }

};
