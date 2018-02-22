import { expect } from './_helpers/getChai';
import * as WavesAPI from '../dist/waves-api.min';


let requiredConfigValues;
let allConfigValues;


describe('WavesAPI', () => {

    beforeEach(() => {

        requiredConfigValues = {
            networkByte: 1,
            nodeAddress: '1',
            matcherAddress: '1',
            logLevel: 'warning',
            timeDiff: 0 // TODO : add some cases in the future API tests
        };

        allConfigValues = {
            ...requiredConfigValues,
            minimumSeedLength: 1,
            requestOffset: 1,
            requestLimit: 1
        };

    });

    it('should throw when created without required fields in config', () => {
        expect(() => WavesAPI.create({})).to.throw();
        expect(() => WavesAPI.create({ networkByte: 1, nodeAddress: '1' })).to.throw();
        expect(() => WavesAPI.create({ networkByte: 1, matcherAddress: '1' })).to.throw();
        expect(() => WavesAPI.create({ nodeAddress: '1', matcherAddress: '1' })).to.throw();
    });

    it('should have all fields in config when all fields are passed', () => {
        const Waves = WavesAPI.create(allConfigValues);
        expect(Waves.config.get()).to.deep.equal(allConfigValues);
    });

    it('should have all fields in config when only required fields are passed', () => {
        const Waves = WavesAPI.create(requiredConfigValues);
        const config = Waves.config.get();
        expect(Object.keys(config)).to.have.members(Object.keys(allConfigValues));
    });

    it('should only insert fallback basic values when stored config does not have them', () => {

        const logLevel = 'none';

        const Waves = WavesAPI.create({ ...requiredConfigValues, logLevel });
        Waves.config.set({ assetFactory: () => {} });
        const config = Waves.config.get();
        expect(config.logLevel).to.equal(logLevel);

        const Waves2 = WavesAPI.create(requiredConfigValues);
        const config2 = Waves2.config.get();
        expect(config2.logLevel).to.equal(Waves.constants.DEFAULT_BASIC_CONFIG.logLevel);

    });

});
