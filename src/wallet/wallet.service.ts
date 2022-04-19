import { crypto } from "../utils/crypto"

export class Wallet {
    privateKey: string
    publicKey: string
    address: string
    chain: number
    nonce: number
    seed: string

    constructor(
        privateKey: string,
        publicKey: string,
        address: string,
        chain: number,
        nonce: number,
        seed: string
    ) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.address = address
        this.chain = chain
        this.nonce = nonce
        this.seed = seed
    }
}

type TWallet = {
    privateKey?: string
    seedLen?: number
    chain?: number
    nonce?: number
    seed?: string
}

export function walletFactory(wallet: TWallet): Wallet {
    if (wallet.seed) {
        return crypto.fromSeed(
            wallet.seed,
            wallet.nonce != undefined ? wallet.nonce : 0,
            wallet.chain != undefined ? wallet.chain : 1
        )
    } else if (wallet.privateKey) {
        return crypto.fromPrivateKey(
            wallet.privateKey,
            wallet.chain != undefined ? wallet.chain : 1
        )
    } else {
        return crypto.fromNewSeed(
            wallet.seedLen != undefined ? wallet.seedLen : 12,
            wallet.nonce != undefined ? wallet.nonce : 0,
            wallet.chain != undefined ? wallet.chain : 1
        )
    }
}
