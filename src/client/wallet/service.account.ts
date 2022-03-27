import { IAccount, WalletTypes } from "./wallet.types"
import cryptoUtils from "../../utils/crypto"

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

export function accountFactory({
    privateKey,
    publicKey,
    address,
    nWords,
    chain,
    nonce,
    seed
}: {
    privateKey?: string
    publicKey?: string
    address?: string
    nWords?: number
    chain?: number
    nonce?: number
    seed?: string
} = {}): Account {
    if (seed != undefined) {
        return new Account({
            ...cryptoUtils.fromExistingSeed(
                seed,
                nonce != undefined ? nonce : 0,
                chain != undefined ? chain : 0
            )
        })
    } else if (privateKey != undefined) {
        return new Account({
            ...cryptoUtils.fromPrivateKey(
                privateKey,
                chain != undefined ? chain : 0
            )
        })
    } else if (publicKey != undefined) {
        return new Account({
            ...cryptoUtils.fromPublicKey(
                publicKey,
                chain != undefined ? chain : 0
            )
        })
    } else if (address != undefined) {
        return new Account({
            ...cryptoUtils.fromAddress(address, chain != undefined ? chain : 0)
        })
    } else {
        return new Account({
            ...cryptoUtils.fromNewSeed(
                nWords != undefined ? nWords : 12,
                nonce != undefined ? nonce : 0,
                chain != undefined ? chain : 1
            )
        })
    }
}
