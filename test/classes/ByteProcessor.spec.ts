import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;

let processor;

let Base58;
let _base58 = {
    name: 'base58',
    value: 'StV1DL6CwTryKyV',
    bytes: Uint8Array.from([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
};


describe('ByteProcessor', () => {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

        Base58 = Waves.byteProcessors.Base58;

    });

    describe('Base58', () => {

        beforeEach(() => {
            processor = new Base58(_base58.name);
        });

        it('should convert valid Base58 string to bytes', (done) => {
            processor.process(_base58.value).then((bytes) => {
                expect(bytes).to.deep.equal(_base58.bytes);
            }).then(() => done());
        });

        it('should return empty Uint8Array when given an empty string', (done) => {
            processor.process('').then((bytes) => {
                expect(bytes).to.deep.equal(Uint8Array.from([]));
            }).then(() => done());
        });

        it('should throw when given a non-Base58 string', () => {
            expect(() => processor.process(_base58.value + '%')).to.throw();
        });

        it('should keep its name', () => {
            expect(processor.name).to.equal(_base58.name);
        });

    });

});
