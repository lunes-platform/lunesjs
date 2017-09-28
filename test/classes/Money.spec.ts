import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let Money;
let assetOne;
let assetTwo;


describe('Money', () => {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        Money = Waves.Money;

        assetOne = Waves.Asset.create({
            id: '0001',
            name: 'First asset',
            precision: 8
        });

        assetTwo = Waves.Asset.create({
            id: '0002',
            name: 'Second asset',
            precision: 4
        });

    });

    it('should be an instance of Money when created from tokens', (done) => {
        Money.fromTokens('10', assetOne).then((money) => {
            expect(Money.isMoney(money)).to.be.true;
        }).then(() => done());
    });

    it('should be an instance of Money when created from coins', (done) => {
        Money.fromCoins('1000000000', assetOne).then((money) => {
            expect(Money.isMoney(money)).to.be.true;
        }).then(() => done());
    });

    it('should create Money with Asset as the `asset` argument', (done) => {
        Promise.all([
            Money.fromCoins('1000', assetOne),
            Money.fromTokens('1000', assetOne)
        ]).then((moneys) => {
            expect(Money.isMoney(moneys[0])).to.be.true;
            expect(Money.isMoney(moneys[1])).to.be.true;
        }).then(() => done());
    });

    it('should create Money with asset ID as the `asset` argument', (done) => {
        Promise.all([
            Money.fromCoins('1000', assetOne.id),
            Money.fromTokens('1000', assetOne.id)
        ]).then((moneys) => {
            expect(Money.isMoney(moneys[0])).to.be.true;
            expect(Money.isMoney(moneys[1])).to.be.true;
        }).then(() => done());
    });

    it('should convert tokens to coins and vice versa', (done) => {

        const a = Money.fromCoins('100000000', assetOne).then((money) => {
            expect(money.toTokens()).to.equal('1.00000000');
        });

        const b = Money.fromTokens('1', assetOne).then((money) => {
            expect(money.toCoins()).to.equal('100000000');
        });

        const c = Money.fromCoins('10000', assetTwo).then((money) => {
            expect(money.toTokens()).to.equal('1.0000');
        });

        const d = Money.fromTokens('1', assetTwo).then((money) => {
            expect(money.toCoins()).to.equal('10000');
        });

        Promise.all([a, b, c, d]).then(() => done());

    });

    it('should throw an error when a numeric value is passed', () => {
        expect(() => Money.fromCoins(10, assetOne)).to.throw();
        expect(() => Money.fromTokens(10, assetOne)).to.throw();
    });

    it('should convert to JSON', (done) => {
        Money.fromTokens('1000', assetOne).then((m) => {
            expect(JSON.stringify(m)).to.equal('{"assetId":"0001","tokens":"1000.00000000"}');
        }).then(() => done());
    });

    it('should convert to a string', (done) => {
        Money.fromTokens('1000', assetOne).then((m) => {
            expect(m.toString()).to.equal(`1000.00000000 ${assetOne.id}`);
        }).then(() => done());
    });

});
