import { expect } from './_helpers/getChai';
import * as WavesAPI from '../dist/waves-api.min';


let Waves;


describe('tools', function () {

    beforeEach(() => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
    });

    it('should build the right address from the given public key', () => {

        const publicKey = 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW';
        const address = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';

        expect(Waves.tools.getAddressFromPublicKey(publicKey)).to.equal(address);

    });

});
