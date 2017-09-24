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

        assetOne = Waves.Currency.create({
            id: '0001',
            name: 'First asset',
            precision: 8
        });

        assetTwo = Waves.Currency.create({
            id: '0002',
            name: 'Second asset',
            precision: 4
        });

    });

    it('should be an instance of Money when created from tokens', () => {
        const money = Money.fromTokens('10', assetOne);
        expect(Money.isMoney(money)).to.be.true;
    });

    it('should be an instance of Money when created from coins', () => {
        const money = Money.fromCoins('1000000000', assetOne);
        expect(Money.isMoney(money)).to.be.true;
    });

    it('should create Money with Currency as the `asset` argument', () => {
        const moneyOne = Money.fromCoins('1000', assetOne);
        const moneyTwo = Money.fromTokens('1000', assetOne);
        expect(Money.isMoney(moneyOne)).to.be.true;
        expect(Money.isMoney(moneyTwo)).to.be.true;
    });

    it('should create Money with asset ID as the `asset` argument', () => {
        const moneyOne = Money.fromCoins('1000', assetOne.id);
        const moneyTwo = Money.fromTokens('1000', assetOne.id);
        expect(Money.isMoney(moneyOne)).to.be.true;
        expect(Money.isMoney(moneyTwo)).to.be.true;
    });

    it('should convert tokens to coins and vice versa', () => {
        expect(Money.fromCoins('100000000', assetOne).toTokens()).to.equal('1.00000000');
        expect(Money.fromTokens('1', assetOne).toCoins()).to.equal('100000000');
        expect(Money.fromCoins('10000', assetTwo).toTokens()).to.equal('1.0000');
        expect(Money.fromTokens('1', assetTwo).toCoins()).to.equal('10000');
    });

    it('should throw an error when a numeric value is passed', () => {
        expect(() => Money.fromCoins(10, assetOne)).to.throw();
        expect(() => Money.fromTokens(10, assetOne)).to.throw();
    });

    it('should convert to JSON', () => {
        const m = Money.fromTokens('1000', assetOne);
        expect(JSON.stringify(m)).to.equal('{"asset":{"id":"0001","name":"First asset","precision":8},"tokens":"1000.00000000"}');
    });

    it('should convert to a string', () => {
        const m = Money.fromTokens('1000', assetOne);
        expect(m.toString()).to.equal(`1000.00000000 ${assetOne.id}`);
    });

});
