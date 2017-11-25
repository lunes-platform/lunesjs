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

    private _storages: IHash<IHash<any>>;
    private _runInit: IHash<boolean>;
    private _when: Promise<any>;
    private _init: Function;

    public get currentStorage() {
        return this._resolveStorage();
    }

    constructor(init?) {
        this._storages = Object.create(null);
        this._runInit = Object.create(null);
        this._when = Promise.resolve();
        this._init = init;
    }

    public get(key) {
        return this._next(() => this.currentStorage[key] || null);
    }

    public getAll() {
        return this._next(() => ({ ...this.currentStorage }));
    }

    public getList() {
        return this.getAll().then((storage) => {
            return Object.keys(storage).map((key) => storage[key]);
        });
    }

    public set(key, value) {
        return this._next(() => {
            this.currentStorage[key] = value;
            return value;
        });
    }

    public clear() {
        return this._next(() => {
            this._storages = Object.create(null);
            this._runInit = Object.create(null);
            this._when = Promise.resolve();
        });
    }

    private _next(callback?: () => any) {

        const network = config.getNetworkByte();
        if (this._init && !this._runInit[network]) {
            this._runInit[network] = true;
            this._when = this._when.then(() => {
                return this._init((key, value) => {
                    this.currentStorage[key] = value;
                });
            });
        }

        this._when = this._when.then(callback || (() => null));
        return this._when;

    }

    private _resolveStorage() {

        const network = config.getNetworkByte();
        if (!this._storages[network]) {
            this._storages[network] = Object.create(null);
        }

        return this._storages[network];

    }

}


export function getStorage(init?): IStorage {
    return new Storage(init);
}
