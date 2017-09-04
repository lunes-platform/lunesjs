import { expect } from './_helpers/getChai';
import tools from '../src/tools';


describe('tools', function () {

    it('should build the right address from the given public key', function () {

        const publicKey = 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW';
        const address = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';

        expect(tools.getAddressFromPublicKey(publicKey)).to.equal(address);

    });

});
