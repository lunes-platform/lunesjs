import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let Asset;
let defaultProps1;
let defaultProps2;


describe('Asset', () => {

    beforeEach(() => {

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

        Asset = Waves.Asset;
        Asset.clearCache();

    });

    describe('creating instances', () => {

        it('should be an instance of Asset', () => {
            const asset = Asset.create(defaultProps1);
            expect(Asset.isAsset(asset)).to.be.true;
        });

        it('should create only one instance for one ID', () => {
            const initialLength = Asset.getKnownAssets().length;
            Asset.create(defaultProps1);
            Asset.create(defaultProps1);
            const finalLength = Asset.getKnownAssets().length;
            expect(finalLength).to.equal(initialLength + 1);
        });

        it('should create different instances for different IDs', () => {
            const initialLength = Asset.getKnownAssets().length;
            Asset.create(defaultProps1);
            Asset.create(defaultProps2);
            const finalLength = Asset.getKnownAssets().length;
            expect(finalLength).to.equal(initialLength + 2);
        });

    });

    describe('core functionality', () => {

        it('should switch between storages in different networks', () => {

            Waves.config.set(WavesAPI.TESTNET_CONFIG);
            const testnetInitialLength = Asset.getKnownAssets().length;
            Asset.create(defaultProps1);
            const testnetFinalLength = Asset.getKnownAssets().length;
            expect(testnetFinalLength).to.equal(testnetInitialLength + 1);

            Waves.config.set(WavesAPI.MAINNET_CONFIG);
            const mainnetInitialLength = Asset.getKnownAssets().length;
            Asset.create(defaultProps1);
            Asset.create(defaultProps2);
            const mainnetFinalLength = Asset.getKnownAssets().length;
            expect(mainnetFinalLength).to.equal(mainnetInitialLength + 2);

            Waves.config.set(WavesAPI.TESTNET_CONFIG);

        });

        it('should return a stored asset by its ID', (done) => {

            const w = Asset.get(Waves.constants.WAVES).then((waves) => {
                expect(waves.id).to.equal(Waves.constants.WAVES);
            });

            Asset.create(defaultProps1);
            const a = Asset.get(defaultProps1.id).then((asset) => {
                expect(asset.id).to.equal(defaultProps1.id);
                expect(asset.name).to.equal(defaultProps1.name);
                expect(asset.precision).to.equal(defaultProps1.precision);
            });

            Promise.all([w, a]).then(() => done());

        });

        it('should return `null` for a non-stored asset', (done) => {
            Asset.get('no-such-id').then((noAsset) => {
                expect(noAsset).to.be.a('null');
            }).then(() => done());
        });

        it('should reset cache', () => {
            Asset.create(defaultProps1);
            Asset.create(defaultProps2);
            Asset.clearCache();
            const list = Asset.getKnownAssets();
            expect(list).to.have.lengthOf(1); // Only default Waves asset remains
        });

    });

    describe('conversions', () => {

        it('should convert to JSON', () => {
            const a = Asset.create(defaultProps1);
            expect(JSON.stringify(a)).to.equal('{"id":"test1","name":"Test No. 1","precision":0,"description":"","rating":0,"ticker":""}');
        });

        it('should convert to a string', () => {
            const a = Asset.create(defaultProps1);
            expect(a.toString()).to.equal(defaultProps1.id);
        });

    });

    describe('planned failures', () => {

        it('should fail to be created without ID', () => {
            expect(() => {
                Asset.create({
                    name: 'No Identity',
                    precision: 4
                });
            }).to.throw();
        });

        it('should fail to be created with an empty ID', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: 'Empty Identity',
                    precision: 4
                });
            }).to.throw();
        });

        it('should fail to be created without a name', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    precision: 8
                });
            }).to.throw();
        });

        it('should fail to be created with an empty string as a name', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: '',
                    precision: 8
                });
            }).to.throw();
        });

        it('should fail to be created without precision', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: 'test'
                });
            }).to.throw();
        });

        it('should fail to be created with a precision which is not a number', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: 'test',
                    precision: '0'
                });
            }).to.throw();
        });

        it('should fail to be created with a negative precision', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: 'test',
                    precision: -1
                });
            }).to.throw();
        });

        it('should fail to be created with a too big precision', () => {
            expect(() => {
                Asset.create({
                    id: '',
                    name: 'test',
                    precision: 9
                });
            }).to.throw();
        });

    });

});
