import { expect } from '../_helpers/getChai';
import * as WavesAPI from '../../dist/waves-api.min';


function createPair(amountAsset, priceAsset) {
    return { amountAsset, priceAsset };
}


let Waves;
let OrderPrice;

let fakeWAVES;
let fakeBTC;
let fakeUSD;
let fakeEUR;
let fakeZERO;


describe('OrderPrice', () => {

    beforeEach(() => {

        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        OrderPrice = Waves.OrderPrice;

        fakeWAVES = Waves.Asset.create({
            id: 'WAVES',
            name: 'Waves',
            precision: 8
        });

        fakeBTC = Waves.Asset.create({
            id: 'BTC',
            name: 'Bitcoin',
            precision: 8
        });

        fakeUSD = Waves.Asset.create({
            id: 'USD',
            name: 'US Dollar',
            precision: 2
        });

        fakeEUR = Waves.Asset.create({
            id: 'EUR',
            name: 'Euro',
            precision: 2
        });

        fakeZERO = Waves.Asset.create({
            id: 'ZERO',
            name: 'Zero Precision Token',
            precision: 0
        });

    });

    describe('creating instances', () => {

        it('should be an instance of OrderPrice when created from tokens', (done) => {
            OrderPrice.fromTokens('10.00', createPair(fakeWAVES, fakeBTC)).then((orderPrice) => {
                expect(OrderPrice.isOrderPrice(orderPrice)).to.be.true;
            }).then(() => done());
        });

        it('should be an instance of OrderPrice when created from matcher coins', (done) => {
            OrderPrice.fromMatcherCoins('10000000000', createPair(fakeWAVES, fakeBTC)).then((orderPrice) => {
                expect(OrderPrice.isOrderPrice(orderPrice)).to.be.true;
            }).then(() => done());
        });

        it('should create OrderPrice with Asset inside the `pair` argument', (done) => {
            Promise.all([
                OrderPrice.fromTokens('1000', createPair(fakeWAVES, fakeBTC)),
                OrderPrice.fromMatcherCoins('100000000000', createPair(fakeWAVES, fakeBTC))
            ]).then((orderPrices) => {
                expect(OrderPrice.isOrderPrice(orderPrices[0])).to.be.true;
                expect(OrderPrice.isOrderPrice(orderPrices[1])).to.be.true;
            }).then(() => done());
        });

        it('should create OrderPrice with asset ID inside the `pair` argument', (done) => {
            Promise.all([
                OrderPrice.fromTokens('1000', createPair(fakeWAVES.id, fakeBTC.id)),
                OrderPrice.fromMatcherCoins('100000000000', createPair(fakeWAVES.id, fakeBTC.id))
            ]).then((orderPrices) => {
                expect(OrderPrice.isOrderPrice(orderPrices[0])).to.be.true;
                expect(OrderPrice.isOrderPrice(orderPrices[1])).to.be.true;
            }).then(() => done());
        });

    });

    describe('core functionality', () => {

        describe('tokens to matcher coins', () => {

            it('should convert when assets precisions are the same [8, 8]', (done) => {
                OrderPrice.fromTokens('1.47', createPair(fakeWAVES, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('147000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are the same [2, 2]', (done) => {
                OrderPrice.fromTokens('0.01', createPair(fakeUSD, fakeEUR)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('1000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are the same [0, 0]', (done) => {
                OrderPrice.fromTokens('5', createPair(fakeZERO, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('500000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 2]', (done) => {
                OrderPrice.fromTokens('11.5', createPair(fakeWAVES, fakeUSD)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('1150');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 0]', (done) => {
                OrderPrice.fromTokens('555', createPair(fakeBTC, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('555');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [2, 8]', (done) => {
                OrderPrice.fromTokens('2.33445566', createPair(fakeEUR, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('233445566000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [0, 8]', (done) => {
                OrderPrice.fromTokens('100.01020304', createPair(fakeZERO, fakeWAVES)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('1000102030400000000');
                }).then(() => done());
            });

        });

        describe('tokens to matcher coins while dropping insignificant digits', () => {

            it('should convert when assets precisions are the same [8, 8]', (done) => {
                OrderPrice.fromTokens('11.509910102', createPair(fakeWAVES, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('1150991010');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 2]', (done) => {
                OrderPrice.fromTokens('11.5099', createPair(fakeWAVES, fakeUSD)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('1150');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 0]', (done) => {
                OrderPrice.fromTokens('555.33', createPair(fakeBTC, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('555');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [2, 8]', (done) => {
                OrderPrice.fromTokens('2.334455667788', createPair(fakeEUR, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('233445566000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are the same [0, 0]', (done) => {
                OrderPrice.fromTokens('555.33', createPair(fakeZERO, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toMatcherCoins()).to.equal('55500000000');
                }).then(() => done());
            });

        });

        describe('matcher coins to tokens', () => {

            it('should convert when assets precisions are the same [8, 8]', (done) => {
                OrderPrice.fromMatcherCoins('147000000', createPair(fakeWAVES, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('1.47000000');
                }).then(() => done());
            });

            it('should convert when assets precisions are the same [2, 2]', (done) => {
                OrderPrice.fromMatcherCoins('1000000', createPair(fakeUSD, fakeEUR)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('0.01');
                }).then(() => done());
            });

            it('should convert when assets precisions are the same [0, 0]', (done) => {
                OrderPrice.fromMatcherCoins('500000000', createPair(fakeZERO, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('5');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 2]', (done) => {
                OrderPrice.fromMatcherCoins('1150', createPair(fakeBTC, fakeEUR)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('11.50');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [8, 0]', (done) => {
                OrderPrice.fromMatcherCoins('555', createPair(fakeWAVES, fakeZERO)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('555');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [2, 8]', (done) => {
                OrderPrice.fromMatcherCoins('233445566000000', createPair(fakeUSD, fakeWAVES)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('2.33445566');
                }).then(() => done());
            });

            it('should convert when assets precisions are different [0, 8]', (done) => {
                OrderPrice.fromMatcherCoins('1000102030400000000', createPair(fakeZERO, fakeBTC)).then((orderPrice) => {
                    expect(orderPrice.toTokens()).to.equal('100.01020304');
                }).then(() => done());
            });

        });

    });

});
