import resetRequireCache from '../_helpers/resetRequireCache';
resetRequireCache('dist/waves-api.min');

import { expect } from '../_helpers/getChai';
import { mockableFetch } from '../_helpers/mockableFetch';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let AssetPair;

let fakeWAVES;
let fakeBTC;


describe('AssetPair', () => {

    beforeEach((done) => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        AssetPair = Waves.AssetPair;

        Promise.all([
            Waves.Asset.get({
                id: 'WAVES',
                name: 'Waves',
                precision: 8
            }),
            Waves.Asset.get({
                id: 'BTC',
                name: 'Bitcoin',
                precision: 8
            })
        ]).then((assets) => {

            fakeWAVES = assets[0];
            fakeBTC = assets[1];

            mockableFetch.replyWith(JSON.stringify({
                pair: {
                    amountAsset: fakeWAVES.id,
                    priceAsset: fakeBTC.id
                }
            }));

        }).then(() => done());

    });

    afterEach(() => {
        mockableFetch.useOriginal();
    });

    describe('creating instances', () => {

        it('should be an instance of AssetPair when created from two Asset object', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });

        it('should be an instance of AssetPair when created from two asset IDs', (done) => {
            AssetPair.get(fakeWAVES.id, fakeBTC.id).then((assetPair) => {
                expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });

        it('should be an instance of AssetPair when created from an Asset object and an asset ID', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC.id).then((assetPair) => {
                expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });

        it('should be an instance of AssetPair when created from an asset ID and an Asset object', (done) => {
            AssetPair.get(fakeWAVES.id, fakeBTC).then((assetPair) => {
                expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });

    });

    describe('core functionality', () => {

        it('should return the pair if assets are passed in the right order', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                expect(assetPair.amountAsset).to.equal(fakeWAVES);
                expect(assetPair.priceAsset).to.equal(fakeBTC);
            }).then(() => done());
        });

        it('should return the pair if assets are passed in the reversed order', (done) => {
            AssetPair.get(fakeBTC, fakeWAVES).then((assetPair) => {
                expect(assetPair.amountAsset).to.equal(fakeWAVES);
                expect(assetPair.priceAsset).to.equal(fakeBTC);
            }).then(() => done());
        });

        it('should return the pair with the right precision difference', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                expect(assetPair.precisionDifference).to.equal(0);
            }).then(() => done());
        });

    });

});
