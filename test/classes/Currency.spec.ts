import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../src/WavesAPI';


const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

describe('Currency', function () {

    const Currency = Waves.Currency;

    const defaultProps0 = {
        id: '',
        name: 'Waves',
        precision: 8
    };

    const defaultProps1 = {
        id: 'test1',
        name: 'Test No. 1',
        precision: 0
    };

    const defaultProps2 = {
        id: 'test2',
        name: 'Test No. 2',
        precision: 4
    };

    beforeEach(function () {
        Currency.clearCache();
    });

    it('should be an instance of Currency', function () {
        const asset = Currency.create(defaultProps0);
        expect(Currency.isCurrency(asset)).to.be.true;
    });

    it('should be immutable', function () {
        const asset = Currency.create(defaultProps0);
        expect(function () {
            asset.id = 'something';
        }).to.throw();
        expect(asset.id).to.equal(defaultProps0.id);
    });

    it('should create only one instance for one ID', function () {
        const asset = Currency.create(defaultProps0);
        Currency.create(defaultProps0);
        Currency.create(defaultProps0);
        const list = Currency.getKnownCurrencies();
        expect(list).to.have.lengthOf(1);
        expect(asset).to.equal(list[0]);
    });

    it('should create different instanced for different IDs', function () {
        Currency.create(defaultProps0);
        Currency.create(defaultProps1);
        Currency.create(defaultProps2);
        const list = Currency.getKnownCurrencies();
        expect(list).to.have.lengthOf(3);
        expect(list[0]).to.not.equal(list[1]);
        expect(list[1]).to.not.equal(list[2]);
        expect(list[2]).to.not.equal(list[0]);
    });

    it('should reset cache', function () {
        Currency.create(defaultProps0);
        Currency.create(defaultProps1);
        Currency.create(defaultProps2);
        Currency.clearCache();
        const list = Currency.getKnownCurrencies();
        expect(list).to.have.lengthOf(0);
    });

    it('should fail to be created without ID', function () {
        expect(function () {
            Currency.create({
                name: 'No Identity',
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
