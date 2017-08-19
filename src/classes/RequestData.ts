import { ByteProcessor, Alias, Base58, Long, AssetId, MandatoryAssetId, Recipient, Attachment } from './ByteProcessor';
import crypto from '../utils/crypto';
import { concatUint8Arrays } from '../utils/concat';
import * as constants from '../constants';
import base58 from '../libs/base58';
import { IHash, IAPISchema } from '../interfaces';


function createRequestDataType(txType: string, fields: Array<ByteProcessor | number>, apiSchema?: IHash<IAPISchema>) {

    // Keys of the original data object
    const storedFields: object = Object.create(null);

    // Data bytes or functions returning data bytes via promises
    const byteProviders: Array<Function | Uint8Array> = [];

    fields.forEach((field) => {
        if (field instanceof ByteProcessor) {
            // Remember user data fields
            storedFields[field.name] = field;
            // All user data must be represented as bytes
            byteProviders.push((data) => field.process(data[field.name]));
        } else {
            // All static data must be converted to bytes as well
            byteProviders.push(Uint8Array.from([field]));
        }
    });

    class DataTypeClass {

        // Request data provided by user
        private readonly rawData: object;

        // Array of Uint8Array and promises which return Uint8Array
        private readonly dataHolders: Array<Uint8Array | Promise<Uint8Array>>;

        constructor(hashMap: any = {}) {

            // TODO : add default values for missing fields

            // Save all needed values from user data
            this.rawData = Object.keys(storedFields).reduce((store, key) => {
                store[key] = hashMap[key];
                return store;
            }, {});

            this.dataHolders = byteProviders.map((provider) => {
                if (typeof provider === 'function') {
                    // Execute function so that they return promises containing Uint8Array data
                    return provider(this.rawData);
                } else {
                    // Or just pass Uint8Array data
                    return provider;
                }
            });

        }

        public prepareForAPI(privateKey): Promise<Object> {
            // Sign data and extend its object with signature and transaction type
            return this.getSignature(privateKey).then((signature) => {
                // Transform data so it could match the API requirements
                return this.castToAPISchema(this.rawData).then((schemedData) => ({
                    transactionType: txType,
                    ...schemedData,
                    signature
                }));
            });
        }

        // Sign transaction and return only signature
        public getSignature(privateKey): Promise<string> {
            return Promise.all(this.dataHolders).then((dataBytesArray) => {
                const dataBytes = concatUint8Arrays(...dataBytesArray);
                return crypto.buildTransactionSignature(dataBytes, privateKey);
            });
        }

        // Get bytes of a field from user data
        public getExactBytes(fieldName): Promise<Uint8Array> {

            if (!(fieldName in storedFields)) {
                throw new Error(`There is no field '${fieldName}' in '${txType} RequestDataType class.`);
            }

            const byteProcessor = storedFields[fieldName];
            const userData = this.rawData[fieldName];
            return byteProcessor.process(userData);

        }

        private castToAPISchema(data): Promise<object> {

            if (!apiSchema) return Promise.resolve({ ...data });

            // Generate an array of promises wielding the schemed data
            const transforms = Object.keys(apiSchema).map((key) => {

                const rule = apiSchema[key];

                // The only one transformation type for now
                if (rule.from === 'bytes' && rule.to === 'base58') {
                    return this.getExactBytes(key).then((bytes) => {
                        return { [key]: base58.encode(bytes) };
                    });
                }

            });

            return Promise.all(transforms).then((schemedParts) => {
                return schemedParts.reduce((result, part) => {
                    return { ...result, ...part };
                }, { ...data });
            });

        }

    }

    return DataTypeClass;

}


export default {

    TransferData: createRequestDataType('transfer', [
        constants.TRANSFER_TX,
        new Base58('publicKey'),
        new AssetId('assetId'),
        new AssetId('feeAssetId'),
        new Long('timestamp'),
        new Long('amount'),
        new Long('fee'),
        new Recipient('recipient'),
        new Attachment('attachment')
    ], {
        attachment: {
            from: 'bytes',
            to: 'base58'
        }
    }),

    CreateAliasData: createRequestDataType('createAlias', [
        constants.CREATE_ALIAS_TX,
        new Base58('publicKey'),
        new Alias('alias'),
        new Long('fee'),
        new Long('timestamp')
    ])

};
