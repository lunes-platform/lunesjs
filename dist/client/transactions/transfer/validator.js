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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_types_1 = require("../transactions.types");
const crypto_1 = __importDefault(require("../../../utils/crypto"));
const wasm = __importStar(require("lunesrs"));
const axios_1 = __importDefault(require("axios"));
const validator = {
    serialize: (senderPublicKey, assetId, feeAsset, timestamp, amount, fee, recipient) => {
        const tokenId = assetId != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(assetId)])
            : new Uint8Array([0]);
        const tokenFee = feeAsset != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(feeAsset)])
            : new Uint8Array([0]);
        return new Uint8Array([
            ...[transactions_types_1.TransactionsTypes.TransferToken.int],
            ...wasm.base58ToArray(senderPublicKey),
            ...tokenId,
            ...tokenFee,
            ...wasm.serializeUInteger(BigInt(timestamp)),
            ...wasm.serializeUInteger(BigInt(amount)),
            ...wasm.serializeUInteger(BigInt(fee)),
            ...wasm.base58ToArray(recipient)
        ]);
    },
    ready: (senderPublicKey, recipient, amount, chain) => {
        const sender = wasm.arrayToBase58(wasm.toAddress(1, chain, wasm.base58ToArray(senderPublicKey)));
        if (amount <= 0) {
            return false;
        }
        else if (!(crypto_1.default.validateAddress(sender, chain) === true &&
            crypto_1.default.validateAddress(recipient, chain) === true)) {
            return false;
        }
        else {
            return true;
        }
    },
    sign: (privateKey, tx) => {
        const message = validator.serialize(tx.senderPublicKey, tx.assetId, tx.feeAsset, tx.timestamp, tx.amount, tx.fee, tx.recipient);
        return crypto_1.default.fastSignature(privateKey, wasm.arrayToBase58(new Uint8Array(message)));
    },
    send: (tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .request({
            url: "https://lunesnode.lunes.io/transactions/broadcast",
            method: "post",
            data: tx
        })
            .then((x) => {
            console.log(x);
        })
            .catch((error) => {
            console.error(error.response.data);
        });
    })
};
exports.default = validator;
