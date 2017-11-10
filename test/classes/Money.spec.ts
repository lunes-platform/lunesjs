import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


let Waves;
let Money;
let fakeWAVES;
let fakeFOUR;
let fakeZERO;


describe('Money', () => {

    beforeEach((done) => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        Money = Waves.Money;

        Promise.all([
            Waves.Asset.get({
                id: 'WAVES',
                name: 'Waves',
                precision: 8
            }),
            Waves.Asset.get({
                id: 'FOUR',
                name: 'Four Precision Token',
                precision: 4
            }),
            Waves.Asset.get({
                id: 'ZERO',
                name: 'Zero Precision Token',
                precision: 0
            })
        ]).then((assets) => {
            fakeWAVES = assets[0];
            fakeFOUR = assets[1];
            fakeZERO = assets[2];
        }).then(() => done());

    });

    describe('creating instances', () => {

        it('should be an instance of Money when created from tokens', (done) => {
            Money.fromTokens('10', fakeWAVES).then((money) => {
                expect(Money.isMoney(money)).to.be.true;
            }).then(() => done());
        });

        it('should be an instance of Money when created from coins', (done) => {
            Money.fromCoins('1000000000', fakeWAVES).then((money) => {
                expect(Money.isMoney(money)).to.be.true;
            }).then(() => done());
        });

        it('should create Money with Asset as the `asset` argument', (done) => {
            Promise.all([
                Money.fromCoins('1000', fakeWAVES),
                Money.fromTokens('1000', fakeWAVES)
            ]).then((moneys) => {
                expect(Money.isMoney(moneys[0])).to.be.true;
                expect(Money.isMoney(moneys[1])).to.be.true;
            }).then(() => done());
        });

        it('should create Money with asset ID as the `asset` argument', (done) => {
            Promise.all([
                Money.fromCoins('1000', fakeWAVES.id),
                Money.fromTokens('1000', fakeWAVES.id)
            ]).then((moneys) => {
                expect(Money.isMoney(moneys[0])).to.be.true;
                expect(Money.isMoney(moneys[1])).to.be.true;
            }).then(() => done());
        });

    });

    describe('core functionality', () => {

        it('should convert tokens to coins and vice versa', (done) => {

            const a = Money.fromCoins('100000000', fakeWAVES).then((money) => {
                expect(money.toTokens()).to.equal('1.00000000');
            });

            const b = Money.fromTokens('1', fakeWAVES).then((money) => {
                expect(money.toCoins()).to.equal('100000000');
            });

            const c = Money.fromCoins('10000', fakeFOUR).then((money) => {
                expect(money.toTokens()).to.equal('1.0000');
            });

            const d = Money.fromTokens('1', fakeFOUR).then((money) => {
                expect(money.toCoins()).to.equal('10000');
            });

            Promise.all([a, b, c, d]).then(() => done());

        });

        it('should drop insignificant digits', (done) => {

            const a = Money.fromTokens('1.123', fakeZERO).then((money) => {
                expect(money.toCoins()).to.equal('1');
            });

            const b = Money.fromTokens('10.1234567890', fakeWAVES).then((money) => {
                expect(money.toCoins()).to.equal('1012345678');
            });

            Promise.all([a, b]).then(() => done());

        });

    });

    describe('conversions', () => {

        it('should convert to JSON', (done) => {
            Money.fromTokens('1000', fakeWAVES).then((m) => {
                expect(JSON.stringify(m)).to.equal('{"assetId":"WAVES","tokens":"1000.00000000"}');
            }).then(() => done());
        });

        it('should convert to a string', (done) => {
            Money.fromTokens('1000', fakeWAVES).then((m) => {
                expect(m.toString()).to.equal('1000.00000000 WAVES');
            }).then(() => done());
        });

    });

    describe('planned failures', () => {

        it('should throw an error when a numeric value is passed', () => {
            expect(() => Money.fromCoins(10, fakeWAVES)).to.throw();
            expect(() => Money.fromTokens(10, fakeWAVES)).to.throw();
        });

    });

});
