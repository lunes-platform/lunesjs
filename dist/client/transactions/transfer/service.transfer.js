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
exports.transferTokenFactory = void 0;
const transactions_types_1 = require("../transactions.types");
const wallet_types_1 = require("../../wallet/wallet.types");
const validator_1 = __importDefault(require("./validator"));
const wasm = __importStar(require("lunesrs"));
class TransferToken {
    constructor(tx) {
        this.tx = tx;
    }
    transaction() {
        return this.tx;
    }
    sign(privateKey) {
        this.tx.signature = validator_1.default.sign(privateKey, this.tx);
        return this.tx;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            validator_1.default.send(this.tx);
        });
    }
}
function transferTokenFactory(senderPublicKey, recipient, amount, assetId, chain, timestamp, feeAsset, fee) {
    const chain_id = chain != undefined ? chain : wallet_types_1.WalletTypes.Chain.Mainnet;
    if (false == validator_1.default.ready(senderPublicKey, recipient, amount, chain_id)) {
        throw new Error("dados invalidos");
    }
    return new TransferToken({
        senderPublicKey: senderPublicKey,
        recipient: recipient,
        amount: amount,
        sender: wasm.arrayToBase58(wasm.toAddress(1, chain_id, wasm.base58ToArray(senderPublicKey))),
        timestamp: timestamp != undefined ? timestamp : new Date().getTime(),
        feeAsset: feeAsset != undefined ? feeAsset : "",
        assetId: assetId != undefined ? assetId : "",
        type: transactions_types_1.TransactionsTypes.TransferToken.int,
        fee: fee != undefined ? fee : transactions_types_1.TransactionsTypes.TransferToken.fee,
        signature: ""
    });
}
exports.transferTokenFactory = transferTokenFactory;
