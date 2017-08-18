import getWavesAPI from '../src/WavesAPI';
import { expect } from './_helpers/getChai';
import { deterministicSignData } from './_helpers/deterministicSignData';
import crypto from '../src/utils/crypto';
import { DEFAULT_TESTNET_CONFIG } from '../src/constants';
import base58 from '../src/libs/base58';


const waves = getWavesAPI(DEFAULT_TESTNET_CONFIG);

const {
    CreateAliasData
} = waves.RequestData;

const keys = {
    publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
    privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
};

const testFullCase = function (preparedData, data, txType, expectedSignature) {
    expect(preparedData.transactionType).to.equal(txType);
    expect(preparedData.signature).to.equal(expectedSignature);
    expect(Object.keys(preparedData)).to.deep.equal(['transactionType', ...Object.keys(data), 'signature']);
};


describe('RequestData', function () {

    let tempSignData;

    beforeEach(() => {
        tempSignData = crypto.buildTransactionSignature;
        crypto.buildTransactionSignature = deterministicSignData;
    });

    afterEach(() => {
        crypto.buildTransactionSignature = tempSignData;
    });

    it('should sign Create Alias transaction', function (done) {

        const txType = 'createAlias';

        const data = {
            publicKey: keys.publicKey,
            alias: 'alias:sasha',
            fee: 1000000,
            timestamp: 1491556329420
        };

        const createAliasRequest = new CreateAliasData(data);

        const expectedSignature = 'nksY5cuiftW54BP59EgrV6bSzLAVyipyXnPLF1tF8SDT13zCRy6d745tukFZ7Qc7hZgEAWoSxdX5BkzsynhZKZR';

        const api = createAliasRequest.prepareForAPI(keys.privateKey).then((preparedData) => {
            testFullCase(preparedData, data, txType, expectedSignature);
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
