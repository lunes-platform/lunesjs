"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTypes = void 0;
var WalletTypes;
(function (WalletTypes) {
    let Chain;
    (function (Chain) {
        Chain[Chain["Mainnet"] = 1] = "Mainnet";
        Chain[Chain["Testnet"] = 0] = "Testnet";
    })(Chain = WalletTypes.Chain || (WalletTypes.Chain = {}));
})(WalletTypes = exports.WalletTypes || (exports.WalletTypes = {}));
