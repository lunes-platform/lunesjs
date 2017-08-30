import { IHash } from '../../interfaces';

import fetch from '../libs/fetch';
import config from '../config';


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


export function normalizePath(path): string {
    return `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '');
}

export function processJSON(jsonReadableStream) {
    return jsonReadableStream.json();
}

export function createFetchWrapper(product: PRODUCTS, version: VERSIONS, pipe?: Function) {

    const resolveHost = hostResolvers[key(product, version)];

    return function (path: string, options?: IHash<any>): Promise<any> {

        const url = resolveHost() + normalizePath(path);
        const request = fetch(url, options);

        if (pipe) {
            return request.then(pipe);
        } else {
            return request;
        }

    };

}
