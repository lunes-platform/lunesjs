"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsTypes = void 0;
var TransactionsTypes;
(function (TransactionsTypes) {
    let TransferToken;
    (function (TransferToken) {
        TransferToken[TransferToken["int"] = 4] = "int";
        TransferToken[TransferToken["fee"] = 1000000] = "fee";
    })(TransferToken = TransactionsTypes.TransferToken || (TransactionsTypes.TransferToken = {}));
    let IssueToken;
    (function (IssueToken) {
        IssueToken[IssueToken["int"] = 5] = "int";
        IssueToken[IssueToken["fee"] = 1000000000] = "fee";
    })(IssueToken = TransactionsTypes.IssueToken || (TransactionsTypes.IssueToken = {}));
    //...
})(TransactionsTypes = exports.TransactionsTypes || (exports.TransactionsTypes = {}));
