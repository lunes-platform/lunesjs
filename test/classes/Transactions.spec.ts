import { expect } from '../_helpers/getChai';
import { deterministicSign } from '../_helpers/deterministicSign';
import base58 from '../../src/libs/base58';
import * as WavesAPI from '../../dist/waves-api.min';


function checkBasicCases(preparedData, data, txType, expectedSignature) {

    expect(preparedData.transactionType).to.equal(txType);
    expect(preparedData.signature).to.equal(expectedSignature);

    const newKeys = Object.keys(preparedData).sort();
    const stableKeys = ['transactionType', ...Object.keys(data), 'signature'].sort();
    expect(newKeys).to.deep.equal(stableKeys);

}


let Waves;
let Transactions;

let keys;

let issueDataJson;
let transferDataJson;
let reissueDataJson;
let burnDataJson;
let createAliasDataJson;
let leaseDataJson;
let cancelLeasingDataJson;

let tempSignDataMethod;


describe('Transactions', function () {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        Transactions = Waves.Transactions;

        keys = {
            publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
            privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
        };

        issueDataJson = {
            senderPublicKey: keys.publicKey,
            name: 'БАБЛОС',
            description: 'Some english words немного кириллических символов',
            quantity: 10000000000,
            precision: 2,
            reissuable: true,
            fee: 100000000,
            timestamp: 1478704158292
        };

        transferDataJson = {
            senderPublicKey: keys.publicKey,
            recipient: '3N9UuGeWuDt9NfWbC5oEACHyRoeEMApXAeq',
            assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
            amount: 1000,
            feeAssetId: 'WAVES',
            fee: 100000,
            attachment: '',
            timestamp: 1478864678621
        };

        reissueDataJson = {
            senderPublicKey: keys.publicKey,
            assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
            quantity: 100000000,
            reissuable: false,
            fee: 100000000,
            timestamp: 1478868177862
        };

        burnDataJson = {
            senderPublicKey: keys.publicKey,
            assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
            quantity: 200000000,
            fee: 100000,
            timestamp: 1478864678621
        };

        createAliasDataJson = {
            senderPublicKey: keys.publicKey,
            alias: 'sasha',
            fee: 1000000,
            timestamp: 1491556329420
        };

        leaseDataJson = {
            senderPublicKey: keys.publicKey,
            recipient: '3MsiHfvFVUULdn8bpVoDQ7JLKKjtPXUrCLT',
            amount: 200000000,
            fee: 1000000,
            timestamp: 1491491715188
        };

        cancelLeasingDataJson = {
            senderPublicKey: keys.publicKey,
            transactionId: '4X85MhqxukwaPqJC4sSSeN3ptSYHbEca7KgiYtUa2ECX',
            fee: 10000000,
            timestamp: 1491491734819
        };

        tempSignDataMethod = Waves.crypto.buildTransactionSignature;
        Waves.crypto.buildTransactionSignature = deterministicSign;

    });

    afterEach(() => {
        Waves.crypto.buildTransactionSignature = tempSignDataMethod;
    });

    it('should sign Issue transaction', function (done) {

        const data = { ...issueDataJson };

        const issueTransaction = new Transactions.IssueTransaction(data);

        const expectedSignature = '5ngquur4nqX1cVPK3Zaf9KqY1qNH6i7gF5EhaWeS8mZp1LADTVuPXmNUi12jeXSniGry5a7ThsMtWcC73pSU196o';

        const api = issueTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.ISSUE_TX_NAME, expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Transfer transaction', function (done) {

        const data = { ...transferDataJson };

        const transferTransaction = new Transactions.TransferTransaction(data);

        const expectedSignature = '677UVgKBAVZdweVbn6wKhPLP9UxVSh3x4fBXPgepKoHtsV9nSd8HXBMxCdsYn41g3EE63bcihnUHwhXoSu9GZTLf';

        const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
            expect(preparedData.recipient).to.equal('address:' + data.recipient);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Transfer transaction with alias', function (done) {

        const alias = 'sasha';
        const data = { ...transferDataJson, recipient: alias };

        const transferTransaction = new Transactions.TransferTransaction(data);

        const expectedSignature = '2XJAHpRXx12AvdwcDF2HMpTDxffKkmN9qK7r3jZaVExYVjDaciRszymkGXy5QZExz6McYwDf6gicD4XZswJGKAZW';

        const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
            expect(preparedData.recipient).to.equal('alias:' + String.fromCharCode(Waves.config.getNetworkByte()) + ':' + data.recipient);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Transfer transaction with attachment', function (done) {

        const attachment = '123';
        const attachmentBytes = [49, 50, 51];
        const data = { ...transferDataJson, attachment };

        const transferTransaction = new Transactions.TransferTransaction(data);

        const expectedSignature = 'TrgV7V7meddPs7aU9ZemrCXNVQ8h35cERTBNfvbtVqURbgRS1fnEmzELMAxvqeYrHF6sYiJJ4oc3v4tEZQbn5qD';

        const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
            expect(preparedData.attachment).to.equal(base58.encode(attachmentBytes));
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Reissue transaction', function (done) {

        const data = { ...reissueDataJson };

        const reissueTransaction = new Transactions.ReissueTransaction(data);

        const expectedSignature = '4G81NzgHDwXdjqANGE2qxZrC5VpDA7ek3Db8v3iqunpkrXgAy7KBJgdHWUw1TEDBNewtjMJTvB9Po55PZ5d6ztCk';

        const api = reissueTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.REISSUE_TX_NAME, expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Burn transaction', function (done) {

        const data = { ...burnDataJson };

        const burnTransaction = new Transactions.BurnTransaction(data);

        const expectedSignature = 'PZZPkM8zhN96fk3nsrozehYNztB9HkD48GY6zZ6DPnLkQYHYXtZ4qER3qLjxSrALeinkqrDariNzUCUbbvBrtRC';

        const api = burnTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.BURN_TX_NAME, expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Create Alias transaction', function (done) {

        const data = { ...createAliasDataJson };

        const createAliasTransaction = new Transactions.CreateAliasTransaction(data);

        const expectedSignature = '2fDkcUaPrQjtL1Tfox1ikqfZWA7LkvWKrGZNaxJx98dmeLoopkwvAFa9nMJLww9PERGuQovfv8g9EPM6HkV5VPaH';

        const api = createAliasTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.CREATE_ALIAS_TX_NAME, expectedSignature);
        });

        const signature = createAliasTransaction.getSignature(keys.privateKey).then((signature) => {
            expect(signature).to.equal(expectedSignature);
        });

        const bytesByName = createAliasTransaction.getExactBytes('senderPublicKey').then((bytes) => {
            expect(bytes).to.deep.equal(base58.decode(data.senderPublicKey));
        });

        // Should throw when bytes of a non-existing field are requested
        expect(() => createAliasTransaction.getExactBytes('test')).to.throw();

        Promise.all([api, signature, bytesByName]).then(() => done());

    });

    it('should sign Lease transaction', function (done) {

        const data = { ...leaseDataJson };

        const leaseTransaction = new Transactions.LeaseTransaction(data);

        const expectedSignature = '4KV99VcLG51uej8tcdJBwcc3Kj2tCAxwT7JNwycxNQzAGURxcyo2XhmMTWiD1gVqs4GhkAYHGrjsBR2CJcdU5X6Z';

        const api = leaseTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.LEASE_TX_NAME, expectedSignature);
            expect(preparedData.recipient).to.equal('address:' + data.recipient);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Lease transaction with alias', function (done) {

        const alias = 'test alias';
        const data = { ...leaseDataJson, recipient: alias };

        const leaseTransaction = new Transactions.LeaseTransaction(data);

        const expectedSignature = 'HuKk26pPjxusLhch6ehwbFeBc8iiMuKd2pzwhwTf5rEFqSyyUiU3ChpVw3w86daRPMPkVUNkf6b9SmTetFgGxXy';

        const api = leaseTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.LEASE_TX_NAME, expectedSignature);
            expect(preparedData.recipient).to.equal('alias:' + String.fromCharCode(Waves.config.getNetworkByte()) + ':' + data.recipient);
        });

        Promise.all([api]).then(() => done());

    });

    it('should sign Cancel Leasing transaction', function (done) {

        const data = { ...cancelLeasingDataJson };

        const cancelLeasingTransaction = new Transactions.CancelLeasingTransaction(data);

        const expectedSignature = '2AcYC2TtpHRVhqN4V9cZADDz7bA2f4PVqoisBULYUn39t73jkE5fEpRZFEKgJiBU8NSPqcww9Qt7aY7VeSqpDVcW';

        const api = cancelLeasingTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
            checkBasicCases(preparedData, data, Waves.constants.CANCEL_LEASING_TX_NAME, expectedSignature);
        });

        Promise.all([api]).then(() => done());

    });

});
