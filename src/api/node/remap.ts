import { IHash } from '../../../interfaces';


export function handleAssetId(original) {
    if (original === 'WAVES') {
        return '';
    } else {
        return original;
    }
}

export function handleRecipient(original) {
    if (original.slice(0, 8) === 'address:' || original.slice(0, 6) === 'alias:') {
        return original.slice(8);
    } else {
        return original;
    }
}

export function createRemapper(rules) {

    return function (data: IHash<any>) {

        return Object.keys(data).reduce((result, key) => {

            const rule = rules[key];

            if (typeof rule === 'function') {
                result[key] = rule(data[key]);
            } else if (rule !== null) {
                result[key] = data[key];
            }

            return result;

        }, {});

    };

}
