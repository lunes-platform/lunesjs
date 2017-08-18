import { ByteProcessor, Alias, Base58, Long, AssetId } from './ByteProcessor';
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

            // Transform data so it could match the API requirements
            const schemedData = apiSchema ? this.castToAPISchema(this.rawData) : this.rawData;

            // Sign data and extend the resulting object with signature and transaction type
            return this.getSignature(privateKey).then((signature) => ({
                transactionType: txType,
                ...schemedData,
                signature
            }));

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

        private castToAPISchema(data): object {

            return Object.keys(apiSchema).reduce((result, key) => {

                const rule = apiSchema[key];

                if (rule.from === 'bytes' && rule.to === 'base58') {
                    result[key] = base58.encode(this.getExactBytes(key));
                }

                return result;

            }, { ...data });

        }

    }

    return DataTypeClass;

}


export default {

    CreateAliasData: createRequestDataType('createAlias', [
        constants.CREATE_ALIAS_TX,
        new Base58('publicKey'),
        new Alias('alias'),
        new Long('fee'),
        new Long('timestamp')
    ])

};
