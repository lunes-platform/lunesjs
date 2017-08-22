import * as WavesAPI from '../../src/WavesAPI';
import { expect } from '../_helpers/getChai';
import * as constants from '../../src/constants';


const waves = WavesAPI.create(constants.DEFAULT_TESTNET_CONFIG);
const Seed = waves.Seed;


describe('Seed', function () {

    it('should create a Seed object with 15-word random seed', function () {

        const password = '1dna0uaudhJDw390*';

        const seed = Seed.create(password);

        expect(seed.getPhrase(password).split(' ')).to.have.lengthOf(15);
        expect(seed.getPhrase(password).length).to.be.greaterThan(50);

    });

    it('should create a Seed object from existing phrase', function () {

        const phrase = 'Hello, my dear friend. I am your new Seed.';
        const password = 'IJ#G%)HJCoskapa319ja';
        const keyPair = {
            privateKey: 'ZDbjemnfbm7yxkM5ggq45hkRj7NKoPghMtrYTfxkVaV',
            publicKey: 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW'
        };

        const seed = Seed.fromExistingPhrase(phrase, password);

        expect(seed.getPhrase(password)).to.equal(phrase);
        expect(seed.getKeyPair(password)).to.deep.equal(keyPair);

    });

});
