import { IHash, IKeyPair } from '../../interfaces';
import { ITransactionClassConstructor } from '../classes/Transactions';
import * as create from 'parse-json-bignumber';

import WavesRequestError from '../errors/WavesRequestError';

import fetch from '../libs/fetch';
import config from '../config';

const SAFE_JSON_PARSE = create();

export type TTransactionRequest = (data: IHash<any>, keyPair: IKeyPair) => Promise<any>;

export interface IFetchWrapper<T> {
    (path: string, options?: IHash<any>): Promise<T>;
}


export const enum PRODUCTS { NODE, MATCHER }

export const enum VERSIONS { V1 }


export const POST_TEMPLATE = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};


const key = (product, version) => {
    return `${product}/${version}`;
};

const hostResolvers: IHash<() => string> = {
    [key(PRODUCTS.NODE, VERSIONS.V1)]: () => config.getNodeAddress(),
    [key(PRODUCTS.MATCHER, VERSIONS.V1)]: () => config.getMatcherAddress()
};


export function normalizeHost(host): string {
    return host.replace(/\/+$/, '');
}

export function normalizePath(path): string {
    return `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '');
}

export function processJSON(res) {
    if (res.ok) {
        return res.text().then(SAFE_JSON_PARSE);
    } else {
        return res.json().then(Promise.reject.bind(Promise));
    }
}


function handleError(url, data) {
    throw new WavesRequestError(url, data);
}


export function createFetchWrapper(product: PRODUCTS, version: VERSIONS, pipe?: Function): IFetchWrapper<any> {

    const resolveHost = hostResolvers[key(product, version)];

    return function (path: string, options?: IHash<any>): Promise<any> {

        const url = resolveHost() + normalizePath(path);
        const request = fetch(url, options);

        if (pipe) {
            return request.then(pipe).catch((data) => handleError(url, data));
        } else {
            return request.catch((data) => handleError(url, data));
        }

    };

}

export function wrapTransactionRequest(TransactionConstructor: ITransactionClassConstructor,
                                       preRemapAsync: (data: IHash<any>) => Promise<IHash<any>>,
                                       postRemap: (data: IHash<any>) => IHash<any>,
                                       callback: (postParams: IHash<any>) => Promise<any>) {

    return function (data: IHash<any>, keyPair: IKeyPair): Promise<any> {

        return preRemapAsync({

            // The order is required for `senderPublicKey` must be rewritten if it exists in `data`
            ...data,
            senderPublicKey: keyPair.publicKey

        }).then((validatedData) => {

            const transaction = new TransactionConstructor(validatedData);

            return transaction.prepareForAPI(keyPair.privateKey)
                .then(postRemap)
                .then((tx) => {
                    return callback({
                        ...POST_TEMPLATE,
                        body: JSON.stringify(tx)
                    });
                });

        });

    };

}
