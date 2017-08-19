import getWavesAPI from '../src/WavesAPI';
import { expect } from './_helpers/getChai';
import { deterministicSignData } from './_helpers/deterministicSignData';
import crypto from '../src/utils/crypto';
import { DEFAULT_TESTNET_CONFIG } from '../src/constants';
import base58 from '../src/libs/base58';


function checkBasicCases(preparedData, data, txType, expectedSignature) {

    expect(preparedData.transactionType).to.equal(txType);
    expect(preparedData.signature).to.equal(expectedSignature);

    const newKeys = Object.keys(preparedData).sort();
    const stableKeys = ['transactionType', ...Object.keys(data), 'signature'].sort();
    expect(newKeys).to.deep.equal(stableKeys);

}


const waves = getWavesAPI(DEFAULT_TESTNET_CONFIG);

const {
    TransferData,
    CreateAliasData
} = waves.TransactionData;

const keys = {
    publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
    privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
};

const transferData = {
    publicKey: keys.publicKey,
    recipient: '3N9UuGeWuDt9NfWbC5oEACHyRoeEMApXAeq',
    assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
    amount: 1000,
    feeAssetId: 'WAVES',
    fee: 100000,
    attachment: '',
    timestamp: 1478864678621
};

const createAliasData = {
    publicKey: keys.publicKey,
    alias: 'sasha',
    fee: 1000000,
    timestamp: 1491556329420
};


describe('TransactionData', function () {

    let tempSignData;

    beforeEach(() => {
        tempSignData = crypto.buildTransactionSignature;
        crypto.buildTransactionSignature = deterministicSignData;
    });

    afterEach(() => {
        crypto.buildTransactionSignature = tempSignData;
    });

    it('should sign Transfer transaction', function (done) {

        const data = transferData;

        const transferRequest = new TransferData(data);

        const expectedSignature = '677UVgKBAVZdweVbn6wKhPLP9UxVSh3x4fBXPgepKoHtsV9nSd8HXBMxCdsYn41g3EE63bcihnUHwhXoSu9GZTLf';

        const api = transferRequest.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, 'transfer', expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Transfer transaction with alias', function (done) {

        const alias = 'sasha';
        const data = { ...transferData, recipient: alias };

        const transferRequest = new TransferData(data);

        const expectedSignature = '2XJAHpRXx12AvdwcDF2HMpTDxffKkmN9qK7r3jZaVExYVjDaciRszymkGXy5QZExz6McYwDf6gicD4XZswJGKAZW';

        const api = transferRequest.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, 'transfer', expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Transfer transaction with attachment', function (done) {

        const attachment = '123';
        const attachmentBytesWithLength = [0, 3, 49, 50, 51];
        const data = { ...transferData, attachment };

        const transferRequest = new TransferData(data);

        const expectedSignature = 'TrgV7V7meddPs7aU9ZemrCXNVQ8h35cERTBNfvbtVqURbgRS1fnEmzELMAxvqeYrHF6sYiJJ4oc3v4tEZQbn5qD';

        const api = transferRequest.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, 'transfer', expectedSignature);
            expect(preparedData.attachment).to.equal(base58.encode(attachmentBytesWithLength));
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Create Alias transaction', function (done) {

        const data = createAliasData;

        const createAliasRequest = new CreateAliasData(data);

        const expectedSignature = '2fDkcUaPrQjtL1Tfox1ikqfZWA7LkvWKrGZNaxJx98dmeLoopkwvAFa9nMJLww9PERGuQovfv8g9EPM6HkV5VPaH';

        const api = createAliasRequest.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, 'createAlias', expectedSignature);
        });

        const signature = createAliasRequest.getSignature(keys.privateKey).then((signature) => {
            expect(signature).to.equal(expectedSignature);
        });

        const bytesByName = createAliasRequest.getExactBytes('publicKey').then((bytes) => {
            expect(bytes).to.deep.equal(base58.decode(data.publicKey));
        });

        Promise.all([api, signature, bytesByName]).then(() => done());

    });

});
