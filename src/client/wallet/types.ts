export namespace Types {
    export type Seed = string | undefined
    export type Nonce = number | undefined // 0 ... 4294967295
    export type Network = "mainnet" | "testnet" | undefined
    export type NetworkId = "1" | "0" | undefined
    export type nWords = number | undefined
    export type PrivateKey = string | undefined
    export type PublicKey = string | undefined
    export type Address = string | undefined
}


export interface IAccount {
    seed?: Types.Seed,
    nonce?: Types.Nonce,
    network?: Types.Network,
    networkId?: Types.NetworkId,
    privateKey?: Types.PrivateKey,
    publicKey?: Types.PublicKey,
    address?: Types.Address,
    nWords?: Types.nWords,
}
