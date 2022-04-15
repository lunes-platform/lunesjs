import { Wallet } from "../wallet/wallet.service"
import Constants from "../wallet/constants"
import * as wasm from "lunesrs"

export const crypto = {
    fromSeed: (seed: string, nonce: number, chain: number): Wallet => {
        const hidden_seed = wasm.hiddenSeed(nonce, seed)
        const privateKey = wasm.toPrivateKey(hidden_seed)
        const publicKey = wasm.toPublicKey(privateKey)
        const address = wasm.toAddress(1, chain, publicKey)

        return new Wallet(
            wasm.arrayToBase58(privateKey),
            wasm.arrayToBase58(publicKey),
            wasm.arrayToBase58(address),
            chain,
            nonce,
            seed
        )
    },
    fromPrivateKey: (privateKey: string, chain: number): Wallet => {
        const publicKey = wasm.toPublicKey(wasm.base58ToArray(privateKey))
        const address = wasm.toAddress(1, chain, publicKey)

        return new Wallet(
            privateKey,
            wasm.arrayToBase58(publicKey),
            wasm.arrayToBase58(address),
            chain,
            0,
            ""
        )
    },
    fromNewSeed: (seedLen: number, nonce: number, chain: number): Wallet => {
        let seed = []
        seedLen = seedLen != undefined ? Math.round(seedLen / 3) : 4
        for (let i = 0; i < seedLen; i++) {
            for (let n of wasm.randomTripleNumber()) {
                seed.push(Constants.wordsList[n])
            }
        }
        return crypto.fromSeed(seed.join(" "), nonce, chain)
    },
    validateAddress: (address: string, chain: number): boolean => {
        return wasm.validateAddress(chain, wasm.base58ToArray(address))
    },
    validateSignature: (
        publicKey: string,
        message: string,
        signature: string
    ): boolean => {
        return wasm.validateSignature(
            wasm.base58ToArray(publicKey),
            wasm.base58ToArray(message),
            wasm.base58ToArray(signature)
        )
    },
    fastSignature: (privateKey: string, message: string): string => {
        return wasm.arrayToBase58(
            wasm.fastSignature(
                wasm.base58ToArray(privateKey),
                wasm.base58ToArray(message)
            )
        )
    },
    fullSignature: (privateKey: string, message: string): string => {
        return wasm.arrayToBase58(
            wasm.fullSignature(
                wasm.base58ToArray(privateKey),
                wasm.base58ToArray(message)
            )
        )
    },
    sameChainAddress: (addr1: string, addr2: string): boolean => {
        const x = crypto.validateAddress(addr1, 1) && crypto.validateAddress(addr2, 1)
        const y = crypto.validateAddress(addr1, 0) && crypto.validateAddress(addr2, 0)

        return x || y
    }
}
