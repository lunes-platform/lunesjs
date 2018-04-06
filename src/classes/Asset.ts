import { IAssetObject, IHash } from '../../interfaces';

import { getStorage } from '../utils/storage';
import { WAVES_PROPS } from '../constants';
import config from '../config';

/** TEMPORARY MOCKS */
import { v1 as NodeAPIv1 } from '../api/node/index';


function getAssetProps(id: string): Promise<IAssetObject> {
    if (id === WAVES_PROPS.id) {
        return Promise.resolve(WAVES_PROPS);
    }
    return NodeAPIv1.transactions.get(id).then((assetTransaction) => ({
        id: id,
        name: assetTransaction.name,
        precision: assetTransaction.decimals,
        description: assetTransaction.description || ''
    }));
}


export interface IAsset extends IAssetObject {
    toJSON(): IHash<any>;

    toString(): string;
}

export default class Asset implements IAsset {

    public readonly id;
    public readonly name;
    public readonly precision;
    public readonly description;

    private static _storage = getStorage((set) => {
        return Asset._factory(WAVES_PROPS.id).then((wavesAsset) => {
            set(wavesAsset.id, wavesAsset);
        });
    });

    protected constructor(props: IAssetObject) {
        this.id = props.id;
        this.name = props.name;
        this.precision = props.precision;
        this.description = props.description || '';
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            precision: this.precision,
            description: this.description
        };
    }

    public toString() {
        return this.id;
    }

    public static get(input: IAsset | IAssetObject | string): Promise<IAsset> {

        if (Asset.isAsset(input)) {
            return Promise.resolve(input as IAsset);
        } else if (typeof input === 'string') {

            const id = input;
            return Asset._storage.get(id).then((asset: IAsset) => {
                return asset || Asset._factory(id).then((newAsset) => {
                    return Asset._storage.set(newAsset.id, newAsset);
                });
            });
        } else {

            const props = input;
            return Asset._storage.get(props.id).then((asset: IAsset) => {
                return asset || Asset._factory(props).then((newAsset) => {
                    return Asset._storage.set(newAsset.id, newAsset);
                });
            });
        }
    }

    public static getKnownAssets() {
        return Asset._storage.getAll();
    }

    public static getKnownAssetsList() {
        return Asset._storage.getList();
    }

    public static clearCache() {
        return Asset._storage.clear();
    }

    public static isAsset(object): boolean {
        return object instanceof Asset;
    }

    private static _factory(assetId: string | IAssetObject): Promise<IAsset> {

        const factory = config.getAssetFactory() || Asset._defaultFactory;
        return factory(assetId).then((asset: IAsset) => {

            if (!Asset.isAsset(asset)) {
                throw new Error(`Factory provided an object which is not a heir of Asset`);
            }

            return asset;
        });

    }

    private static _defaultFactory(assetId: string | IAssetObject) {
        if (typeof  assetId === 'object') {
            return Promise.resolve(new Asset(assetId));
        }
        return getAssetProps(assetId).then((props) => new Asset(props));
    }

}
