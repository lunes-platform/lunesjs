function Currency(props) {

    if (!props.id && props.id !== '' || !props.name) {
        throw new Error(`An attempt to create Currency without required fields`);
    }

    if (typeof props.precision !== `number` || props.precision < 0 || props.precision > 8) {
        throw new Error(`An attempt to create Currency with wrong precision (${props.precision})`);
    }

    this.id = props.id;
    this.name = props.name;
    this.shorthand = props.shorthand || props.name;
    this.symbol = props.symbol || this.shorthand;
    this.precision = props.precision;
    this.verified = props.verified || false;

}

let storage = Object.create(null);

export default {

    create: function (props) {
        if (storage[props.id]) {
            return storage[props.id];
        } else {
            const currency = new Currency(props);
            storage[props.id] = Object.freeze(currency);
            return storage[props.id];
        }
    },

    getKnownCurrencies: function () {
        return Object.keys(storage).map(function (key) {
            return storage[key];
        });
    },

    isCurrency: function (object) {
        return object instanceof Currency;
    },

    clearCache: function () {
        storage = Object.create(null);
    }

};
