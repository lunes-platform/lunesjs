export namespace WalletTypes {

    export type Seed = string | undefined
    export type HashSeed = string | undefined
    export type Nonce = number | undefined // 0 ... 4294967295
    export type Chain = "mainnet" | "testnet" | undefined
    export type ChainId = "1" | "0" | undefined
    export type nWords = number | undefined
    export type PrivateKey = string | undefined
    export type PublicKey = string | undefined
    export type Address = string | undefined
}


export interface IAccount {
    seed?: WalletTypes.Seed,
    hashSeed?: WalletTypes.HashSeed
    nonce?: WalletTypes.Nonce,
    chain?: WalletTypes.Chain,
    chainId?: WalletTypes.ChainId,
    privateKey?: WalletTypes.PrivateKey,
    publicKey?: WalletTypes.PublicKey,
    address?: WalletTypes.Address,
    nWords?: WalletTypes.nWords,
}
