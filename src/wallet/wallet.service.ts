import { IAccount } from "./wallet.types"
import { cryptoUtils } from "../utils/crypto"

class Account implements IAccount {
    privateKey: string
    publicKey: string
    address: string
    chain: number
    nonce: number
    seed: string

    constructor(wallet: IAccount) {
        this.privateKey = wallet.privateKey
        this.publicKey = wallet.publicKey
        this.address = wallet.address
        this.chain = wallet.chain
        this.nonce = wallet.nonce
        this.seed = wallet.seed
    }
}

export function walletFactory({
    privateKey,
    seedLen,
    chain,
    nonce,
    seed
}: {
    privateKey?: string
    seedLen?: number
    chain?: number
    nonce?: number
    seed?: string
} = {}): Account {
    if (seed != undefined) {
        return new Account({
            ...cryptoUtils.fromExistingSeed(
                seed,
                nonce != undefined ? nonce : 0,
                chain != undefined ? chain : 1
            )
        })
    } else if (privateKey != undefined) {
        return new Account({
            ...cryptoUtils.fromPrivateKey(
                privateKey,
                chain != undefined ? chain : 1
            )
        })
    } else {
        return new Account({
            ...cryptoUtils.fromNewSeed(
                seedLen != undefined ? seedLen : 12,
                nonce != undefined ? nonce : 0,
                chain != undefined ? chain : 1
            )
        })
    }
}
