"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../client/wallet/constants"));
const wasm = __importStar(require("lunesrs"));
const cryptoUtils = {
    fromExistingSeed: (seed, nonce, chain) => {
        const hidden_seed = wasm.hiddenSeed(nonce, seed);
        const privateKey = wasm.toPrivateKey(hidden_seed);
        const publicKey = wasm.toPublicKey(privateKey);
        const address = wasm.toAddress(1, chain, publicKey);
        return {
            nonce: nonce,
            chain: chain,
            seed: seed,
            privateKey: wasm.arrayToBase58(privateKey),
            publicKey: wasm.arrayToBase58(publicKey),
            address: wasm.arrayToBase58(address)
        };
    },
    fromPrivateKey: (privateKey, chain) => {
        const publicKey = wasm.toPublicKey(wasm.base58ToArray(privateKey));
        const address = wasm.toAddress(1, chain, publicKey);
        return {
            seed: "",
            nonce: 0,
            chain: chain,
            privateKey: privateKey,
            publicKey: wasm.arrayToBase58(publicKey),
            address: wasm.arrayToBase58(address)
        };
    },
    fromPublicKey: (publicKey, chain) => {
        const address = wasm.toAddress(1, chain, wasm.base58ToArray(publicKey));
        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            chain: chain,
            publicKey: publicKey,
            address: wasm.arrayToBase58(address)
        };
    },
    fromAddress: (address, chain) => {
        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            publicKey: "",
            chain: chain,
            address: address
        };
    },
    fromNewSeed: (nWords, nonce, chain) => {
        let seed = [];
        nWords = nWords != undefined ? Math.round(nWords / 3) : 4;
        for (let i = 0; i < nWords; i++) {
            for (let n in wasm.randomTripleNumber()) {
                seed.push(constants_1.default.wordsList[n]);
            }
        }
        return cryptoUtils.fromExistingSeed(seed.join(" "), nonce, chain);
    },
    validateAddress: (address, chain) => {
        return wasm.validateAddress(chain, wasm.base58ToArray(address));
    },
    validateSignature: (publicKey, message, signature) => {
        return wasm.validateSignature(wasm.base58ToArray(publicKey), wasm.base58ToArray(message), wasm.base58ToArray(signature));
    },
    fastSignature: (privateKey, message) => {
        return wasm.arrayToBase58(wasm.fastSignature(wasm.base58ToArray(privateKey), wasm.base58ToArray(message)));
    },
    fullSignature: (privateKey, message) => {
        return wasm.arrayToBase58(wasm.fullSignature(wasm.base58ToArray(privateKey), wasm.base58ToArray(message)));
    }
};
exports.default = cryptoUtils;
