import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


function compareBytes(bytes: Uint8Array, expectedArray: Array<number>) {
    const expectedBytes = Uint8Array.from(expectedArray);
    expect(bytes).to.deep.equal(expectedBytes);
}


let Waves;

let Base58;
let Bool;
let Byte;
let Long;
let StringWithLength;

let processor;


describe('ByteProcessor', () => {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

        Base58 = Waves.byteProcessors.Base58;
        Bool = Waves.byteProcessors.Bool;
        Byte = Waves.byteProcessors.Byte;
        Long = Waves.byteProcessors.Long;
        StringWithLength = Waves.byteProcessors.StringWithLength;

    });

    describe('Base58', () => {

        beforeEach(() => {
            processor = new Base58('base58');
        });

        it('should convert a valid Base58 string to bytes', (done) => {
            processor.process('StV1DL6CwTryKyV').then((bytes) => {
                compareBytes(bytes, [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]);
            }).then(() => done());
        });

        it('should return empty Uint8Array when given an empty string', (done) => {
            processor.process('').then((bytes) => {
                compareBytes(bytes, []);
            }).then(() => done());
        });

        it('should throw when given a non-Base58 string', () => {
            expect(() => processor.process('StV1DL6CwTryKyV%')).to.throw();
        });

    });

    describe('Bool', () => {

        beforeEach(() => {
            processor = new Bool('bool');
        });

        it('should convert a boolean values to bytes', (done) => {
            Promise.all([
                processor.process(true).then((bytes) => compareBytes(bytes, [1])),
                processor.process(false).then((bytes) => compareBytes(bytes, [0]))
            ]).then(() => done());
        });

        it('should throw when given not a boolean value', () => {
            expect(() => processor.process(1)).to.throw();
            expect(() => processor.process(0)).to.throw();
            expect(() => processor.process(null)).to.throw();
            expect(() => processor.process('')).to.throw();
        });

    });

    describe('Byte', () => {

        beforeEach(() => {
            processor = new Byte('byte');
        });

        it('should convert a byte value to bytes', (done) => {
            Promise.all([
                processor.process(0).then((bytes) => compareBytes(bytes, [0])),
                processor.process(255).then((bytes) => compareBytes(bytes, [255]))
            ]).then(() => done());
        });

        it('should throw when given not a byte value', () => {
            expect(() => processor.process('')).to.throw();
            expect(() => processor.process(true)).to.throw();
            expect(() => processor.process(null)).to.throw();
            expect(() => processor.process(256)).to.throw();
            expect(() => processor.process(144125)).to.throw();
            expect(() => processor.process(12141209481023)).to.throw();
        });

    });

    describe('Long', () => {

        beforeEach(() => {
            processor = new Long('long');
        });

        it('should convert a long value to bytes', (done) => {
            Promise.all([
                processor.process(0).then((bytes) => compareBytes(bytes, [0, 0, 0, 0, 0, 0, 0, 0])),
                processor.process(255).then((bytes) => compareBytes(bytes, [0, 0, 0, 0, 0, 0, 0, 255])),
                processor.process(256).then((bytes) => compareBytes(bytes, [0, 0, 0, 0, 0, 0, 1, 0])),
                processor.process(144125).then((bytes) => compareBytes(bytes, [0, 0, 0, 0, 0, 2, 50, 253])),
                processor.process(12141209481023).then((bytes) => compareBytes(bytes, [0, 0, 11, 10, 216, 122, 111, 63]))
            ]).then(() => done());
        });

        it('should throw when given not a long value', () => {
            expect(() => processor.process('')).to.throw();
            expect(() => processor.process(true)).to.throw();
            expect(() => processor.process(null)).to.throw();
        });

    });

    describe('StringWithLength', () => {

        beforeEach(() => {
            processor = new StringWithLength('stringWithLength');
        });

        it('should convert a string to bytes of that string length and string itself', (done) => {
            Promise.all([
                processor.process('a').then((bytes) => compareBytes(bytes, [0, 1, 97])),
                processor.process('hello').then((bytes) => compareBytes(bytes, [0, 5, 104, 101, 108, 108, 111])),
                processor.process('').then((bytes) => compareBytes(bytes, [0, 0]))
            ]).then(() => done());
        });

        it('should throw when given not a long value', () => {
            expect(() => processor.process(0)).to.throw();
            expect(() => processor.process(1)).to.throw();
            expect(() => processor.process(true)).to.throw();
            expect(() => processor.process(null)).to.throw();
        });

    });

});
