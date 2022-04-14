export type empty = ""
export type zero = 0

export namespace WalletTypes {
    export type Seed = string | empty
    export type Nonce = number | zero // 0 ... 4.294.967.295
    export enum Chain {
        Mainnet = 1,
        Testnet = 0
    }
    export type PrivateKey = string | empty
    export type PublicKey = string | empty
    export type Address = string | empty
}

export interface IAccount {
    privateKey: WalletTypes.PrivateKey
    publicKey: WalletTypes.PublicKey
    address: WalletTypes.Address
    nonce: WalletTypes.Nonce
    chain: WalletTypes.Chain
    seed: WalletTypes.Seed
}
