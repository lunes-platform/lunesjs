import { expect } from './_helpers/getChai';
import * as WavesAPI from '../dist/waves-api.min';


let requiredConfigValues;
let allConfigValues;


describe('WavesAPI', () => {

    beforeEach(() => {

        requiredConfigValues = {
            networkByte: 1,
            nodeAddress: '1',
            matcherAddress: '1'
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

});
