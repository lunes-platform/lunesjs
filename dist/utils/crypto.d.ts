import { IAccount, WalletTypes } from "../client/wallet/wallet.types";
declare const cryptoUtils: {
    fromExistingSeed: (seed: string, nonce: number, chain: WalletTypes.Chain) => IAccount;
    fromPrivateKey: (privateKey: string, chain: WalletTypes.Chain) => IAccount;
    fromPublicKey: (publicKey: string, chain: WalletTypes.Chain) => IAccount;
    fromAddress: (address: string, chain: WalletTypes.Chain) => IAccount;
    fromNewSeed: (nWords: number, nonce: number, chain: WalletTypes.Chain) => IAccount;
    validateAddress: (address: string, chain: WalletTypes.Chain) => boolean;
    validateSignature: (publicKey: string, message: string, signature: string) => boolean;
    fastSignature: (privateKey: string, message: string) => string;
    fullSignature: (privateKey: string, message: string) => string;
};
export default cryptoUtils;
