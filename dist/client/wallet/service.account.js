"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountFactory = void 0;
const crypto_1 = __importDefault(require("../../utils/crypto"));
class Account {
    constructor(wallet) {
        this.privateKey = wallet.privateKey;
        this.publicKey = wallet.publicKey;
        this.address = wallet.address;
        this.chain = wallet.chain;
        this.nonce = wallet.nonce;
        this.seed = wallet.seed;
    }
}
function accountFactory({ privateKey, publicKey, address, nWords, chain, nonce, seed } = {}) {
    if (seed != undefined) {
        return new Account(Object.assign({}, crypto_1.default.fromExistingSeed(seed, nonce != undefined ? nonce : 0, chain != undefined ? chain : 1)));
    }
    else if (privateKey != undefined) {
        return new Account(Object.assign({}, crypto_1.default.fromPrivateKey(privateKey, chain != undefined ? chain : 1)));
    }
    else if (publicKey != undefined) {
        return new Account(Object.assign({}, crypto_1.default.fromPublicKey(publicKey, chain != undefined ? chain : 1)));
    }
    else if (address != undefined) {
        return new Account(Object.assign({}, crypto_1.default.fromAddress(address, chain != undefined ? chain : 0)));
    }
    else {
        return new Account(Object.assign({}, crypto_1.default.fromNewSeed(nWords != undefined ? nWords : 12, nonce != undefined ? nonce : 0, chain != undefined ? chain : 1)));
    }
}
exports.accountFactory = accountFactory;
