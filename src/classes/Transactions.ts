import { ByteProcessor, Alias, Base58, Bool, Long, Short, StringWithLength, AssetId, MandatoryAssetId, Recipient, Attachment } from './ByteProcessor';
import crypto from '../utils/crypto';
import { concatUint8Arrays } from '../utils/concat';
import * as constants from '../constants';
import base58 from '../libs/base58';
import config from '../config';
import { IHash, IAPISchema, TTransactionFields } from '../interfaces';


function createTransactionClass(txType: string, fields: TTransactionFields, apiSchema?: IHash<IAPISchema>) {

    // Fields of the original data object
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

    class TransactionClass {

        // Request data provided by user
        private readonly _rawData: object;

        // Array of Uint8Array and promises which return Uint8Array
        private readonly _dataHolders: Array<Uint8Array | Promise<Uint8Array>>;

        constructor(hashMap: any = {}) {

            // TODO : add default values for missing fields

            // Save all needed values from user data
            this._rawData = Object.keys(storedFields).reduce((store, key) => {
                store[key] = hashMap[key];
                return store;
            }, {});

            this._dataHolders = byteProviders.map((provider) => {
                if (typeof provider === 'function') {
                    // Execute function so that they return promises containing Uint8Array data
                    return provider(this._rawData);
                } else {
                    // Or just pass Uint8Array data
                    return provider;
                }
            });

        }

        // Process the data so it's ready for usage in API
        public prepareForAPI(privateKey): Promise<Object> {
            // Sign data and extend its object with signature and transaction type
            return this.getSignature(privateKey).then((signature) => {
                // Transform data so it could match the API requirements
                return this._castToAPISchema(this._rawData).then((schemedData) => ({
                    transactionType: txType,
                    ...schemedData,
                    signature
                }));
            });
        }

        // Sign transaction and return only signature
        public getSignature(privateKey): Promise<string> {
            return this.getBytes().then((dataBytes) => {
                return crypto.buildTransactionSignature(dataBytes, privateKey);
            });
        }

        // Get byte representation of the transaction
        public getBytes(): Promise<Uint8Array> {
            return Promise.all(this._dataHolders).then((multipleDataBytes) => {
                return concatUint8Arrays(...multipleDataBytes);
            });
        }

        // Get bytes of an exact field from user data
        public getExactBytes(fieldName): Promise<Uint8Array> {

            if (!(fieldName in storedFields)) {
                throw new Error(`There is no field '${fieldName}' in '${txType} RequestDataType class`);
            }

            const byteProcessor = storedFields[fieldName];
            const userData = this._rawData[fieldName];
            return byteProcessor.process(userData);

        }

        private _castToAPISchema(data): Promise<object> {

            if (!apiSchema) return Promise.resolve({ ...data });

            // Generate an array of promises wielding the schemed data
            const transforms: Array<Promise<object>> = Object.keys(apiSchema).map((key) => {

                const rule = apiSchema[key];

                if (rule.from === 'bytes' && rule.to === 'base58') {
                    return this._castFromBytesToBase58(key);
                }

                if (rule.from === 'raw' && rule.to === 'prefixed') {
                    return this._castFromRawToPrefixed(key);
                }

            });

            return Promise.all(transforms).then((schemedParts) => {
                return schemedParts.reduce((result, part) => {
                    return { ...result, ...part };
                }, { ...data });
            });

        }

        private _castFromBytesToBase58(key): Promise<object> {
            return this.getExactBytes(key).then((bytes) => {
                return { [key]: base58.encode(bytes) };
            });
        }

        private _castFromRawToPrefixed(key): Promise<object> {

            let type = key;
            if (type === 'recipient') {
                type = this._rawData[key].length <= 30 ? 'alias' : 'address';
            }

            let prefix;
            if (type === 'address') {
                prefix = 'address:';
            } else if (type === 'alias') {
                const networkCharacter = String.fromCharCode(config.getNetworkByte());
                prefix = 'alias:' + networkCharacter + ':';
            } else {
                throw new Error(`There is no type '${type}' to be prefixed`);
            }

            return Promise.resolve({ [key]: prefix + this._rawData[key] });

        }

    }

    return TransactionClass;

}


export default {

    TransferTransaction: createTransactionClass(constants.TRANSFER_TX_NAME, [
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
        },
        recipient: {
            from: 'raw',
            to: 'prefixed'
        }
    }),

    IssueTransaction: createTransactionClass(constants.ISSUE_TX_NAME, [
        constants.ISSUE_TX,
        new Base58('publicKey'),
        new StringWithLength('name'),
        new StringWithLength('description'),
        new Long('quantity'),
        new Short('precision'),
        new Bool('reissuable'),
        new Long('fee'),
        new Long('timestamp')
    ]),

    ReissueTransaction: createTransactionClass(constants.REISSUE_TX_NAME, [
        constants.REISSUE_TX,
        new Base58('publicKey'),
        new MandatoryAssetId('assetId'),
        new Long('quantity'),
        new Bool('reissuable'),
        new Long('fee'),
        new Long('timestamp')
    ]),

    // TODO : BurnData

    LeaseTransaction: createTransactionClass(constants.LEASE_TX_NAME, [
        constants.LEASE_TX,
        new Base58('publicKey'),
        new Recipient('recipient'),
        new Long('amount'),
        new Long('fee'),
        new Long('timestamp')
    ], {
        recipient: {
            from: 'raw',
            to: 'prefixed'
        }
    }),

    CancelLeasingTransaction: createTransactionClass(constants.CANCEL_LEASING_TX_NAME, [
        constants.CANCEL_LEASING_TX,
        new Base58('publicKey'),
        new Long('fee'),
        new Long('timestamp'),
        new Base58('transactionId')
    ]),

    CreateAliasTransaction: createTransactionClass(constants.CREATE_ALIAS_TX_NAME, [
        constants.CREATE_ALIAS_TX,
        new Base58('publicKey'),
        new Alias('alias'),
        new Long('fee'),
        new Long('timestamp')
    ], {
        alias: {
            from: 'raw',
            to: 'prefixed'
        }
    })

};
