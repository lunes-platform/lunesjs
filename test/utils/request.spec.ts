import { expect } from '../_helpers/getChai';
import { normalizePath } from '../../src/utils/request';


describe('utils/request', function () {

    it('should normalize all types of paths', function () {
        expect(normalizePath('/transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        expect(normalizePath('/transactions///unconfirmed/')).to.equal('/transactions/unconfirmed');
        expect(normalizePath('//transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        expect(normalizePath('\/\/transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        expect(normalizePath('\/\/transactions\/unconfirmed\/\///\/')).to.equal('/transactions/unconfirmed');
        expect(normalizePath('transactions/unconfirmed/')).to.equal('/transactions/unconfirmed');
    });

});
