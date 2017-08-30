import { IHash } from '../../../interfaces';


export function handleAssetId(original) {
    if (original === 'WAVES') {
        return '';
    } else {
        return original;
    }
}

export function handleRecipient(original) {
    if (original.slice(0, 8) === 'address:') {
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
                // Process with a function
                result[key] = rule(data[key]);
            } else if (typeof rule === 'string') {
                // Rename a field
                result[rule] = data[key];
            } else if (rule !== null) {
                // Leave as is
                result[key] = data[key];
            }

            return result;

        }, {});

    };

}
