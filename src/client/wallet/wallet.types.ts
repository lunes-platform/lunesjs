export namespace WalletTypes {

    export type nWords = number | undefined
    export type Seed = string | undefined
    export type Nonce = number | undefined // 0 ... 4294967295
    export enum Chain {
        Mainnet = "1",
        Testnet = "0"
    }
    export type PrivateKey = string | undefined
    export type PublicKey = string | undefined
    export type Address = string | undefined
}


export interface IAccount {
    nWords?: WalletTypes.nWords,
    seed?: WalletTypes.Seed,
    nonce?: WalletTypes.Nonce,
    chain: WalletTypes.Chain,
    privateKey?: WalletTypes.PrivateKey,
    publicKey?: WalletTypes.PublicKey,
    address?: WalletTypes.Address,
}
