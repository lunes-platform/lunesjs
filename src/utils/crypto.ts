import { IAccount, WalletTypes } from "../client/wallet/wallet.types"
import walletConstants from "../client/wallet/constants"
import * as wasm from "lunesrs"

const cryptoUtils = {
    fromExistingSeed: (
        seed: string,
        nonce: number,
        chain: WalletTypes.Chain
    ): IAccount => {
        const hidden_seed = wasm.hiddenSeed(nonce, seed)
        const privateKey = wasm.toPrivateKey(hidden_seed)
        const publicKey = wasm.toPublicKey(privateKey)
        const address = wasm.toAddress(1, chain, publicKey)

        return {
            nonce: nonce,
            chain: chain,
            seed: seed,
            privateKey: wasm.arrayToBase58(privateKey),
            publicKey: wasm.arrayToBase58(publicKey),
            address: wasm.arrayToBase58(address)
        }
    },
    fromPrivateKey: (
        privateKey: string,
        chain: WalletTypes.Chain
    ): IAccount => {
        const publicKey = wasm.toPublicKey(wasm.base58ToArray(privateKey))
        const address = wasm.toAddress(1, chain, publicKey)

        return {
            seed: "",
            nonce: 0,
            chain: chain,
            privateKey: privateKey,
            publicKey: wasm.arrayToBase58(publicKey),
            address: wasm.arrayToBase58(address)
        }
    },
    fromPublicKey: (publicKey: string, chain: WalletTypes.Chain): IAccount => {
        const address = wasm.toAddress(1, chain, wasm.base58ToArray(publicKey))

        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            chain: chain,
            publicKey: publicKey,
            address: wasm.arrayToBase58(address)
        }
    },
    fromAddress: (address: string, chain: WalletTypes.Chain): IAccount => {
        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            publicKey: "",
            chain: chain,
            address: address
        }
    },
    fromNewSeed: (
        nWords: number,
        nonce: number,
        chain: WalletTypes.Chain
    ): IAccount => {
        let seed = []
        nWords = nWords != undefined ? Math.round(nWords / 3) : 4
        for (let i = 0; i < nWords; i++) {
            for (let n in wasm.randomTripleNumber()) {
                seed.push(walletConstants.wordsList[n])
            }
        }
        return cryptoUtils.fromExistingSeed(seed.join(" "), nonce, chain)
    },
    validateAddress: (address: string, chain: WalletTypes.Chain): boolean => {
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
    fastSignature: (privateKey: string, message: string) => {
        return wasm.arrayToBase58(
            wasm.fastSignature(
                wasm.base58ToArray(privateKey),
                wasm.base58ToArray(message)
            )
        )
    },
    fullSignature: (privateKey: string, message: string) => {
        return wasm.arrayToBase58(
            wasm.fullSignature(
                wasm.base58ToArray(privateKey),
                wasm.base58ToArray(message)
            )
        )
    }
}

export default cryptoUtils
