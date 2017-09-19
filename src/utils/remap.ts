import { IHash } from '../../interfaces';
import * as constants from '../constants';


export function normalizeAssetId(original) {
    if (!original || original === constants.WAVES) {
        return '';
    } else {
        return original;
    }
}

export function denormalizeAssetId(original) {
    if (!original) {
        return constants.WAVES;
    } else {
        return original;
    }
}

export function removeRecipientPrefix(original) {
    if (original.slice(0, 8) === 'address:') {
        return original.slice(8);
    } else {
        return original;
    }
}

export function removeAliasPrefix(original) {
    if (original.slice(0, 6) === 'alias:') {
        return original.slice(8); // Mind the network byte characters
    } else {
        return original;
    }
}

export function getTimestamp(timestamp) {
    return timestamp || Date.now();
}

export function precisionCheck(precision) {
    return (precision >= 0 && precision <= 8);
}

export function createRemapper(rules) {

    return function (data: IHash<any>): IHash<any> {

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
