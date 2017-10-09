import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let Seed;

let PHRASE;
let ADDRESS;
let KEY_PAIR;


describe('Seed', () => {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        Seed = Waves.Seed;

        PHRASE = 'Hello, my dear friend. I am your new Seed.';
        ADDRESS = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';
        KEY_PAIR = {
            privateKey: 'ZDbjemnfbm7yxkM5ggq45hkRj7NKoPghMtrYTfxkVaV',
            publicKey: 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW'
        };

    });

    describe('core functionality', () => {

        it('should create a Seed object with 15-word random seed', () => {

            const password = '1dna0uaudhJDw390*';
            const wrongPassword = '123';

            const seed = Seed.create();

            expect(seed.phrase.split(' ')).to.have.lengthOf(15);
            expect(seed.phrase.length).to.be.greaterThan(50);
            expect(seed).to.have.all.keys('phrase', 'keyPair', 'address');

            const encryptedSeed = seed.encrypt(password);

            expect(encryptedSeed).to.be.a('string');
            expect(Seed.decryptSeedPhrase(encryptedSeed, password)).to.equal(seed.phrase);
            expect(() => Seed.decryptSeedPhrase(encryptedSeed, wrongPassword)).to.throw();

        });

        it('should create a Seed object from existing phrase', () => {

            const password = 'IJ#G%)HJCoskapa319ja';
            const wrongPassword = '123';

            const seed = Seed.fromExistingPhrase(PHRASE);

            expect(seed.phrase).to.equal(PHRASE);
            expect(seed.keyPair).to.deep.equal(KEY_PAIR);
            expect(seed.address).to.equal(ADDRESS);

            const encryptedSeed = seed.encrypt(password);

            expect(encryptedSeed).to.be.a('string');
            expect(Seed.decryptSeedPhrase(encryptedSeed, password)).to.equal(PHRASE);
            expect(() => Seed.decryptSeedPhrase(encryptedSeed, wrongPassword)).to.throw();

        });

        it('should encrypt and decrypt seed phrase properly', () => {

            const password = '370192423hduh198y97ty1as^#T';

            const encryptedSeed = Seed.encryptSeedPhrase(PHRASE, password);
            const decryptedSeed = Seed.decryptSeedPhrase(encryptedSeed, password);

            expect(decryptedSeed).to.equal(PHRASE);

            expect(() => Seed.decryptSeedPhrase(encryptedSeed, 'abcqouwh')).to.throw();
            expect(() => Seed.decryptSeedPhrase(encryptedSeed, '00000000')).to.throw();
            expect(() => Seed.decryptSeedPhrase(encryptedSeed, 'nb4191cc31')).to.throw();
            expect(() => Seed.decryptSeedPhrase(encryptedSeed, 'hr6$w81jf&')).to.throw();

        });

    });

    describe('planned failures', () => {

        it('should throw errors when seed phrase is shorter than minimum seed length in config', () => {

            const password = '1234567890';

            Waves.config.set({ minimumSeedLength: 1000 });

            expect(() => Seed.create(15)).to.throw();
            expect(() => Seed.fromExistingPhrase('hello world')).to.throw();
            expect(() => Seed.encryptSeedPhrase('hello world', password)).to.throw();
            expect(() => Seed.decryptSeedPhrase('U2FsdGVkX1+cJm/xTNQ8IkTpr3HzJZ0eoOxnhRe+1sk=', password)).to.throw();

            Waves.config.set(WavesAPI.TESTNET_CONFIG);

        });

    });

});
