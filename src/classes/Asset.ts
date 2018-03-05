import { IAssetObject, IHash } from '../../interfaces';

import { getStorage } from '../utils/storage';
import { WAVES_PROPS } from '../constants';
import config from '../config';

/** TEMPORARY MOCKS */
import { v1 as NodeAPIv1 } from '../api/node/index';


function getAssetProps(id): Promise<IAssetObject> {
    return NodeAPIv1.transactions.get(id).then((assetTransaction) => ({
        id: id,
        name: assetTransaction.name,
        precision: assetTransaction.decimals,
        description: assetTransaction.description || ''
    }));
}

function checkAssetProps(props) {

    if (!props.id) {
        throw new Error('An attempt to create Asset without ID');
    }

    if (!props.name) {
        throw new Error('An attempt to create Asset without a name');
    }

    if (typeof props.precision !== 'number' || props.precision < 0 || props.precision > 8) {
        throw new Error(`An attempt to create Asset with wrong precision (${props.precision})`);
    }

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
        return Asset._factory(WAVES_PROPS).then((wavesAsset) => {
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

    public static get(input: IAsset | IAssetObject | string) {

        if (Asset.isAsset(input)) {

            return Promise.resolve(input);

        } else if (typeof input === 'string') {

            const id = input;
            return Asset._storage.get(id).then((asset) => {
                // TODO : move this request to the default factory method
                return asset || getAssetProps(id).then((props) => {
                    return Asset._factory(props);
                }).then((newAsset) => {
                    return Asset._storage.set(newAsset.id, newAsset);
                });
            });

        } else {

            const props = input;
            return Asset._storage.get(props.id).then((asset) => {
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

    public static isAsset(object) {
        return object instanceof Asset;
    }

    private static _factory(props) {

        checkAssetProps(props);

        const factory = config.getAssetFactory() || Asset._defaultFactory;
        return factory(props).then((asset) => {

            if (!Asset.isAsset(asset)) {
                throw new Error(`Factory provided an object which is not a heir of Asset`);
            }

            return asset;

        });

    }

    private static _defaultFactory(props) {
        const asset = new Asset(props);
        return Promise.resolve(asset);
    }

}
