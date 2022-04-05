export declare type empty = "";
export declare type zero = 0;
export declare namespace WalletTypes {
    type Seed = string | empty;
    type Nonce = number | zero;
    enum Chain {
        Mainnet = 1,
        Testnet = 0
    }
    type PrivateKey = string | empty;
    type PublicKey = string | empty;
    type Address = string | empty;
}
export interface IAccount {
    privateKey: WalletTypes.PrivateKey;
    publicKey: WalletTypes.PublicKey;
    address: WalletTypes.Address;
    nonce: WalletTypes.Nonce;
    chain: WalletTypes.Chain;
    seed: WalletTypes.Seed;
}
