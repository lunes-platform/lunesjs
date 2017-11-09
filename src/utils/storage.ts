import { IHash } from '../../interfaces';

import config from '../config';


export interface IStorage {
    get(key: string): Promise<any>;
    getAll(): Promise<IHash<any>>;
    getList(): Promise<Array<any>>;
    set(key: string, value: any): Promise<typeof value>;
    clear(): Promise<void>;
}

class Storage implements IStorage {

    private _init: Function;
    private _storages: IHash<IHash<any>>;

    public get currentStorage() {
        return this._resolveStorage();
    }

    constructor(init?) {
        this._init = init;
        this._storages = Object.create(null);
    }

    public get(key) {
        return Promise.resolve(this.currentStorage[key] || null);
    }

    public getAll() {
        return Promise.resolve({ ...this.currentStorage });
    }

    public getList() {
        return this.getAll().then((storage) => {
            const list = Object.keys(storage).map((key) => storage[key]);
            return Promise.resolve(list);
        });
    }

    public set(key, value) {
        this.currentStorage[key] = value;
        return Promise.resolve(value);
    }

    public clear() {
        this._storages = Object.create(null);
        return Promise.resolve(null);
    }

    private _resolveStorage() {

        const network = config.getNetworkByte();

        if (!this._storages[network]) {
            this._storages[network] = Object.create(null);
            this._init && this._init((key, value) => {
                this._storages[network][key] = value;
            });
        }

        return this._storages[network];

    }

}


export function getStorage(init?): IStorage {
    return new Storage(init);
}
