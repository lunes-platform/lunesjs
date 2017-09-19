import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let Currency;
let defaultProps1;
let defaultProps2;


describe('Currency', function () {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

        defaultProps1 = {
            id: 'test1',
            name: 'Test No. 1',
            precision: 0
        };

        defaultProps2 = {
            id: 'test2',
            name: 'Test No. 2',
            precision: 4
        };

        Currency = Waves.Currency;
        Currency.clearCache();

    });

    it('should be an instance of Currency', function () {
        const asset = Currency.create(defaultProps1);
        expect(Currency.isCurrency(asset)).to.be.true;
    });

    it('should be immutable', function () {
        const asset = Currency.create(defaultProps1);
        expect(function () {
            asset.id = 'something';
        }).to.throw();
        expect(asset.id).to.equal(defaultProps1.id);
    });

    it('should create only one instance for one ID', function () {
        const initialLength = Currency.getKnownCurrencies().length;
        Currency.create(defaultProps1);
        Currency.create(defaultProps1);
        const finalLength = Currency.getKnownCurrencies().length;
        expect(finalLength).to.equal(initialLength + 1);
    });

    it('should create different instances for different IDs', function () {
        const initialLength = Currency.getKnownCurrencies().length;
        Currency.create(defaultProps1);
        Currency.create(defaultProps2);
        const finalLength = Currency.getKnownCurrencies().length;
        expect(finalLength).to.equal(initialLength + 2);
    });

    it('should reset cache', function () {
        Currency.create(defaultProps1);
        Currency.create(defaultProps2);
        Currency.clearCache();
        const list = Currency.getKnownCurrencies();
        expect(list).to.have.lengthOf(1); // Only default Waves asset remains
    });

    it('should fail to be created without ID', function () {
        expect(function () {
            Currency.create({
                name: 'No Identity',
                precision: 4
            });
        }).to.throw();
    });

    it('should fail to be created with an empty ID', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: 'Empty Identity',
                precision: 4
            });
        }).to.throw();
    });

    it('should fail to be created without a name', function () {
        expect(function () {
            Currency.create({
                id: '',
                precision: 8
            });
        }).to.throw();
    });

    it('should fail to be created with an empty string as a name', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: '',
                precision: 8
            });
        }).to.throw();
    });

    it('should fail to be created without precision', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: 'test'
            });
        }).to.throw();
    });

    it('should fail to be created with a precision which is not a number', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: 'test',
                precision: '0'
            });
        }).to.throw();
    });

    it('should fail to be created with a negative precision', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: 'test',
                precision: -1
            });
        }).to.throw();
    });

    it('should fail to be created with a too big precision', function () {
        expect(function () {
            Currency.create({
                id: '',
                name: 'test',
                precision: 9
            });
        }).to.throw();
    });

});
