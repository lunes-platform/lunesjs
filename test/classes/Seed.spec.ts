import * as WavesAPI from '../../src/WavesAPI';
import { expect } from '../_helpers/getChai';


const waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const Seed = waves.Seed;


describe('Seed', function () {

    it('should create a Seed object with 15-word random seed', function () {

        const password = '1dna0uaudhJDw390*';

        const seed = Seed.create(password);

        expect(seed.getEncryptedSeed()).to.be.a('string');
        expect(seed.getPhrase(password).split(' ')).to.have.lengthOf(15);
        expect(seed.getPhrase(password).length).to.be.greaterThan(50);
        expect(seed.get(password)).to.have.all.keys('phrase', 'keyPair', 'address');

    });

    it('should create a Seed object from existing phrase', function () {

        const password = 'IJ#G%)HJCoskapa319ja';

        const phrase = 'Hello, my dear friend. I am your new Seed.';
        const keyPair = {
            privateKey: 'ZDbjemnfbm7yxkM5ggq45hkRj7NKoPghMtrYTfxkVaV',
            publicKey: 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW'
        };
        const address = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';

        const seed = Seed.fromExistingPhrase(phrase, password);

        expect(seed.getEncryptedSeed()).to.be.a('string');
        expect(seed.getPhrase(password)).to.equal(phrase);
        expect(seed.getKeyPair(password)).to.deep.equal(keyPair);
        expect(seed.getAddress(password)).to.equal(address);
        expect(seed.get(password)).to.deep.equal({ phrase, keyPair, address });

    });

});
