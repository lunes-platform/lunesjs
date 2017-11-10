import resetRequireCache from '../_helpers/resetRequireCache';
resetRequireCache('dist/waves-api.min');

import { expect } from '../_helpers/getChai';
import Response from '../_helpers/getResponse';
import { mockableFetch } from '../_helpers/mockableFetch';
import * as WavesAPI from '../../dist/waves-api.min';


const MOCK_BTC_ID = 'BTC';
const MOCK_BTC_RESPONSE = {
    name: 'Bitcoin',
    decimals: 8,
    description: 'Mock Bitcoin Token'
};

let Waves;
let Asset;
let defaultProps1;
let defaultProps2;


describe('Asset', () => {

    beforeEach((done) => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

        defaultProps1 = {
            id: 'test1',
            name: 'Test No. 1',
            precision: 0
        };

        defaultProps2 = {
            id: 'test2',
            name: 'Test No. 2',
            precision: 4
        };

        mockableFetch.mockWith((input: string) => {
            if (input === 'no-such-id') {
                throw new Error('No such ID');
            } else if (input.split('/').pop() === MOCK_BTC_ID) {
                const res = new Response(JSON.stringify(MOCK_BTC_RESPONSE));
                return Promise.resolve(res);
            }
        });

        Asset = Waves.Asset;
        Asset.clearCache().then(() => done());

    });

    afterEach(() => {
        mockableFetch.useOriginal();
    });

    describe('creating instances', () => {

        it('should be an instance of Asset', (done) => {
            Asset.get(defaultProps1).then((asset) => {
                expect(Asset.isAsset(asset)).to.be.true;
            }).then(() => done());
        });

        it('should create only one instance for one ID', (done) => {
            Asset.getKnownAssetsList().then((initialList) => {
                return Promise.all([
                    Asset.get(defaultProps1),
                    Asset.get(defaultProps1)
                ]).then(() => {
                    return Asset.getKnownAssetsList().then((finalList) => {
                        expect(finalList.length).to.equal(initialList.length + 1);
                    });
                });
            }).then(() => done());
        });

        it('should create different instances for different IDs', (done) => {
            Asset.getKnownAssetsList().then((initialList) => {
                return Promise.all([
                    Asset.get(defaultProps1),
                    Asset.get(defaultProps2)
                ]).then(() => {
                    return Asset.getKnownAssetsList().then((finalList) => {
                        expect(finalList.length).to.equal(initialList.length + 2);
                    });
                });
            }).then(() => done());
        });

    });

    describe('core functionality', () => {

        it('should switch between storages in different networks', (done) => {

            Waves.config.set(WavesAPI.TESTNET_CONFIG);
            Asset.getKnownAssetsList().then((testnetInitialList) => {
                return Asset.get(defaultProps1).then(() => {
                    return Asset.getKnownAssetsList().then((testnetList) => {
                        expect(testnetList.length).to.equal(testnetInitialList.length + 1);
                    });
                }).then(() => {
                    Waves.config.set(WavesAPI.MAINNET_CONFIG);
                    return Asset.getKnownAssetsList().then((mainnetInitialList) => {
                        return Promise.all([
                            Asset.get(defaultProps1),
                            Asset.get(defaultProps2)
                        ]).then(() => {
                            return Asset.getKnownAssetsList().then((mainnetList) => {
                                expect(mainnetList.length).to.equal(mainnetInitialList.length + 2);
                            });
                        });
                    });
                }).then(() => {
                    Waves.config.set(WavesAPI.TESTNET_CONFIG);
                    return Asset.getKnownAssetsList().then((testnetFinalList) => {
                        expect(testnetFinalList.length).to.equal(testnetInitialList.length + 1);
                    });
                });
            }).then(() => done());

        });

        it('should return a stored asset by its ID', (done) => {

            const w = Asset.get(Waves.constants.WAVES).then((waves) => {
                expect(waves.id).to.equal(Waves.constants.WAVES);
            });

            const a = Asset.get(defaultProps1).then(() => {
                return Asset.get(defaultProps1.id).then((asset) => {
                    expect(asset.id).to.equal(defaultProps1.id);
                    expect(asset.name).to.equal(defaultProps1.name);
                    expect(asset.precision).to.equal(defaultProps1.precision);
                });
            });

            Promise.all([w, a]).then(() => done());

        });

        it('should return asset for non-stored but existing asset', (done) => {
            Asset.get(MOCK_BTC_ID).then((asset) => {
                expect(asset.id).to.equal(MOCK_BTC_ID);
                expect(asset.name).to.equal(MOCK_BTC_RESPONSE.name);
                expect(asset.precision).to.equal(MOCK_BTC_RESPONSE.decimals);
                expect(asset.description).to.equal(MOCK_BTC_RESPONSE.description);
            }).then(() => done());
        });

        it('should throw for a non-existing asset', (done) => {
            Asset.get('no-such-id').catch(() => done());
        });

        it('should reset cache', (done) => {
            Promise.all([
                Asset.get(defaultProps1),
                Asset.get(defaultProps2)
            ]).then(() => {
                return Asset.clearCache();
            }).then(() => {
                return Asset.getKnownAssetsList().then((list) => {
                    // Only default Waves asset remains
                    expect(list).to.have.lengthOf(1);
                });
            }).then(() => done());
        });

        it('should return an object with all known assets', (done) => {
            Promise.all([
                Asset.get(defaultProps1),
                Asset.get(defaultProps2)
            ]).then(() => {
                return Asset.getKnownAssets().then((assets) => {
                    const keys = Object.keys(assets);
                    expect(keys).to.have.members([Waves.constants.WAVES, defaultProps1.id, defaultProps2.id]);
                });
            }).then(() => done());
        });

        it('should return an array with all known assets', (done) => {
            Promise.all([
                Asset.get(defaultProps1),
                Asset.get(defaultProps2)
            ]).then(() => {
                return Asset.getKnownAssetsList().then((assets) => {
                    const list = assets.map((asset) => asset.id);
                    expect(list).to.have.members([Waves.constants.WAVES, defaultProps1.id, defaultProps2.id]);
                });
            }).then(() => done());
        });

    });

    describe('conversions', () => {

        it('should convert to JSON', (done) => {
            const s = '{"id":"test1","name":"Test No. 1","precision":0,"description":"","rating":0,"ticker":""}';
            Asset.get(defaultProps1).then((a) => {
                expect(JSON.stringify(a)).to.equal(s);
            }).then(() => done());
        });

        it('should convert to a string', (done) => {
            Asset.get(defaultProps1).then((a) => {
                expect(a.toString()).to.equal(defaultProps1.id);
            }).then(() => done());
        });

    });

    describe('planned failures', () => {

        it('should fail to be created without ID', (done) => {
            Asset.get({
                name: 'No Identity',
                precision: 4
            }).catch(() => done());
        });

        it('should fail to be created with an empty ID', (done) => {
            Asset.get({
                id: '',
                name: 'Empty Identity',
                precision: 4
            }).catch(() => done());
        });

        it('should fail to be created without a name', (done) => {
            Asset.get({
                id: '',
                precision: 8
            }).catch(() => done());
        });

        it('should fail to be created with an empty string as a name', (done) => {
            Asset.get({
                id: '',
                name: '',
                precision: 8
            }).catch(() => done());
        });

        it('should fail to be created without precision', (done) => {
            Asset.get({
                id: '',
                name: 'test'
            }).catch(() => done());
        });

        it('should fail to be created with a precision which is not a number', (done) => {
            Asset.get({
                id: '',
                name: 'test',
                precision: '0'
            }).catch(() => done());
        });

        it('should fail to be created with a negative precision', (done) => {
                Asset.get({
                    id: '',
                    name: 'test',
                precision: -1
                }).catch(() => done());
        });

        it('should fail to be created with a too big precision', (done) => {
            Asset.get({
                id: '',
                name: 'test',
                precision: 9
            }).catch(() => done());
        });

    });

});
