import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../src/WavesAPI';


const waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const Seed = waves.Seed;

const PHRASE = 'Hello, my dear friend. I am your new Seed.';
const ADDRESS = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';
const KEY_PAIR = {
    privateKey: 'ZDbjemnfbm7yxkM5ggq45hkRj7NKoPghMtrYTfxkVaV',
    publicKey: 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW'
};


describe('Seed', function () {

    it('should create a Seed object with 15-word random seed', function () {

        const seed = Seed.create();
        const password = '1dna0uaudhJDw390*';

        expect(seed.phrase.split(' ')).to.have.lengthOf(15);
        expect(seed.phrase.length).to.be.greaterThan(50);
        expect(seed).to.have.all.keys('phrase', 'keyPair', 'address');

        expect(seed.encrypt(password)).to.be.a('string');

    });

    it('should create a Seed object from existing phrase', function () {

        const password = 'IJ#G%)HJCoskapa319ja';

        const seed = Seed.fromExistingPhrase(PHRASE);

        expect(seed.phrase).to.equal(PHRASE);
        expect(seed.keyPair).to.deep.equal(KEY_PAIR);
        expect(seed.address).to.equal(ADDRESS);

        expect(seed.encrypt(password)).to.be.a('string');

        const encryptedSeed = seed.encrypt(password);
        const decryptedSeed = Seed.decryptSeedPhrase(encryptedSeed, password);

        expect(decryptedSeed).to.equal(PHRASE);

    });

    it('should encrypt and decrypt seed phrase properly', function () {

        const password = '370192423hduh198y97ty1as^#T';

        const encryptedSeed = Seed.encryptSeedPhrase(PHRASE, password);
        const decryptedSeed = Seed.decryptSeedPhrase(encryptedSeed, password);

        expect(decryptedSeed).to.equal(PHRASE);

    });

});
